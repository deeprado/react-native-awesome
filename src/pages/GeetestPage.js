import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import * as RNGeetestSensebot from '@yyyyu/react-native-geetest-sensebot';

export default class GeetestPage extends Component {
  geetest = async () => {
    let api1Result;
    try {
      const api1Response = await fetch(
        'http://www.geetest.com/demo/gt/register-test',
      );
      api1Result = await api1Response.json();
    } catch (e) {
      return console.log('API1 request failed, message: %s.', e.message);
    }

    console.log('api1Result', api1Result);

    let geetestResult;
    try {
      geetestResult = await RNGeetestSensebot.start({
        api1Result,
        // optional default false
        debug: true,
        // optional default 10s
        loadTimeout: 10000,
        // optional default 10s
        reqTimeout: 10000,
        // optional default system
        lang: RNGeetestSensebot.Lang.System,
        // optional default false
        enableBackgroundCancel: true,
        // optional default transparent
        backgroundColorIOS: 'red',
        // optional default none
        backgroundBlurEffectIOS:
          RNGeetestSensebot.BackgroundBlurEffectIOS.Regular,
        // optional
        onEvent: (code, data) => {
          if (code === RNGeetestSensebot.Events.FAILED) {
            console.log('Validate failed, reason: %s', data[0]);
          } else {
            console.log(RNGeetestSensebot.Events[code], data);
          }
        },
      });
    } catch (e) {
      return console.log('Error, code: %d, message: %s.', e.code, e.message);
    }

    console.log('geetestResult', geetestResult);

    let api2Result;
    try {
      const api2Response = await fetch(
        'http://www.geetest.com/demo/gt/validate-test',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          body: JSON.stringify(geetestResult),
        },
      );
      api2Result = await api2Response.json();
    } catch (e) {
      return console.log('API2 request failed, message: %s.', e.message);
    }

    console.log('Validate result: %o.', api2Result);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="StartGeetest" onPress={this.geetest} color="#26c6aa" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
