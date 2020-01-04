'use strict';

import React from 'react-native';
import icons from '../Assets/Icons';

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
          minimumTrackTintColor="#6435c9"
          maximumTrackTintColor="#dfd0ff"
          thumbImage={{uri: icons.cupcake, scale: 3.6}}
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
