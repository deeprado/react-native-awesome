import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
} from 'react-native';

import {
  BaiduMapManager,
  MapView,
  MapTypes,
  Geolocation,
  GetDistance,
  Overlay,
  MapApp,
} from 'react-native-baidu-map';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

BaiduMapManager.initSDK('GCmcmj6kp2F5lI72A95mdtYVGuG9ynSp');

const {height, width} = Dimensions.get('window');

class App extends Component {
  state = {
    distance: 0,
    location: {},
    center: {longitude: 113.950453, latitude: 22.546045},
    markers: [
      {
        location: {
          longitude: 113.960453,
          latitude: 22.546045,
        },
      },
      {
        location: {
          longitude: 113.961453,
          latitude: 22.547045,
        },
      },
      {
        location: {
          longitude: 113.962453,
          latitude: 22.548045,
        },
      },
      {
        location: {
          longitude: 113.963453,
          latitude: 22.545045,
        },
      },
      {
        location: {
          longitude: 113.964453,
          latitude: 22.544045,
        },
      },
    ],
  };

  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(data => {
      console.log(data);
      this.setState({location: data, center: data});
    });
  }

  openTransitRoute() {
    const startPoint = {
      longitude: 113.904453,
      latitude: 22.544045,
      name: '地点1',
    };
    const endPoint = {
      longitude: 113.994453,
      latitude: 22.544045,
      name: '地点2',
    };
    MapApp.openTransitRoute(startPoint, endPoint);
  }

  openDrivingRoute() {
    const startPoint = {
      longitude: 113.904453,
      latitude: 22.544045,
      name: '地点1',
    };
    const endPoint = {
      longitude: 113.994453,
      latitude: 22.544045,
      name: '地点2',
    };
    MapApp.openDrivingRoute(startPoint, endPoint);
  }

  startLocating() {
    Geolocation.startLocating(resp => {
      console.warn(resp);
    });
  }

  stopLocating() {
    Geolocation.stopLocating();
  }

  getTargetDistance() {
    GetDistance.getLocationDistance(
      {longitude: 113.975453, latitude: 22.52},
      {longitude: 113.975453, latitude: 22.53},
    )
      .then(data => {
        console.log(data);
        this.setState({
          distance: data.distance,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  choosePosition(point) {
    console.log('point', point);
    this.setState({
      location: point,
    });
  }
  componentDidMount() {
    this.getCurrentPosition();
  }

  render() {
    const {location, center} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <MapView
                showsUserLocation={true}
                locationData={location}
                width={width}
                height={400}
                zoom={18}
                trafficEnabled={true}
                zoomControlsVisible={true}
                mapType={MapTypes.NORMAL}
                onMapClick={point => this.choosePosition(point)}
                onMapPoiClick={point => this.choosePosition(point)}
                center={center}>
                <Overlay.Marker
                  rotate={45}
                  icon={{
                    uri:
                      'https://mapopen-website-wiki.cdn.bcebos.com/homePage/images/logox1.png',
                  }}
                  location={{longitude: 113.975453, latitude: 22.510045}}
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
                <Overlay.Cluster>
                  {this.state.markers.map((marker, index) => (
                    <Overlay.Marker
                      key={`marker-` + index}
                      location={marker.location}
                    />
                  ))}
                </Overlay.Cluster>
                <Overlay.Polyline
                  longitude={113.960453}
                  latitude={22.546045}
                  points={[
                    {longitude: 113.960453, latitude: 22.546145},
                    {longitude: 113.961453, latitude: 22.547045},
                    {longitude: 113.962453, latitude: 22.54045},
                  ]}
                />
                <Overlay.Arc
                  longitude={113.960453}
                  latitude={22.546045}
                  points={[
                    {longitude: 113.960453, latitude: 22.546045},
                    {longitude: 113.960453, latitude: 22.546145},
                    {longitude: 113.960453, latitude: 22.546245},
                  ]}
                />
              </MapView>
              <View style={styles.buttonGroup}>
                <View style={styles.button}>
                  <Button
                    onPress={() => this.getCurrentPosition()}
                    title="Locate Once"
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    onPress={() => this.openTransitRoute()}
                    title="Transit Route"
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    onPress={() => this.openDrivingRoute()}
                    title="Drive Route"
                  />
                </View>
              </View>
              {this.state.location.address ? (
                <View style={styles.location}>
                  <Text>当前位置：{this.state.location.address}</Text>
                </View>
              ) : null}
              <View style={styles.location}>
                <Text>距离：{this.state.distance}</Text>
                <Button
                  title="获取距离"
                  onPress={() => this.getTargetDistance()}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollView: {},
  location: {
    padding: 16,
  },
  buttonGroup: {
    padding: 16,
    flexDirection: 'row',
  },
  button: {
    width: 80,
    margin: 8,
  },
});

export default App;
