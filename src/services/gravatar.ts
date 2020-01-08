/**
 * Gravatar service
 * @file 头像计算器
 * @module app/services/gravatar
 */

import gravatar from 'gravatar';
import {EMAIL} from '../constants/regexp';
import {gravatarApi} from '../config';

export function getUrlByEmail(email: string): string {
  if (!EMAIL.test(email)) {
    return `${gravatarApi}/anonymous.jpg`;
  }
  return gravatar
    .url(email, {protocol: 'https'})
    .replace('https://s.gravatar.com/avatar', gravatarApi);
}

export default gravatar;
