import React, {Component} from 'react';
import {Text, Linking, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export default class LinkingButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    url: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  openURL() {
    let url = this.props.url;
    console.log('url', url);
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }

  test() {
    console.log('xxxxxxxxxxx');
  }
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={() => this.openURL()}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    backgroundColor: '#fff',
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
  buttonText: {
    fontSize: 20,
  },
});
