import React from 'react';
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';

function RewardsHeader(props) {
  const {height, width} = useWindowDimensions();
  const styles = stylesWithProps(height, width);

  const {data} = props;

  return <View style={styles.container}></View>;
}

const stylesWithProps = (height, width) => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
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
  });
};

export default RewardsHeader;
