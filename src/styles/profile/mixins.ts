/**
 * Style mixins
 * @file Mixins 预置样式
 * @module app/mixins
 */

import {StyleSheet, ViewStyle} from 'react-native';
import sizes from '../../styles/profile/sizes';

const mixins = StyleSheet.create({
  // 垂直分布，全部居中
  colCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 水平分布，垂直居中
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 头部按钮
  headerButton: {
    paddingHorizontal: sizes.gap,
  },
});

export function getHeaderButtonStyle(
  size?: number | void | null,
): {size: number; style: ViewStyle} {
  size = size != null ? size : 26;
  return {size, style: mixins.headerButton};
}

export default mixins;
