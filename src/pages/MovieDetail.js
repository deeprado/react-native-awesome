import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import ShopCenter from './ShopCenter';
import styles from '../styles/Main';
import {ScrollView} from 'react-native-gesture-handler';
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

const REQUEST_URL =
  'https://api.douban.com/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a';

export default class MovieDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: `${params.title ? params.title : '电影'}`,
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
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      },
      // 导航栏的样式
      headerStyle: {
        backgroundColor: '#6a51ae',
        color: '#fff',
      },
      headerLayoutPreset: 'center',
      headerBackTitle: '推荐电影',
      // headerLeft: <Text>推荐电影</Text>,
    };
  };

  // 构造
  constructor(props) {
    super(props);

    // console.log(this.props.navigation.state.params.movie);
    const movie = this.props.navigation.state.params.movie;

    this.state = {
      movie: movie ? movie : {},
      loaded: false,
    };
    // this.fetchData();
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    // if (!this.state.movie) {
    this.fetchData();
    // }
    // this.timer = setTimeout(() => {
    //   this.completeLoad();
    // }, 1500);
  }

  completeLoad() {
    this.setState({
      loaded: true,
    });
  }

  componentWillUnmount() {
    // 请注意Un"m"ount的m是小写

    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  // 网络请求——获取数据
  fetchData() {
    fetch(REQUEST_URL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseData => {
        let data = responseData; //获取json 数据并存在data数组中
        // console.log(data);
        let newMovie = Object.assign(this.state.movie, {
          summary: data.summary,
        });
        this.setState({
          // 复制数据源
          movie: newMovie,
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
    const movie = this.state.movie;
    let summary = movie.summary.split(/\n/).map(p => {
      return (
        <View style={{marginBottom: 15, paddingLeft: 6, paddingRight: 6}}>
          <Text style={styles.itemText}>{p}</Text>
        </View>
      );
    });
    return (
      <>
        <View style={styles.container}>
          <StatusBar
            translucent={false}
            backgroundColor="#6a51ae"
            barStyle="dark-content"
          />

          {/* 主要信息 */}
          <ScrollView>
            <View style={styles.item}>
              <View style={styles.itemImage}>
                <Image
                  source={{uri: movie.images.large}}
                  style={styles.image}
                />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemHeader}>{movie.title}</Text>
                <Text style={styles.itemMeta}>
                  {movie.original_title} ({movie.year})
                </Text>
                <Text style={styles.itemMeta}>
                  {movie.genres.map((item, index) => {
                    return <Text key={index}>{item} </Text>;
                  })}
                </Text>
                <Text style={styles.itemMeta}>{movie.rating.average}</Text>
                <View style={styles.casts}>
                  {movie.casts.map(item => {
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
            {/* 简介 */}
            <View style={{marginTop: 20}}>{summary}</View>
            {/* 演员 */}
            <View>
              <ShopCenter />
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}
