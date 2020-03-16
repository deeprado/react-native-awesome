import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

const NanshengRoute = () => (
  <View style={[styles.tabScene, {backgroundColor: '#673ab7'}]} />
);

const styles = StyleSheet.create({
  tabScene: {
    flex: 1,
  },
});

export default NanshengRoute;
