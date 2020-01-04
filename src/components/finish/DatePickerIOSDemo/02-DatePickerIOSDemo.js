'use strict';

import React from 'react-native';

let {Text, View, DatePickerIOS} = React;

class DatePickerIOSDemo extends React.Component {
  static defaultProps = {
    date: new Date(),
  };

  constructor(props) {
    super(props);

    this.state = {
      date: this.props.date,
    };
  }

  render() {
    return (
      <View>
        <DatePickerIOS
          onDateChange={date => this.setState({date})}
          date={this.state.date}
          mode="datetime"
        />
      </View>
    );
  }
}

export {DatePickerIOSDemo as default};
