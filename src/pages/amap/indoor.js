import React, {Component} from '@app/pages/Amap/node_modules/react';
import {StyleSheet} from 'react-native';
import {MapView} from '@app/pages/Amap/node_modules/react-native-amap3d';

export default class IndoorExample extends Component {
  static navigationOptions = {
    title: '室内地图',
  };

  render() {
    return (
      <MapView
        coordinate={{
          latitude: 39.9098,
          longitude: 116.37296,
        }}
        zoomLevel={18}
        showsIndoorMap
        tilt={45}
        style={StyleSheet.absoluteFill}
      />
    );
  }
}
