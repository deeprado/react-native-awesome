/**
 * Storage service
 * @file 本地存储服务
 * @module app/services/storage
 */

import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE} from '../constants/storage';

export function get<T>(key: STORAGE): Promise<T> {
  return AsyncStorage.getItem(key).then(data => {
    return data ? JSON.parse(data) : data;
  });
}

export function set(key: STORAGE, value: any): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

export function remove(key: STORAGE): Promise<void> {
  return AsyncStorage.removeItem(key);
}

export function clear(): Promise<void> {
  return AsyncStorage.clear();
}

export default {
  get,
  set,
  remove,
  clear,
};
