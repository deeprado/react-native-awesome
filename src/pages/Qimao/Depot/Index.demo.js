import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Provider, Modal} from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import TabContainer from './TabContainer.old';
import {Icon} from 'react-native-elements';

const {width} = Dimensions.get('window');

class Index extends Component {
  static navigationOptions = {
    title: '书城',
  };

  constructor(props) {
    super(props);
    this.state = {
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
              position: 'absolute',
              right: 20,
              top: 45,
              zIndex: 30,
            }}>
            <TouchableOpacity onPress={this.search}>
              <Icon name="search" type="octicon" color="#000" size={22} />
            </TouchableOpacity>
          </View>
          <TabContainer />
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
});
export default Index;
