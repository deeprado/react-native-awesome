import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';

import Example from './amap/circle';

export default class GaodeMapPage extends Component {
  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Example />
        </View>
      </>
    );
  }
}
