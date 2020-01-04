'use strict';

import React from 'react-native';

let {Text, View, ProgressViewIOS} = React;

class ProgressViewIOSDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ProgressViewIOS
          progressTintColor="#6435c9"
          trackTintColor="#dfd0ff"
          progress={0.3}
        />
      </View>
    );
  }
}

export {ProgressViewIOSDemo as default};
