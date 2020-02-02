import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const logoPng = require('../../../assets/qimao/image/logo.png');
const launcherPng = require('../../../assets/qimao/image/launcher.jpg');

class Index extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      headerShown: false,
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: '#fff',
    };
  };

  // 构造
  constructor(props) {
    super(props);
    this.state = {
      max: 5,
      count: 0,
    };

    this.calTimer = this.calTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.jumpOver = this.jumpOver.bind(this);
    this.jumpOver = this.jumpOver.bind(this);
  }

  componentDidMount() {
    this.startTimer();
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
    this.props.navigation.navigate('SwitchPage');
  }
  render() {
    let surplus = this.state.max - this.state.count;
    return (
      <View style={styles.container}>
        <View style={styles.timerBox}>
          <TouchableHighlight onPress={this.jumpOver}>
            <View style={styles.timerTouch}>
              <Text style={{color: 'red', fontSize: 14}}>{surplus}s</Text>
              <Text style={{color: '#fff', fontSize: 14}}> | </Text>
              <Text style={{color: '#fff', fontSize: 14}}>跳过</Text>
            </View>
          </TouchableHighlight>
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
