import React, {Component} from 'react';

import {
  Animated,
  Easing,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import Util from './utils/util';
import Request from './lib/request';
import {Icon, Slider} from 'react-native-elements';

let chapter1 = {
  _id: '58ccc05923ff5c6b9d5053cc',
  title: '上架感言',
  postfix: '2352954.html',
  number: 0,
  novel: '58ccc05923ff5c6b9d5053cb',
  __v: 0,
  content:
    '&nbsp;&nbsp;&nbsp;&nbsp;《1852铁血中华》已经上架。&nbsp;&nbsp;&nbsp;&nbsp;这次写太平天国时代有很多原因，不过最重要的原因之一，是因为太平天国运动是清末民初最后一次体制外的造反，也是中国到现在为止的最后一次大规模农民起义。&nbsp;&nbsp;&nbsp;&nbsp;一提起太平天国来，现在的人很容易想起的就是拜上帝教、洪教主，而实际情况又是如何？&nbsp;&nbsp;&nbsp;&nbsp;在那个时代，满清朝廷虽然给洋人跪了，但是整个中国各阶层却远没有20世纪初面临亡国灭种危局的绝望之情。&nbsp;&nbsp;&nbsp;&nbsp;这就是太平天国时代的中国。&nbsp;&nbsp;&nbsp;&nbsp;在全世界主要大国正向着空前激烈的时代突飞猛进的时候，中国的变化远没有世界来的激烈。本书的主角要承担的责任，就是在中国掀起比世界更加激烈的变化。&nbsp;&nbsp;&nbsp;&nbsp;对大家以往的支持，绯红万分感谢！绯红一定会努力继续写书，请大家继续支持，继续订阅！谢谢！！&nbsp;&nbsp;&nbsp;&nbsp;[三七中文 www.37zw.com]百度搜索“37zw.com”',
};
let chapter2 = {
  _id: '58ccc05923ff5c6b9d5053cd',
  title: '第1章 韦泽（一）',
  postfix: '2352958.html',
  number: 1,
  novel: '58ccc05923ff5c6b9d5053cb',
  content:
    '&nbsp;&nbsp;&nbsp;&nbsp;1852年2月6日上午，广西大瑶山一处山岭上的树林旁边。&nbsp;&nbsp;&nbsp;&nbsp;二十几名年轻的战士正在战场上，他们都穿着广西普通百姓的服色，身上是黑色的粗布短衣短裤，腰间束了白色的粗布腰带，腿上打着白布绑腿，脚上则是草鞋。因为天冷，战士们脚上缠了原本可能是白色，现在已经脏兮兮看不出颜色的裹脚布。众人脑袋上并不是广西那种包头布，因为大家都把长发在头上扎了一个发髻，所以在脑袋上箍了一条白色粗布发带，猛看上仿佛是一支奔丧的队伍。&nbsp;&nbsp;&nbsp;&nbsp;一位浓眉大眼的青年停在战场中央，棱角分明脸庞有着少年轻人特有的圆润感觉，怎么看都不超过20岁的模样。这名笑道：“辫子又不重，带回去正好请功！”&nbsp;&nbsp;&nbsp;&nbsp;广西号称百万大山，大瑶山山峦叠翠，在战场附近就有山谷。清军的尸体被抛入山谷，转眼就没了踪影。清军还能留在战场上的是他们的武器，十几名清军的武器中一半是长枪，另一半则是火绳枪。这就是韦泽回到这个时代之后另一件不能立刻接受的事情。这个时业化的日本进行着艰苦卓绝的战斗，并且顽强的不断扩大敌后根据地，把中国的国土从侵略者手中一寸寸的夺回来。&nbsp;&nbsp;&nbsp;&nbsp;满清的火绳枪固然与这时代流行的燧发枪有不小差距，却远没有到达一场战斗只有五发子弹的八路军与敌人之间的差距。在武器装备差距有限的局面下还能被打得签署了无数丧权辱国的条约，这样的满清是必须消灭掉的。不消灭掉满清，就注定没有中国的未来。韦泽对此坚信不移。&nbsp;&nbsp;&nbsp;&nbsp;十几名清军携带的钱财不多，韦泽登记造册后让负责后勤的伍长林阿生把财物收起来。&nbsp;&nbsp;&nbsp;&nbsp;“出发！”韦泽命道。26人的小队扛起自己的装备，在韦泽的带领下向着东北方向继续前进了。&nbsp;&nbsp;&nbsp;&nbsp;[三七中文 www.37zw.com]百度搜索“37zw.com”',
};
let chapters = [chapter1, chapter2];
let firstRenderChapters = {
  chapters: chapters,
  progress: 0,
  countChapter: 23232,
};

class Reader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),

      hideStatusBar: true,
      hide: true,
      searching: false,
      first: true,

      showSliderChapter: false,
      maxChapterNum: 1000,
      chapterNum: 100,
      _data: [],
      firstRenderChapters: null,
    };
    this.uuid = 130;

    this.count = 0;
    this.currentChapter = '';
    this.nextChapter = '';
    this.number = 0;
    this.x = 0;
    this.a = 0;
    this.i = 0;
  }

  componentDidMount() {
    // console.log(this.props.firstRenderChapters);
    AsyncStorage.setItem('userToken', 'adfasdfsdfas');
    this.getFirstRenderChapters(this.uuid);
  }

  componentWillUnmount() {
    if (this.a !== 0) {
      this.a = this.a + 375;
    }

    // if (this.i === 1) {
    //   this.a = this.a + 750
    // }

    const json = {
      novel: {
        id: this.uuid,
        num: this.number,
        x: this.x - this.a,
      },
    };

    AsyncStorage.getItem('userToken')
      .then(token => {
        console.log('token', token);
        // Request.post('/bookshelfs/change', json, token).then(res => {
        //   return true;
        // });
      })
      .catch(e => {
        console.log('err', e);
      });
    // this.props.firstRenderChapters = {}
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  UNSAFE_componentWillUpdateXXX(nextProps, nextState) {
    const that = this;
    console.log('nextProps, nextState', nextProps, nextState);
    if (nextProps.navigation.state.params.first) {
      nextProps.navigation.state.params.first = false;
      AsyncStorage.getItem('userToken').then(token => {
        Request.get(`/chapters/firstRender/${that.uuid}`, '', token).then(
          data => {
            let progress = data.response.progress;
            this.number = data.response.chapters[0].number;
            const lists = data.response.chapters;
            let arr = [];
            let content = that.nbsp2Space(lists[0].content);
            let _arr = Util.handleContent(content);
            that.currentChapter = _arr.length;
            _arr.forEach(function(_item) {
              let chapterInfo = {
                title: lists[0].title,
                num: lists[0].number,
                content: _item,
              };
              arr.push(chapterInfo);
            });
            if (lists.length === 2) {
              content = that.nbsp2Space(lists[1].content);
              _arr = Util.handleContent(content);
              that.nextChapter = _arr.length;
              _arr.forEach(function(_item) {
                let chapterInfo = {
                  title: lists[1].title,
                  num: lists[1].number,
                  content: _item,
                };
                arr.push(chapterInfo);
              });
            }
            that._data = arr;
            let scrollView = that.refs.scrollView;
            scrollView.scrollTo({x: progress * 375, y: 0, animated: false});
          },
        );
      });
    }
    if (
      Object.keys(this.props.firstRenderChapters).length !== 0 &&
      nextState.first
    ) {
      this.setState({
        first: false,
      });

      let progress = nextProps.firstRenderChapters.progress;
      this.number = nextProps.firstRenderChapters.chapters[0].number;
      const list = Object.keys(nextProps.firstRenderChapters).map(
        key => nextProps.firstRenderChapters[key],
      );

      let arr = [];
      if (list.length !== 0) {
        let content = that.nbsp2Space(list[0][0].content);
        let _arr = Util.handleContent(content);
        this.currentChapter = _arr.length;
        _arr.forEach(function(_item) {
          let chapterInfo = {
            title: list[0][0].title,
            num: list[0][0].number,
            content: _item,
          };
          arr.push(chapterInfo);
        });
        if (list[0].length === 2) {
          content = that.nbsp2Space(list[0][1].content);
          _arr = Util.handleContent(content);
          this.nextChapter = _arr.length;
          _arr.forEach(function(_item) {
            let chapterInfo = {
              title: list[0][1].title,
              num: list[0][1].number,
              content: _item,
            };
            arr.push(chapterInfo);
          });
        }
      }
      this._data = arr;
      let scrollView = this.scrollView;
      scrollView.scrollTo({x: progress * 375, y: 0, animated: false});
    }
  }

  // 获取第一个章节
  getFirstRenderChapters(uuid) {
    console.log('uuid', uuid);
    // axios.get(`/chapters/firstRender/${uuid}`).then(res => {
    //   that.firstRenderChapters = res.data.response;
    // });
    this.setState({
      firstRenderChapters: firstRenderChapters,
    });
    this.parseResponse(firstRenderChapters);
  }

  nbsp2Space(str) {
    if (!str) {
      return null;
    }
    return str.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '        ');
  }

  parseResponse = () => {
    // let firstRenderChapters = this.state.firstRenderChapters;
    let that = this;
    let progress = firstRenderChapters.progress;
    this.number = firstRenderChapters.chapters[0].number;
    const lists = firstRenderChapters.chapters;
    let arr = [];
    let content = that.nbsp2Space(lists[0].content);
    let _arr = Util.handleContent(content);
    that.currentChapter = _arr.length;
    _arr.forEach(function(_item) {
      let chapterInfo = {
        title: lists[0].title,
        num: lists[0].number,
        content: _item,
      };
      arr.push(chapterInfo);
    });
    if (lists.length === 2) {
      content = that.nbsp2Space(lists[1].content);
      _arr = Util.handleContent(content);
      that.nextChapter = _arr.length;
      _arr.forEach(function(_item) {
        let chapterInfo = {
          title: lists[1].title,
          num: lists[1].number,
          content: _item,
        };
        arr.push(chapterInfo);
      });
    }
    that.setState({
      _data: arr,
    });
    let scrollView = that.scrollView;
    scrollView.scrollTo({x: progress * 375, y: 0, animated: false});
  };

  // 切换目录
  goDerictory() {
    this.iknow();
    this.props.navigation.navigate('Directory', {
      id: this.props.navigation.state.params.id,
      name: this.props.navigation.state.params.name,
    });
  }

  // 返回
  goBack() {
    this.iknow();
    this.props.navigation.goBack();
  }

  _concatData(newData) {
    let _data = this.state._data.concat(newData);
    this.setState({
      _data,
    });
  }

  _unshiftData(newData) {
    const that = this;
    newData = newData.concat(this.state._data);

    setTimeout(function() {
      that.setState({
        _data: newData,
        searching: false,
      });
    }, 300);
  }

  // 通过章节获取内容
  getContent(chapterInfo) {
    const content = chapterInfo.content;
    let arr = [];
    let _content = this.nbsp2Space(content);
    let _arr = Util.handleContent(_content);
    this.currentChapter = this.nextChapter;
    this.nextChapter = _arr.length;
    _arr.forEach(function(_item) {
      let _chapterInfo = {
        title: chapterInfo.title,
        num: chapterInfo.number,
        content: _item,
      };
      arr.push(_chapterInfo);
    });
    return arr;
  }

  // 滑动事件
  handleScroll(e) {
    let arr = [];
    let chapterInfo;
    // let listView = this.refs.listView;
    let x = e.nativeEvent.contentOffset.x;
    const that = this;
    if (this.count === 0) {
      this.count = (this.currentChapter - 1) * 375;
    }

    this.x = x;
    if (x > this.count) {
      this.a = this.count;
      this.count += this.nextChapter * 375;
      if (
        this.number + 2 <
        parseInt(this.state.firstRenderChapters.countChapter)
      ) {
        let json = {
          novelId: that.uuid,
          num: that.number + 2,
        };
        Request.post('/chapters', json).then(data => {
          chapterInfo = data.response;
          that.number = that.number + 1;
          let chapterInfoArr = that.getContent(chapterInfo);
          that._concatData(chapterInfoArr);
        });
      } else {
        this.a = 0;
      }
    }

    if (x < 0 && this.number === 0) {
      Alert.alert('已是第一页');
    }

    if (x < 0) {
      this.i = 1;
      let json = {
        novelId: that.uuid,
        num: that.number - 1,
      };
      Request.post('/chapters', json).then(data => {
        chapterInfo = data.response;
        that.number = that.number - 1;
        let content = that.nbsp2Space(chapterInfo.content);
        let _arr = Util.handleContent(content);
        that.currentChapter = _arr.length;
        that.nextChapter = that.currentChapter;
        _arr.forEach(function(_item) {
          let _chapterInfo = {
            title: chapterInfo.title,
            num: chapterInfo.number,
            content: _item,
          };
          arr.push(_chapterInfo);
        });
        that.setState({searching: true});
        that._unshiftData(arr);
      });
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: Util.size.height, width: Util.size.width}}
          activeOpacity={1}
          onPress={() => this.show()}>
          {this.renderContent(item)}
        </TouchableOpacity>
      </View>
    );
  };

  _renderEmpty = () => {
    return (
      <View>
        <Text>无数据</Text>
      </View>
    );
  };

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  _renderSliderChapter = () => {
    if (!this.state.showSliderChapter) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          top: -100,
          left: 0.2 * Util.size.width,
          height: 72,
          width: 0.6 * Util.size.width,
          backgroundColor: '#222222',
          borderRadius: 10,
        }}>
        <View
          style={{
            paddingTop: 10,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#fff'}} numberOfLines={1}>
            第二百九十五章 羞花代言
          </Text>
          <Text style={{fontSize: 16, color: '#F48801', marginTop: 10}}>
            {this._getPercentage()}%
          </Text>
        </View>
      </View>
    );
  };

  _getPercentage = () => {
    let tmpNum = this.state.chapterNum / this.state.maxChapterNum;
    return (tmpNum * 100).toFixed(2);
  };

  _renderFooter = () => {
    return null;
  };

  renderListView() {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={this.state._data}
        extraData={this.state._data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmpty}
        ListFooterComponent={this._renderFooter}
        ItemSeparatorComponent={this._separator}
        initialNumToRender={10}
        numColumns={1}
        flashScrollIndicators={true}
      />
    );
  }

  // List() {
  //   return Object.keys(this.props.firstRenderChapters).map(key => this.props.firstRenderChapters[key])
  // }

  loading() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: Util.size.height, width: Util.size.width}}
          activeOpacity={1}
          onPress={() => this.show()}>
          <Text>搜索中...</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderContent(rowData) {
    console.log('rowData', rowData);
    return (
      <View style={styles.contentContainer}>
        <View style={styles.top}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',

                borderWidth: 1,
                borderColor: '#D4BA90',

                paddingTop: 3,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 10,
              }}>
              <Icon
                name="align-justify"
                type="feather"
                color="#A69673"
                size={14}
              />
              <Text style={{marginLeft: 5, color: '#A69673', fontSize: 12}}>
                菜单
              </Text>
            </View>

            <View style={{marginLeft: 20}}>
              <Text style={styles.chapterName}>{rowData.title}</Text>
            </View>
          </View>
          <View style={{marginRight: 10}}>
            <TouchableOpacity>
              <Icon
                name="bitcoin-circle"
                type="foundation"
                color="#A69673"
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.chapterContent}>
          {rowData.content
            ? rowData.content.map((value, index, chapterContent) => {
                return (
                  <Text style={styles.ficContent} key={index}>
                    {value}
                  </Text>
                );
              })
            : null}
        </View>
        <View style={styles.foot}>
          <View style={styles.footLeft}>
            <Text style={styles.chapterName}>16:28</Text>
          </View>

          <View>
            <Text>提醒：请勿向他人泄露银行卡信息</Text>
          </View>
          <View style={styles.footRight}>
            <Text style={styles.chapterName}>
              本章进度100% {rowData.num}/1022
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: Util.size.height, width: Util.size.width}}
          activeOpacity={1}
          onPress={() => this.show()}>
          {this.renderContent(rowData)}
        </TouchableOpacity>
      </View>
    );
  }

  // {this.state.searching ? this.loading() : this.renderContent(rowData)}
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#3B3A38'}
          translucent={true}
          hidden={this.state.hideStatusBar}
          animated={true}
          barStyle="light-content"
        />
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          scrollEventThrottle={800}
          horizontal={true}
          onScroll={e => this.handleScroll(e)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}>
          {this.state.searching ? this.loading() : this.renderListView()}
        </ScrollView>
        {this.showReaderOptions()}
      </View>
    );
  }

  _renderShelfBox = () => {
    if (this.state.alAddShelf) {
      return null;
    }
    return (
      <Animated.View
        style={[
          styles.shelfBox,
          {
            transform: [
              {
                translateX: this.state.offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              }, // x轴移动
            ],
          },
        ]}>
        <View
          style={{
            backgroundColor: '#444444',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10,

            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <Text style={{fontSize: 18, color: '#fff'}}>加入书架</Text>
        </View>
      </Animated.View>
    );
  };

  showReaderOptions() {
    if (this.state.hide) {
      return null;
    }
    return (
      <View style={styles.alertContainer}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.state.offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-70, 0],
                }),
              },
            ],
          }}>
          <View style={styles.alertTop}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.goBack();
                }}>
                <Image
                  style={styles.backImg}
                  source={require('./imgs/back.png')}
                />
                <Text style={{fontSize: 20, color: '#fff'}}>返回</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#F58902',
                    marginTop: 1,
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 15,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#F58902', fontSize: 14}}>全本下载</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{marginLeft: 30, alignItems: 'center'}}>
                  <Icon
                    name="headphones"
                    type="feather"
                    color="#fff"
                    size={24}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{marginLeft: 30, alignItems: 'center'}}>
                  <Icon
                    name="more-horizontal"
                    type="feather"
                    color="#fff"
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        {this._renderShelfBox()}
        <TouchableOpacity
          style={{height: Util.size.height - 300}}
          onPress={this.iknow.bind(this)}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.state.offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          }}>
          <View style={styles.alertFoot}>
            {this._renderSliderChapter()}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <TouchableOpacity>
                <View>
                  <Text style={{color: '#C8C8C8', fontSize: 16}}>上一章</Text>
                </View>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', width: 200}}>
                <Slider
                  value={this.state.chapterNum}
                  maximumValue={this.state.maxChapterNum}
                  step={1}
                  minimumValue={1}
                  minimumTrackTintColor={'#F18500'}
                  maximumTrackTintColor={'#666666'}
                  thumbTintColor={'#F18500'}
                  onValueChange={chapterNum =>
                    this.setState({chapterNum, showSliderChapter: true})
                  }
                />
              </View>
              <TouchableOpacity>
                <View>
                  <Text style={{color: '#C8C8C8', fontSize: 16}}>下一章</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.goDerictory();
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <Icon name="list" type="feather" color="#A8A8A8" size={24} />
                  <Text style={styles.directoryText}>目录</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.goDerictory();
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <Icon name="list" type="feather" color="#A8A8A8" size={24} />
                  <Text style={styles.directoryText}>夜间模式</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.goDerictory();
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <Icon name="list" type="feather" color="#A8A8A8" size={24} />

                  <Text style={styles.directoryText}>亮度</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.goDerictory();
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <Icon
                    name="widget"
                    type="foundation"
                    color="#A8A8A8"
                    size={24}
                  />
                  <Text style={styles.directoryText}>夜间阅读</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }

  //显示动画
  in() {
    Animated.parallel([
      Animated.timing(this.state.offset, {
        easing: Easing.linear,
        duration: 200,
        toValue: 1,
      }),
    ]).start();
  }

  // 隐藏动画
  out() {
    Animated.parallel([
      Animated.timing(this.state.offset, {
        easing: Easing.linear,
        duration: 200,
        toValue: 0,
      }),
    ]).start(finished =>
      this.setState({
        hide: true,
        showSliderChapter: false,
      }),
    );
  }

  // 取消
  iknow() {
    if (!this.state.hide) {
      this.out();
    }
  }

  show() {
    if (this.state.hide) {
      this.setState({hide: false}, this.in);
    }
  }

  nbsp2Space = str => {
    return !str ? null : str.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '        ');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9DFC7',
  },
  contentContainer: {
    position: 'relative',
    width: Util.size.width,
  },
  top: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chapterContent: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    height: Util.size.height - 50,
  },
  chapterName: {
    fontSize: 14,
    color: '#A58F72',
  },
  bigChapterName: {
    fontSize: 22,
  },
  ficContent: {
    color: '#604733',
    fontSize: 24,
    lineHeight: 40,
  },
  foot: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 90,
    left: 0,
    width: Util.size.width - 20,
  },
  footLeft: {
    flexDirection: 'row',
  },
  footRight: {
    flexDirection: 'row',
  },
  shelfBox: {
    position: 'absolute',
    top: 120,
    right: 0,
    width: 120,
    height: 50,
  },
  alertContainer: {
    position: 'absolute',
    width: Util.size.width,
    height: Util.size.height,
  },
  alertTop: {
    backgroundColor: '#3B3A38',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  alertMiddle: {
    height: Util.size.height - 140,
  },
  alertFoot: {
    minHeight: 200,
    position: 'relative',
    backgroundColor: '#3B3A38',
  },
  backImg: {
    marginLeft: 10,
  },
  directoryImg: {
    marginLeft: 10,
    marginTop: 10,
  },
  directoryText: {
    color: '#B6B6B6',
    fontSize: 14,
  },
});

export default Reader;
