import React, {Component} from 'react';
import {Button, Linking, StyleSheet, Text, View} from 'react-native';

import DeepLinking from 'react-native-deep-linking';

export default class DeepLinkingDemo extends Component {
  state = {
    response: {},
  };

  componentDidMount() {
    DeepLinking.addScheme('kkt://');
    Linking.addEventListener('url', this.handleUrl);

    DeepLinking.addRoute('/test', response => {
      // kkt://test
      this.setState({response});
    });

    DeepLinking.addRoute('/test/:id', response => {
      // kkt://test/23
      this.setState({response});
    });

    DeepLinking.addRoute('/test/:id/details', response => {
      // kkt://test/100/details
      this.setState({response});
    });

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl);
  }

  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            onPress={() => Linking.openURL('kkt://test')}
            title="Open kkt://test"
          />
          <Button
            onPress={() => Linking.openURL('kkt://test/23')}
            title="Open kkt://test/23"
          />
          <Button
            onPress={() => Linking.openURL('kkt://test/100/details')}
            title="Open kkt://test/100/details"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
            {this.state.response.scheme
              ? `Url scheme: ${this.state.response.scheme}`
              : ''}
          </Text>
          <Text style={styles.text}>
            {this.state.response.path
              ? `Url path: ${this.state.response.path}`
              : ''}
          </Text>
          <Text style={styles.text}>
            {this.state.response.id ? `Url id: ${this.state.response.id}` : ''}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
