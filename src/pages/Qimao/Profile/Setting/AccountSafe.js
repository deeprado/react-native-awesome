import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Modal, Toast, Provider} from '@ant-design/react-native';
import * as WeChat from 'react-native-wechat';

class AccountSafe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wechat: '',
      mobile: '136****1512',
      account: '30702136',
    };
  }

  componentDidMount() {
    WeChat.registerApp('wx732379a9f9484d01');
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  goTarget(routeName) {
    this.props.navigation.navigate(routeName);
  }

  auth() {
    if (this.state.wechat.length > 0) {
      return;
    }
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

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24}}>账号与安全</Text>
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
        <Provider>
          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity>
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>账号ID</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      {this.state.account}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity onPress={() => this.goTarget('AccountMobile')}>
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>手机</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      {this.state.mobile}
                    </Text>
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
              <TouchableOpacity onPress={() => this.auth()}>
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>微信</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      {this.state.wechat.length > 0 ? '' : '立即绑定'}
                    </Text>
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
          </View>

          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity onPress={() => this.goTarget('AccountDestroy')}>
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>
                      账号安全
                    </Text>
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
          </View>
        </Provider>
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
});

export default AccountSafe;
