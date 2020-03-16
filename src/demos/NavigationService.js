import {NavigationActions, StackActions} from 'react-navigation';

let navigator;
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: routeName})],
  });
  navigator.dispatch(resetAction);
}
function goBack() {
  navigator.dispatch(NavigationActions.back());
}

export default {
  navigate,
  reset,
  goBack,
  setTopLevelNavigator,
};
