import React, {Component} from 'react';
import {View} from 'react-native';

import {MapView, Overlay, BaiduMapManager} from 'react-native-baidu-map';

BaiduMapManager.initSDK('GCmcmj6kp2F5lI72A95mdtYVGuG9ynSp');

class BaiduMapPage extends Component {
  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <MapView>
          <Overlay.Marker
            rotate={45}
            icon={{
              uri:
                'https://mapopen-website-wiki.cdn.bcebos.com/homePage/images/logox1.png',
            }}
            location={{longitude: 113.975453, latitude: 22.510045}}
          />
          <Overlay.Marker
            location={{longitude: 113.969453, latitude: 22.530045}}
          />
          <Overlay.Cluster>
            <Overlay.Marker
              location={{longitude: 113.969453, latitude: 22.530045}}
            />
            <Overlay.Marker
              location={{longitude: 113.968453, latitude: 22.531045}}
            />
            <Overlay.Marker
              location={{longitude: 113.967453, latitude: 22.532045}}
            />
            <Overlay.Marker
              location={{longitude: 113.966453, latitude: 22.533045}}
            />
            <Overlay.Marker
              location={{longitude: 113.965453, latitude: 22.534045}}
            />
            <Overlay.Marker
              location={{longitude: 113.965453, latitude: 22.535045}}
            />
          </Overlay.Cluster>
        </MapView>
      </View>
    );
  }
}

export default BaiduMapPage;
