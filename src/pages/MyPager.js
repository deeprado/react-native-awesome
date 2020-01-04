import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

export default class MyPager extends React.Component {
  render() {
    return (
      <ViewPager style={styles.viewPager} initialPage={0}>
        <View key="1" style={[styles.container, styles.page1]}>
          <Text>First page</Text>
        </View>
        <View key="2" style={[styles.container, styles.page2]}>
          <Text>Second page</Text>
        </View>
        <View key="3" style={[styles.container, styles.page3]}>
          <Text>thred page</Text>
        </View>
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page1: {
    backgroundColor: 'blue',
  },
  page2: {
    backgroundColor: 'green',
  },
  page3: {
    backgroundColor: 'red',
  },
});
