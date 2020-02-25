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
import Intro from '../App/Intro';

const {width, height} = Dimensions.get('window');

const logoPng = require('../../../assets/qimao/image/logo.png');
const launcherPng = require('../../../assets/qimao/image/launcher.jpg');

class Index extends Component {
  // 构造
  constructor(props) {
    super(props);
    this.state = {
      hideStatusBar: true,
      max: 5,
      count: 0,
      showSlider: false,
      firstInstall: false,
    };

    this.calTimer = this.calTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.jumpOver = this.jumpOver.bind(this);
  }

  checkFirst = () => {
    let that = this;
    AsyncStorage.getItem('firstInstall')
      .then(res => {
        that.setState({
          firstInstall: res ? false : true,
        });
      })
      .catch(() => {
        that.setState({
          firstInstall: false,
        });
      });
  };

  componentDidMount() {
    this.startTimer();
    this.checkFirst();
  }

  startTimer() {
    var that = this;
    this.timer = setTimeout(() => {
      that.calTimer();
    }, 1000);
  }

  calTimer() {
    let {count, max} = this.state;
    if (count <= max - 1) {
      count += 1;
      this.setState({
        count: count,
      });
      this.startTimer();
    } else {
      this.jumpOver();
    }
  }

  clearTimer() {
    this.timer && clearTimeout(this.timer);
  }

  jumpOver() {
    this.clearTimer();
    if (this.state.firstInstall) {
      this.showSlider();
    } else {
      this.switchPage();
    }
  }

  showSlider() {
    this.setState({
      hideStatusBar: false,
      showSlider: true,
    });
  }

  switchPage = () => {
    let that = this;
    AsyncStorage.setItem('firstInstall', 'yes').then(res => {
      that.props.navigation.navigate('AppPage');
    });
  };

  _renderSlider() {
    return (
      <View>
        <Intro switchPage={this.switchPage} />
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
        <View style={styles.adBox}>
          <Image source={launcherPng} style={styles.launcher} />
        </View>
        <View style={styles.appInfo}>
          <Image source={logoPng} style={styles.logo} />
          <Text style={styles.appInfoTitle}>七猫免费小说</Text>
        </View>
      </View>
    );
  };

  _renderContent = () => {
    if (this.state.showSlider && this.state.firstInstall) {
      return this._renderSlider();
    } else {
      return this._renderAd();
    }
  };

  render() {
    return this._renderContent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  timerBox: {
    position: 'absolute',
    zIndex: 999,
    height: 32,
    width: 100,
    right: 10,
    top: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#555',
    color: '#fff',
    borderRadius: 15,
  },
  timerTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  adBox: {
    height: height - 120,
    width: width,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  launcher: {
    width: width,
    height: height - 120,
  },
  appInfo: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  appInfoTitle: {
    fontSize: 24,
    fontFamily: '微软雅黑',
  },
});

export default Index;
