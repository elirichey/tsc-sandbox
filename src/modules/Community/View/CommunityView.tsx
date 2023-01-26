import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {enUS} from 'date-fns/locale';
import {formatDistanceToNow} from 'date-fns';

// Proposed Packages
import ImageView from 'react-native-image-viewing';
import {LinkPreview} from '@flyerhq/react-native-link-preview';

const images: Array<any> = [
  {
    type: 'image',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWkk_U_qjkhpocszZ3udC6BDRT6MXyJlw1TwycO5FAoc65_6kn71tbq1_7i6dIay-wlXQ&usqp=CAU',
  },
];

const oneMinute: number = 1000 * 60;
const oneHour: number = oneMinute * 60;
const oneDay: number = oneHour * 24;

const posts = [
  // Basic
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: {
      avatar:
        'https://media.licdn.com/dms/image/C4E03AQGF3upDt8Y37A/profile-displayphoto-shrink_800_800/0/1578682863751?e=2147483647&v=beta&t=NGMJrBJcSAgJDLGPhHBbxmOgFH-Rk3wjkoXFO-uRwfo',
      fullName: 'Hal Lawton',
      title: 'President & CEO of TSC',
    },
    post: {
      date: `${new Date(new Date() - oneDay)}`,
      text: 'Congrats to the Hillsborough, NC Tractor Supply (#302) for having the most sales last month!',
      attachments: null,
      link: null,
    },
  },

  // Single Image
  {
    id: 'ad7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: {
      avatar:
        'https://s23.q4cdn.com/539497486/files/images/management/2021/07/John-Ordus.jpg',
      fullName: 'John Ordus',
      title: 'Executive VP & Chief Stores Officer',
    },
    post: {
      date: `${new Date(new Date().getTime() - oneHour)}`,
      text: 'The Tractor Supply Foundation is honored to support the Boys & Girls Club of Middle Tennessee this #GivingTuesday. A $50k grant will go toward new computers, a 3D printer, books, and laptops.',
      attachments: images,
      link: null,
    },
  },

  // Link
  {
    id: '8d7acbda-c1b1-46c2-aed5-3ad53abf28ba',
    user: {
      avatar:
        'https://media.licdn.com/dms/image/C4E03AQGF3upDt8Y37A/profile-displayphoto-shrink_800_800/0/1578682863751?e=2147483647&v=beta&t=NGMJrBJcSAgJDLGPhHBbxmOgFH-Rk3wjkoXFO-uRwfo',
      fullName: 'Hal Lawton',
      title: 'President & CEO of TSC',
    },
    post: {
      date: `${new Date(new Date().getTime() - oneMinute)}`,
      text: 'As 2022 comes to a close, Tractor Supply is gearing up for a special year ahead. 2023 marks 85 years in business for our company. The coming year will be one of celebration but also excitement…',
      attachments: null,
      link: 'https://tractorsupply.com',
    },
  },
];

function CommunityView(): JSX.Element {
  const {height, width} = useWindowDimensions();

  const [visible, setIsVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const styles = stylesWithProps(height, width);

  const formatTimeDiff = (val: string) => {
    const isMinute: boolean = val.includes('minute');
    const isMinutes: boolean = val.includes('minutes');
    const isHour: boolean = val.includes('hour');
    const isHours: boolean = val.includes('hours');
    const isDay: boolean = val.includes('day');
    const isDays: boolean = val.includes('days');
    const isYear: boolean = val.includes('year');
    const isYears: boolean = val.includes('years');

    const strippedValue: string = val.replace(/[^0-9]/g, '');
    let result: string;
    if (isMinute || isMinutes) {
      if (!strippedValue) result = `0m`;
      else result = `${strippedValue}m`;
    } else if (isHour || isHours) result = `${strippedValue}h`;
    else if (isDay || isDays) result = `${strippedValue}d`;
    else if (isYear || isYears) result = `${strippedValue}y`;
    else result = val;
    return result;
  };

  const renderItem = (val: {item: any; index: number}) => {
    const {item, index} = val;
    const {user, post} = item;

    const postDate = new Date(post.date);

    const timeDiff: string = formatTimeDiff(
      formatDistanceToNow(postDate, {locale: enUS}),
    );

    const userImage: any = user?.avatar
      ? {uri: user.avatar}
      : {uri: 'https://via.placeholder.com/48/00FF00'};

    const isLastItem = posts.length - 1 === index;

    const hasAttachments: boolean =
      post.attachments && post.attachments.length > 0;
    const isGallery: boolean =
      hasAttachments && post.attachments[0].type === 'image';
    const isLink: boolean = post.link && post.link !== '';

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

          <Text style={styles.post_body_txt}>{post?.text}</Text>

          {isGallery ? (
            <>
              <Pressable
                onPress={() => {
                  setInitialIndex(0);
                  setIsVisible(true);
                }}
                style={styles.image_container}>
                <Image
                  source={{uri: post.attachments[0].uri}}
                  style={styles.image_preview}
                />
              </Pressable>

              <ImageView
                images={post.attachments}
                imageIndex={initialIndex}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
              />
            </>
          ) : null}

          {isLink ? (
            <>
              <LinkPreview
                text={post.link}
                //renderText={() => (
                //  <Text
                //    style={styles.link_title}
                //    numberOfLines={1}
                //    ellipsizeMode="clip">
                //    {post.link}
                //  </Text>
                //)}
                //renderHeader={() => <Text>Header</Text>}
                //renderDescription={() => null}
                //containerStyle={styles.link_container}
                //textContainerStyle={styles.link_txt_container}
                enableAnimation
                // renderLinkPreview={}
              />
            </>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.flatlist_container}
    />
  );
}

const stylesWithProps = (height: number, width: number) => {
  return StyleSheet.create({
    flex1: {flex: 1},
    row: {flexDirection: 'row'},
    column: {flexDirection: 'column'},

    pt16: {paddingTop: 16},
    pb16: {paddingBottom: 16},

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

    // Elements

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

    image_container: {
      height: (width - 96) * 0.5156,
      width: width - 96,
      borderRadius: 12,
      backgroundColor: '#000112',
      overflow: 'hidden',
      marginTop: 16,
    },

    image_preview: {
      flex: 1,
    },

    // Link

    link_container: {
      height: 50,
      backgroundColor: '#EDF4FF',
      marginTop: 16,
      borderRadius: 12,
    },
    link_title: {
      marginBottom: -16,
      color: '#033480',
    },
    link_txt_container: {
      height: 16,
    },
  });
};

export default CommunityView;
