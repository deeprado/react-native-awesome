import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Easing,
  TouchableOpacity,
  Animated,
} from 'react-native';
export default class Interpolate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      color: 'red',
      text: '正面',
    };
    this.rotateAnimated = Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.in,
    });
  }

  _startAnimated() {
    this.timer = setTimeout(
      () => {
        if (this.state.color === 'red') {
          this.setState({
            color: 'blue',
            text: '反面',
          });
        } else {
          this.setState({
            color: 'red',
            text: '正面',
          });
        }
      }, //延时操作
      1500, //延时时间
    );
    this.state.animatedValue.setValue(0);
    this.rotateAnimated.start();
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const rotateY = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '90deg', '0deg'],
    });

    return (
      <SafeAreaView style={styles.mainStyle}>
        <Animated.View
          style={{
            alignSelf: 'center',
            marginTop: 10,
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18,
            color: 'white',
            backgroundColor: this.state.color,
            transform: [{rotateY: rotateY}],
          }}>
          <Text style={{color: '#fff'}}>{this.state.text}</Text>
        </Animated.View>
        <TouchableOpacity
          style={styles.touchStyle}
          onPress={this._startAnimated.bind(this)}>
          <Text
            style={{
              width: 200,
              height: 100,
              textAlign: 'center',
              lineHeight: 100,
            }}>
            点击开始动画
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
  },
  touchStyle: {
    padding: 10,
    alignSelf: 'flex-end',
  },
});
