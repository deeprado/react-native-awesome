import React from 'react';
import {createAppContainer} from 'react-navigation';
import NavigationService from './NavigationService';

let AppContainer = createAppContainer();
export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
