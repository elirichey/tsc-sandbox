import React from 'react';
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';

function OverviewCard(props) {
  const {height, width} = useWindowDimensions();
  const styles = stylesWithProps(height, width);

  const {data} = props;

  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        <View style={styles.placeholder_img} />
      </View>

      <View style={styles.column}>
        <Text style={styles.text}>
          This Pay period, your rewards value + hourly pay are equal to getting
          paid <Text style={styles.bold}>$15.55/hr</Text> or an additional{' '}
          <Text style={styles.bold}>$15.55/hr</Text>
        </Text>
      </View>
    </View>
  );
}

const stylesWithProps = (height, width) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#EDF4FF',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
    },

    icon_container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 20,
    },

    column: {
      flex: 1,
    },
    text: {
      // fontFamily: 'Roboto',
      fontSize: 16,
      lineHeight: 24,
      color: '#033480',
    },
    bold: {
      fontWeight: '600',
    },

    // REMOVE ONCE IMAGE IS SET
    placeholder_img: {
      height: 30,
      width: 30,
      borderColor: '#033480',
      borderWidth: 2,
      borderRadius: 15,
    },
  });
};

export default OverviewCard;
