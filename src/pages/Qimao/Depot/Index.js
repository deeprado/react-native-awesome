import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Easing,
  StatusBar,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {Provider, Modal} from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import LinearGradient from 'react-native-linear-gradient';

import {Icon} from 'react-native-elements';
import Jingxuan from './Child/Jingxuan';
import Nansheng from './Child/Nansheng';
import Nvsheng from './Child/Nvsheng';
import Tushu from './Child/Tushu';

const {width} = Dimensions.get('window');

const leftLength = width * 0.6 - 20;
const rightLength = width * 0.4;
const offsetLeftLength = (leftLength / 4 - 20) / 2;

const tabLengthes = [
  0,
  leftLength / 4,
  leftLength / 2,
  leftLength / 4 + leftLength / 2,
];

class Index extends Component {
  static navigationOptions = {
    title: '书城',
  };

  constructor(props) {
    super(props);
    this.state = {
      tabOffset: new Animated.Value(0),
      offsetLeft: true,
      offsetIndex: 0,
      offsetLeftLength: offsetLeftLength,

      hideStatusBar: false,
      agreePrivacy: false,
      privacyVisible: false,
      isNewUser: false,
      newUserVisible: true,
    };
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    // this.checkAgree();
  }

  checkAgree = () => {
    let that = this;
    AsyncStorage.getItem('agreePrivacy')
      .then(res => {
        that.setState({
          agreePrivacy: res ? true : false,
          privacyVisible: res ? false : true,
        });
      })
      .catch(() => {
        that.setState({
          agreePrivacy: false,
          privacyVisible: true,
        });
      });
  };

  checkNewUser = () => {
    let that = this;
    AsyncStorage.getItem('isNewUser')
      .then(res => {
        that.setState({
          isNewUser: res ? false : true,
          // newUserVisible: res ? true : false,
        });
      })
      .catch(() => {
        that.setState({
          isNewUser: true,
          // newUserVisible: true,
        });
      });
  };

  showPrivacyModal = () => {
    this.setState({
      privacyVisible: true,
    });
  };

  closePrivacyModal = () => {
    this.setState({
      privacyVisible: false,
    });
  };

  agreePrivacy = () => {
    let that = this;
    AsyncStorage.setItem('agreePrivacy', 'yes').then(res => {
      if (res) {
        that.closePrivacyModal();
      }
    });
    this.showNewUserModal();
  };

  lookAgain = () => {
    this.closePrivacyModal();
    this.showNewUserModal();
  };

  showNewUserModal = () => {
    this.setState({
      newUserVisible: this.state.isNewUser,
    });
  };

  // 搜索
  search() {
    this.props.navigation.navigate('Search');
  }

  switchTab = index => {
    let that = this;
    this.setState({
      offsetIndex: index,
    });
    Animated.parallel([
      Animated.timing(this.state.tabOffset, {
        easing: Easing.linear,
        duration: 200,
        toValue: index,
      }),
    ]).start(finished => {
      // that._fetchShelfRecords();
    });
  };

  _renderTabUnderline = () => {
    return (
      <Animated.View
        style={[
          styles.tabBarUnderlineStyleBox,
          {
            transform: [
              {
                translateX: this.state.tabOffset.interpolate({
                  inputRange: [0, 1, 2, 3],
                  outputRange: tabLengthes,
                }),
              }, // x轴移动
            ],
          },
        ]}>
        <View
          style={{
            width: 20,
            height: 4,
            borderRadius: 5,
            backgroundColor: '#FF8D00',
          }}
        />
      </Animated.View>
    );
  };

  _renderTabContent = () => {
    if (this.state.offsetIndex === 0) {
      return <Jingxuan navigation={this.props.navigation} />;
    }
    if (this.state.offsetIndex === 1) {
      return <Nansheng navigation={this.props.navigation} />;
    }
    if (this.state.offsetIndex === 2) {
      return <Nvsheng navigation={this.props.navigation} />;
    }
    if (this.state.offsetIndex === 3) {
      return <Tushu navigation={this.props.navigation} />;
    }
  };

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#fff"
            translucent={true}
            hidden={this.state.hideStatusBar}
            animated={true}
          />

