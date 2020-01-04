/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import AppIntroDemo from './src/pages/AppIntroDemo';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';

enableScreens();

// 自定义后台任务
// import SomeTaskName from './src/task/SomeTaskName';
// const SomeTaskName = require('./src/task/SomeTaskName');
// AppRegistry.registerHeadlessTask('SomeTaskName', () => SomeTaskName);

AppRegistry.registerComponent(appName, () => App);
