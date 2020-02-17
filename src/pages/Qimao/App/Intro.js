import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Carousel} from '@ant-design/react-native';

const {width, height} = Dimensions.get('window');

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
      pngs: [
        require('../../../assets/qimao/image/slider/s1.png'),
        require('../../../assets/qimao/image/slider/s2.png'),
        require('../../../assets/qimao/image/slider/s3.png'),
        require('../../../assets/qimao/image/slider/s4.png'),
        require('../../../assets/qimao/image/slider/s5.png'),
      ],
    };
  }

  switchPage = () => {
    this.props.switchPage && this.props.switchPage();
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  afterChange = cur => {
    if (cur === this.state.pngs.length - 1) {
      this.setState({
        showButton: true,
      });
    } else {
      this.setState({
        showButton: false,
      });
    }
  };

  _renderBtn = () => {
    if (this.state.showButton) {
      return (
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            left: (width - 200) / 2,
            width: 200,
            backgroundColor: 'red',
            borderRadius: 20,
          }}>
          <TouchableOpacity
            style={{borderRadius: 20}}
            onPress={this.switchPage}>
            <View style={styles.btn}>
              <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
                马上体验
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  render() {
    let pngs = this.state.pngs;
    return (
      <View style={styles.container}>
        <Carousel
          style={styles.wrapper}
          selectedIndex={0}
          autoplay={false}
          infinite={false}
          dotStyle={{backgroundColor: '#F5F5F5'}}
          dotActiveStyle={{backgroundColor: '#FCC800'}}
          afterChange={this.afterChange}>
          {pngs.map((item, index) => {
            return (
              <View style={styles.slide} key={index}>
                <Image source={item} style={styles.imgDefault} />
              </View>
            );
          })}
        </Carousel>
        {this._renderBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  wrapper: {
    backgroundColor: '#fff',
    height: height - StatusBar.currentHeight,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imgDefault: {
    // flex: 1,
    width: width - 20,
    height: height - StatusBar.currentHeight - 20,
  },
  imgLast: {
    // flex: 1,
    width: width - 20,
    height: height - StatusBar.currentHeight - 20,
  },
  btn: {
    padding: 10,
    backgroundColor: 'red',
    color: '#fff',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default Intro;
