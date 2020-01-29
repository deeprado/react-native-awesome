// import React, {Component} from 'react';
// import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

// import analytics from '@react-native-firebase/analytics';
import AppDemo from './src/demos/App.demo37';
// import MyApp from './src/pages/BaiduMapApp';

// gets the current screen from navigation state
// function getActiveRouteName(navigationState) {
//   if (!navigationState) {
//     return null;
//   }
//   const route = navigationState.routes[navigationState.index];
//   // dive into nested navigators
//   if (route.routes) {
//     return getActiveRouteName(route);
//   }
//   return route.routeName;
// }

// 统计
// export default () => (
//   <MyApp
//     onNavigationStateChange={(prevState, currentState, action) => {
//       const currentRouteName = getActiveRouteName(currentState);
//       const previousRouteName = getActiveRouteName(prevState);

//       if (previousRouteName !== currentRouteName) {
//         // the line below uses the @react-native-firebase/analytics tracker
//         // change the tracker here to use other Mobile analytics SDK.
//         analytics().setCurrentScreen(currentRouteName, currentRouteName);
//       }
//     }}
//   />
// );

// 模式

// export default () => <MyApp theme="light" />;

// 主题
// export default () => {
//   let theme = useColorScheme();

//   return (
//     <AppearanceProvider>
//       <MyApp theme={theme} />
//     </AppearanceProvider>
//   );
// };

// Render the app container component with the provider around it

export default AppDemo;
