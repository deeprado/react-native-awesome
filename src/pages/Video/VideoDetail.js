'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Alert,
  TouchableHighlight,
  Modal,
  TextInput,
  Button,
} from 'react-native';

import Video from 'react-native-video';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {IS_IOS} from '../../config';
import {CommentItem} from '../../components/comment/item';
import fonts from '../../styles/profile/fonts';
import colors from '../../styles/profile/colors';
import sizes from '../../styles/profile/sizes';
import mixins from '../../styles/profile/mixins';
import {TouchableView} from '../../components/common/touchable-view';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

class VideoDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,

      loaded: false,
      rowData: this.props.navigation.state.params.data,

      comments: [],
      pagination: {
        total: 0,
        current_page: 1,
        total_page: 1,
        per_page: 10,
      },
      isNoMoreData: false,
      isLoading: false,

      modalVisible: false,
      value: '',
    };

    this.fetchComments = this.fetchComments.bind(this);
    this.updateLoadingState = this.updateLoadingState.bind(this);
    this.updateResultData = this.updateResultData.bind(this);
    this.getCommentKey = this.getCommentKey.bind(this);
    this.handleLoadmoreArticle = this.handleLoadmoreArticle.bind(this);
    this.handlePressAuthor = this.handlePressAuthor.bind(this);
    this.handleReplyComment = this.handleReplyComment.bind(this);
    this.handleLikeComment = this.handleLikeComment.bind(this);
    this.renderListEmptyView = this.renderListEmptyView.bind(this);
    this.renderListFooterView = this.renderListFooterView.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._submitComment = this._submitComment.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  // 加载时
  onLoad = data => {
    this.setState({duration: data.duration});
  };

  // 播放中
  onProgress = data => {
    this.setState({currentTime: data.currentTime});
  };

  // 结束
  onEnd = () => {
    this.setState({paused: true});
    this.video.seek(0);
  };

  // 当音频输出从耳机等外部源切换回内部扬声器时
  onAudioBecomingNoisy = () => {
    this.setState({paused: true});
  };

  onAudioFocusChanged = event => {
    this.setState({paused: !event.hasAudioFocus});
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  renderRateControl(rate) {
    const isSelected = this.state.rate === rate;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({rate});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = this.state.resizeMode === resizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({resizeMode});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  }

  renderVolumeControl(volume) {
    const isSelected = this.state.volume === volume;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({volume});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }

  // 可用带宽更改时
  onBandwidthUpdate = () => {
    console.log('onBandwidthUpdate');
  };
  // 当前播放视频的外部播放模式已更改时
  onExternalPlaybackChange = () => {
    console.log('onExternalPlaybackChange');
  };
  // 播放器即将进入全屏模式时
  onFullscreenPlayerWillPresent = () => {
    console.log('onFullscreenPlayerWillPresent');
  };
  // 播放器进入全屏模式时
  onFullscreenPlayerDidPresent = () => {
    console.log('onFullscreenPlayerDidPresent');
  };
  // 播放器即将退出全屏模式时
  onFullscreenPlayerWillDismiss = () => {
    console.log('onFullscreenPlayerWillDismiss');
  };
  // 播放器退出全屏模式时
  onFullscreenPlayerDidDismiss = () => {
    console.log('onFullscreenPlayerDidDismiss');
  };
  // 媒体开始加载时
  onLoadStart = () => {
    console.log('onLoadStart');
  };
  // 当第一个视频帧准备好显示时 这是删除海报的时间
  onReadyForDisplay = () => {
    this.setState({
      loaded: true,
    });
    console.log('onReadyForDisplay');
  };
  // 当画中画激活或不激活时调用的回调函数。
  onPictureInPictureStatusChanged = () => {
    console.log('onPictureInPictureStatusChanged');
  };
  // 播放速率更改时暂停或开始/继续播放时
  onPlaybackRateChange = () => {
    console.log('onPlaybackRateChange');
  };
  // 搜索完成时
  onSeek = () => {
    console.log('onSeek');
  };
  // 对应于Apple的回调函数restoreUserInterfaceForPictureInPictureStopWithCompletionHandler。
  // restoreUserInterfaceForPictureInPictureStopCompleted恢复完用户界面后，请在此函数内部调用。
  onRestoreUserInterfaceForPictureInPictureStop = () => {
    console.log('onRestoreUserInterfaceForPictureInPictureStop');
  };
  // 定时元数据可用时
  onTimedMetadata = () => {
    console.log('onTimedMetadata');
  };

  renderListEmptyView() {
    const commonIconOptions = {
      name: 'ios-arrow-down',
      size: 19,
    };
    const commonIconStyles = {
      color: '#777777',
    };

    if (this.state.isLoading) {
      return null;
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.normalTitle}>暂无数据，下拉刷新重试</Text>
        <View style={{marginTop: 20}}>
          <Ionicon {...commonIconOptions} style={commonIconStyles} />
          <Ionicon
            {...commonIconOptions}
            style={[commonIconStyles, {marginTop: -14}]}
          />
        </View>
      </View>
    );
  }

  renderListFooterView() {
    if (!this.state.comments.length) {
      return null;
    }

    if (this.state.isLoading) {
      return (
        <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
          <ActivityIndicator
            animating={true}
            style={{marginRight: 5}}
            size={'small'}
          />
          <Text style={styles.smallTitle}>加载中</Text>
        </View>
      );
    }

    if (this.state.isNoMoreData) {
      return (
        <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
          <Text style={styles.smallTitle}>没有更多</Text>
        </View>
      );
    }

    return (
      <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
        <Ionicon name="ios-arrow-dropup" style={{color: '#777777'}} />
        <Text style={[styles.smallTitle, {marginLeft: 5}]}>加载更多</Text>
      </View>
    );
  }

  handleLoadmoreArticle() {
    if (
      !this.state.isNoMoreData &&
      !this.state.isLoading &&
      this.state.pagination
    ) {
      this.fetchComments(this.state.pagination.current_page + 1);
    }
  }

  getCommentKey(comment, index = 0) {
    return `index:${index}:sep:${comment.id}`;
  }

  handleLikeComment(comment) {
    Alert.alert('去 Web 端操作');
  }

  handleReplyComment(comment) {
    Alert.alert('去 Web 端操作');
  }

  handlePressAuthor(author) {
    Alert.alert('更多详细信息要去 Web 端操作');
  }

  updateLoadingState(loading) {
    this.setState({
      isLoading: loading,
    });
  }

  updateResultData(resultData) {
    const {data, pagination} = resultData;
    this.updateLoadingState(false);
    let comments = this.state.comments;
    if (pagination.current_page > 1) {
      comments.push(...data);
    } else {
      comments = data;
    }
    this.setState({
      pagination: pagination,
      comments: comments,
    });
  }

  fetchComments(page = 1) {
    this.updateLoadingState(true);
    const params = {
      per_page: 10,
      page,
    };

    let comments = [];
    let max = 10;
    for (let i = 0; i < max; i++) {
      let tmp = {
        id: (page - 1) * 10 + i + 1,
        pid: 0,
        author: {
          name: 'xxxx',
          email: 'test.com',
          site: 'aaaaaaaaa',
        },
        ip_location: {
          city: '哈尔滨',
        },
        create_at: '2019/12/3',
        content: 'tttttttttttt',
        likes: 23,
      };
      comments.push(tmp);
    }

    this.updateResultData({
      pagination: {
        total: 100,
        current_page: page,
        total_page: 10,
        per_page: 10,
      },
      data: comments,
    });

    //     return comment;
    // return fetch
    //   .get('/comment', params)
    //   .then(comment => {
    //     this.updateResultData(comment.result);
    //     return comment;
    //   })
    //   .catch(error => {
    //     this.updateLoadingState(false);
    //     console.warn('Fetch comment list error:', error);
    //     return Promise.reject(error);
    //   });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  onDismiss() {
    console.log('onDismiss');
  }
  _closeModal() {
    console.log('close');
    this.setModalVisible(false);
  }

  onChangeText(text) {
    console.log(text);
    this.setState({
      value: text,
    });
  }

  _submitComment() {
    if (!this.state.value) {
      Alert.alert('bunengweikong');
      return;
    }
    let comments = this.state.comments;
    let last = comments[comments.length - 1];
    let tmp = {
      id: last.id + 1,
      pid: 0,
      author: {
        name: 'xxxx',
        email: 'test.com',
        site: 'aaaaaaaaa',
      },
      ip_location: {
        city: '哈尔滨',
      },
      create_at: '2019/12/3',
      content: this.state.value,
      likes: 23,
    };
    console.log(tmp);
    comments.push(tmp);

    this.setState(
      {
        comments: comments,
        value: '',
      },
      () => {
        // TODO post data to backend
        // TODO refresh data cache
        console.log('callback');
      },
    );

    this.setModalVisible(false);
  }
  renderModalView() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onDismiss={this.onDismiss}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalContainer}>
          <Icon
            name={'ios-close-circle-outline'}
            size={45}
            onPress={this._closeModal}
            style={styles.closeBtn}
          />
          <View style={styles.commentBox}>
            <TextInput
              placeholder={'过来评论一下吧'}
              multiline={true}
              numberOfLines={4}
              style={styles.commentContent}
              onChangeText={text => this.onChangeText(text)}
              defaultValue={this.state.value}
              editable
              maxLength={40}
            />
          </View>
          <View style={styles.btnBox}>
            <Button
              style={styles.commentSubBtn}
              onPress={this._submitComment}
              title="评论一下"
            />
          </View>
        </View>
      </Modal>
    );
  }
  renderToolBoxView() {
    const {isLoading, pagination} = this.state;
    console.log('pagination', pagination);
    return (
      <View style={styles.toolBox}>
        {pagination && pagination.total ? (
          <Text>{pagination.total} 条数据</Text>
        ) : (
          <Text>{isLoading ? '加载中' : '无数据'}</Text>
        )}
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>添加评论</Text>
        </TouchableHighlight>
        <TouchableView
          accessibilityLabel="切换排序模式"
          onPress={this.handleToggleSortType}>
          <Ionicon name="ios-funnel" size={17} style={styles.toolSort} />
          <Ionicon
            name={this.isSortByHot ? 'ios-happy' : 'ios-time'}
            color={this.isSortByHot ? colors.primary : colors.textDefault}
            size={13}
            style={styles.toolSortType}
          />
        </TouchableView>
      </View>
    );
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    let comments = this.state.comments.reverse();
    return (
      <View style={styles.container}>
        {/* 视频播放 */}
        <View style={styles.videoContainer}>
          <TouchableOpacity
            style={styles.videoBox}
            onPress={() => this.setState({paused: !this.state.paused})}>
            <Video
              ref={ref => {
                this.video = ref;
              }}
              source={{uri: this.state.rowData.url}}
              // source={require('../../assets/video/Animation_Custom.mp4')}
              style={styles.videoBox}
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              repeat={false}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              onAudioFocusChanged={this.onAudioFocusChanged}
              onBandwidthUpdate={this.onBandwidthUpdate}
              onExternalPlaybackChange={this.onExternalPlaybackChange}
              onFullscreenPlayerWillPresent={this.onFullscreenPlayerWillPresent}
              onFullscreenPlayerDidPresent={this.onFullscreenPlayerDidPresent}
              onFullscreenPlayerWillDismiss={this.onFullscreenPlayerWillDismiss}
              onFullscreenPlayerDidDismiss={this.onFullscreenPlayerDidDismiss}
              onLoadStart={this.onLoadStart}
              onReadyForDisplay={this.onReadyForDisplay}
              onPictureInPictureStatusChanged={
                this.onPictureInPictureStatusChanged
              }
              onPlaybackRateChange={this.onPlaybackRateChange}
              onSeek={this.onSeek}
              onRestoreUserInterfaceForPictureInPictureStop={
                this.onRestoreUserInterfaceForPictureInPictureStop
              }
              onTimedMetadata={this.onTimedMetadata}
            />
            {!this.state.loaded ? (
              <ActivityIndicator
                color="red"
                size="large"
                style={styles.loading}
              />
            ) : null}
          </TouchableOpacity>

          <View style={styles.controls}>
            <View style={styles.generalControls}>
              <View style={styles.rateControl}>
                {this.renderRateControl(0.25)}
                {this.renderRateControl(0.5)}
                {this.renderRateControl(1.0)}
                {this.renderRateControl(1.5)}
                {this.renderRateControl(2.0)}
              </View>

              <View style={styles.volumeControl}>
                {this.renderVolumeControl(0.5)}
                {this.renderVolumeControl(1)}
                {this.renderVolumeControl(1.5)}
              </View>

              <View style={styles.resizeModeControl}>
                {this.renderResizeModeControl('cover')}
                {this.renderResizeModeControl('contain')}
                {this.renderResizeModeControl('stretch')}
              </View>
            </View>

            <View style={styles.trackingControls}>
              <View style={styles.progress}>
                <View
                  style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
                />
                <View
                  style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
                />
              </View>
            </View>
          </View>
        </View>
        {/* 评论列表 */}
        <View style={styles.commentContainer}>
          {this.renderToolBoxView()}
          {this.renderModalView()}
          <View style={styles.comment}>
            <FlatList
              style={styles.commentListView}
              data={comments}
              // ref={this.listElement}
              // 首屏渲染多少个数据
              initialNumToRender={8}
              // 列表为空时渲染
              ListEmptyComponent={this.renderListEmptyView}
              // 加载更多时渲染
              ListFooterComponent={this.renderListFooterView}
              // 当前列表 loading 状态
              refreshing={this.state.isLoading}
              // 刷新
              onRefresh={this.fetchComments}
              // 加载更多安全距离（相对于屏幕高度的比例）
              onEndReachedThreshold={IS_IOS ? 0.02 : 0.2}
              // 加载更多
              onEndReached={this.handleLoadmoreArticle}
              // 手势滚动
              // onScroll={this.props.onScroll}
              // 唯一 ID
              keyExtractor={this.getCommentKey}
              // 单个主体
              renderItem={({item: comment, index}) => {
                return (
                  <CommentItem
                    key={this.getCommentKey(comment, index)}
                    darkTheme={false}
                    comment={comment}
                    liked={false}
                    onLike={this.handleLikeComment}
                    onReply={this.handleReplyComment}
                    onPressAuthor={this.handlePressAuthor}
                  />
                );
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viceoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'red',
  },
  videoBox: {
    width: '100%',
    height: 300,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 10,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 10,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  trackingControls: {
    borderRadius: 10,
  },
  loading: {
    position: 'absolute',
    left: 0,
    width: width,
    top: 150,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  commentContainer: {
    flex: 1,
    position: 'relative',
  },
  comment: {
    flex: 1,
  },
  commentListView: {
    // backgroundColor: '#191919',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadmoreViewContainer: {
    flexDirection: 'row',
    padding: 0.618 * 20,
  },
  smallTitle: {
    ...fonts.small,
    color: '#777777',
  },

  toolBox: {
    ...mixins.rowCenter,
    justifyContent: 'space-between',
    height: sizes.gap * 2,
    paddingHorizontal: sizes.gap,
    borderColor: colors.border,
    borderTopWidth: sizes.borderWidth,
    borderBottomWidth: sizes.borderWidth,
    backgroundColor: colors.cardBackground,
  },
  toolSort: {
    marginRight: 8,
    color: colors.textDefault,
  },
  toolSortType: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  closeBtn: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 80,
    color: 'red',
  },
  commentBox: {
    marginTop: 10,
  },
  commentContent: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  btnBox: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  commentSubBtn: {
    width: 80,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    color: 'red',
    fontSize: 18,
  },
});

export default VideoDetail;
