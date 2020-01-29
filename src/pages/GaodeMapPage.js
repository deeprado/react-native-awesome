import React, {Component} from 'react';
import {View} from 'react-native';

import Example from './Amap/circle';

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
