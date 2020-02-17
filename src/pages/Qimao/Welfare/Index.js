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
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const adPng = require('../../../assets/qimao/image/ad.png');
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
      signinDays: 2,
      isNewUser: true,
      logined: false,
    };
  }

  renderLeftComponent() {
    return null;
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#222222', fontSize: 24}}>福利中心</Text>
      </View>
    );
  }

  goTarget = routeName => {
    this.props.navigation.navigate(routeName);
  };

  _renderNewUserWelfare = () => {
    if (!this.state.isNewUser) {
      return null;
    }
    return (
      <View
        style={{
          backgroundColor: '#fff',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View style={{marginTop: 30, marginBottom: 10}}>
          <Text style={{fontSize: 24}}>新手福利</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 15,
            height: 1,
            borderBottomColor: '#F7F7F7',
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
              <Text style={{color: '#222222', fontSize: 18}}>1元提现</Text>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="bitcoin-circle"
                  type="foundation"
                  size={20}
                  color={'#FF6010'}
                />
                <Text
                  style={{
                    marginLeft: 2,
                    marginBottom: 1,
                    fontSize: 14,
                    color: '#FF6010',
                  }}>
                  提现1元
                </Text>
              </View>
            </View>
            <View style={{marginTop: 5, flexDirection: 'row'}}>
              <Text style={{color: '#9E9E9E', fontSize: 14}}>点击查看</Text>
              <Text style={{color: '#FDBE50', fontSize: 14}}>《活动规则》</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.goTarget('DepotBox')}>
            <View style={styles.operBtn}>
              <Text style={styles.operBtnTxt}>提现1元</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 10,
            height: 1,
            borderBottomColor: '#F7F7F7',
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
              <Text style={{color: '#222222', fontSize: 18}}>
                绑定微信/手机号
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
                  size={20}
                  color={'#FFA331'}
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
                绑定微信/手机号注册为完整账号
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={styles.operBtn}>
              <Text style={styles.operBtnTxt}>去绑定</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 10,
            height: 1,
            borderBottomColor: '#F7F7F7',
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
              <Text style={{color: '#222222', fontSize: 18}}>天天领金币</Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{color: '#9E9E9E', fontSize: 14}}>
                注册起前七天，每天都可以领取最高1666红包
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.goTarget('Noad')}>
            <View style={styles.operBtn}>
              <Text style={styles.operBtnTxt}>领红包</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderReadWelfare = () => {
    if (this.state.isNewUser) {
      return (
        <View
          style={{
            backgroundColor: '#fff',
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
          }}>
          <View style={{paddingTop: 20, paddingBottom: 10}}>
            <Text style={{fontSize: 24}}>新手阅读福利</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 15,
              height: 1,
              borderBottomColor: '#F7F7F7',
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
                <Text style={{color: '#222222', fontSize: 18}}>阅读5分钟</Text>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="bitcoin-circle"
                    type="foundation"
                    size={20}
                    color={'#FFA331'}
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
                  完成阅读任务获得额外奖励
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.goTarget('DepotBox')}>
              <View style={styles.operBtn}>
                <Text style={styles.operBtnTxt}>去阅读</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              height: 1,
              borderBottomColor: '#F7F7F7',
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
                <Text style={{color: '#222222', fontSize: 18}}>阅读20分钟</Text>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="bitcoin-circle"
                    type="foundation"
                    size={20}
                    color={'#FFA331'}
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
                  完成阅读任务获得额外奖励
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.operBtn}>
                <Text style={styles.operBtnTxt}>去阅读</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              height: 1,
              borderBottomColor: '#F7F7F7',
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
                <Text style={{color: '#222222', fontSize: 18}}>阅读60分钟</Text>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="bitcoin-circle"
                    type="foundation"
                    size={20}
                    color={'#FFA331'}
                  />
                  <Text
                    style={{
                      marginLeft: 2,
                      marginBottom: 1,
                      fontSize: 14,
                      color: '#FFA331',
                    }}>
                    +300金币
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{color: '#9E9E9E', fontSize: 14}}>
                  完成阅读任务获得额外奖励
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.operBtn}>
                <Text style={styles.operBtnTxt}>去阅读</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              height: 1,
              borderBottomColor: '#F7F7F7',
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
                <Text style={{color: '#222222', fontSize: 18}}>
                  阅读120分钟
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
                    size={20}
                    color={'#FFA331'}
                  />
                  <Text
                    style={{
                      marginLeft: 2,
                      marginBottom: 1,
                      fontSize: 14,
                      color: '#FFA331',
                    }}>
                    +300金币
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{color: '#9E9E9E', fontSize: 14}}>
                  完成阅读任务获得额外奖励
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.operBtn}>
                <Text style={styles.operBtnTxt}>去阅读</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              height: 1,
              borderBottomColor: '#F7F7F7',
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
                <Text style={{color: '#222222', fontSize: 18}}>
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
                    size={20}
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
              <View style={styles.operBtn}>
                <Text style={styles.operBtnTxt}>去阅读</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              marginBottom: 10,
              height: 1,
              borderBottomColor: '#F7F7F7',
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
                <Text style={{color: '#222222', fontSize: 18}}>
                  看视频免广告
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{color: '#9E9E9E', fontSize: 14}}>
                  观看小视频，立享20分钟无广告阅读
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.goTarget('Noad')}>
              <View style={styles.operBtn}>
                <Text style={styles.operBtnTxt}>免广告</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={{marginTop: 30, marginBottom: 10}}>
          <Text style={{fontSize: 24}}>阅读福利</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 15,
            height: 1,
            borderBottomColor: '#F7F7F7',
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
              <Text style={{color: '#222222', fontSize: 18}}>每日阅读</Text>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="bitcoin-circle"
                  type="foundation"
                  size={20}
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
          <TouchableOpacity onPress={() => this.goTarget('DepotBox')}>
            <View style={styles.operBtn}>
              <Text style={styles.operBtnTxt}>去阅读</Text>
            </View>
          </TouchableOpacity>
        </View>

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
            borderBottomColor: '#F7F7F7',
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
              <Text style={{color: '#222222', fontSize: 18}}>
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
                  size={20}
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
            <View style={styles.operBtn}>
              <Text style={styles.operBtnTxt}>去阅读</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 5,
            marginBottom: 10,
            height: 1,
            borderBottomColor: '#F7F7F7',
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
              <Text style={{color: '#222222', fontSize: 18}}>看视频免广告</Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{color: '#9E9E9E', fontSize: 14}}>
                观看小视频，立享20分钟无广告阅读
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.goTarget('Noad')}>
            <View style={styles.operBtn}>
              <Text style={styles.operBtnTxt}>免广告</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderMyGold = () => {
    if (this.state.logined) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#222222'}}>
            我的金币： 3232323
          </Text>
          <View
            style={{
              marginLeft: 15,
              backgroundColor: '#FF5F0F',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 8,
              paddingRight: 8,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 14, color: '#fff'}}>约3.31元</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#222222'}}>我的金币：--</Text>
        </View>
      );
    }
  };

  _renderSignin = () => {
    if (this.state.logined) {
      return (
        <View>
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
              <Text style={{fontSize: 20, fontWeight: '700'}}>您已经签到</Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  marginBottom: -3,
                }}>
                {this.state.signinDays}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700'}}>天</Text>
            </View>
            <View
              style={{
                paddingTop: 12,
                paddingBottom: 10,
                paddingLeft: 18,
                paddingRight: 18,
                backgroundColor: '#FCCA07',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>签到+20金币</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text style={{color: '#A2A2A2'}}>
              漏签3天，补签之后可达到连签4天。
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#FAB131',
                  textDecorationLine: 'underline',
                }}>
                立即补签>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View>
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
              <Text style={{fontSize: 20, fontWeight: '700'}}>
                首次签到奖励
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  marginBottom: -3,
                }}>
                100
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700'}}>金币</Text>
            </View>
            <View style={{}}>
              <LinearGradient
                colors={['#FFE040', '#FCC902']}
                style={styles.linearGradient}>
                <TouchableOpacity onPress={() => this.goTarget('Signin')}>
                  <View
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 30,
                      paddingRight: 30,
                      backgroundColor: '#FCCA07',
                      borderRadius: 30,
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      立即签到
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text style={{color: '#A2A2A2'}}>连续签到可获得最高</Text>
            <Text
              style={{
                color: '#FAB131',
              }}>
              6666金币
            </Text>
          </View>
        </View>
      );
    }
  };

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
            <TouchableOpacity onPress={() => this.goTarget('Gold')}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 20,
                  paddingBottom: 20,
                }}>
                {this._renderMyGold()}
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="chevron-right"
                    type="feather"
                    color="#BFBFBF"
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: 10,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 10,
              }}>
              {this._renderSignin()}
            </View>

            {/* 活动 */}
            <View style={{marginTop: 15, borderRadius: 10, overflow: 'hidden'}}>
              <Image source={adPng} style={{height: 80, width: width - 40}} />
            </View>
          </View>

          {/* 新手福利 */}
          {this._renderNewUserWelfare()}

          {/* 阅读福利 */}
          {this._renderReadWelfare()}

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
                borderBottomColor: '#F7F7F7',
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
                  <Text style={{color: '#222222', fontSize: 18}}>邀请好友</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={20}
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
                <View style={styles.operBtn}>
                  <Text style={styles.operBtnTxt}>去邀请</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#F7F7F7',
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
                  <Text style={{color: '#222222', fontSize: 18}}>
                    幸运大转盘
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
                      size={20}
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
              <TouchableOpacity onPress={() => this.goTarget('Lottery')}>
                <View style={styles.operBtn}>
                  <Text style={styles.operBtnTxt}>去抽奖</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#F7F7F7',
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
                  <Text style={{color: '#222222', fontSize: 18}}>
                    观看小视频
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
                      size={20}
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
              <TouchableOpacity onPress={() => this.goTarget('Video')}>
                <View style={styles.operBtn}>
                  <Text style={styles.operBtnTxt}>去观看</Text>
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
                borderBottomColor: '#F7F7F7',
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
                  <Text style={{color: '#222222', fontSize: 18}}>打开推送</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={20}
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
                <View style={styles.operBtn}>
                  <Text style={styles.operBtnTxt}>去开启</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: 1,
                borderBottomColor: '#F7F7F7',
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
                  <Text style={{color: '#222222', fontSize: 18}}>下载应用</Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="bitcoin-circle"
                      type="foundation"
                      size={20}
                      color="#FFA331"
                    />
                    <Text
                      style={{
                        marginLeft: 2,
                        marginBottom: 1,
                        fontSize: 14,
                        color: '#FFA331',
                      }}>
                      最高10000金币
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#9E9E9E', fontSize: 14}}>
                    下载应用并使用，可领取丰厚奖励
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.goTarget('Download')}>
                <View style={styles.operBtn}>
                  <Text style={styles.operBtnTxt}>去下载</Text>
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
  operBtn: {
    width: 80,
    borderWidth: 1,
    borderColor: '#A1A1A1',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 18,
  },
  operBtnTxt: {fontSize: 14, color: '#333'},
  linearGradient: {
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default Index;
