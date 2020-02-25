import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';

console.log('DeviceInfo', 'DeviceInfo', DeviceInfo);
// console.log('DeviceInfo', DeviceInfo.getApiLevel());
class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getApiLevel: DeviceInfo.getApiLevel(),
      getApplicationName: DeviceInfo.getApplicationName(),
      getAvailableLocationProviders: DeviceInfo.getAvailableLocationProviders(),
      getBaseOs: DeviceInfo.getBaseOs(),
      getBuildId: DeviceInfo.getBuildId(),
      getBatteryLevel: DeviceInfo.getBatteryLevel(),
      getBootloader: DeviceInfo.getBootloader(),
      getBrand: DeviceInfo.getBrand(),
      getBuildNumber: DeviceInfo.getBuildNumber(),
      getBundleId: DeviceInfo.getBundleId(),
      isCameraPresent: DeviceInfo.isCameraPresent(),
      getCarrier: DeviceInfo.getCarrier(),
      getCodename: DeviceInfo.getCodename(),
      getDevice: DeviceInfo.getDevice(),
      getDeviceId: DeviceInfo.getDeviceId(),
      getDeviceType: DeviceInfo.getDeviceType(),
      getDisplay: DeviceInfo.getDisplay(),
      getDeviceName: DeviceInfo.getDeviceName(),
      getDeviceToken: DeviceInfo.getDeviceToken(),
      getFirstInstallTime: DeviceInfo.getFirstInstallTime(),
      getFingerprint: DeviceInfo.getFingerprint(),
      getFontScale: DeviceInfo.getFontScale(),
      getFreeDiskStorage: DeviceInfo.getFreeDiskStorage(),
      getHardware: DeviceInfo.getHardware(),
      getHost: DeviceInfo.getHost(),
      getIpAddress: DeviceInfo.getIpAddress(),
      getIncremental: DeviceInfo.getIncremental(),
      getInstallerPackageName: DeviceInfo.getInstallerPackageName(),
      getInstallReferrer: DeviceInfo.getInstallReferrer(),
      getInstanceId: DeviceInfo.getInstanceId(),
      getLastUpdateTime: DeviceInfo.getLastUpdateTime(),
      getMacAddress: DeviceInfo.getMacAddress(),
      getManufacturer: DeviceInfo.getManufacturer(),
      getMaxMemory: DeviceInfo.getMaxMemory(),
      getModel: DeviceInfo.getModel(),
      getPhoneNumber: DeviceInfo.getPhoneNumber(),
      getPowerState: DeviceInfo.getPowerState(),
      getProduct: DeviceInfo.getProduct(),
      getPreviewSdkInt: DeviceInfo.getPreviewSdkInt(),
      getReadableVersion: DeviceInfo.getReadableVersion(),
      getSerialNumber: DeviceInfo.getSerialNumber(),
      getSecurityPatch: DeviceInfo.getSecurityPatch(),
      getSystemAvailableFeatures: DeviceInfo.getSystemAvailableFeatures(),
      getSystemName: DeviceInfo.getSystemName(),
      getSystemVersion: DeviceInfo.getSystemVersion(),
      getTags: DeviceInfo.getTags(),
      getType: DeviceInfo.getType(),
      getTotalDiskCapacity: DeviceInfo.getTotalDiskCapacity(),
      getTotalMemory: DeviceInfo.getTotalMemory(),
      getUniqueId: DeviceInfo.getUniqueId(),
      getUsedMemory: DeviceInfo.getUsedMemory(),
      getUserAgent: DeviceInfo.getUserAgent(),
      getVersion: DeviceInfo.getVersion(),
      hasNotch: DeviceInfo.hasNotch(),
      hasSystemFeature: DeviceInfo.hasSystemFeature(),
      isAirplaneMode: DeviceInfo.isAirplaneMode(),
      isBatteryCharging: DeviceInfo.isBatteryCharging(),
      isEmulator: DeviceInfo.isEmulator(),
      isLandscape: DeviceInfo.isLandscape(),
      isLocationEnabled: DeviceInfo.isLocationEnabled(),
      isHeadphonesConnected: DeviceInfo.isHeadphonesConnected(),
      isPinOrFingerprintSet: DeviceInfo.isPinOrFingerprintSet(),
      isTablet: DeviceInfo.isTablet(),
      supported32BitAbis: DeviceInfo.supported32BitAbis(),
      supported64BitAbis: DeviceInfo.supported64BitAbis(),
      supportedAbis: DeviceInfo.supportedAbis(),
      // getApiLevel: DeviceInfo.getApiLevel(),
      // getApiLevel: DeviceInfo.getApiLevel(),
      // getApiLevel: DeviceInfo.getApiLevel(),
      // getApiLevel: DeviceInfo.getApiLevel(),
      // getApiLevel: DeviceInfo.getApiLevel(),
      // getApiLevel: DeviceInfo.getApiLevel(),
    };

    console.log(this.state.getPowerState);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Device Info</Text>
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

export default Demo1;
