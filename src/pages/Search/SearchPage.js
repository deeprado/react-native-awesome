import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';

const logo = require('../../static/img/logo.png');

export default class SearchPage extends Component {
  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Button
            title="Go to IndexPage"
            onPress={() => this.props.navigation.navigate('IndexPage')}
          />
          <Image source={logo} />
        </View>
      </>
    );
  }
}
