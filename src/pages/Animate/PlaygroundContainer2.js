import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import loadingImage from '../../assets/0.gif';

class PlaygroundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation2: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.rotation2, {
      toValue: 1, //属性目标值
      duration: 3000, //动画执行时间
    }).start(); //执行动画
  }
  render() {
    return (
      <View>
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [
                {
                  rotateX: this.state.rotation2.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
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
