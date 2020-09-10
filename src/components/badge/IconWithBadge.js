import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class IconWithBadge extends Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
      <View style={{width: 24, height: 24, margin: 5}}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    // If you're using react-native < 0.57 overflow outside of parent
    // will not work on Android, see https://git.io/fhLJ8
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});