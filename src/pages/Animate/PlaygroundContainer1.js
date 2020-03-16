import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import loadingImage from '../../assets/0.gif';

class PlaygroundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left1: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.spring(this.state.left1, {
      toValue: 100, //属性目标值
      friction: 1, //摩擦力 （越小 振幅越大）
      tension: 100, //拉力
    }).start(); //执行动画
  }
  render() {
    return (
      <View>
        <Animated.Image
          style={[styles.image, {left: this.state.left1}]}
          source={loadingImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default PlaygroundContainer;
