import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import {Header, Text, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Toast, ImagePicker, Provider} from '@ant-design/react-native';

const {width} = Dimensions.get('window');
const avatarPng = require('../../../../assets/qimao/image/avatar.png');
const avatar1Png = require('../../../../assets/qimao/image/avatar/avatar1.png');
const avatar2Png = require('../../../../assets/qimao/image/avatar/avatar2.png');
const avatar3Png = require('../../../../assets/qimao/image/avatar/avatar3.png');
const avatar4Png = require('../../../../assets/qimao/image/avatar/avatar4.png');

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarList: [
        {
          id: 1,
          url: avatar1Png,
        },
        {
          id: 2,
          url: avatar2Png,
        },
        {
          id: 3,
          url: avatar3Png,
        },
        {
          id: 4,
          url: avatar4Png,
        },
      ],
      chooseIndex: -1,
      changed: false,
      avatarPng: avatarPng,

      files2: [],
      granted: false,
    };

    this.chooseAvatar = this.chooseAvatar.bind(this);
    this._renderAvatarList = this._renderAvatarList.bind(this);
    this._renderFourAvatar = this._renderFourAvatar.bind(this);
    this._renderTwoAvatar = this._renderTwoAvatar.bind(this);
    this._renderBottom = this._renderBottom.bind(this);
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: '需要访问相册',
          message: '需要访问相册',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          granted: true,
        });
      } else {
        this.setState({
          granted: false,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await this.requestCameraPermission();
    }
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
        <Text style={{color: '#000', fontSize: 24}}>更换头像</Text>
      </View>
    );
  }

  chooseAvatar(item, index) {
    this.setState({
      changed: true,
      avatarPng: item.url,
      chooseIndex: index,
    });
  }

  _renderAvatarList() {
    let that = this;
    let avatarList = that.state.avatarList;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}>
        {avatarList.map(function(item, index) {
          return (
            <TouchableOpacity
              onPress={() => that.chooseAvatar(item, index)}
              style={[
                {
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 2,
                  paddingRight: 2,
                  borderRadius: 42,
                },
                that.state.chooseIndex === index
                  ? styles.chooseActive
                  : styles.chooseDefault,
              ]}>
              <View style={{borderRadius: 40, overflow: 'hidden'}} key={index}>
                <Image
                  source={item.url}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    overflow: 'hidden',
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  _renderFourAvatar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <View style={{borderRadius: 40}}>
          <Image
            source={this.state.avatarPng}
            style={{width: 80, height: 80}}
          />
        </View>
        <View style={{borderRadius: 40}}>
          <Image
            source={this.state.avatarPng}
            style={{width: 80, height: 80}}
          />
        </View>
        <View style={{borderRadius: 40}}>
          <Image
            source={this.state.avatarPng}
            style={{width: 80, height: 80}}
          />
        </View>
        <View style={{borderRadius: 40}}>
          <Image
            source={this.state.avatarPng}
            style={{width: 80, height: 80}}
          />
        </View>
      </View>
    );
  }

  _renderTwoAvatar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <View style={{borderRadius: 40}}>
          <Image
            source={this.state.avatarPng}
            style={{width: 80, height: 80}}
          />
        </View>
        <View style={{borderRadius: 40}}>
          <Image
            source={this.state.avatarPng}
            style={{width: 80, height: 80}}
          />
        </View>
        <View style={{borderRadius: 40, width: 80, height: 80}} />
        <View style={{borderRadius: 40, width: 80, height: 80}} />
      </View>
    );
  }

  choosePicture() {}

  handleFile2Change = files2 => {
    this.setState({
      files2,
    });
  };

  _renderImagePicker() {
    if (Platform.OS === 'android' && !this.state.granted) {
      return <Text>需要访问相册的权限</Text>;
    }
    return (
      <ImagePicker
        onChange={this.handleFile2Change}
        files={this.state.files2}
      />
    );
  }

  _renderBottom() {
    if (!this.state.changed) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          width: width,
          bottom: 0,
          paddingBottom: 15,
          paddingTop: 15,
          backgroundColor: '#fff',
        }}>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <LinearGradient
            colors={['#FFB129', '#FF9108']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <TouchableOpacity
              onPress={() => this.changeAvatar()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  backgroundColor: 'transparent',
                }}>
                立即设置
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }

  changeAvatar() {
    let that = this;
    Toast.loading('处理中...', 1, () => {
      Toast.info('头像修改成功', 1);
      //
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

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              paddingTop: 30,
              paddingBottom: 30,
            }}>
            <View style={{borderRadius: 50}}>
              <Image
                source={this.state.avatarPng}
                style={{width: 100, height: 100}}
              />
            </View>
          </View>

          {/* <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this._renderImagePicker()}
          </View> */}

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Q萌可爱 */}

            <View style={{marginTop: 10, backgroundColor: '#fff'}}>
              <View style={{paddingLeft: 20, paddingRight: 20}}>
                <View style={{paddingTop: 10, paddingBottom: 15}}>
                  <Text style={{fontSize: 16, color: '#666666'}}>Q萌可爱</Text>
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderAvatarList()}
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderFourAvatar()}
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderTwoAvatar()}
                </View>
              </View>
            </View>

            <View style={{marginTop: 10, backgroundColor: '#fff'}}>
              <View style={{paddingLeft: 20, paddingRight: 20}}>
                <View style={{paddingTop: 10, paddingBottom: 15}}>
                  <Text style={{fontSize: 16, color: '#666666'}}>动物</Text>
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderFourAvatar()}
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderFourAvatar()}
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderTwoAvatar()}
                </View>
              </View>
            </View>

            <View style={{marginTop: 10, backgroundColor: '#fff'}}>
              <View style={{paddingLeft: 20, paddingRight: 20}}>
                <View style={{paddingTop: 10, paddingBottom: 15}}>
                  <Text style={{fontSize: 16, color: '#666666'}}>风景</Text>
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderFourAvatar()}
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderFourAvatar()}
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderTwoAvatar()}
                </View>
              </View>
            </View>

            <View style={{marginTop: 10, backgroundColor: '#fff'}}>
              <View style={{paddingLeft: 20, paddingRight: 20}}>
                <View style={{paddingTop: 10, paddingBottom: 15}}>
                  <Text style={{fontSize: 16, color: '#666666'}}>默认头像</Text>
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                  {this._renderTwoAvatar()}
                </View>
              </View>

              <View
                style={{
                  marginTop: 30,
                  marginBottom: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: '#AAAAAA'}}>
                  更多头像，敬请期待~！
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* 底部按钮 */}
          {this._renderBottom()}
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
  linearGradient: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  chooseActive: {
    borderWidth: 2,
    borderColor: '#FFB028',
  },
  chooseDefault: {
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Avatar;
