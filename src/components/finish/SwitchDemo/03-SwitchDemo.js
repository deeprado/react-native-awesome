'use strict';

import React from 'react-native';

let {Text, View, Switch} = React;

class SwitchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      switchDemoOne: true,
      switchDemoTwo: false,
      switchDemoTwoDisabled: true,
    };
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', padding: 30}}>
        <Switch
          style={{marginBottom: 30}}
          onTintColor="#6435c9"
          tintColor="#eae7ff"
          // thumbTintColor="#19962a"
          value={this.state.switchDemoOne}
          onValueChange={value => {
            this.setState({
              switchDemoOne: value,
              switchDemoTwoDisabled: this.state.switchDemoTwoDisabled
                ? false
                : true,
            });
          }}
        />
        <Switch
          disabled={this.state.switchDemoTwoDisabled}
          onTintColor="#6435c9"
          tintColor="#eae7ff"
          // thumbTintColor="#19962a"
          value={this.state.switchDemoTwo}
          onValueChange={value => this.setState({switchDemoTwo: value})}
        />
      </View>
    );
  }
}

export {SwitchDemo as default};
