/**
 * Github
 * @file Github 项目列表
 * @module pages/about/github
 */

import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationScreenConfigProps} from 'react-navigation';
import {WebView} from 'react-native-webview';
import {observable} from 'mobx';
import {IPageProps} from '../../types/props';
import {LANGUAGE_KEYS} from '../../constants/language';
import {CustomHeader} from '../../components/layout/header';
import i18n from '../../services/i18n';
import colors from '../../styles/profile/colors';
import sizes from '../../styles/profile/sizes';

export interface IGtihubProps extends IPageProps {}
export default class Github extends PureComponent<IGtihubProps> {
  static navigationOptions = (config: NavigationScreenConfigProps) => ({
    headerTitle: <CustomHeader title={i18n.t(LANGUAGE_KEYS.GITHUB)} />,
  });

  render() {
    const {styles} = obStyles;
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          source={{uri: 'https://github.com/deeprado/react-native-awesome'}}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      webview: {
        flex: 1,
        width: sizes.screen.width,
        height: sizes.screen.height,
        backgroundColor: colors.cardBackground,
      },
    });
  },
});
