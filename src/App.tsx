/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// import CommunityView from './modules/Community/View/CommunityView';
import BenefitsView from './modules/Benefits/View/BenefitsView';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* <CommunityView /> */}
      <BenefitsView />
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
