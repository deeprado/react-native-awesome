import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';

var deviceHeight = require('Dimensions').get('window').height;
var deviceWidth = require('Dimensions').get('window').width;
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xOffset: new Animated.Value(1.0),
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true} //水平滑动
          showsHorizontalScrollIndicator={false}
          style={{width: deviceWidth, height: deviceHeight}} //设置大小
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.xOffset}}}], //把contentOffset.x绑定给this.state.xOffset
          )}
          scrollEventThrottle={100} //onScroll回调间隔
        >
          <Animated.Image
            source={require('./s1.jpg')}
            style={{
              height: deviceHeight,
              width: deviceWidth,
              opacity: this.state.xOffset.interpolate({
                //映射到0.0,1.0之间
                inputRange: [0, 375],
                outputRange: [1.0, 0.0],
              }),
            }}
            resizeMode="cover"
          />
          <Image
            source={require('./s2.jpg')}
            style={{height: deviceHeight, width: deviceWidth}}
            resizeMode="cover"
          />
          <Image
            source={require('./s3.jpg')}
            style={{height: deviceHeight, width: deviceWidth}}
            resizeMode="cover"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default Demo;
