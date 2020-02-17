/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import Pdf from 'react-native-pdf';

class ActivityIndicatorDemo extends React.Component {
  render() {
    return (
      <View>
        <Text>PDF</Text>
      </View>
    );
  }
}
export default class PDFExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 初始设为显示加载动画
      animating: true,
    };
  }

  render() {
    const source = {
      uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
      cache: true,
    };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
          // activityIndicator={
          //   <ActivityIndicator
          //     animating={this.state.animating}
          //     style={[styles.centering, {height: 80}]}
          //     size="large"
          //   />
          // }
          // activityIndicatorProps={{
          //   color: '#009900',
          //   progressTintColor: '#009900',
          // }}
          horizontal={true}
          enablePaging={true}
          enableRTL={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
