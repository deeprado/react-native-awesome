import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Easing,
  Animated,
  findNodeHandle,
  UIManager,
  ScrollView,
  Image,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Toast, Provider} from '@ant-design/react-native';

const {width, height} = Dimensions.get('window');
const logoPng = require('../../../assets/qimao/image/logo.png');

/**
 * 封面简介
 */

class Cover extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: true, // 背景透明
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '神魂丹帝',
      author: '浊酒一壶',
      cateTitle: '异界大陆',
      pubTitle: '连载',
      wordCount: 365,

      recomList: [false, false, false],
      headerOpacity: 0,

      scolling: false,
      showAno: false,
    };

    this._onScroll = this._onScroll.bind(this);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderLeftComponent(headerType = 0) {
    let color = headerType === 0 ? '#fff' : '#9D9D9D';
    return (
      <Icon name="left" color={color} type="antdesign" onPress={this.goBack} />
    );
  }

  renderRightComponent(headerType) {
    let color = headerType === 0 ? '#fff' : '#333333';
    return (
      <View>
        <TouchableOpacity>
          <Icon name="more-horizontal" type="feather" color={color} size={30} />
        </TouchableOpacity>
      </View>
    );
  }

  renderCenterComponent(headerType) {
    if (headerType === 0) {
      return null;
    }
    return (
      <View>
        <Text style={{color: '#333', fontWeight: '700', fontSize: 24}}>
          {this.state.title}
        </Text>
      </View>
    );
  }

  _renderHeader() {
    if (this.state.showAno) {
      return (
        <View>
          <Header
            backgroundColor={'#fff'}
            leftComponent={this.renderLeftComponent(1)}
            centerComponent={this.renderCenterComponent(1)}
            rightComponent={this.renderRightComponent(1)}
            style={{
              opacity: 1,
            }}
            containerStyle={{
              opacity: 1,
            }}
          />
        </View>
      );
    }
    return null;
  }

  _renderInsideHeader() {
    if (this.state.showAno) {
      return null;
    }
    return (
      <Header
        backgroundColor={'#707379'}
        leftComponent={this.renderLeftComponent(0)}
        rightComponent={this.renderRightComponent(0)}
      />
    );
  }

  // 开始阅读
  startRead = () => {
    this.props.navigation.navigate('Reader', {
      id: 2332,
    });
  };

  joinShelf = () => {
    Toast.info('加入成功');
  };

  // 下载
  downBook = () => {
    Toast.info('下载完成');
  };

  _getFilterBorderPos(filterBorder) {
    let that = this;
    const handle = findNodeHandle(filterBorder);
    setTimeout(() => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        that.setState({
          filterBorderPos: {
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          },
        });
      });
    }, 100);
  }

  _onScroll = event => {
    let that = this;

    let scrollY = event.nativeEvent.contentOffset.y;
    let filterBorderPos = this.state.filterBorderPos;
    let headerOpacity = 0;
    if (filterBorderPos) {
      let finalHeight = filterBorderPos.pageY + filterBorderPos.height;
      headerOpacity = (scrollY / finalHeight).toFixed(1);
    }

    let showAno = scrollY > 0;
    if (headerOpacity > 0) {
      that.setState({
        showAno: showAno,
      });
    } else {
      that.setState({
        showAno: showAno,
      });
    }
  };

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          {this._renderHeader()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={this._onScroll}>
            {this._renderInsideHeader()}
            <View
              style={{
                backgroundColor: '#707379',
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  paddingTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* 左边 */}
                <View>
                  <View style={{}}>
                    <Text
                      style={{fontSize: 24, fontWeight: '700', color: '#fff'}}>
                      {this.state.title}
                    </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#D4D5D7',
                      }}>
                      {this.state.author}
                    </Text>
                  </View>
                  <View style={{marginTop: 30, flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#D4D5D7',
                      }}>
                      {this.state.cateTitle}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#D4D5D7',
                      }}>
                      -
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#D4D5D7',
                      }}>
                      {this.state.pubTitle}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#D4D5D7',
                      }}>
                      -
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#D4D5D7',
                      }}>
                      {this.state.wordCount}万字
                    </Text>
                  </View>
                </View>
                {/* 右边 */}
                <View>
                  <Image source={logoPng} style={{height: 120, width: 90}} />
                </View>
              </View>
            </View>

            <View>
              <View
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                }}>
                {/* 统计 */}
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  {/* 人气 */}
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={{fontSize: 24, fontWeight: '700'}}>
                        133.5
                      </Text>
                      <Text style={{color: '#2C2C2C', marginBottom: 4}}>
                        万人气
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 12, color: '#A4A4A4'}}>
                        排在同类书Top 1%
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{width: 2, backgroundColor: '#F8F8F8', height: 30}}
                  />
                  {/* 评分 */}
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={{fontSize: 24, fontWeight: '700'}}>9.2</Text>
                      <Text style={{color: '#2C2C2C', marginBottom: 4}}>
                        评分
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 12, color: '#A4A4A4'}}>
                        超过94%的同类书
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{width: 2, backgroundColor: '#F8F8F8', height: 30}}
                  />
                  {/* 在读 */}
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={{fontSize: 24, fontWeight: '700'}}>
                        12.9
                      </Text>
                      <Text style={{color: '#2C2C2C', marginBottom: 4}}>
                        万在读
                      </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 12, color: '#A4A4A4'}}>
                        92%的男生在看
                      </Text>
                    </View>
                  </View>
                </View>
                {/* 榜单 */}
                <View
                  style={{
                    backgroundColor: '#F1F1F1',
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#3B3B3B',
                      fontWeight: '700',
                      marginLeft: 15,
                    }}>
                    大热榜
                  </Text>
                  <Text
                    style={{fontSize: 16, color: '#4D4D4D', marginLeft: 20}}>
                    玄幻奇幻类突围好书，当前排第
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#FF4242',
                      fontWeight: '700',
                      marginLeft: 2,
                      marginBottom: 2,
                    }}>
                    1
                  </Text>
                  <Text style={{fontSize: 16, color: '#4D4D4D', marginLeft: 2}}>
                    名
                  </Text>
                </View>
                {/* 简介 */}
                <View>
                  <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 18, color: '#666666'}}>
                      主要人物： 秦朗
                    </Text>
                  </View>
                  <View style={{marginTop: 20}}>
                    <Text
                      style={{fontSize: 18, color: '#666666', lineHeight: 30}}>
                      简介：少年十年坚持，却草早未婚妻多去武魂而亡！穿越觉醒神秘武魂的秦朗，发誓绝不再让别人左右自己的命运！自己要疯狂修炼，破碎未婚妻的阴谋！自己要变得更强，主宰自己的命运！自己要笑傲天下，成为一代丹帝！
                    </Text>
                  </View>
                </View>
                <View style={{height: 1, backgroundColor: '#F6F6F6'}} />
                <View style={{marginTop: 20, marginBottom: 20}}>
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#414141'}}>
                          查看目录
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#9C9C9C',
                            marginLeft: 10,
                          }}>
                          最新
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#9C9C9C',
                            marginLeft: 10,
                          }}>
                          第一千七百八十章
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#9C9C9C',
                            marginLeft: 10,
                          }}>
                          吞掉
                        </Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 14, color: '#9C9C9C'}}>
                          2020-02-10更新>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{height: 10, backgroundColor: '#F5F5F5'}} />

            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                <View>
                  <Text
                    style={{fontSize: 24, fontWeight: '700', color: '#222222'}}>
                    大家都在看
                  </Text>
                </View>
                <View>
                  <Text
                    style={{fontSize: 14, color: '#9C9C9C', marginBottom: 2}}>
                    换一换
                  </Text>
                </View>
              </View>
              {/* 都在看 */}
              <View>
                {this.state.recomList.map(function(item, index) {
                  return (
                    <View
                      style={{flexDirection: 'row', marginBottom: 20}}
                      key={index}>
                      <View>
                        <Image
                          source={logoPng}
                          style={{width: 80, height: 120}}
                        />
                      </View>
                      <View style={{marginLeft: 10, flex: 1}}>
                        <View>
                          <Text style={{fontSize: 20, color: '#222'}}>
                            最强修炼系统
                          </Text>
                        </View>
                        <View style={{marginTop: 10, flex: 1}}>
                          <Text
                            style={{
                              fontSize: 16,
                              lineHeight: 24,
                              color: '#999999',
                            }}>
                            游戏玩家王浩，带着九龙系统穿越元武大陆，从此踩天才，灭凶兽，怀搂绝世美女，成就
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={{color: '#A5A5A5', fontSize: 14}}>
                              完结
                            </Text>
                            <Text
                              style={{
                                color: '#A5A5A5',
                                fontSize: 14,
                                marginLeft: 10,
                              }}>
                              311万字
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                color: '#A5A5A5',
                                fontSize: 12,
                                paddingLeft: 5,
                                paddingRight: 3,
                                borderWidth: 1,
                                borderColor: '#E0E0E0',
                                borderRadius: 3,
                              }}>
                              异界大陆
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={{height: 10, backgroundColor: '#F5F5F5'}} />

              {/* 免责声明 */}
              <View style={{marginBottom: 160}}>
                <View style={{marginTop: 15}}>
                  <Text
                    style={{fontSize: 24, fontWeight: '700', color: '#222'}}>
                    免责声明
                  </Text>
                </View>
                <View style={{marginTop: 15}}>
                  <Text style={{fontSize: 18, color: '#686868'}}>
                    本书数字版权由掌阅科技提供并发行，所有费用已由我司承担，您可免费阅读。本故事纯属虚构，如有疑问，请联系客服QQ：
                    3598987377
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              backgroundColor: '#fff',
              width: width,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTopColor: '#F1F1F1',
              borderTopWidth: 1,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <View>
              <TouchableOpacity onPress={() => this.joinShelf()}>
                <View>
                  <Icon
                    name="chart"
                    type="evilicon"
                    color="#424242"
                    size={34}
                  />
                  <Text>加入书架</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <LinearGradient
                colors={['#FFB129', '#FF9108']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>
                <TouchableOpacity
                  onPress={() => this.startRead()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 100,
                    paddingRight: 100,
                    borderRadius: 25,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      backgroundColor: 'transparent',
                    }}>
                    免费阅读全本
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.downBook()}>
                <View>
                  <Icon
                    name="download"
                    type="feather"
                    color="#424242"
                    size={24}
                  />
                  <Text>免费下载</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    borderRadius: 30,
  },
});

export default Cover;
