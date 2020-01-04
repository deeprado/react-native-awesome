import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation-stack';

const styles = StyleSheet.create({
  container: {},
  paragraph: {},
});

class Counter extends React.Component {
  static navigationOptions = {
    title: `Same number, wow!`,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count ? this.props.count : 1,
    };
    this.add = this.add.bind(this);
  }

  add() {
    let c = this.state.count + 1;
    this.setState({
      count: c,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>xxxxxxxx {this.state.count}</Text>
        <Button title="加一" onPress={this.add} />
        <Button
          title="去另外一个"
          onPress={() => this.props.navigation.navigate('StaticCounter')}
        />
      </View>
    );
  }
}

class StaticCounter extends React.Component {
  static navigationOptions = {
    title: `Same number, wow!`,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count ? this.props.count : 1,
    };
    this.add = this.add.bind(this);
  }

  add() {
    let c = this.state.count + 1;
    this.setState({
      count: c,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>yyyyyyyyyy {this.state.count}</Text>
        <Button title="加一" onPress={this.add} />
        <Button
          title="去另外一个"
          onPress={() => this.props.navigation.navigate('Counter')}
        />
      </View>
    );
  }
}

// Connect the screens to Redux
let CounterContainer = connect(state => ({count: state.count}))(Counter);
let StaticCounterContainer = connect(state => ({count: state.count}))(
  StaticCounter,
);

let RootStack = createStackNavigator({
  Counter: CounterContainer,
  StaticCounter: StaticCounterContainer,
});

let Navigation = createAppContainer(RootStack);

export default Navigation;
