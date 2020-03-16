import React, {Component} from 'react';
import {Animated, StyleSheet, View, Dimensions} from 'react-native';

import loadingImage from '../../assets/0.gif';

class PlaygroundContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left5: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.sequence([
      // 1000 ms后执行
      Animated.delay(1000),
      Animated.timing(this.state.left5, {
        toValue: 100, // 起始速度，必填参数。
        duration: 1000,
      }),
    ]).start();
  }
  render() {
    return (
      <View>
        <Animated.Image
          style={[
            styles.image,
            {
              left: this.state.left5,
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
