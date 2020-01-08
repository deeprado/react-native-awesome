/**
 * Common header
 * @file 全局公共头部组件
 * @module app/components/layout/header
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Text} from '../../components/common/text';
import {DoubleClick} from '../../components/common/double-click';
import colors from '../../styles/profile/colors';
import fonts from '../../styles/profile/fonts';
import {IS_IOS} from '../../config';

interface IHeaderProps {
  onDoubleClick?(): void;
  title?: string;
}

export const CustomHeader = observer(
  (props: IHeaderProps): JSX.Element => {
    const {title, onDoubleClick} = props;
    const {styles} = headerStyles;

    function handleClick() {
      onDoubleClick && onDoubleClick();
    }

    return (
      <DoubleClick onDoubleClick={handleClick}>
        <Text style={styles.title}>{title}</Text>
      </DoubleClick>
    );
  },
);

export const headerStyles = observable({
  get styles() {
    return StyleSheet.create({
      title: {
        ...fonts.h3,
        fontSize: IS_IOS ? 21 : fonts.h3.fontSize,
        fontWeight: 'bold',
        color: colors.cardBackground,
      },
    });
  },
});
