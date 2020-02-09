import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('window');
const adPng = require('../../../assets/qimao/image/ad.png');
// const logoPng = require('../../../assets/qimao/image/logo.png');
const welfareReadPng = require('../../../assets/qimao/image/welfare_read.png');

class Index extends Component {
  static navigationOptions = {
    title: '福利',
  };
  constructor(props) {
    super(props);

    this.state = {
      readSteps: [
        {title: '30分钟', description: 'This is description', status: 'finish'},
        {title: '60分钟', description: 'This is description', status: 'finish'},
        {title: '90分钟', description: 'This is description', status: 'finish'},
        {
          title: '180分钟',
          description: 'This is description',
          status: 'finish',
        },
      ],
      readWidth: width - 40,
      readHeight: 120,
    };
  }

  renderLeftComponent() {
    return null;
    // return (
    //   <Icon name="left" color="#9D9D9D" type="antdesign" onPress={this.goBack} />
    // );
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24}}>福利中心</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView
          style={{backgroundColor: '#F5F5F5'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#fff',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            {/* 我的 */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16}}>我的金币： 3232323</Text>
                <Text style={{marginLeft: 15, fontSize: 14}}>约3.3元</Text>
              </View>
              <View>
                <Icon
                  name="chevron-right"
                  type="feather"
                  color="#BFBFBF"
                  size={20}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: 10,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    您已经签到
                  </Text>
                  <Text style={{fontSize: 24, fontWeight: '700'}}> 1 </Text>
                  <Text style={{fontSize: 18, fontWeight: '600'}}>天</Text>
                </View>
                <View
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 18,
                    paddingRight: 18,
                    backgroundColor: '#FCCA07',
                    borderRadius: 20,
                  }}>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>
                    签到+20金币
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{color: '#A2A2A2'}}>
                  漏签3天，补签之后可达到连签4天。
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{color: '#FAB131', textDecorationLine: 'underline'}}>
                    立即补签>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 活动 */}
            <View style={{marginTop: 15, borderRadius: 10, overflow: 'hidden'}}>
              <Image source={adPng} style={{height: 80, width: width - 40}} />
            </View>

            {/* 阅读福利 */}
            <View style={{marginTop: 20, marginBottom: 5}}>
              <Text style={{fontSize: 24}}>阅读福利</Text>
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 18}}>每日阅读</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={16}
                      color={'#FFA331'}
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        marginBottom: 1,
                        fontSize: 14,
                        color: '#FFA331',
                      }}>
                      特权奖励x2
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    达到阅读时长后系统会自动发放金币奖励
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 16}}>去阅读</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 10,
                      paddingRight: 10,

                      borderWidth: 1,
                      borderColor: 'red',
                    }}>
                    <Text>50</Text>
                    <Text>金币</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text>==</Text>
              </View>
              <View>
                <Text>60</Text>
              </View>
              <View>
                <Text>==</Text>
              </View>
              <View>
                <Text>80</Text>
              </View>
              <View>
                <Text>==</Text>
              </View>
              <View>
                <Text>100</Text>
              </View>
            </View> */}
            <View
              style={{
                marginBottom: 15,
                flex: 1,
              }}>
              <Image
                source={welfareReadPng}
                style={{
                  width: 440,
                  height: 80,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 18}}>
                    阅读30秒计时奖励
                  </Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={16}
                      color={'#FFA331'}
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        marginBottom: 1,
                        fontSize: 14,
                        color: '#FFA331',
                      }}>
                      最高50金币
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    阅读时间越久，累计获得的金币越多
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 16}}>去阅读</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 18}}>
                    看视频免广告
                  </Text>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    观看小视频，立享20分钟无广告阅读
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 16}}>免广告</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 日常福利 */}
          <View
            style={{
              marginTop: 15,
              backgroundColor: '#fff',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <View style={{marginTop: 20, marginBottom: 5}}>
              <Text style={{fontSize: 24}}>日常福利</Text>
            </View>

            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 18}}>邀请好友</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={16}
                      color={'#FFA331'}
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        marginBottom: 1,
                        fontSize: 14,
                        color: '#FFA331',
                      }}>
                      +4元
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    邀请好友的现金，好友阅读的金币提成
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 16}}>去邀请</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 18}}>幸运大转盘</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={16}
                      color={'#FFA331'}
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        marginBottom: 1,
                        fontSize: 14,
                        color: '#FFA331',
                      }}>
                      抽iPhone
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    拼手气，赢iPhone 11
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 16}}>去抽奖</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 18}}>观看小视频</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={16}
                      color={'#FFA331'}
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        marginBottom: 1,
                        fontSize: 14,
                        color: '#FFA331',
                      }}>
                      +50金币
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    观看15~30秒小视频，得丰厚金币奖励
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 16}}>去观看</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 进阶福利 */}
          <View
            style={{
              marginTop: 15,
              marginBottom: 50,
              backgroundColor: '#fff',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 24}}>进阶福利</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000', fontSize: 18}}>打开推送</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={16}
                      color="#FFA331"
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        marginBottom: 1,
                        fontSize: 14,
                        color: '#FFA331',
                      }}>
                      +200金币
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    打开推送，获取最新福利通知
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15,
                  }}>
                  <Text style={{fontSize: 16}}>去开启</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Index;
