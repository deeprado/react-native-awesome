import React, {Component} from 'react';

import {StyleSheet, View, Text, DrawerLayoutAndroid} from 'react-native';

export default class DrawerLayoutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
          I'm in the Drawer!
        </Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={'left'}
        renderNavigationView={() => navigationView}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
            Hello
          </Text>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
            World!
          </Text>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  topStatus: {
    marginTop: 45,
  },
});
