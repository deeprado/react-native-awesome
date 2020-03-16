import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const logoPng = require('../../../assets/qimao/image/logo.png');
const noadSuccessPng = require('../../../assets/qimao/image/noad_success.png');

class Noad extends Component {
  // 构造
  constructor(props) {
    super(props);
    this.state = {
      leftNoadCount: 2,
    };
  }

  componentDidMount() {}

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
        <Text style={{color: '#000', fontSize: 24}}>立享无广告阅读</Text>
      </View>
    );
  }

  _renderAd = () => {
    let surplus = this.state.max - this.state.count;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#ff0000"
          translucent={true}
          hidden={this.state.hideStatusBar}
          animated={true}
        />
        <View style={styles.timerBox}>
          <TouchableOpacity onPress={this.jumpOver}>
            <View style={styles.timerTouch}>
              <Text style={{color: 'red', fontSize: 14}}>{surplus}s</Text>
              <Text style={{color: '#fff', fontSize: 14}}> | </Text>
              <Text style={{color: '#fff', fontSize: 14}}>跳过</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.adBox}></View>
        <View style={styles.appInfo}>
          <Image source={logoPng} style={styles.logo} />
          <Text style={styles.appInfoTitle}>七猫免费小说</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#fff'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <View
          style={{
            marginTop: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{}}>
            <View
              style={{
                height: 86,
                backgroundColor: '#61BF00',
                borderRadius: 43,
              }}>
              <Image source={noadSuccessPng} style={{width: 85, height: 85}} />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 24, color: '#393939'}}>成功去除广告！</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 16, color: '#787878'}}>
              现在起20分钟内，您可享受阅读器内免广告阅读。
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 16, color: '#787878'}}>今天还有</Text>
            <Text
              style={{
                fontSize: 18,
                color: '#FCA000',
                fontWeight: '700',
                marginTop: -2,
              }}>
              {this.state.leftNoadCount}
            </Text>
            <Text style={{fontSize: 16, color: '#787878'}}>机会。</Text>
          </View>
        </View>
        <View style={{marginTop: 50, paddingLeft: 30, paddingRight: 30}}>
          <LinearGradient
            colors={['#FCC800', '#FF9108']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <TouchableOpacity
              onPress={() => this.changeNickname()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                }}>
                完成
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  linearGradient: {
    borderRadius: 30,
  },
});

export default Noad;
