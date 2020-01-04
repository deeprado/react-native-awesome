'use strict';

import React from 'react-native';

let {Text, View, SliderIOS} = React;

class SliderIOSDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <SliderIOS
          minimumValue={0}
          maximumValue={10}
          value={0}
          step={1}
          // disabled={true}
        />
      </View>
    );
  }
}

export {SliderIOSDemo as default};
