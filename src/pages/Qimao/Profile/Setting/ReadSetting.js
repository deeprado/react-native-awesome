import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Switch,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Modal, Provider} from '@ant-design/react-native';
import {openSettings} from 'react-native-permissions';
const readMenuPng = require('../../../../assets/qimao/image/read_menu.png');
const readGoldPng = require('../../../../assets/qimao/image/read_gold.png');

class ReadSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenClosePeriod: 5,
      volumeButtonPageTurn: true,
      fullScreenShowContent: true,
      readShowMenuButton: true,
      readShowGoldIcon: true,
    };
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
        <Text style={{color: '#000', fontSize: 24}}>更多阅读设置</Text>
      </View>
    );
  }

  _permissionTitle() {
    return (
      <View>
        <Text
          style={{
            fontSize: 16,
            color: '#696969',
          }}>
          "七猫免费小说"需要修改系统设置权限，修改熄屏时间来为您提供更好的阅读体验，是否现在设置？
        </Text>
      </View>
    );
  }
  _permissionClose() {}

  _permissionDescription() {
    let that = this;
    Modal.alert(
      '权限获取说明',
      this._permissionTitle(),
      [
        {
          text: '取消',
          onPress: () => that._permissionClose(),
          style: {
            color: '#6A6A6A',
            fontSize: 16,
          },
        },
        {
          text: '去设置',
          onPress: () => openSettings(),
          style: {
            color: '#FF8D00',
            fontSize: 16,
            fontWeight: '600',
          },
        },
      ],
      Platform.OS,
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
              <TouchableOpacity onPress={() => this._permissionDescription()}>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, color: '#3B3B3B'}}>
                      屏幕关闭时间
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: '#A4A4A4'}}>
                      {this.state.screenClosePeriod}分钟
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
                    paddingTop: 15,
                    paddingBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#3B3B3B'}}>
                      音量键翻页
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Switch
                      onValueChange={value =>
                        this.setState({volumeButtonPageTurn: value})
                      }
                      style={{marginBottom: 10, marginTop: 10}}
                      value={this.state.volumeButtonPageTurn}
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
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, color: '#3B3B3B'}}>
                      全屏显示内容
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Switch
                      onValueChange={value =>
                        this.setState({fullScreenShowContent: value})
                      }
                      style={{marginBottom: 10, marginTop: 10}}
                      value={this.state.fullScreenShowContent}
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
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, color: '#3B3B3B'}}>
                      阅读显示菜单快捷按钮
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Switch
                      onValueChange={value =>
                        this.setState({readShowMenuButton: value})
                      }
                      style={{marginBottom: 10, marginTop: 10}}
                      value={this.state.readShowMenuButton}
                    />
                  </View>
                </View>
                <View style={{paddingTop: 5, paddingBottom: 20}}>
                  <Image
                    source={readMenuPng}
                    style={{width: 400, height: 50}}
                  />
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
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={{fontSize: 18, color: '#3B3B3B'}}>
                      阅读器显示金币图标
                    </Text>
                    <Text
                      style={{marginLeft: 10, fontSize: 14, color: '#A1A1A1'}}>
                      关闭不影响加金币
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Switch
                      onValueChange={value =>
                        this.setState({readShowGoldIcon: value})
                      }
                      style={{marginBottom: 10, marginTop: 10}}
                      value={this.state.readShowGoldIcon}
                    />
                  </View>
                </View>
                <View style={{paddingTop: 5, paddingBottom: 20}}>
                  <Image
                    source={readGoldPng}
                    style={{width: 400, height: 50}}
                  />
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

export default ReadSetting;
