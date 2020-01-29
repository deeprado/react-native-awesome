import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Platform,
  View,
  Arrow,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeIconWithBadge from '../components/HomeIconWithBadge';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import {
  Avatar,
  Badge,
  Header,
  PricingCard,
  SearchBar,
} from 'react-native-elements';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import MovieTalk from '../pages/Movie/MovieTalk';
import MovieDetail from '../pages/Movie/MovieDetail';

const isAndroid = Platform.OS === 'ios' ? false : true;

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    headerTitle: '首页',
  };
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#6a51ae');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <Header
            leftComponent={{icon: 'menu', color: '#fff'}}
            centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
            rightComponent={{icon: 'home', color: '#fff'}}
          />
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <Calendar
            // Initially visible month. Default = Date()
            current={'2012-03-01'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2012-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log('selected day', day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={direction => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={true}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
          />
          <PricingCard
            color="#4f9deb"
            title="Free"
            price="$0"
            info={['1 User', 'Basic Support', 'All Core Features']}
            button={{title: 'GET STARTED', icon: 'flight-takeoff'}}
          />
          <Text style={[styles.paragraph, {color: 'green'}]}>Light Screen</Text>
          <Avatar
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
          <View>
            <Avatar
              rounded
              source={{
                uri: 'https://randomuser.me/api/portraits/men/41.jpg',
              }}
              size="large"
            />

            <Badge
              status="success"
              containerStyle={{position: 'absolute', top: -4, right: -4}}
            />
          </View>
          <Button
            title="Next screen"
            onPress={() => this.props.navigation.navigate('Other')}
            color={isAndroid ? 'blue' : '#fff'}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paragraph: {},
});

const StackNavigator = createStackNavigator(
  {
    MovieTalk: {
      screen: MovieTalk,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: {
        gesturesEnabled: true,
      },
    },
  },
  {
    mode: 'card',
    // headerMode: 'none',
    initialRouteName: 'MovieTalk',
    tabBarLabel: '电影',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Other: StackNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Other') {
          iconName = `ios-stats`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabNavigator);
