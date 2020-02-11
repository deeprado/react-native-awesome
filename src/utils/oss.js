// import moment from 'moment';
// import AliyunOSS from 'aliyun-oss-react-native';
// AliyunOSS.enableDevMode();

// const configuration = {
//   maxRetryCount: 3,
//   timeoutIntervalForRequest: 30,
//   timeoutIntervalForResource: 24 * 60 * 60,
// };
// const bucketName = 'gonewlife2';
// const endPoint = 'oss-cn-beijing.aliyuncs.com';
// const accesskeyId = 'LTAI4FxUedvY15Ch7LLFzToC';
// const accesskeySecret = 'fOcAAKTl85qm2o0WFNOHmNV1lTTBqk';

// // AliyunOSS.initWithServerSTS(
// //   '/***http://ip:端口/****/',
// //   endPoint,
// //   configuration,
// // );

// // 根据AliyunOss配置AccessKey
// AliyunOSS.initWithPlainTextAccessKey(
//   accesskeyId,
//   accesskeySecret,
//   endPoint,
//   configuration,
// );

// export const uploadOssFile = filepath => {
//   const filetype = filepath.substring(filepath.lastIndexOf('.')).toLowerCase();
//   // 获取图片后缀
//   const currm = moment(new Date());
//   const oo = Math.random();
//   const objectKey = `upload/assets/${currm.format(
//     'YYYYMM',
//   )}/${currm}${oo}${filetype}`;
//   // 生成objectKey，作为自定义路径
//   return AliyunOSS.asyncUpload(bucketName, objectKey, filepath)
//     .then(() => {
//       return `${urlCdn}${objectKey}`;
//     })
//     .catch(error => {
//       console.log('=== error', error);
//     });
// };
