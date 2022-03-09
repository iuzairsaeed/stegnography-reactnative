import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { Button,  } from 'native-base';
import NavigationService from '../services/NavigationService';
const Home: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <Image source={require('../assets/img/key.jpg')} style={styles.backgroundImage} resizeMode="contain"></Image>
          <View style={{flex:1}}>
              <View style={{flex:4,justifyContent:'flex-end'}}>
                <Image source={require('../assets/img/logo.png')} style={{height:'80%',width:'100%'}} resizeMode="contain"/>
              </View>
              <View style={{flex:2}}>
                <Button style={styles.buttonStyle} onPress={()=>NavigationService.navigate('encrypt')} block><Text style={styles.textStyle}>Encode</Text></Button>
                <Button style={styles.buttonStyle} onPress={()=>NavigationService.navigate('decrypt')}  block><Text style={styles.textStyle}>Decrypt</Text></Button>
              </View>
          </View>
       
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body:{
    flex:1
  },
  backgroundImage:{
    position:'absolute',
    width:'100%', 
    height:'100%',
    opacity:0.4
  },
  buttonStyle:{
    marginVertical:5,
    marginHorizontal:'10%',
    padding:10
  },
  textStyle:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  }
});

export default Home;
