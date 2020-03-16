import React, {Component} from 'react';
import {Animated, StyleSheet, View, Dimensions} from 'react-native';

import loadingImage from '../../assets/0.gif';

const {width} = Dimensions.get('window');

class PlaygroundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left3: new Animated.Value(0),
      rotation3: new Animated.Value(0),
      scale3: new Animated.Value(0.5),
    };
  }
  componentDidMount() {
    //串行执行
    Animated.sequence([
      // 并行执行（滚动，同时旋转）
      Animated.parallel([
        Animated.timing(this.state.left3, {
          toValue: 1,
          duration: 3000,
        }),
        Animated.timing(this.state.rotation3, {
          toValue: 1,
          duration: 1000,
        }),
      ]),
      // 滚动、旋转结束  执行缩放
      Animated.timing(this.state.scale3, {
        toValue: 1,
        duration: 500,
      }),
    ]).start(); //执行动画
  }
  render() {
    return (
      <View>
        <Animated.Image
          style={[
            styles.image,
            {
              left: this.state.left3.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width - 100],
              }),
              transform: [
                {
                  rotateZ: this.state.rotation3.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                {
                  rotateX: this.state.rotation3.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                {scale: this.state.scale3},
              ],
            },
          ]}
          source={loadingImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default PlaygroundContainer;
