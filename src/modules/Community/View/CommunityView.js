import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  Linking,
  Alert,
} from 'react-native';
import {enUS} from 'date-fns/locale';
import {formatDistanceToNow} from 'date-fns';
import RenderHtml from 'react-native-render-html';

// Proposed Package - View Gallery images as Lightbox
import ImageView from 'react-native-image-viewing';

// Temp File - Delete once HTTP Request is made
import data from './data';

function CommunityView() {
  const {height, width} = useWindowDimensions();
  const styles = stylesWithProps(height, width);

  // Lifecycle
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // Image Gallery
  const [showLightbox, setShowLightbox] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  // Display
  const formatTimeDiff = val => {
    const isMinute = val.includes('minute');
    const isMinutes = val.includes('minutes');
    const isHour = val.includes('hour');
    const isHours = val.includes('hours');
    const isDay = val.includes('day');
    const isDays = val.includes('days');
    const isYear = val.includes('year');
    const isYears = val.includes('years');

    const strippedValue = val.replace(/[^0-9]/g, '');
    let result;
    if (isMinute || isMinutes) {
      if (!strippedValue) result = `0m`;
      else result = `${strippedValue}m`;
    } else if (isHour || isHours) result = `${strippedValue}h`;
    else if (isDay || isDays) result = `${strippedValue}d`;
    else if (isYear || isYears) result = `${strippedValue}y`;
    else result = val;
    return result;
  };

  // ********** Renders ********** //

  const renderEmpty = () => {
    return (
      <View style={styles.empty_container}>
        <Text>No Posts Found</Text>
      </View>
    );
  };

  const renderItem = val => {
    const {item, index} = val;
    const {user, post} = item;

    const postDate = new Date(post.date);
    const timeDiff = formatTimeDiff(
      formatDistanceToNow(postDate, {locale: enUS}),
    );

    const userImage = user?.avatar
      ? {uri: user.avatar}
      : {uri: 'https://via.placeholder.com/48/00FF00'};

    const isLastItem = data.posts.length - 1 === index;

    // Determine Post Type
    const hasAttachments = post.attachments && post.attachments.length > 0;
    const isGallery = hasAttachments && post.attachments[0].type === 'image';
    const isLink = post.link && post.link !== '';

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
                  <Text> </Text>
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

          {/* <Text style={styles.post_body_txt}>{post?.text}</Text> */}

          <RenderHtml contentWidth={width} source={{html: post.text}} />

          {isGallery ? (
            <>
              <Pressable
                testID="GALLERY_TRIGGER"
                onPress={() => {
                  setInitialIndex(0);
                  setShowLightbox(true);
                }}
                style={styles.image_container}>
                <Image
                  source={{uri: post.attachments[0].uri}}
                  style={styles.flex1}
                />
              </Pressable>

              <ImageView
                testID="GALLERY_LIGHTBOX"
                images={post.attachments}
                imageIndex={initialIndex}
                visible={showLightbox}
                onRequestClose={() => setShowLightbox(false)}
              />
            </>
          ) : null}

          {isLink ? (
            <Pressable onPress={() => Linking.openURL(post.link)}>
              <View style={styles.image_container}>
                <Image
                  source={{uri: data.images[0].uri}}
                  style={styles.flex1}
                />
              </View>
              <View style={styles.link_container}>
                <Text style={styles.txt_blue}>{post.link}</Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  };

  const posts = data.posts;

  return (
    <>
      {loading ? (
        <View style={styles.loading_container}>
          <Text style={styles.loading_txt}>Loading</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.flatlist_container}
          ListEmptyComponent={renderEmpty}
          onRefresh={async () => {
            await new Promise(resolve => {
              setTimeout(() => {
                setLoading(true);
                resolve(null);
              }, 1200);
            });

            await new Promise(resolve => {
              setTimeout(() => {
                setLoading(false);
                resolve(null);
              }, 1200);
            });
          }}
          refreshing={loading}
          onEndReached={
            posts.length > 0 ? () => Alert.alert('Load More Posts!') : null
          }
        />
      )}
    </>
  );
}

const stylesWithProps = (height, width) => {
  return StyleSheet.create({
    flex1: {flex: 1},
    row: {flexDirection: 'row'},
    column: {flexDirection: 'column'},

    pt16: {paddingTop: 16},
    pb16: {paddingBottom: 16},

    txt_blue: {color: '#033480'},

    // DELETE ONCE MOVED INTO PROJECT
    loading_container: {
      flex: 1,
      backgroundColor: '#F0F0F0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loading_txt: {
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      paddingRight: 16,
    },
    // END DELETE

    empty_container: {
      height: 230,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Container

    flatlist_container: {
      flex: 1,
      backgroundColor: '#F0F0F0',
    },

    post_item: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      paddingHorizontal: 16,
    },
    border_bottom: {
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
      paddingBottom: 16,
    },

    // Post General Info

    avatar: {
      height: 48,
      width: 48,
      borderRadius: 24,
      backgroundColor: '#F0F0F0',
      marginRight: 16,
      marginBottom: 8,
    },

    user_name: {
      // fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      paddingRight: 16,
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
      marginTop: 4,
      marginBottom: 8,
      color: '#757575',
    },

    post_body_txt: {
      // fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },

    // Post Types

    image_container: {
      height: (width - 96) * 0.5156,
      width: width - 96,
      borderRadius: 12,
      backgroundColor: '#000112',
      overflow: 'hidden',
      marginTop: 16,
    },

    link_container: {
      justifyContent: 'center',
      height: 50,
      backgroundColor: '#EDF4FF',
      paddingHorizontal: 16,
      marginTop: 8, // 16,
      borderRadius: 12,
    },

    // Empty State
  });
};

export default CommunityView;
