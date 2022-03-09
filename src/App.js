/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';
import AppContainer from './routes';
import NavigationService from './services/NavigationService';
import SplashScreen from 'react-native-splash-screen';

const App: () => React$Node = () => {
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide()
    },500)
  },[])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
       
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body:{
    flex:1
  }
});

export default App;
