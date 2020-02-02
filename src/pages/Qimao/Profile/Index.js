import React, {Component} from 'react';
import {Image, ScrollView, View, Text} from 'react-native';

class Index extends Component {
  static navigationOptions = {
    title: '我的',
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>我的</Text>
      </View>
    );
  }
}

export default Index;
