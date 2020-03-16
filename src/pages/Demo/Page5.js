import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';

export default class Page5 extends Component {
  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#f67888'}}>
        <Text>欢迎来到Page5</Text>
        <Button onPress={() => navigation.openDrawer()} title="Open drawer" />
        <Button onPress={() => navigation.closeDrawer()} title="Close drawer" />
        <Button
          onPress={() => navigation.toggleDrawer()}
          title="Toggle drawer"
        />
        <Button
          onPress={() => navigation.navigate('Page4')}
          title="Go to Page4"
        />
      </View>
    );
  }
}
