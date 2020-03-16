import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import IndexPage from '../pages/Home/IndexPage';
import MyPage from '../pages/Mine/MyPage';
import SplashPage from '../pages/Splash/SplashPage';
import CartPage from '../pages/Chat/CartPage';
import CategoryPage from '../pages/Category/CategoryPage';

const AppNavigator = createStackNavigator(
  {
    SplashPage: {
      screen: SplashPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    IndexPage: {
      screen: IndexPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    Home: {
      screen: IndexPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    CategoryPage: {
      screen: CategoryPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    CartPage: {
      screen: CartPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

export default createAppContainer(AppNavigator);
// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
