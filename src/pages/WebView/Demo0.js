import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

// ...
class MyWebComponent extends Component {
  render() {
    return (
      <WebView source={{uri: 'https://facebook.github.io/react-native/'}} />
    );
  }
}