          <View
            style={{
              paddingBottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  width: leftLength,
                  marginLeft: 20,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.switchTab(0)}
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={
                          this.state.offsetIndex === 0
                            ? styles.activeTtabBarTextStyle
                            : styles.tabBarTextStyle
                        }>
                        精选
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.switchTab(1)}
                    style={{alignContent: 'center', justifyContent: 'center'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={
                          this.state.offsetIndex === 1
                            ? styles.activeTtabBarTextStyle
                            : styles.tabBarTextStyle
                        }>
                        男生
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.switchTab(2)}
                    style={{alignContent: 'center', justifyContent: 'center'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={
                          this.state.offsetIndex === 2
                            ? styles.activeTtabBarTextStyle
                            : styles.tabBarTextStyle
                        }>
                        女生
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.switchTab(3)}
                    style={{alignContent: 'center', justifyContent: 'center'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={
                          this.state.offsetIndex === 3
                            ? styles.activeTtabBarTextStyle
                            : styles.tabBarTextStyle
                        }>
                        图书
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: rightLength - 20,
                  marginRight: 20,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <View style={{}}>
                  <TouchableOpacity
                    onPress={this.search}
                    style={{alignSelf: 'flex-end'}}>
                    <View>
                      <Icon
                        name="search"
                        type="octicon"
                        color="#414141"
                        size={26}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                width: leftLength,
                marginLeft: 20,
              }}>
              {this._renderTabUnderline()}
            </View>
          </View>
          <View style={styles.tabBarBox}>{this._renderTabContent()}</View>
        </View>
        {/* <Modal title="xx" transparent visible={this.state.newUserVisible}>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 15,
              paddingLeft: 20,
              paddingRight: 20,
              position: 'relative',
            }}>
            <View
              style={{
                flexWrap: 'wrap',
              }}>
              <Text style={{fontSize: 16, color: '#fff'}}>恭喜你获得</Text>
              <Text style={{marginTop: 30,color: '#FFE6A2', fontSize: 20}}>新用户红包</Text>
              <Text style={{marginTop: 10,color: '#FFE6A2', fontWeight: '700', fontSize: 30}}>
                当天可提现
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <LinearGradient
                colors={['#FFB129', '#FF9108']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>
                <TouchableOpacity
                  onPress={this.agreePrivacy()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: 15,
                      backgroundColor: 'transparent',
                    }}>
                    一键登录提现
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{paddingTop: 8, paddingBottom: 8}}>
              <TouchableOpacity
                onPress={this.lookAgain()}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#9D9D9D',
                    fontSize: 14,
                    backgroundColor: 'transparent',
                  }}>
                  新用户专享
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{position:'absolute', bottom: -80, left: 0,}}>
              <TouchableOpacity>
                  <Icon name="x-circle" type="feather" color="#fff" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        {/* <Modal
          title={'用户隐私政策提示'}
          transparent
          visible={this.state.privacyVisible}>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 15,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text style={styles.txt}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎使用七猫小说，为了更好的保护您的隐私和个人信息安全，七猫根据国家相关法律规定你定了
              </Text>
              <Text style={styles.antxt}>《隐私政策》</Text>
              <Text style={styles.txt}>、</Text>
              <Text style={styles.antxt}>《用户协议》</Text>
              <Text style={styles.txt}>和</Text>
              <Text style={styles.antxt}>《权限说明》</Text>
              <Text style={styles.txt}>，请您在使用前仔细阅读并同意。</Text>
            </View>
            <View style={{marginTop: 20}}>
              <LinearGradient
                colors={['#FFB129', '#FF9108']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>
                <TouchableOpacity
                  onPress={this.agreePrivacy()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: 15,
                      backgroundColor: 'transparent',
                    }}>
                    同意
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{paddingTop: 8, paddingBottom: 8}}>
              <TouchableOpacity
                onPress={this.lookAgain()}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#9D9D9D',
                    fontSize: 14,
                    backgroundColor: 'transparent',
                  }}>
                  再看看
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    position: 'relative',
  },
  linearGradient: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  txt: {
    fontSize: 14,
    color: '#6D6D6D',
    lineHeight: 20,
  },
  antxt: {
    fontSize: 14,
    color: '#FFA434',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },

  tabBarTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#6C6C6C',
  },
  activeTtabBarTextStyle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#FF9105',
  },
  tabBarUnderlineStyleBox: {
    marginLeft: offsetLeftLength,
    marginBottom: 10,
  },

  tabBarBox: {flex: 1},
});
export default Index;
