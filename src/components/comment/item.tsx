import React, {PureComponent} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {observable} from 'mobx';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Text} from '../common/text';
import {TouchableView} from '../common/touchable-view';
import {IComment, IAuthor} from '../../types/business';

import {getUrlByEmail} from '../../services/gravatar';
import {dateToYMD} from '../../utils/filters';
import colors from '../../styles/profile/colors';
import sizes from '../../styles/profile/sizes';
import fonts from '../../styles/profile/fonts';
import mixins from '../../styles/profile/mixins';

export interface ICommentListItemProps {
  comment: IComment;
  liked: boolean;
  onLike(comment: IComment): void;
  onReply(comment: IComment): void;
  onPressAuthor(author: IAuthor): void;
  darkTheme: boolean;
}

export class CommentItem extends PureComponent<ICommentListItemProps> {
  render() {
    const {props} = this;
    const {comment, liked} = props;
    const {styles} = obStyles;

    return (
      <View style={styles.container}>
        <TouchableView onPress={() => this.props.onPressAuthor(comment.author)}>
          <Image
            source={{uri: getUrlByEmail(comment.author.email)}}
            style={styles.gravatar}
          />
        </TouchableView>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableView
              onPress={() => this.props.onPressAuthor(comment.author)}>
              <Text style={styles.userName} numberOfLines={1}>
                {comment.author.name}
              </Text>
            </TouchableView>
            <Text style={styles.storey} numberOfLines={1}>
              #{comment.id}
            </Text>
          </View>
          {!!comment.pid && (
            <Text style={styles.reply}>回复 #{comment.pid}:</Text>
          )}
          <Text style={styles.commentContent}>{comment.content}</Text>
          <View style={styles.footer}>
            <View style={styles.footerInfo}>
              {comment.ip_location && (
                <>
                  <Text style={styles.footerInfoItem} numberOfLines={1}>
                    {comment.ip_location.city}
                  </Text>
                  <Text style={styles.footerInfoItem}> ∙ </Text>
                </>
              )}
              <Text style={styles.footerInfoItem} numberOfLines={1}>
                {dateToYMD(comment.create_at)}
              </Text>
            </View>
            <View style={styles.footerActions}>
              <TouchableView
                style={styles.footerActionItem}
                onPress={() => this.props.onReply(comment)}>
                <Ionicon
                  name="ios-chatbubbles"
                  color={colors.textDefault}
                  size={15}
                />
              </TouchableView>
              <TouchableView
                style={styles.footerActionItem}
                accessibilityLabel={`给评论点赞：${comment.content}`}
                onPress={() => !liked && this.props.onLike(comment)}>
                <Ionicon
                  name="ios-thumbs-up"
                  size={15}
                  color={liked ? colors.red : colors.textDefault}
                />
                <Text style={{marginLeft: 5}}>{comment.likes}</Text>
              </TouchableView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        padding: sizes.goldenRatioGap,
        borderColor: colors.border,
        borderBottomWidth: sizes.borderWidth,
      },
      gravatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: 'cover',
        backgroundColor: colors.background,
      },
      content: {
        flex: 1,
        marginLeft: sizes.goldenRatioGap,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      userName: {
        ...fonts.h4,
        fontWeight: '900',
      },
      storey: {
        ...fonts.small,
        color: colors.textSecondary,
      },
      reply: {
        marginBottom: 5,
        ...fonts.small,
        color: colors.textSecondary,
      },
      commentContent: {
        lineHeight: 24,
        fontWeight: 'normal',
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
      },
      footerInfo: {
        ...mixins.rowCenter,
      },
      footerInfoItem: {
        ...fonts.small,
        color: colors.textSecondary,
      },
      footerActions: {
        ...mixins.rowCenter,
      },
      footerActionItem: {
        ...mixins.rowCenter,
        marginLeft: sizes.goldenRatioGap,
      },
    });
  },
});
