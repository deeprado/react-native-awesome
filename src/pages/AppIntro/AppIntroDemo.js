import React, {Component} from 'react';
import {Alert, Text} from 'react-native';
import AppIntro from 'react-native-app-intro';
export default class AppIntroDemo extends Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  // constructor(props) {
  //   super(props);
  //   this.onSkipBtnHandle = this.onSkipBtnHandle.bind(this);
  //   this.doneBtnHandle = this.doneBtnHandle.bind(this);
  //   this.nextBtnHandle = this.nextBtnHandle.bind(this);
  //   this.onSlideChangeHandle = this.onSlideChangeHandle.bind(this);
  // }

  onSkipBtnHandle = index => {
    Alert.alert('Skip');
    console.log(index);
  };
  doneBtnHandle = () => {
    Alert.alert('Done');
  };
  nextBtnHandle = index => {
    Alert.alert('Next');
    console.log(index);
  };
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  };
  renderPagination = () => {
    console.log('xxxxxx');
  };
  onScroll = () => {
    console.log('xxxxxx');
  };
  render() {
    const pageArray = [
      {
        title: 'Page 1',
        description: 'Description 1',
        img: 'https://goo.gl/Bnc3XP',
        imgStyle: {
          height: 80 * 2.5,
          width: 109 * 2.5,
        },
        backgroundColor: '#fa931d',
        fontColor: '#fff',
        level: 10,
      },
      {
        title: 'Page 2',
        description: 'Description 2',
        img: require('../assets/image/logo.png'),
        imgStyle: {
          height: 93 * 2.5,
          width: 103 * 2.5,
        },
        backgroundColor: '#a4b602',
        fontColor: '#fff',
        level: 10,
      },
    ];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}
