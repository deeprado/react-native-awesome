import React, {Component} from 'react';
import {Button, View, StyleSheet, ScrollView, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

class ImagePickerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {},
      video: {},
      photos: [],
      player: null,

      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
    };
  }

  test() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({
        img: image,
      });
    });
  }

  test1() {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      console.log(images);
      this.setState({photos: images});
    });
  }

  test2() {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
      this.setState({
        video: video,
      });
    });
  }

  test3() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({
        img: image,
      });
    });
  }

  test4() {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      console.log(image);
      this.setState({
        video: video,
      });
    });
  }

  test5() {
    ImagePicker.openCropper({
      path: 'my-file-path.jpg',
      width: 300,
      height: 400,
    }).then(image => {
      console.log(image);
    });
  }

  render() {
    return (
      <View>
        <Button title="测试" onPress={() => this.test()} />
        <Button title="测试1" onPress={() => this.test1()} />
        <Button title="测试2" onPress={() => this.test2()} />
        <Button title="测试3" onPress={() => this.test3()} />
        <Button title="测试4" onPress={() => this.test4()} />
        <Button title="测试5" onPress={() => this.test5()} />

        <Image style={styles.img} source={{uri: this.state.img.path}} />

        <ScrollView>
          {this.state.photos.map((p, i) => {
            return <Image key={i} style={styles.img} source={{uri: p.path}} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 100,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default ImagePickerPage;
