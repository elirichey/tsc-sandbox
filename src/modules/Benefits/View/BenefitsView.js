import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  Alert,
} from 'react-native';

function CommunityView() {
  const {height, width} = useWindowDimensions();
  const styles = stylesWithProps(height, width);

  const hasBenefits = true;

  const renderNoBenefits = () => {
    return (
      <View style={styles.no_benefits_container}>
        <Text style={[styles.no_benefits_txt, styles.bold]}>
          No benefits info available
        </Text>

        <Text style={styles.no_benefits_txt}>
          Contact HR for more information
        </Text>
      </View>
    );
  };

  const renderBenefits = () => {
    return (
      <View>
        <Pressable
          style={styles.benefit_card}
          onPress={() => Alert.alert('Pressed')}>
          <View style={styles.red_line} />

          <Text style={styles.benefits_provider}>United Healthcare</Text>

          <Text style={styles.benefits_plan}>Silver Plan</Text>

          <View style={styles.coverage_type}>
            <Text style={styles.coverage_txt}>Team Member + Family</Text>
          </View>

          <View style={styles.coverage_img_container}>
            <Image
              source={{
                uri: 'https://www.digitary.net/wp-content/uploads/2022/08/placeholder.png',
              }}
              style={styles.coverage_img}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.red_btn}
          onPress={() => Alert.alert('Pressed')}>
          <Text style={styles.btn_txt}>View Your Benefits</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {hasBenefits ? renderBenefits() : renderNoBenefits()}
    </View>
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
    bold: {fontWeight: '700'},

    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 16,
      paddingVertical: 24,
    },

    // No Benefits

    no_benefits_container: {
      height: 120,
      borderColor: '#B0B0B0',
      borderWidth: 1,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    no_benefits_txt: {
      // fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },

    // Benefits Info - Card

    benefit_card: {
      borderRadius: 26,
      backgroundColor: '#D2E3FF',
      position: 'relative',
      paddingHorizontal: 16,
      paddingVertical: 32,
      marginBottom: 24,
      overflow: 'hidden',
      borderColor: '#D2E3FF',
      borderWidth: 1,
    },

    red_line: {
      width: 40,
      height: 4,
      backgroundColor: '#CD333D',
      borderRadius: 2,
    },
    benefits_provider: {
      // fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      marginTop: 22,
      marginBottom: 8,
    },
    benefits_plan: {
      // fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
      color: '#033480',
      marginBottom: 45,
    },
    coverage_type: {
      height: 24,
      width: 163,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
    },
    coverage_txt: {
      // fontFamily: 'Roboto',
      fontSize: 12,
      fontWeight: '700',
      lineHeight: 12,
      color: '#033480',
    },

    coverage_img_container: {
      position: 'absolute',
      height: 120,
      width: 120,
      top: 48,
      right: -12,
      backgroundColor: 'blue',
    },
    coverage_img: {
      height: 120,
      width: 120,
    },

    // Benefits Info - Button

    red_btn: {
      width: width - 32,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#CD333D',
      borderRadius: 40,
    },
    btn_txt: {
      // fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      color: '#FFF',
    },
  });
};
export default CommunityView;
