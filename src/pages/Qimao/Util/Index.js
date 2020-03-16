import {Dimensions} from 'react-native';

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375;

export function px2dp(px) {
  return (px * deviceW) / basePx;
}
