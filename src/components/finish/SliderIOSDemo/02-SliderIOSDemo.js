'use strict';

import React from 'react-native';

let {Text, View, SliderIOS} = React;

class SliderIOSDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: 0,
    };
  }

  render() {
    return (
      <View>
        <SliderIOS
          minimumValue={0}
          maximumValue={10}
          value={this.state.sliderValue}
          onValueChange={value => this.setState({sliderValue: value})}
          step={1}
          // disabled={true}
        />
        <Text>{this.state.sliderValue}</Text>
      </View>
    );
  }
}

export {SliderIOSDemo as default};
