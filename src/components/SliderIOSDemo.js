'use strict';

import React, {Component} from 'react';
import {Text, View} from 'react-native';

class SliderIOSDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: 0,
    };
  }

  render() {
    return (
      <View>
        <Text>SliderIOS</Text>
      </View>
    );
  }
}

export default SliderIOSDemo;
