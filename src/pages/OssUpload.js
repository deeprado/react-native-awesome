import React, {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';

import AliyunOSS from 'aliyun-oss-react-native';
AliyunOSS.enableDevMode();

const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
};
const bucketName = 'gonewlife2';
const endPoint = 'oss-cn-beijing.aliyuncs.com';
const accesskeyId = 'LTAI4FxUedvY15Ch7LLFzToC';
const accesskeySecret = 'fOcAAKTl85qm2o0WFNOHmNV1lTTBqk';

// AliyunOSS.initWithServerSTS(
//   '/***http://ip:端口/****/',
//   endPoint,
//   configuration,
// );

// 根据AliyunOss配置AccessKey
AliyunOSS.initWithPlainTextAccessKey(
  accesskeyId,
  accesskeySecret,
  endPoint,
  configuration,
);

export default class OssUpload extends Component {
  static navigationOptions = {
    title: '书架',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: 'green',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  // 构造
  constructor(props) {
    super(props);
  }

  createBucket() {
    AliyunOSS.asyncCreateBucket('tyluoluo', 'private', 'oss-cn-beijing')
      .then(e => {
        // createBucket success
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }

  download() {
    // xxx为图片处理选项，具体可查看官网
    let objectkey = 'oss-accesslog/gonewlife22019-07-28-14-00-00-0001';
    AliyunOSS.asyncDownload(bucketName, objectkey, null, {
      'x-oss-process': 'style/cover',
    })
      .then(e => {
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getBucketAcl() {
    // {"BucketAcl": "private", "ID": "1468087247912471", "Owner": "1468087247912471"}
    AliyunOSS.asyncGetBucketACL('tyluoluo')
      .then(e => {
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }

  listBuckets() {
    AliyunOSS.asyncListBuckets()
      .then(e => {
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBucket() {
    AliyunOSS.asyncDeleteBucket('tyluoluo')
      .then(e => {
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }

  listObjects() {
    AliyunOSS.asyncListObjects(bucketName, {
      prefix: 'oss-accesslog',
    })
      .then(e => {
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }

  doesObjectExist() {
    AliyunOSS.doesObjectExist(bucketName, '155289650728607810.jpg')
      .then(e => {
        // object exist
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
    AliyunOSS.doesObjectExist(bucketName, '155289650728607810x.jpg')
      .then(e => {
        // object does not exist
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }

  copyObject() {
    AliyunOSS.asyncCopyObject(
      bucketName,
      '155289650728607810.jpg',
      'tyluoluo',
      'aaa.png',
    )
      .then(e => {
        // copy success!
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text> OSS 示例 </Text>
          <Button onPress={() => this.createBucket()} title="创建Bucket" />
          <Button onPress={() => this.download()} title="下载文件" />
          <Button onPress={() => this.getBucketAcl()} title="获取ACL" />
          <Button onPress={() => this.listBuckets()} title="Bucket列表" />
          <Button onPress={() => this.deleteBucket()} title="Bucket删除" />
          <Button onPress={() => this.listObjects()} title="文件列表" />
          <Button onPress={() => this.doesObjectExist()} title="文件是否存在" />
          <Button onPress={() => this.copyObject()} title="复制文件" />
        </View>
      </>
    );
  }
}
