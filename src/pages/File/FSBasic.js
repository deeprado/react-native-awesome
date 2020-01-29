import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  FlatList,
  ScrollView,
  ProgressBarAndroid,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-root-toast';

var RNFS = require('react-native-fs');
const rootPath =
  Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
const imageUrl =
  'http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg';

export default class FSBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      rootPath: rootPath,
      files: [],
      content: '',
      progress: 0,
    };
  }

  listFile() {
    const that = this;
    RNFS.readDir(rootPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result);
        that.setState({
          files: result,
        });
        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then(statResult => {
        console.log('statResult', typeof statResult, statResult);
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then(contents => {
        // log the file contents
        console.log(contents);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }

  createFile() {
    // create a path you want to write to
    // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
    // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
    var filename = 'test' + this.state.count + '.txt';
    var filepath = rootPath + '/' + filename;

    // write the file
    RNFS.writeFile(filepath, 'Lorem ipsum dolor sit amet', 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  deleteFile() {
    // create a path you want to delete
    var path = rootPath + '/test.txt';

    return (
      RNFS.unlink(path)
        .then(() => {
          console.log('FILE DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          console.log(err.message);
        })
    );
  }

  uploadFile() {
    var uploadUrl = 'http://requestb.in/XXXXXXX'; // For testing purposes, go to http://requestb.in/ and create your own link
    // create an array of objects of the files you want to upload
    var files = [
      {
        name: 'test1',
        filename: 'test1.w4a',
        filepath: rootPath + '/test1.w4a',
        filetype: 'audio/x-m4a',
      },
      {
        name: 'test2',
        filename: 'test2.w4a',
        filepath: rootPath + '/test2.w4a',
        filetype: 'audio/x-m4a',
      },
    ];

    var uploadBegin = response => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = response => {
      var percentage = Math.floor(
        (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
      );
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    // upload files
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      fields: {
        hello: 'world',
      },
      begin: uploadBegin,
      progress: uploadProgress,
    })
      .promise.then(response => {
        if (response.statusCode == 200) {
          console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
        } else {
          console.log('SERVER ERROR');
        }
      })
      .catch(err => {
        if (err.description === 'cancelled') {
          // cancelled by user
        }
        console.log(err);
      });
  }

  printPath() {
    console.log('主要bundle目录IOS' + RNFS.MainBundlePath);
    console.log('缓存目录' + RNFS.CachesDirectoryPath);
    console.log('文档目录' + RNFS.DocumentDirectoryPath);
    console.log('临时目录ios' + RNFS.TemporaryDirectoryPath);
    console.log('外部存储目录android' + RNFS.ExternalDirectoryPath);
    console.log('图片目录' + RNFS.PicturesDirectoryPath);
    console.log('外部缓存目录android' + RNFS.ExternalCachesDirectoryPath);
    console.log('外部存储目录android' + RNFS.ExternalStorageDirectoryPath);
  }

  readFile() {
    let that = this;
    const path = rootPath + '/test.txt';
    //alert(RNFS.CachesDirectoryPath)
    let content = RNFS.readFile(path)
      .then(result => {
        console.log(result);
        that.setState({
          content: result,
        });
        Toast.show('读取成功');
      })
      .catch(err => {
        console.log(err.message);
        Toast.show('读取失败');
      });
    console.log('content', content);
  }

  /*在已有的txt上添加新的文本*/
  appendFile() {
    const path = rootPath + '/test.txt';

    return RNFS.appendFile(path, '新添加的文本', 'utf8')
      .then(success => {
        console.log('success');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  updateProgress(progress) {
    this.setState({
      progress: progress,
    });
  }

  downloadFile(uri) {
    if (!uri) {
      return null;
    }
    return new Promise((resolve, reject) => {
      let timestamp = new Date().getTime(); //获取当前时间错
      let random = String((Math.random() * 1000000) | 0); // 六位随机数
      let dirs = rootPath;
      const downloadDest = `${dirs}/${timestamp + random}.jpg`;
      //const downloadDest = `${dirs}/${timestamp+random}.zip`;
      //const downloadDest = `${dirs}/${timestamp+random}.mp4`;
      //const downloadDest = `${dirs}/${timestamp+random}.mp3`;
      const formUrl = uri;
      const options = {
        fromUrl: formUrl,
        toFile: downloadDest,
        background: true,
        begin: res => {
          console.log('begin', res);
          console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        },
        progress: res => {
          let pro = res.bytesWritten / res.contentLength;
          console.log(pro);
          this.updateProgress(pro); // 下载进度
        },
      };
      console.log('options', options);
      try {
        const ret = RNFS.downloadFile(options);
        ret.promise
          .then(res => {
            console.log('success', res);
            console.log('file://' + downloadDest);
            var promise = CameraRoll.saveToCameraRoll(downloadDest);
            promise
              .then(function(result) {
                Toast.show('保存成功！地址如下：\n' + result);
              })
              .catch(function(error) {
                console.log('error', error);
                Toast.show('保存失败！\n' + error);
              });
            resolve(res);
          })
          .catch(err => {
            reject(new Error(err));
          });
      } catch (e) {
        reject(new Error(e));
      }
    });
  }

  getFileSize() {
    const path = rootPath + '/test.txt';

    return RNFS.stat(path)
      .then(StatResult => {
        console.log('success', StatResult);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <ScrollView>
        <View style={styels.container}>
          <Text>文档目录路径： {this.state.rootPath}</Text>
          <Text>react native fs 文件管理</Text>
          <Button title="列出文件" onPress={() => this.listFile()} />
          <Button title="创建文件" onPress={() => this.createFile()} />
          <Button title="删除文件" onPress={() => this.deleteFile()} />
          <Button title="输出各种路径" onPress={() => this.printPath()} />
          <Button title="读取文件" onPress={() => this.readFile()} />
          <Button title="追加文件" onPress={() => this.appendFile()} />
          <Button
            title="下载文件"
            onPress={() => this.downloadFile(imageUrl, this.updateProgress)}
          />
          <Button title="停止下载" />
          <Button title="获取文件大小" onPress={() => this.getFileSize()}
          />
          <Button title="上传文件IOS" />
          <Button title="停止上传IOS" />
        </View>
        <View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={this.state.progress}
          />
        </View>
        <View>
          <Text>{this.state.content}</Text>
        </View>
        <View style={styels.container}>
          <FlatList
            keyExtractor={this._keyExtractor}
            data={this.state.files}
            renderItem={({item, index}) => (
              <View key={index}>
                <Text>{item.name}</Text>
                <Text>{item.mtime}</Text>
                <Text>{item.path}</Text>
                <Text>{item.size}</Text>
                <Text>{item.isDirectory()}</Text>
                <Text>{item.isFile()}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
