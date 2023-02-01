import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import OverviewCard from '../components/OverviewCard'; // Good
import PayLineItem from '../components/PayLineItem'; // Good
import RewardsHeader from '../components/RewardsHeader';
import TotalsCard from '../components/TotalsCard';

// TMP - Remove Once API call is made
import userPayInfo from './data';

function PayView(props) {
  return (
    <View style={styles.container}>
      <RewardsHeader />
      <ScrollView>
        <OverviewCard data={userPayInfo} />
        <TotalsCard data={userPayInfo} />
        <PayLineItem data={userPayInfo} label="Hourly Pay" />
        <PayLineItem data={userPayInfo} label="Store Bonus" />
        <PayLineItem data={userPayInfo} label="Store Discount Savings" />
        <PayLineItem data={userPayInfo} label="Health Benefits" />
      </ScrollView>
    </View>
  );
}

// Won't need this once it's in the project
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

export default PayView;
