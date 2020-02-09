import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as WeChat from 'react-native-wechat';

const {width, height} = Dimensions.get('window');
const adPng = require('../../../assets/qimao/image/ad.png');
const avatarPng = require('../../../assets/qimao/image/avatar.png');

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logined: true,
    };
  }

  componentDidMount() {
    WeChat.registerApp('wx732379a9f9484d01');
  }

  goTarget(routeName) {
    if (this.state.logined) {
      this.props.navigation.navigate(routeName);
    } else {
      this.props.navigation.navigate('AuthStack');
    }
  }

  auth() {
    let scope = 'snsapi_userinfo'; //应用授权作用域，如获取用户个人信息则填写snsapi_userinfo
    let state = 'wechat_sdk_demo';
    WeChat.sendAuthRequest(scope, state).then(authInfo => {
      /*
        errCode	Number	Error Code
        errStr	String	Error message if any error occurred
        openId	String	xxx
        code	String	Authorization code
        url	String	The URL string
        lang	String	The user language
        country	String	The user country
      */
      console.log(authInfo);
    });
  }

  _renderTop() {
    if (this.state.logined) {
      return (
        <View style={{marginTop: 30}}>
          {/* 头像部分 */}
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.goTarget('BasicInfo')}>
              <View style={{borderRadius: 40, overflow: 'hidden'}}>
                <Image source={avatarPng} style={{width: 80, height: 80}} />
              </View>
            </TouchableOpacity>
            <View style={{marginLeft: 15, marginTop: 10}}>
              <TouchableOpacity onPress={() => this.goTarget('BasicInfo')}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  寻找普拉多
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.goTarget('RedEnvelope')}
                style={{marginTop: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#ECECEC',
                    paddingLeft: 5,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: '#9E9E9E', fontSize: 12}}>
                    红包码：1232423
                  </Text>
                  <Icon
                    name="chevron-right"
                    type="feather"
                    size={14}
                    color="#DADADA"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => this.goTarget('Gold')}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 22, fontWeight: '700'}}>32973</Text>
                  <Text style={{color: '#A9A9A9'}}>我的金币</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 22, fontWeight: '700'}}>0</Text>
                  <Text style={{color: '#A9A9A9'}}>今日金币</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 22, fontWeight: '700'}}>0</Text>
                  <Text style={{color: '#A9A9A9'}}>今日阅读(分钟)</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, color: '#747474'}}>
              登录后现金、金币天天领
            </Text>
          </View>
          {/* 微信登录 */}
          <View
            style={{
              backgroundColor: '#39B900',
              borderRadius: 25,
              paddingTop: 15,
              paddingBottom: 15,
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={this.auth}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="social-github"
                  type="foundation"
                  size={25}
                  color="#fff"
                />
                <Text style={{color: '#fff', fontSize: 20, marginLeft: 5}}>
                  登录领最高10元红包
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* 手机号登录 */}
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={() => this.goTarget('Mobile')}>
              <Text style={{fontSize: 18, color: '#313131'}}>手机号登录></Text>
            </TouchableOpacity>
            <View>
              <Text style={{color: '#9B9B9B', fontSize: 12, marginTop: 30}}>
                未注册的微信号或手机号登录后将自动注册
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  _renderMiddle() {
    if (this.state.logined) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.goTarget('Invitation')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 36,
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="crown"
                    type="foundation"
                    size={30}
                    color="#FF990D"
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 20}}>邀请好友领红包</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#BCBCBC', fontSize: 14}}>
                      限时活动，邀请好友立赚8元！
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={24}
                  color="#DADADA"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={() => this.goTarget('Withdraw')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 15,
                paddingBottom: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 36,
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="crown"
                    type="foundation"
                    size={30}
                    color="#FF990D"
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 20}}>登录后阅读可提现！</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#BCBCBC', fontSize: 14}}>
                      点击查看
                    </Text>
                    <TouchableOpacity style={{marginTop: 3}}>
                      <Text style={{color: '#FDAC21', fontSize: 14}}>
                        《活动规则》
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  colors={['#FFB129', '#FF9108']}
                  style={styles.linearGradient}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: 'transparent',
                    }}>
                    立即提现
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              borderBottomColor: '#F2F2F2',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity onPress={() => this.goTarget('Invitation')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 36,
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="crown"
                    type="foundation"
                    size={30}
                    color="#FF990D"
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 20}}>邀请好友领红包</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#BCBCBC', fontSize: 14}}>
                      限时活动，邀请好友立赚8元！
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={24}
                  color="#DADADA"
                />
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              borderBottomColor: '#F2F2F2',
              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity onPress={() => this.goTarget('Cash')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 15,
                paddingBottom: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 36,
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="crown"
                    type="foundation"
                    size={30}
                    color="#FF990D"
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 20}}>输入红包码领现金</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#BCBCBC', fontSize: 14}}>
                      领取好友红包，注册起3天内可领取
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="chevron-right"
                  type="feather"
                  size={24}
                  color="#DADADA"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: 30, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              {this._renderTop()}

              {/* 活动 */}
              <View
                style={{
                  marginTop: 30,
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginBottom: 20,
                }}>
                <Image source={adPng} style={{height: 80, width: width - 40}} />
              </View>
            </View>
          </View>

          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              {this._renderMiddle()}
            </View>
          </View>

          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              {/* 特权 */}
              <TouchableOpacity onPress={() => this.goTarget('Privilege')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 36,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="crown"
                        type="foundation"
                        size={24}
                        color="#666666"
                      />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#272727'}}>
                        我的特权
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      尊享无广告等特权
                    </Text>
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={22}
                      color="#DADADA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              {/* 阅读历史 */}
              <TouchableOpacity onPress={() => this.goTarget('Record')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 36,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="clock"
                        type="feather"
                        size={22}
                        color="#666666"
                      />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#272727'}}>
                        阅读历史
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={22}
                      color="#DADADA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              {/* 通知 */}
              <TouchableOpacity onPress={() => this.goTarget('Notice')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 36,
                        justifyContent: 'center',
                      }}>
                      <Icon name="bell" type="feather" size={24} color="#666" />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#272727'}}>
                        消息通知
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={22}
                      color="#DADADA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              {/* 提现 */}
              <TouchableOpacity onPress={() => this.goTarget('Withdraw')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 36,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="setting"
                        type="antdesign"
                        size={24}
                        color="#666666"
                      />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#272727'}}>
                        金币提现
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      提现到账快
                    </Text>
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={22}
                      color="#DADADA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              {/* 青少年 */}
              <TouchableOpacity onPress={() => this.goTarget('Teenager')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 36,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="shield"
                        type="foundation"
                        size={26}
                        color="#666666"
                      />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#272727'}}>
                        青少年模式
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={24}
                      color="#DADADA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              {/* 帮助与反馈 */}
              <TouchableOpacity onPress={() => this.goTarget('Help')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 36,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="ios-help-circle-outline"
                        type="ionicon"
                        size={26}
                        color="#666666"
                      />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#272727'}}>
                        帮助和反馈
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={22}
                      color="#DADADA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{marginTop: 10, backgroundColor: '#fff', marginBottom: 60}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              {/* 设置 */}
              <TouchableOpacity onPress={() => this.goTarget('Setting')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 36,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="setting"
                        type="antdesign"
                        size={24}
                        color="#666666"
                      />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#272727'}}>设置</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="chevron-right"
                      type="feather"
                      size={22}
                      color="#DADADA"
                    />
                  </View>
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
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  linearGradient: {
    borderRadius: 15,
  },
});

export default Index;
