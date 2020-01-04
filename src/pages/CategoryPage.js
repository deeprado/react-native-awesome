import React, {Component} from 'react';
import {View, Text, Button, Image, ScrollView} from 'react-native';

export default class CategoryPage extends Component {
  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Button
            title="Go to IndexPage"
            onPress={() => this.props.navigation.navigate('IndexPage')}
          />
          <Image source={require('../../static/img/logo.png')} />
        </View>
      </ScrollView>
    );
  }
}
