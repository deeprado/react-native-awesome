'use strict';

import React from 'react-native';

let {Text, View, SegmentedControlIOS} = React;

class SegmentedControlIOSDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: ['全部', '工具', '应用'],
      value: '全部',
      selectedIndex: 0,
    };
  }

  render() {
    return (
      <View>
        <SegmentedControlIOS
          style={{marginBottom: 30}}
          onChange={event => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
          onValueChange={value => this.setState({value})}
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          tintColor="#6435c9"
          // enabled={false}
        />
        <Text>
          {this.state.value}, {this.state.selectedIndex}
        </Text>
      </View>
    );
  }
}

export {SegmentedControlIOSDemo as default};
