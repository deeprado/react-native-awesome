import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DrawerItems} from 'react-navigation-drawer';
import {StyleSheet, ScrollView, Text} from 'react-native';
import React from 'react';

const CustomDrawerContentComponent = props => {
  console.log('props', props);
  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView
          style={styles.container}
          forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerItems {...props} />
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomDrawerContentComponent;
