'use strict';

import React from 'react-native';

let {Text, View, Switch} = React;

class SwitchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchDemoOne: true,
    };
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', padding: 30}}>
        <Switch
          value={this.state.switchDemoOne}
          onValueChange={value => this.setState({switchDemoOne: value})}
        />
      </View>
    );
  }
}

export {SwitchDemo as default};
