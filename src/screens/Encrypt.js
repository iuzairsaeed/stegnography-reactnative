import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {Input, Textarea,Item,Label, Button,Icon, Spinner} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '../config/Globals';

const Encrypt: () => React$Node = () => {
    const [visible,setVisible] = useState(false);
    const [message,setMessage] = useState('');
    const [password,setPassword] = useState('');
    const [image,setImage] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isVideo,setIsVideo] = useState(false);
    const [volume,setVolume] = useState(0.0);
    function handleImagePicker(){
        ImagePicker.openPicker({
            mediaType: 'any',
            includeBase64:true,
            compressImageMaxWidth:500,
            compressImageQuality:0.8
          }).then(media => renderMedia(media));
    }

    function renderMedia(media){
      setVisible(false);
      let mediaType = media.mime.split("/")[0];
      setImage({
        uri: media.path,
        type: media.mime,
        name: media.filename
      });
      if(mediaType ==='video'){
        setIsVideo(true);
      }else{
        setIsVideo(false);
      }
      
  }

    function handleCamera(){
        ImagePicker.openCamera({
            mediaType: 'any'
        }).then(media => renderMedia(media));
    }

    function sendRequest(){
        setLoading(true);
        if(message && password){
          if(isVideo){
            var data = new FormData();
            data.append('password',password);
            data.append('msg',message);
            data.append('encVideo',image);
            axios.post(`${BASE_URL}/api/vidEncrypt`,data).then(response =>{
                download(response.data.encImage)
                setLoading(false);
            })
            .catch(error =>  {console.log(error)});
          }else{
            var data = new FormData();
            data.append('password',password);
            data.append('msg',message);
            data.append('encImage',image);
            axios.post(`${BASE_URL}/api/imgEncrypt`,data).then(response =>{
                download(response.data.encImage)
                setLoading(false);
            })
            .catch(error =>  {console.log(error)});
          }
        }else{
          Alert.alert('Please Fill All fields')
        }
        
    }
    function download(url){
        var date      = new Date();
        var ext       = extention(url);
        ext = "."+ext[0];
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir
        let options = {
          fileCache: true,
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : true,
            path:  PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
            description : 'Image'
          }
        }
        config(options).fetch('GET', url).then((res) => {
          Alert.alert("Success Downloaded");
        });
      }
    function extention(filename){
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    function muteUnmute(){
      if(volume===0.0){
        setVolume(1.0);
      }else{
        setVolume(0.0)
      }
    }
    
    function renderImage(){
      if(image){
        if(isVideo){
          return <>
            <Icon type="Ionicons"name={volume>0?"ios-volume-high":"ios-volume-off"} style={{position:'absolute',color:'white',right:20,bottom:15,zIndex:999}} 
            onPress={() => muteUnmute()}></Icon>
            <Video source={{uri: image.uri}}  
            repeat={true}
            volume={volume} 
            resizeMode="cover"
            style={styles.backgroundVideo} />
            </>
        }else{
          return <Image source={{uri: image.uri}} style={{width:'100%',height:300}} resizeMode='contain' />;
        }
      }else{
        return <Image source={require('../assets/img/Image.jpg')} style={{width:'100%',height:'80%'}} resizeMode="contain"/>;
      }
    }

    return (
    <>
    <View style={{flex:8}}>
    <ScrollView>
    <View style={styles.body}>
        <View style={{flex:3,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>{
              console.log('here')
              setVisible(true);
            }} style={{width:'100%',height:300,zIndex:999}}> 
                {renderImage()}
            </TouchableOpacity>
        </View>
        <View style={{flex:2}}>
            <Textarea rowSpan={5} bordered placeholder="Add Text here..." value={message} onChangeText={(value)=>setMessage(value)} />
            <Item floatingLabel style={{marginVertical:10}}>
              <Label>Password</Label>
              <Input value={password} onChangeText={(value)=> setPassword(value)} />
            </Item>
        </View>
        
        <Modal 
            transparent={true}
            animationType={"fade"}
            visible={visible}
            onRequestClose={() => { setVisible(false)}} >
            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{width: '75%',height: 200,backgroundColor:'white',borderColor:'grey',borderWidth:2,borderRadius:10}}>
                    <Icon type="Entypo" onPress={()=>setVisible(false)} name="cross" style={{position:'absolute',right:0,top:0,zIndex:9999}} />
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:2}}><Text style={{fontWeight:'bold'}}>Select a Photo</Text></View>
                    <TouchableOpacity style={{flex:1}} onPress={()=>handleCamera()}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Open Camera</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=>handleImagePicker()}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Open Gallery</Text></View></TouchableOpacity>
                </View>
            </View>
        </Modal>
        
    </View>
    </ScrollView>
      <View style={{height:70,paddingHorizontal:20}}>
        <Button disabled={!message && !password} onPress={()=>sendRequest()} style={styles.buttonStyle} block>{loading?<Spinner color={"white"}/>:<Text style={styles.textStyle}>Encrypt</Text>}</Button>
        </View>
    </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  body:{
    flex:1,
    padding:20,
  },
  buttonStyle:{
    marginVertical:5,
    padding:10
  },
  textStyle:{
    color:'white',
    fontWeight:'bold',
    fontSize:15,
    textAlign:'center'
  },
  backgroundVideo: {
    height:'100%',
    width:'100%'
  },
});

export default Encrypt;
