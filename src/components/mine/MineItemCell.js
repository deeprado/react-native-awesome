/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Heading2, Paragraph} from './Text';
import Separator from './Separator';

var ScreenWidth = Dimensions.get('window').width;

class MineItemCell extends Component {
  render() {
    let icon = null;
    if (this.props.image) {
      icon = <Image style={styles.icon} source={this.props.image} />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={[styles.content, this.props.style]}>
            {icon}
            <Heading2>{this.props.title}</Heading2>
            <View style={{flex: 1, backgroundColor: 'blue'}} />
            <Paragraph style={{color: '#999999'}}>
              {this.props.subtitle}
            </Paragraph>
            <Image
              style={styles.arrow}
              source={require('../../assets/image/mine/cell_arrow.png')}
            />
          </View>

          <Separator />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  arrow: {
    width: 14,
    height: 14,
    marginLeft: 5,
  },
});

export default MineItemCell;
