'use strict';

import React from 'react-native';

let {Text, View, PickerIOS} = React;

let PickerItemIOS = PickerIOS.Item;

class PickerIOSDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <PickerIOS>
          <PickerItemIOS key="html" value="html" label="HTML" />
          <PickerItemIOS key="css" value="css" label="CSS" />
          <PickerItemIOS key="js" value="js" label="JavaScript" />
        </PickerIOS>
      </View>
    );
  }
}

export {PickerIOSDemo as default};
