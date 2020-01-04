import React, {Component} from 'react';

import {StyleSheet, View, Text, PixelRatio} from 'react-native';
import NewsHeader from './NewsHeader';
import NewsList from './NewsList';
import NewsImportant from './NewsImportant';

const news = [
  'xxxxxxxx',
  'yyyyyyyyyy',
  '啊时代发生的发生的发生发生的发啊时代发生的发暗示法阿斯蒂芬暗示法阿斯蒂芬阿斯蒂啊沙发上的方法啊是发顺丰阿斯蒂芬芬阿斯蒂芬爱上打上单服asd啊',
  'bbbbbbbbbb',
];

export default class DongFangText extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <NewsHeader />
        <NewsList title={'xxxxxxxxxxx'} />
        <NewsImportant news={news} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    backgroundColor: '#FF0067',
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    height: 84,
    borderRadius: 5,
    padding: 2,
  },
  item: {
    flex: 1,
    height: 80,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  font: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lineLeftRight: {
    borderLeftWidth: 1 / PixelRatio.get(),
    borderRightWidth: 1 / PixelRatio.get(),
    borderColor: '#fff',
  },
  lineCenter: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#fff',
  },
});
