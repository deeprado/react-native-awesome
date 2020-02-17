import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Toast, Provider} from '@ant-design/react-native';

class BasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nicknameFlag: true,
      nickname: '寻找普拉多',
    };

    this._clearNickname = this._clearNickname.bind(this);
    this._renderCloseNickname = this._renderCloseNickname.bind(this);
    this.onNicknameChange = this.onNicknameChange.bind(this);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

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
        <Text style={{color: '#000', fontSize: 24}}>修改昵称</Text>
      </View>
    );
  }

  _clearNickname() {
    this.setState({
      nickname: '',
    });
  }

  _renderCloseNickname() {
    if (this.state.nickname.length > 0) {
      return (
        <TouchableOpacity
          onPress={this._clearNickname}
          style={{position: 'absolute', right: 0, top: 15}}>
          <View style={{padding: 5}}>
            <Icon name="x-circle" type="feather" size={12} color="#B2B2B2" />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  onNicknameChange(text) {
    let nameReg = /^([\u4e00-\u9fa5a-zA-z0-9]{2,10})$/gu;
    let newText = text;
    let nicknameFlag = nameReg.test(text);
    this.setState({
      nicknameFlag: nicknameFlag,
      nickname: newText,
    });
  }

  changeNickname() {
    if (!this.state.nicknameFlag) {
      Toast.info('请输入2-10位中午、数字或字母');
      return;
    }
    // 请求结束后是否跳转
    let that = this;
    Toast.loading('处理中...', 1, () => {
      Toast.info('昵称修改成功', 1);
      //
    });
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
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 30,
                marginRight: 20,
                position: 'relative',
                justifyContent: 'center',
              }}>
              <View style={{marginRight: 50}}>
                <TextInput
                  multiline={true}
                  selectionColor={'#FA900D'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={true}
                  style={styles.edit}
                  placeholder={'请输入昵称'}
                  secureTextEntry={false}
                  value={this.state.nickname}
                  // keyboardType="numeric"
                  placeholderTextColor={'#999999'}
                  selectTextOnFocus={false}
                  onChangeText={this.onNicknameChange}
                />
              </View>
              {this._renderCloseNickname()}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{paddingLeft: 30, paddingRight: 30}}>
              <LinearGradient
                colors={['#FFB129', '#FF9108']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={styles.linearGradient}>
                <TouchableOpacity
                  onPress={() => this.changeNickname()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      backgroundColor: 'transparent',
                    }}>
                    提交修改
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <View style={{marginTop: 15}}>
                <Text style={{color: '#9D9D9D', fontSize: 14}}>
                  提示：修改昵称需要审核，时间为1-3个工作日，审核结果将发送到“我的-消息通知中”中，请注意产看
                </Text>
              </View>
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
  edit: {
    fontSize: 20,
    height: 50,
    color: '#999999',
  },
  linearGradient: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default BasicInfo;
