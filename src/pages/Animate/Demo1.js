import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //设置初始值
    };
  }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim, //初始值
      {toValue: 1}, //结束值
    ).start(); //开始
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.Text style={{opacity: this.state.fadeAnim}}>
          // 绑定到属性 Welcome to React Native!
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default Demo;
