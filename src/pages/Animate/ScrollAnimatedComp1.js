import React from 'react';
import {View, Animated, StyleSheet, ScrollView, Image} from 'react-native';

let deviceHeight = require('Dimensions').get('window').height;
let deviceWidth = require('Dimensions').get('window').width;

class ScrollAnimatedComp extends React.Component {
  state = {
    xOffset: new Animated.Value(0),
    xyOffset: new Animated.ValueXY({x: 0, y: 0}),
  };

  componentDidMount() {
    // new Animated.ValueXY() 类型监听
    this.state.xyOffset.addListener(value => {
      console.log('xyOffset=>x:' + value.x + ' y:' + value.y);
    });
    this.state.xyOffset.stopAnimation(value => {
      console.log('xyOffset=>x:' + value.x + ' y:' + value.y);
    });

    // new Animated.Value() 类型值监听
    this.state.xOffset.addListener(state => {
      console.log('xOffset=>' + state.value);
    });
    this.state.xOffset.stopAnimation(state => {
      console.log('xOffset=>' + state.value);
    });
  }

  // ****Animated.event是实现手势控制动画的关键，允许手势或其它事件直接绑定到动态值上。这里的Aniamted.event的输入是一个数组，用来做数据绑定 。
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: deviceWidth, height: deviceHeight}}
          scrollEventThrottle={100}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.xOffset}}}], // 把contentOffset.x绑定给this.state.xOffset
          )}>
          <Animated.Image
            source={require('../../../assets/images/watch.jpg')}
            style={{
              height: deviceHeight,
              width: deviceWidth,
              opacity: this.state.xOffset.interpolate({
                //映射到0.0,1.0之间
                inputRange: [0, deviceWidth],
                outputRange: [1.0, 0.0],
              }),
            }}
            resizeMode="cover"
          />
          <Image
            source={require('../../../assets/images/watch.jpg')}
            style={{height: deviceHeight, width: deviceWidth}}
            resizeMode="cover"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
  },
});

export default ScrollAnimatedComp;
