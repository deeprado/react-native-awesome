import React, {Component} from 'react';
import {Image, ScrollView, View, Text} from 'react-native';

class Index extends Component {
  static navigationOptions = {
    title: '福利',
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>福利</Text>
      </View>
    );
  }
}

export default Index;
