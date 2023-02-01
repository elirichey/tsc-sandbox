import React from 'react';
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';

function TotalsCard(props) {
  const {height, width} = useWindowDimensions();
  const styles = stylesWithProps(height, width);

  const {data} = props;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.dollar_txt}>
          $1,037.<Text style={styles.cents_txt}>50</Text>
        </Text>
        <Text style={styles.label_txt}>Total Hourly Pay</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.column}>
        <Text style={styles.dollar_txt}>
          $268.<Text style={styles.cents_txt}>70</Text>
        </Text>
        <Text style={styles.label_txt}>Total Rewards Value</Text>
      </View>
    </View>
  );
}

const stylesWithProps = (height, width) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 12,
      // Shadows
      shadowColor: 'rgba(0,0,0,1.5)',
      elevation: 10, // Android
      shadowOpacity: 0.125, // iOS
      shadowRadius: 5, // iOS
      shadowOffset: {height: 1, width: 1}, // iOS
    },

    divider: {
      marginVertical: 16,
      width: 1,
      backgroundColor: '#E2E2E2',
    },
    column: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    },

    dollar_txt: {
      // fontFamily: 'Roboto',
      fontWeight: 800,
      fontSize: 24,
      lineHeight: 32,
      marginBottom: 4,
    },
    cents_txt: {
      // fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 12,
    },
    label_txt: {
      // fontFamily: 'Roboto',
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
      color: '#757575',
    },
  });
};

export default TotalsCard;
