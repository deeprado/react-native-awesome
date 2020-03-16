import React, {Component} from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
  {
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
      // headers: ...
    },
  },
  {
    url: '',
    props: {
      // Or you can set source directory.
      source: require('../background.png'),
    },
  },
];

export default class ZoomViewerPage extends Component {
  render() {
    return (
      <Modal visible={true} transparent={true}>
        <ImageViewer imageUrls={images} />
      </Modal>
    );
  }
}
