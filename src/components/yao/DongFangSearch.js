import React, {Component} from 'react';

import {StyleSheet, View, Text, PixelRatio} from 'react-native';
import NewsSearch from './NewsSearch';

export default class DongFangSearch extends Component {
  render() {
    return (
      <View style={[styles.flex, styles.topStatus]}>
        <NewsSearch />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  topStatus: {
    marginTop: 20,
  },
});
