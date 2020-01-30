import React, {Component} from 'react';
import {View, StyleSheet, Alert, Text, Image, Platform} from 'react-native';

import Button from '../../components/user/Button';
import TextButton from '../../components/user/TextButton';
import TextField from '../../components/user/TextField';
import request from '../../utils/request';
import NavBar from '../../components/bar/NavBar';
import GainIdentify from '../../components/GainIdentify';
import CountDownButton from '../../components/button/CountDownButton';

let platformContainerStyles;
if (Platform.OS === 'ios') {
  platformContainerStyles = {
    borderBottomWidth: 0, //修改的地方
    borderBottomColor: '',
    shadowOpacity: 0,
  };
} else {
  platformContainerStyles = {
    shadowColor: 'black',
    shadowOpacity: 0, //修改的地方
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    elevation: 0,
  };
}
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <NavBar
          title={'返回'}
          leftIcon="ios-arrow-back"
          leftPress={() => {
            navigation.goBack();
            // navigation.navigate('App');
          }}
          style={{backgroundColor: '#fff'}}
        />
      ),
      headerStyle: platformContainerStyles,
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      title: '注册',
      headerTitleStyle: {
        //导航栏文字的样式
        color: '#000',
        //设置标题的大小
        fontSize: 20,
        //居中显示
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerLayoutPreset: 'center',
    };
  };

  back() {
    this.props.navigator.pop();
  }

  gainIdentify() {
    console.log('获取验证码方法');
  }

  sendSms(callback) {
    callback && callback(true);

    const {username, code} = this.state;

    // 发送短信
    console.log('已发送短信');
    request({
      method: 'POST',
      url: '/sms',
      data: {username, code},
    })
      .then(() => {
        Alert.alert('发送成功');
      })
      .catch(err => {
        Alert.alert('发送失败', err.message || err);
      });
  }

  register = () => {
    const {username, code} = this.state;
    request({
      method: 'POST',
      url: '/register',
      data: {username, code},
    })
      .then(() => {
        Alert.alert('注册成功');
      })
      .catch(err => {
        Alert.alert('注册失败', err.message || err);
      });
  };

  render() {
    const {navigation} = this.props;
    const {username, code} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topic}>
          <Text style={styles.topicText}>登录七猫小说，免费看书领奖励</Text>
        </View>
        <TextField
          label="账号"
          iconName={'ios-lock'}
          placeholder="请输入手机号"
          onChange={value => this.setState({username: value})}
        />
        <TextField
          label="验证码"
          iconName={'ios-card'}
          placeholder="请输入验证码"
          onChange={value => this.setState({code: value})}
        />
        <View>
          <GainIdentify time={60} action={this.gainIdentify.bind(this)} />
        </View>
        <View>
          <CountDownButton
            enable={true}
            timerCount={60}
            onClick={this.sendSms.bind(this)}
          />
        </View>
        <Button
          style={[
            styles.loginBtn,
            username && code ? styles.loginBtnYes : styles.loginBtnNo,
          ]}
          onPress={this.register}>
          <View>
            <Text
              style={[
                styles.loginBtnText,
                username && code
                  ? styles.loginBtnTextYes
                  : styles.loginBtnTextNo,
              ]}>
              注册领好礼
            </Text>
          </View>
        </Button>
        <View style={styles.newUser}>
          <Text style={styles.newUserText}>新用户专享</Text>
          <Text style={styles.newUserText}>
            未注册的手机号和微信号登录后将自动注册
          </Text>
        </View>
        <View>
          <Text style={styles.otherLoginText}>其他登录方式</Text>
          <View style={styles.otherLoginLogo}>
            <Image
              style={styles.otherLoginLogo}
              source={require('../../assets/image/logo.png')}
            />
          </View>
        </View>
        <View style={styles.textBtnContainer}>
          <TextButton onPress={() => navigation.navigate('Login')}>
            登录
          </TextButton>
          <TextButton>忘记密码？</TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
  },
  textBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topic: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  topicText: {
    color: '#666',
    textAlign: 'center',
    justifyContent: 'center',
  },

  loginBtn: {
    height: 50,
    borderRadius: 27,
    marginLeft: 15,
    marginRight: 15,
  },
  loginBtnNo: {
    backgroundColor: '#eee',
  },
  loginBtnText: {
    fontSize: 18,
  },
  loginBtnTextNo: {
    color: '#888',
  },
  loginBtnTextYes: {
    color: '#fff',
  },
  loginBtnYes: {
    backgroundColor: 'orange',
  },
  newUser: {
    marginTop: 15,
    marginBottom: 15,
  },
  newUserText: {
    color: '#666',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
  },
  otherLoginText: {
    color: '#666',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
  otherLoginLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
