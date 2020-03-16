// import React, {Component} from 'react';
// import {StyleSheet, View, ScrollView} from 'react-native';
// import {AuthManager} from '../../components/oss/AuthManager';
// import {UploadManager} from '../../components/oss/UploadManager';
// import {DownloadManager} from '../../components/oss/DownloadManager';
// import {ImageProcessManager} from '../../components/oss/ImageProcessManager';
// import {BucketManager} from '../../components/oss/BucketManager';
// import {ObjectManager} from '../../components/oss/ObjectManager';

// import AliyunOSS from 'aliyun-oss-react-native';

// //open log
// AliyunOSS.enableDevMode();

// // defalut configraiton
// const configuration = {
//   maxRetryCount: 3,
//   timeoutIntervalForRequest: 30,
//   timeoutIntervalForResource: 24 * 60 * 60,
// };

// const endPoint = 'http://oss-cn-beijing.aliyuncs.com';
// const authserver = 'http://localhost:9000';
// const bucketName = 'gonewlife2';
// const accesskeyId = '';
// const accesskeySecret = '';

// // initWithServerSTS to auth
// AliyunOSS.initWithServerSTS(authserver, endPoint, configuration);

// // AliyunOSS.initWithPlainTextAccessKey(
// //   accesskeyId,
// //   accesskeySecret,
// //   endPoint,
// //   configuration,
// // );

// export default class OssExample extends Component {
//   static navigationOptions = {
//     tabBarLabel: '书架',
//   };
//   render() {
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <AuthManager />
//           <UploadManager />
//           <DownloadManager />
//           <ImageProcessManager />
//           <BucketManager />
//           <ObjectManager />
//         </View>
//       </ScrollView>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     backgroundColor: '#F5FCFF',
//     flexWrap: 'wrap',
//   },
// });
