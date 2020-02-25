import AsyncStorage from '@react-native-community/async-storage';
import GitHubTrending from 'GitHubTrending';

import TimeUtil from './time';

const FlAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending',
  flag_mine: 'mine',
};

class DataRepository {
  constructor(flag) {
    this.flag = flag;
    if (flag === FlAG_STORAGE.flag_trending)
      this.trending = new GitHubTrending();
  }
  // 获取数据
  fetchRespository(url) {
    return new Promise((resolve, reject) => {
      // 首先获取本地缓存
      this.fetchLocalRespository(url)
        .then(wrapData => {
          // 本地缓存获取成功
          if (wrapData) {
            //
            resolve(wrapData, true);
          } else {
            // 缓存对象不存在，进行网络请求
            this.fetchNetRepository(url)

              // 网路请求成功
              .then(data => {
                resolve(data);
              })
              //网路请求失败
              .catch(e => {
                reject(e);
              });
          }
        })
        .catch(e => {
          // 本地缓存获取失败，进行网络请求
          this.fetchNetRepository(url)

            // 网路请求成功
            .then(result => {
              resolve(result);
            })
            // 网路请求失败
            .catch(e => {
              reject(e);
            });
        });
    });
  }

  fetchNetRepository1(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .catch(error => {
          reject(error);
        })
        .then(responseData => {
          resolve(responseData);
        });
    });
  }

  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      if (this.flag !== FlAG_STORAGE.flag_trending) {
        fetch(url)
          .then(response => response.json())
          .catch(error => {
            reject(error);
          })
          .then(responseData => {
            if (this.flag === FlAG_STORAGE.flag_mine && responseData) {
              this.saveRespository(url, responseData);
              resolve(responseData);
            } else if (responseData && responseData.items) {
              this.saveRespository(url, responseData.items);
              resolve(responseData.items);
            } else {
              reject(new Error('responseData is null'));
            }
          });
      } else {
        this.trending
          .fetchTrending(url)
          .then(items => {
            if (!items) {
              reject(new Error('responseData is null'));
              return;
            }
            resolve(items);
            this.saveRespository(url, items);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  // 获取本地缓存
  fetchLocalRespository(url) {
    return new Promise((resolve, reject) => {
      // 获取本地存储
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            // 必须使用parse解析成对象
            resolve(JSON.parse(result));
          } catch (e) {
            // 解析失败
            reject(e);
          }
        } else {
          // 获取缓存失败
          reject(error);
        }
      });
    });
  }

  saveRespository(url, items, callBack) {
    if (!url || !items) return;
    let wrapData;
    if (this.flag === FlAG_STORAGE.flag_mine) {
      wrapData = {item: items, update_date: new Date().getTime()};
    } else {
      wrapData = {items: items, update_date: new Date().getTime()};
    }
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
  }

  removeRepository(url) {
    AsyncStorage.removeItem(url, (error, result) => {
      if (error) console.log(error);
    });
  }
}

export default class RepositoryUtil {
  constructor(aboutCommon) {
    this.aboutCommon = aboutCommon;
    this.dataRespository = new DataRepository(FlAG_STORAGE.flag_mine);
    this.itemMap = new Map();
  }

  updateData(key, value) {
    this.itemMap.set(key, value);
    var arr = [];
    for (var value of this.itemMap.values()) {
      arr.push(value);
    }
    this.aboutCommon.onNotifyDataChanged(arr);
  }

  //获取指定url下的数据
  fetchRepository(url) {
    this.dataRespository
      .fetchRespository(url)

      .then(result => {
        if (result) {
          this.updateData(url, result);
          if (!TimeUtil.checkDate(result.update_date)) {
            return this.dataRespository.fetchNetRepository(url);
          }
        }
      })

      .then(item => {
        if (item) {
          this.updateData(url, item);
        }
      })

      .catch(e => {
        reject(e);
      });
  }

  //批量获取url对应的数据
  fetchRepositorys(urls) {
    for (let i = 0, l = urls.length; i < l; i++) {
      url = urls[i];
      this.fetchRepository(url);
    }
  }
}
