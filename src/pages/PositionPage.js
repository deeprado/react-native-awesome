import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';

let lastTime = 0;
let currentTime = 0;

class PositionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  componentDidMount() {
    let _that = this;
    Alert.alert('开始取位置：' + moment().format('YYYY-MM-DD HH:mm:ss'));
    this.timer = setTimeout(() => {
      Geolocation.getCurrentPosition(
        data => {
          Alert.alert(
            '5秒中后得到位置信息-' +
              JSON.stringify(data) +
              '当前时间为：' +
              moment().format('YYYY-MM-DD HH:mm:ss'),
          );
        },
        e => {
          Alert.alert(JSON.stringify(e));
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }, 5000);

    this.immediate = setImmediate(() => {
      console.log(
        '立即执行，当前时间-' + moment().format('YYYY-MM-DD HH:mm:ss'),
      );
    });

    function doAnimated() {
      _that.setState({
        width: _that.state.width + 10,
      });
      currentTime = new Date().getTime();

      console.log(
        '当前的宽度：' +
          _that.state.width +
          '当前时间：' +
          currentTime +
          '--时间间隔：' +
          (currentTime - lastTime),
      );
      console.log(
        '当前的宽度：' +
          _that.state.width +
          '当前时间：' +
          moment().format('YYYY-MM-DD HH:mm:ss'),
      );
      lastTime = currentTime;
      if (_that.state.width < 300) {
        requestAnimationFrame(doAnimated);
      }
    }

    requestAnimationFrame(doAnimated);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.immediate && clearImmediate(this.immediate);
    this.interval && clearInterval(this.interval);
    console.log('清空所有计时器');
  }

  _setInterval() {
    console.log('xxxxxxxxx');
    this.interval = setInterval(() => {
      fetch('http://www.reactnative.vip/')
        .then(function(data) {
          return data.text();
        })
        .then(responseText => {
          console.log(
            '返回数据， 时间是：' + moment().format('YYYY-MM-dd HH:mm:ss'),
          );
          console.log(responseText);
        })
        .catch(error => {
          console.warn(error);
        });
    }, 5000);
  }

  render() {
    console.log('render');
    let css = [];
    css.push(styles.progress);
    if (this.state.width) {
      css.push({width: this.state.width});
    }
    return (
      <View>
        <Text onPress={this._setInterval} style={styles.btn}>
          {' '}
          setInterval{' '}
        </Text>
        <View style={css}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 100,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btn: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#3BC1FF',
    color: '#FFF',
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  progress: {},
});
export default PositionPage;
