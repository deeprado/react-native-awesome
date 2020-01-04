'use strict';

import React from 'react-native';

let {Text, View, SegmentedControlIOS} = React;

class SegmentedControlIOSDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <SegmentedControlIOS
          values={['全部', '工具', '应用']}
          selectedIndex={0}
          tintColor="#6435c9"
          // enabled={false}
        />
      </View>
    );
  }
}

export {SegmentedControlIOSDemo as default};
