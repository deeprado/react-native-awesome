import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../navigators/ReduxOldAppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initiaNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempState,
);

function nav(state = initiaNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: 'Login'}),
        state,
      );
      break;
    case 'BackTwoScreen':
      const key = state.routes[state.index - 1].key;
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back({key: key}),
        state,
      );
      break;
    case 'ExitApp':
      nextState = initiaNavState;
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;
