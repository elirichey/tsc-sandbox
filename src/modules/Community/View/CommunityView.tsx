import React from 'react';
import {StyleSheet, FlatList, View, Text, Image} from 'react-native';
import {formatDistanceToNow} from 'date-fns';
import {enUS} from 'date-fns/locale';
import Gallery from 'react-native-image-gallery';

const images: Array<any> = [
  {type: 'image', source: 'https://via.placeholder.com/48/FF0000'},
  {type: 'image', source: 'https://via.placeholder.com/48/0F0000'},
];

const posts = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: {
      avatar: 'https://via.placeholder.com/48/0000FF',
      fullName: 'Hal Lawton',
      title: 'President & CEO of TSC',
    },
    post: {
      date: `${new Date(0)}`,
      text: `As 2022 comes to a close, Tractor Supply is gearing up for a special year ahead. 2023 marks 85 years in business for our company. The coming year will be one of celebration but also excitement…`,
      attachments: [
        {
          type: 'link',
          body: 'https://google.com',
        },
      ],
    },
  },

  {
    id: 'ad7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: {
      avatar: 'https://via.placeholder.com/48/FF0000',
      fullName: 'Hal Lawton',
      title: 'President & CEO of TSC',
    },
    post: {
      date: `${new Date()}`,
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1600s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      attachments: images,
    },
  },
];

function CommunityView(): JSX.Element {
  const renderItem = (val: {item: any; index: number}) => {
    const {item, index} = val;
    const {user, post} = item;

    const postDate = new Date(post.date);
    const timeDiff: string = formatDistanceToNow(postDate, {locale: enUS});

    const userImage: any = user?.avatar
      ? {uri: user.avatar}
      : {uri: 'https://via.placeholder.com/48/00FF00'};

    const isLastItem = posts.length - 1 === index;

    const hasAttachments = post.attachments && post.attachments.length > 0;
    const isGallery = hasAttachments && post.attachments[0].type === 'image';

    return (
      <View style={[styles.post_item, styles.pt16]}>
        <View style={[styles.column]}>
          <Image source={userImage} style={styles.avatar} />
        </View>

        <View
          style={[
            styles.column,
            styles.flex1,
            isLastItem ? styles.pb16 : styles.border_bottom,
          ]}>
          <View style={[styles.row]}>
            <Text
              style={styles.user_name}
              numberOfLines={2}
              ellipsizeMode="tail">
              {user?.fullName}

              {user.title ? (
                <>
                  <Text>{` `}</Text>
                  <Text
                    style={styles.user_title}
                    numberOfLines={1}
                    ellipsizeMode="clip">
                    {user?.title}
                  </Text>
                </>
              ) : null}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.post_date}>{timeDiff}</Text>
          </View>

          <Text style={styles.post_body_txt}>{post?.text}</Text>

          {isGallery ? (
            <Gallery
              style={{height: 50, width: 50}}
              images={post.attachments}
            />
          ) : null}
          {/*
          <Lightbox>
            <Image style={{height: 300}} source={{uri: images[0].source}} />
          </Lightbox>
          */}

          {/* Render based on type of post... */}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  row: {flexDirection: 'row'},
  column: {flexDirection: 'column'},

  pt16: {paddingTop: 16},
  pb16: {paddingBottom: 16},

  // Container

  post_item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  border_bottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 16,
  },

  // Elements

  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    marginRight: 16,
  },

  user_name: {
    // fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  user_title: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    paddingLeft: 5,
    color: '#757575',
  },

  post_date: {
    fontSize: 10,
    marginBottom: 8,
    color: '#757575',
  },

  post_body_txt: {
    // fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CommunityView;
