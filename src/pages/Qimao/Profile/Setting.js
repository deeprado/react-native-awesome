import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import {Toast, Modal, Provider} from '@ant-design/react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logined: false,
      noticeStatus: false,
      nightMode: false,
      logoutAlert: null,
    };

    this.onLogoutClose = this.onLogoutClose.bind(this);
    this.onLogoutShow = this.onLogoutShow.bind(this);
    this.logout = this.logout.bind(this);
  }

  async requestStoragePermission() {
    let result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        //不支持该功能
        Alert.alert('', '您的设备不支持该功能', [{text: '确定'}]);
        return;
      case RESULTS.DENIED:
        //该权限尚未被请求、被拒绝，但可请求
        let req = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (req === RESULTS.DENIED) {
          //Alert.alert('', '您已经拒绝授权', [{ text: '我知道了' }]);
          Toast.show('您已经拒绝授权', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            animation: false, //不显示动画
          });
          return;
        }
        break;
      case RESULTS.GRANTED:
        //授予权限
        break;
      case RESULTS.BLOCKED:
        //该权限被拒绝
        Alert.alert('提示', '您已经禁用APP读写手机储存权限,图片文件访问受限', [
          {
            text: '关闭',
            onDismiss: () => {},
          },
          {
            text: '去设置开启权限',
            onPress: () => {
              openSettings();
            },
          },
        ]);
        return;
    }
  }

  async requestNoticePermission() {
    let that = this;

    checkNotifications()
      .then(({status, settings}) => {
        // status = RESULTS.BLOCKED;
        that.setState({
          noticeStatus: status,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      // await this.requestStoragePermission();
      await this.requestNoticePermission();
    }
  }

  goBack = () => {
    // this.props.navigation.goBack();
    // this.props.navigation.navigate('ProfileBox');
    this.goTarget('ProfileBox');
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
        <Text style={{color: '#000', fontSize: 24}}>设置</Text>
      </View>
    );
  }

  // 修改夜间模式
  _changeNightMode(mode) {
    console.log('mode', mode);
  }

  _renderNoticeTxt() {
    let status = this.state.noticeStatus;
    let txt = '已开启';
    switch (status) {
      case RESULTS.UNAVAILABLE:
        // 不支持该功能
        txt = '不支持';
        break;
      case RESULTS.DENIED:
        txt = '已拒绝';
        break;
      case RESULTS.GRANTED:
        // 授予权限
        break;
      case RESULTS.BLOCKED:
        txt = '已禁用';
        break;
    }
    return <Text style={{fontSize: 16, color: '#A4A4A4'}}>{txt}</Text>;
  }

  noticeTitle() {
    return (
      <View>
        <Text
          style={{
            fontSize: 16,
            color: '#696969',
          }}>
          关闭通知，请前往手机系统设置 - 【通知中心】- 【七猫免费小说】
        </Text>
      </View>
    );
  }

  onNoticeClose() {
    console.log('close');
  }

  // 检查通知权限
  checkNotice() {
    let that = this;
    let status = that.state.noticeStatus;

    if (status === RESULTS.GRANTED) {
      Modal.alert(
        '',
        this.noticeTitle(),
        [
          {
            text: '知道了',
            onPress: () => that.onNoticeClose(),
            style: {
              color: '#FF8D00',
              fontSize: 16,
            },
          },
        ],
        Platform.OS,
      );
    } else {
      switch (status) {
        case RESULTS.UNAVAILABLE:
          // 不支持该功能
          Alert.alert('', '您的设备不支持该功能', [{text: '确定'}]);
          return;
        case RESULTS.DENIED:
          // 该权限尚未被请求、被拒绝，但可请求
          let req = requestNotifications();
          if (req === RESULTS.DENIED) {
            //Alert.alert('', '您已经拒绝授权', [{ text: '我知道了' }]);
            Toast.show('您已经拒绝授权', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              animation: false, //不显示动画
            });
            return;
          }
          break;
        case RESULTS.GRANTED:
          //授予权限
          break;
        case RESULTS.BLOCKED:
          //该权限被拒绝
          Alert.alert('提示', '您已经禁用APP通知权限', [
            {
              text: '关闭',
              onDismiss: () => {},
            },
            {
              text: '去设置开启权限',
              onPress: () => {
                openSettings();
              },
            },
          ]);
          return;
      }
    }
  }

  // 关闭
  onLogoutClose() {
    console.log('close');
  }

  logoutTitle() {
    return (
      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 16,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          确认要退出当前账号吗？
        </Text>
      </View>
    );
  }

  // 打开
  onLogoutShow() {
    let that = this;
    let logoutAlert = Modal.alert(
      '',
      this.logoutTitle(),
      [
        {
          text: '确认退出',
          onPress: () => that.logout(),
          style: {
            color: '#696969',
            fontSize: 16,
          },
        },
        {
          text: '取消',
          onPress: () => that.onLogoutClose(),
          style: {
            color: '#FF8D00',
            fontWeight: '700',
            fontSize: 16,
          },
        },
      ],
      false,
    );
    this.setState({
      logoutAlert: logoutAlert,
    });
  }

  // 退出
  logout() {
    // 请求结束后是否跳转
    this.setState({
      logoutVisible: false,
    });
    Toast.loading('处理中...', 1, () => {
      Toast.info('账号已注销', 1);
    });
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#fff'}
            leftComponent={this.renderLeftComponent()}
            centerComponent={this.renderCenterComponent()}
            rightComponent={this.renderRightComponent()}
          />

          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <TouchableOpacity onPress={() => this.goTarget('BasicInfo')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#252525'}}>
                        基本信息
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
              <TouchableOpacity onPress={() => this.goTarget('AccountSafe')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#252525'}}>
                        账号与安全
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 5,
                  paddingBottom: 5,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 20, color: '#252525'}}>
                      夜间模式
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Switch
                    onValueChange={value => this.setState({nightMode: value})}
                    style={{marginBottom: 10, marginTop: 10}}
                    value={this.state.nightMode}
                  />
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  borderBottomColor: '#F2F2F2',
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity onPress={() => this.goTarget('ReadSetting')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#252525'}}>
                        阅读设置
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
              <TouchableOpacity onPress={() => this.checkNotice()}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#252525'}}>
                        推送通知
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {this._renderNoticeTxt()}
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
              <TouchableOpacity onPress={() => this.goTarget('CacheClear')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#252525'}}>
                        清理缓存
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
            </View>
          </View>

          <View style={{marginTop: 10, backgroundColor: '#fff'}}>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 5,
              }}>
              <TouchableOpacity onPress={() => this.goTarget('About')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 12,
                    paddingBottom: 12,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontSize: 20, color: '#252525'}}>
                        关于七猫免费小说
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
            </View>
          </View>

          {/* 退出登录 */}
          <View
            style={{
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={this.onLogoutShow}>
              <Text style={{fontSize: 20, color: '#A6A6A6'}}>退出登录</Text>
            </TouchableOpacity>
          </View>
          {/* 协议 */}

          <View style={{marginTop: 80}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => this.goTarget('Privacy')}>
                <Text style={{color: '#FDA63B'}}>《隐私政策》</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.goTarget('Agreement')}>
                <Text style={{color: '#FDA63B'}}>《用户协议》</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.goTarget('Copyright')}>
                <Text style={{color: '#FDA63B'}}>《版权声明》</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.goTarget('Permission')}>
                <Text style={{color: '#FDA63B'}}>《权限说明》</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Provider>
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

export default Setting;
