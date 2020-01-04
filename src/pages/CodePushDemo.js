import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import codePush from 'react-native-code-push';

// 手动更新
let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
const deploymentKey = 'xxxxxxxx';

export default class CodePushDemo extends Component {
  static navigationOptions = {
    title: '更新',
  };

  onButtonPress() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }

  manualUpdate() {
    codePush
      .checkForUpdate(deploymentKey)
      .then(update => {
        if (!update) {
          Alert.alert('提示', '已是最新版本--', [
            {
              text: 'Ok',
              onPress: () => {
                console.log('点了OK');
              },
            },
          ]);
        } else {
          codePush.sync(
            {
              deploymentKey: deploymentKey,
              updateDialog: {
                optionalIgnoreButtonLabel: '稍后',
                optionalInstallButtonLabel: '立即更新',
                optionalUpdateMessage: '有新版本了，是否更新？',
                title: '更新提示',
              },
              installMode: codePush.InstallMode.IMMEDIATE,
            },
            status => {
              switch (status) {
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                  console.log('DOWNLOADING_PACKAGE');
                  break;
                case codePush.SyncStatus.INSTALLING_UPDATE:
                  console.log(' INSTALLING_UPDATE');
                  break;
              }
            },
            progress => {
              console.log(
                progress.receivedBytes +
                  ' of ' +
                  progress.totalBytes +
                  ' received.',
              );
            },
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>Check for updates</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
