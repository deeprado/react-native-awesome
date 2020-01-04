import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';

const images = [
  'http://b-ssl.duitang.com/uploads/blog/201308/08/20130808131501_LnLhw.jpeg',
  'http://pic44.nipic.com/20140723/18505720_094503373000_2.jpg',
  'http://b-ssl.duitang.com/uploads/item/201210/26/20121026223826_CzrmW.jpeg',
];

export default class DongFangImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      imgs: images,
    };
    console.log(this.state);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  next() {
    let count = this.state.count;
    if (count === this.state.imgs.length - 1) {
      Alert.alert('最后一张');
      return false;
    }
    this.setState({
      count: ++count,
    });
  }
  prev() {
    let count = this.state.count;
    if (count === 0) {
      Alert.alert('第一张');
      return false;
    }
    this.setState({
      count: --count,
    });
  }
  render() {
    let imgUrl = this.state.imgs[this.state.count];
    console.log(imgUrl);
    return (
      <View style={[styles.flex, styles.topStatus]}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: imgUrl,
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableHighlight onPress={this.prev} style={styles.btn1}>
            <Text>上一张</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.next} style={styles.btn2}>
            <Text>下一张</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  topStatus: {
    marginTop: 45,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 200,
    borderWidth: 5,
    borderColor: 'red',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn1: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
  },
  btn2: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 20,
    borderRadius: 3,
  },
});
