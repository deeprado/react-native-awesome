import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class Demo2 extends Component {
  constructor(props) {
    super(props);
  }

  // 初始加载、获取物理硬件信息
  componentDidMount() {
    console.log('api版本:', DeviceInfo.getAPILevel());
    console.log('品牌:', DeviceInfo.getBrand());
    console.log('当前应用名称:', DeviceInfo.getApplicationName());
    console.log('应用编译版本号:', DeviceInfo.getBuildNumber());
    console.log('获取应用程序包标识符:', DeviceInfo.getBundleId());
    console.log('运营商名称:', DeviceInfo.getCarrier());
    console.log('设备所处国家:', DeviceInfo.getDeviceCountry());
    console.log('设备ID:', DeviceInfo.getDeviceId());
    console.log('设备地区:', DeviceInfo.getDeviceLocale());
    console.log('设备名称:', DeviceInfo.getDeviceName());
    console.log('获取应用初始安装时间:', DeviceInfo.getFirstInstallTime());
    console.log('设备字体大小:', DeviceInfo.getFontScale());
    console.log('剩余存储容量(字节):', DeviceInfo.getFreeDiskStorage());
    DeviceInfo.getIPAddress().then(res => {
      console.log('设备当前网络地址IP:', res);
    });
    console.log('应用程序实例ID:', DeviceInfo.getInstanceID());
    console.log('获取应用上次更新时间:', DeviceInfo.getLastUpdateTime());
    DeviceInfo.getMACAddress().then(res => {
      console.log('网络适配器MAC地址:', res);
    });
    console.log('设备制造商:', DeviceInfo.getManufacturer());
    console.log(
      '获取JVM试图使用的最大内存量(字节):',
      DeviceInfo.getMaxMemory(),
    );
    console.log('获取设备模式:', DeviceInfo.getModel());
    console.log('获取电话号码:', DeviceInfo.getPhoneNumber());
    console.log('获取应用程序可读版本:', DeviceInfo.getReadableVersion());
    console.log('设备唯一序列号:', DeviceInfo.getSerialNumber());
    console.log('获取系统名称:', DeviceInfo.getSystemName());
    console.log('获取系统版本:', DeviceInfo.getSystemVersion());
    console.log('系统时区:', DeviceInfo.getTimezone());
    console.log('完整磁盘空间大小(字节):', DeviceInfo.getTotalDiskCapacity());
    console.log('设备总内存(字节):', DeviceInfo.getTotalMemory());
    console.log('设备唯一ID:', DeviceInfo.getUniqueID());
    console.log('设备用户代理:', DeviceInfo.getUserAgent());
    console.log('设备版本:', DeviceInfo.getVersion());
    console.log('用户偏好是否设置为24小时格式:', DeviceInfo.is24Hour());
    console.log('程序是否允许在模拟器中:', DeviceInfo.isEmulator());
    console.log('是否是平板电脑:', DeviceInfo.isTablet());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>测试获取设备信息.....</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
