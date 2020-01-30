import React, {Component} from 'react';
import {View, StyleSheet, Alert, Text, Image, Platform} from 'react-native';

import Button from '../../components/user/Button';
import TextButton from '../../components/user/TextButton';
import TextField from '../../components/user/TextField';
import request from '../../utils/request';
import navigationUtil from '../../utils/navigation';
import {saveToken} from '../../utils/storage';

import NavBar from '../../components/bar/NavBar';

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

class Login extends Component {
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
      title: '登录',
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

  render() {
    const {navigation} = this.props;
    const {username, password} = this.state;
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
          label="密码"
          iconName={'ios-card'}
          type="password"
          placeholder="请输入密码"
          onChange={value => this.setState({password: value})}
        />
        <Button
          style={[
            styles.loginBtn,
            username && password ? styles.loginBtnYes : styles.loginBtnNo,
          ]}
          onPress={this.login}>
          <View>
            <Text
              style={[
                styles.loginBtnText,
                username && password
                  ? styles.loginBtnTextYes
                  : styles.loginBtnTextNo,
              ]}>
              登录领好礼
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
          <TextButton onPress={() => navigation.navigate('Register')}>
            新用户注册
          </TextButton>
          <TextButton>忘记密码？</TextButton>
        </View>
      </View>
    );
  }

  login = () => {
    const {username, password} = this.state;
    if (!username || !password) {
      return false;
    }
    const that = this;
    request({
      method: 'POST',
      url: '/login',
      data: {username, password},
    })
      .then(data => {
        console.log('登录成功：' + JSON.stringify(data));
        saveToken(data.data);
        navigationUtil.reset(that.props.navigation, 'Main');
      })
      .catch(err => {
        Alert.alert('登录失败', err.message || err);
      });
  };
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

export default Login;
