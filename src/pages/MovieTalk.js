import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import styles from '../styles/Main';

const REQUEST_URL =
  'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a';

export default class MovieTalk extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {
      tabBarLabel: '电影',
      headerTitle: '推荐电影',
      headerStyle: {backgroundColor: '#6a51ae'}, //导航栏的样式
      headerTitleStyle: {
        //导航栏文字的样式
        color: '#fff',
        //设置标题的大小
        fontSize: 16,
        //居中显示
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerLayoutPreset: 'center',
    };
  };

  // 构造
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loaded: false,
    };
    // this.fetchData();
    this.fetchData = this.fetchData.bind(this);
    this.renderMovieList = this.renderMovieList.bind(this);
    this.showMovieDetail = this.showMovieDetail.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  // 网络请求——获取数据
  fetchData() {
    fetch(REQUEST_URL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        let data = responseData.subjects; //获取json 数据并存在data数组中
        // console.log(data);
        this.setState({
          // 复制数据源
          movies: data,
          loaded: true,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loaded: true,
        });
      })
      .done();
  }

  showMovieDetail(movie) {
    console.log(movie.title);
    this.props.navigation.navigate('MovieDetail', {
      title: movie.item.title,
      movie: movie.item,
    });
  }

  renderMovieList(movie) {
    // console.log(movie.item);
    // console.log(movie.item.casts);
    return (
      <TouchableOpacity onPress={() => this.showMovieDetail(movie)}>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image
              source={{uri: movie.item.images.large}}
              style={styles.image}
            />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.item.title}</Text>
            <Text style={styles.itemMeta}>
              {movie.item.original_title} ({movie.item.year})
            </Text>
            <Text style={styles.itemMeta}>
              {movie.item.genres.map((item, index) => {
                return <Text key={index}>{item} </Text>;
              })}
            </Text>
            <Text style={styles.itemMeta}>{movie.item.rating.average}</Text>
            <View style={styles.casts}>
              {movie.item.casts.map(item => {
                // console.log(item.avatars.small);
                return (
                  <Image
                    key={item.id}
                    source={{uri: item.avatars.small}}
                    style={styles.avatar}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // 给list设置的key，遍历item。这样就不会报黄线
  _keyExtractor = (item, index) => index.toString();

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>加载中...</Text>
          </View>
        </View>
      );
    }
    return (
      <>
        <View style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor="#6a51ae"
            barStyle="dark-content"
          />

          <FlatList
            data={this.state.movies}
            renderItem={this.renderMovieList}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </>
    );
  }
}
