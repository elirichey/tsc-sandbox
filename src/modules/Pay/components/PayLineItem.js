import React from 'react';
import {StyleSheet, View, Text, useWindowDimensions} from 'react-native';

function PayLineItem(props) {
  const {height, width} = useWindowDimensions();
  const styles = stylesWithProps(height, width);

  const {data, label} = props;
  const {hourlyRate, weekly} = data;
  const {hoursWorked, storeBonus, storeDiscountSavings, healthBenefits} =
    weekly;

  const determineIndicatorBackgroundColor = () => {
    switch (label) {
      case 'Hourly Pay':
        return styles.bg_dk_blue;
      case 'Store Bonus':
        return styles.bg_lt_blue;
      case 'Store Discount Savings':
        return styles.bg_dk_red;
      case 'Health Benefits':
        return styles.bg_lt_red;
      default:
        return null;
    }
  };

  const totalEarned = hoursWorked * hourlyRate;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.row, styles.flex1]}>
            <View
              style={[
                styles.indicator_marker,
                determineIndicatorBackgroundColor(),
              ]}
            />
            <View styles={styles.flex1}>
              <Text style={[styles.title_txt, styles.bold]}>
                {label}

                {label === 'Store Bonus' ? (
                  <>
                    {' '}
                    <Text style={styles.subtext}>{`(Dec 2022)`}</Text>
                  </>
                ) : null}

                {label === 'Health Benefits' ? (
                  <>
                    {' '}
                    <Text style={styles.subtext}>{`(TSC Contribution)`}</Text>
                  </>
                ) : null}
              </Text>
            </View>

            {label === 'Hourly Pay' ? (
              <Text style={[styles.flex1, styles.title_txt, styles.txt_right]}>
                ${totalEarned.toFixed(2).toLocaleString('en-US')}
              </Text>
            ) : null}

            {label === 'Store Bonus' ? (
              <Text style={[styles.flex1, styles.title_txt, styles.txt_right]}>
                ${storeBonus.toFixed(2).toLocaleString('en-US')}
              </Text>
            ) : null}

            {label === 'Store Discount Savings' ? (
              <Text style={[styles.flex1, styles.title_txt, styles.txt_right]}>
                ${storeDiscountSavings.toFixed(2).toLocaleString('en-US')}
              </Text>
            ) : null}

            {label === 'Health Benefits' ? (
              <Text style={[styles.flex1, styles.title_txt, styles.txt_right]}>
                ${healthBenefits.toFixed(2).toLocaleString('en-US')}
              </Text>
            ) : null}
          </View>
        </View>

        {label === 'Hourly Pay' ? (
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Text style={[styles.label_txt, styles.ml_28]}>
                ${hourlyRate.toFixed(2)}/hr
              </Text>
            </View>

            <View style={styles.flex1}>
              <Text style={[styles.label_txt, styles.txt_right]}>
                Hours Worked: {hoursWorked}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      <View style={styles.divider} />
    </>
  );
}

const stylesWithProps = (height, width) => {
  return StyleSheet.create({
    container: {
      height: 80,

      justifyContent: 'center',
    },
    divider: {
      width: width - 16,
      borderBottomColor: '#E2E2E2',
      borderBottomWidth: 1,
    },

    flex0: {flex: 0},
    flex1: {flex: 1},
    row: {flexDirection: 'row'},
    ml_28: {marginLeft: 28},
    ml_auto: {
      backgroundColor: '#033480',
    },

    bg_dk_blue: {backgroundColor: '#033480'},
    bg_lt_blue: {backgroundColor: '#92bcff'},
    bg_dk_red: {backgroundColor: '#bd4143'},
    bg_lt_red: {backgroundColor: '#f3b4b2'},

    bold: {fontWeight: '700'},
    txt_right: {textAlign: 'right'},

    indicator_marker: {
      height: 20,
      width: 20,
      backgroundColor: '#EFEFEF',
      borderRadius: 4,
      marginTop: 2,
      marginRight: 8,
    },

    title_txt: {
      // fontFamily: 'Roboto',
      fontSize: 16,
      lineHeight: 24,
    },
    label_txt: {
      // fontFamily: 'Roboto',
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
      color: '#757575',
    },
    subtext: {
      // fontFamily: 'Roboto',
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
      color: '#757575',
    },
  });
};

export default PayLineItem;
