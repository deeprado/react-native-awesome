import React, {Component} from 'react';
import {Alert, View, Text} from 'react-native';
import Counter from './Counter';

export default class Counters extends Component {
  // 构造
  constructor(props) {
    super(props);
    this.initValues = [1, 2, 3];
    const initSum = this.initValues.reduce((a, b) => a + b, 0);
    this.state = {
      sum: initSum,
    };
    this.update = this.update.bind(this);
  }

  update(oldValue, newValue) {
    const valueChange = newValue - oldValue;
    this.setState({
      sum: this.state.sum + valueChange,
    });
  }

  render() {
    return (
      <>
        <View>
          <Text>总计： {this.state.sum}</Text>
        </View>
        <Counter initValue={this.initValues[0]} onUpdate={this.update} />
        <Counter initValue={this.initValues[1]} onUpdate={this.update} />
        <Counter initValue={this.initValues[2]} onUpdate={this.update} />
      </>
    );
  }
}
