import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const logo = require('../../static/img/logo.png');

export default class MyPage extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: () => <Text style={{textAlign: 'center'}}>我的</Text>,
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
      headerRight: () => (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#fff"
        />
      ),
      headerTitleStyle: {
        textAlign: 'center',
      },
    };
  };

  // 构造
  constructor(props) {
    super(props);
    this._getMoviesFromApiAsync = this._getMoviesFromApiAsync.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this._setMovies = this._setMovies.bind(this);
    this.goHomePage = this.goHomePage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goCartPage = this.goCartPage.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({increaseCount: this._increaseCount});
  }

  state = {
    count: 0,
    movies: [],
  };

  _increaseCount = () => {
    this.setState({count: this.state.count + 1});
  };

  // 获取数据
  _getMoviesFromApiAsync(callback) {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        callback && callback(responseJson.movies);
      })
      .catch(error => {
        console.error(error);
      });
  }

  _setMovies(movies) {
    this.setState({
      movies: movies,
    });
  }

  getMovies = () => {
    this._getMoviesFromApiAsync(this._setMovies);
  };

  goHomePage = () => {
    this.props.navigation.navigate('Home');
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  goCartPage = () => {
    this.props.navigation.navigate('CartPage');
  };

  render() {
    const listItems = this.state.movies.map(movie => (
      <View key={movie.id}>
        <Text>
          {movie.title} {movie.releaseYear}
        </Text>
      </View>
    ));
    return (
      <>
        <View style={styles.container}>
          <Text>我的</Text>
          <Button title="返回主页" onPress={this.goHomePage} />
          <Button title="进入购物车" onPress={this.goCartPage} />
          <Button title="返回" onPress={this.goBack} />
          <Text>{this.state.count}</Text>
          <TouchableOpacity onPress={this.getMovies}>
            <Image source={logo} />
          </TouchableOpacity>
          <Image source={logo} />
          <View>{listItems}</View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
