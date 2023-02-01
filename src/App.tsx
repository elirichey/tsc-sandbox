/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// import CommunityView from './modules/Community/View/CommunityView';
// import BenefitsView from './modules/Benefits/View/BenefitsView';
import PayView from './modules/Pay/view/PayView';

function App(): JSX.Element {
  //const plan = {
  //  type: 'Bronze',
  //  provider: 'United Healthcare',
  //  coverage: 'Team Member + Child(ren)', // 'Team Member Only', // 'Team Member + Child(ren)',
  //};

  return (
    <SafeAreaView style={styles.container}>
      {/* <CommunityView /> */}
      {/* <BenefitsView plan={plan} /> */}
      <PayView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
