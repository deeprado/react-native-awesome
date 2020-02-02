import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import TabContainer from './Child/TabContainer';

class Index extends Component {
  static navigationOptions = {
    title: '书城',
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}>
            <Icon name="search" type="octicon" color="#000" size={22} />
          </TouchableOpacity>
        </View>
        <TabContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    width: 40,
    position: 'absolute',
    top: 16,
    right: 10,
    height: 36,
    zIndex: 10,
  },
});
export default Index;
