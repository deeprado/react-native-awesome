import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Carousel,
  Tabs,
  Provider,
  Modal,
  Toast,
  Button,
} from '@ant-design/react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {IS_IOS} from '../../../../config';
import data from '../Data/data';

const categoryPng = require('../../../../assets/qimao/image/category.png');
const rankPng = require('../../../../assets/qimao/image/rank.png');
const newPng = require('../../../../assets/qimao/image/new.png');
const donePng = require('../../../../assets/qimao/image/done.png');
const logoPng = require('../../../../assets/qimao/image/logo.png');
const {width, height} = Dimensions.get('window');

class Nansheng extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hasMore: true,
      ...data,
    };

    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderSpecialItem = this._renderSpecialItem.bind(this);
    this._renderEmpty = this._renderEmpty.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this._fetchMore = this._fetchMore.bind(this);
    this._separator = this._separator.bind(this);
    this.onHorizontalSelectedIndexChange = this.onHorizontalSelectedIndexChange.bind(
      this,
    );
  }

  onHorizontalSelectedIndexChange = index => {
    /* tslint:disable: no-console */
    // console.log('horizontal change to', index);
  };

  _keyExtractor = (item, index) => item.id.toString();

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  _renderEmpty = () => {
    return (
      <View>
        <Text>无数据</Text>
      </View>
    );
  };

  _renderFooter = () => {
    if (this.state.hasMore) {
      if (this.state.loading) {
        return (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 15,
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        );
      } else {
        return null;
      }
    }
    return (
      <View
        style={{
          backgroundColor: '#F5F5F5',
          paddingBottom: 24,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Text
          style={{
            color: '#6D6963',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 15,
            marginBottom: 15,
          }}>
          已经到底了~
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            borderRadius: 20,
            height: 40,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['#FFB129', '#FF9108']}
            style={styles.linearGradient}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                backgroundColor: 'transparent',
              }}>
              去分类书库，发现海量好书
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  _fetchMore = info => {
    let specialList = data.specialList;
    this.setState({
      specialList: specialList.concat(specialList),
    });
  };

  _renderSpecialItem = row => {
    let item = row.item;
    return (
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
        }}
        key={item.id}>
        <View style={{width: 90, height: 120, overflow: 'hidden'}}>
          <Image source={logoPng} style={{width: 90, height: 120}} />
        </View>
        <View
          style={{
            marginLeft: 10,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 20}}>
              {item.title}
              {item.id}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <View>
                <Text
                  style={{
                    color: '#FF8D00',
                    fontSize: 20,
                    fontWeight: '700',
                  }}>
                  {item.fraction}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#FF8D00',
                    paddingBottom: 2,
                  }}>
                  分
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 16, color: '#6D6963'}} numberOfLines={2}>
              {item.summery}
            </Text>
          </View>
          <Text style={{fontSize: 14, color: '#6D6963'}}>
            连载 {item.count} 万字
          </Text>
        </View>
      </View>
    );
  };

  _renderFourItems = bookList => {
    let rows = bookList.slice(0, 4);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        {rows.map((item, index) => {
          return (
            <View style={{width: 90}} key={item.id}>
              <Image source={logoPng} style={{height: 124, width: 90}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: 16,
                    marginTop: 3,
                    marginBottom: 3,
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}>
                  {item.title}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* 轮播图 */}
          <View style={styles.wrapperBox}>
            <Carousel
              style={styles.wrapper}
              selectedIndex={0}
              autoplay={true}
              infinite={true}
              autoplayInterval={5000}
              dotStyle={{backgroundColor: '#F5F5F5'}}
              dotActiveStyle={{backgroundColor: '#FCC800'}}
              afterChange={this.onHorizontalSelectedIndexChange}>
              {this.state.carouselList.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.containerHorizontal,
                      {backgroundColor: item.color},
                    ]}
                    key={item.id}>
                    <Text>Carousel {item.id}</Text>
                  </View>
                );
              })}
            </Carousel>
          </View>
          {/* 导航 */}
          <View style={styles.navBox}>
            <TouchableOpacity>
              <View style={styles.navBarBox}>
                <Image source={categoryPng} style={styles.navBarIcon} />
                <Text style={styles.navBarTxt}>分类</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.navBarBox}>
                <Image source={rankPng} style={styles.navBarIcon} />
                <Text style={styles.navBarTxt}>排行榜</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.navBarBox}>
                <Image source={newPng} style={styles.navBarIcon} />
                <Text style={styles.navBarTxt}>独家新书</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.navBarBox}>
                <Image source={donePng} style={styles.navBarIcon} />
                <Text style={styles.navBarTxt}>完结精品</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* 重磅推荐 */}
          <View style={{marginTop: 30}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 24, fontWeight: '600'}}>重磅推荐</Text>
            </View>
            {/* 上 */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <View>
                <Image source={logoPng} style={{width: 60, height: 80}} />
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{fontSize: 18, marginTop: 3, marginBottom: 3}}>
                    无敌剑域
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'orangered',
                        fontWeight: '700',
                      }}>
                      9.6
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'orangered',
                        marginLeft: 2,
                        paddingBottom: 2,
                      }}>
                      分
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 3, marginBottom: 10}}>
                  <Text style={{color: '#9E9E9E', fontSize: 16}}>
                    剑宗第一废柴，以无上神技，逆天改命，傲立苍穹，一人一剑
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#9E9E9E'}}>完结</Text>
                    <Text style={{color: '#9E9E9E', marginLeft: 10}}>
                      866万字
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#9E9E9E',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        fontSize: 12,
                        paddingLeft: 10,
                        paddingRight: 8,
                        paddingTop: 2,
                        paddingBottom: 1,
                        borderRadius: 5,
                        alignContent: 'center',
                      }}>
                      东方玄幻
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 下 */}
            <View>{this._renderFourItems(this.state.recommendList)}</View>
          </View>
          {/* 好评佳作 */}
          <View style={{marginTop: 30}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 24, fontWeight: '600'}}>好评佳作</Text>
            </View>
            <View>
              {this._renderFourItems(this.state.goodList)}
              {this._renderFourItems(this.state.goodList)}
            </View>
          </View>

          {/* 男生都在看 */}
          <View style={{marginTop: 30}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 24, fontWeight: '600'}}>男生都在看</Text>
            </View>
            <View
              style={{
                marginTop: 15,
                flexShrink: 0,
              }}>
              <FlatList
                data={this.state.specialList}
                extraData={this.state.specialList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderSpecialItem}
                ListEmptyComponent={this._renderEmpty}
                ListFooterComponent={this._renderFooter}
                onEndReached={this._fetchMore}
                onEndReachedThreshold={IS_IOS ? 0.02 : 0.2}
                ItemSeparatorComponent={this._separator}
                initialNumToRender={10}
                numColumns={1}
                flashScrollIndicators={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  wrapperBox: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  navBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  navBarBox: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  navBarIcon: {
    width: 40,
    height: 40,
  },
  navBarTxt: {
    fontSize: 16,
    fontFamily: '楷体',
    color: '#6D6963',
  },

  rankBox: {
    marginTop: 20,
  },
  rankTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  rankTitleLeftBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rankTitle: {
    fontSize: 20,
  },
  rankDetail: {
    marginLeft: 15,
    color: '#6D6963',
  },
  rankNote: {
    color: '#6D6963',
  },
  rankListBox: {
    marginTop: 10,
    flexDirection: 'row',
  },
  rankListLeft: {
    width: (width - 40) / 2,
  },

  rankListBookBox: {
    flexDirection: 'row',
  },
  rankBookIcon: {
    width: 50,
    height: 65,
  },

  goodBookBox: {
    marginTop: 30,
  },
  originBox: {
    marginTop: 30,
  },
  specialBox: {
    marginTop: 30,
  },
});

export default Nansheng;
