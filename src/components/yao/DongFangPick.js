import React, {Component} from 'react';

import {StyleSheet, View, Picker, ProgressBarAndroid} from 'react-native';

export default class DongFangPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      languages: [],
    };
  }

  render() {
    return (
      <View style={[styles.flex, styles.topStatus]}>
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          mode={'dropdown'}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <ProgressBarAndroid />
        <ProgressBarAndroid styleAttr="Horizontal" />
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  topStatus: {
    marginTop: 45,
  },
});
