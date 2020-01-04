import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class TextField extends Component {
  render() {
    const {label, placeholder, type, onChange, iconName} = this.props;
    const TextPrev = iconName ? (
      <Ionicons name={iconName} size={24} style={styles.icon} color={'gray'} />
    ) : (
      <Text style={styles.label}>{label}</Text>
    );
    return (
      <View style={styles.textField}>
        <View style={styles.labelText}>{TextPrev}</View>

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={true}
          style={styles.edit}
          placeholder={placeholder}
          secureTextEntry={type === 'password'}
          keyboardType="ascii-capable"
          selectTextOnFocus={false}
          onChangeText={onChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  labelText: {
    width: 40,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 17,
    width: 85,
    paddingVertical: 2,
  },
  edit: {
    flex: 1,
    fontSize: 17,
    height: 44,
  },
});
