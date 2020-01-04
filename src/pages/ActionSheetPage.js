import React, {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {ActionSheetCustom} from 'react-native-actionsheet';

class ActionSheetPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['Apple', 'Banana', 'cancel'],
    };
  }
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  _press(index) {
    Alert.alert(this.state.options[index]);
  }
  render() {
    return (
      <View>
        <Button onPress={this.showActionSheet} title="Open ActionSheet" />
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={'Which one do you like ?'}
          options={this.state.options}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={index => {
            this._press(index);
          }}
        />
      </View>
    );
  }
}

const options = [
  'Cancel',
  'Apple',
  <Text style={{color: 'yellow'}}>Banana</Text>,
  'Watermelon',
  <Text style={{color: 'red'}}>Durian</Text>,
];

class ActionSheetDemo extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  _press(index) {
    if (index !== 0) {
      console.log(options[index]);
    }
  }
  render() {
    return (
      <View>
        <Button onPress={this.showActionSheet} title="Open ActionSheet" />
        <ActionSheetCustom
          ref={o => (this.ActionSheet = o)}
          title={
            <Text style={{color: '#000', fontSize: 18}}>
              Which one do you like?
            </Text>
          }
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={index => {
            this._press(index);
          }}
        />
      </View>
    );
  }
}

const styles = {
  titleBox: {
    background: 'pink',
  },
  titleText: {
    fontSize: 16,
    color: '#000',
  },
};
export default ActionSheetDemo;
