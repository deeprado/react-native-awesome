import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Modal, Toast, Provider} from '@ant-design/react-native';

const avatarPng = require('../../../../assets/qimao/image/avatar.png');

class BasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '寻找普拉多',
      sex: 0,
      account: '30702136',

      sexVisible: false,
    };
    this.closeSex = this.closeSex.bind(this);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  goTarget(routeName) {
    this.props.navigation.navigate(routeName);
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
        <Text style={{color: '#000', fontSize: 24}}>基本信息</Text>
      </View>
    );
  }

  // 打开性别模态矿
  showSexModal() {
    this.setState({
      sexVisible: true,
    });
  }
  // 关闭性别模态矿
  closeSex() {
    this.setState({
      sexVisible: false,
    });
  }
  // 选择性别
  chooseSex(sex) {
    let that = this;
    Toast.loading('处理中...', 1, () => {
      Toast.info('信息修改成功', 1);
      //
      that.setState({
        sex: sex,
        sexVisible: false,
      });
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
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity onPress={() => this.goTarget('Avatar')}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>头像</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={avatarPng} style={{width: 40, height: 40}} />
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
              <TouchableOpacity onPress={() => this.goTarget('Nickname')}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>昵称</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      {this.state.nickname}
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
              <TouchableOpacity onPress={() => this.showSexModal()}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>性别</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      {this.state.sex > 0 ? '女' : '男'}
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
              <TouchableOpacity>
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>账号</Text>
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

          <Modal
            popup
            maskClosable
            visible={this.state.sexVisible}
            animationType="slide-up"
            onClose={this.closeSex}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity onPress={() => this.chooseSex(0)}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#222222', fontSize: 16}}>男</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.chooseSex(1)}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#222222', fontSize: 16}}>女</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity onPress={() => this.closeSex()}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <Text style={{color: '#FF920C', fontSize: 16}}>取消</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
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

export default BasicInfo;
