import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Camera, CameraType  } from 'expo-camera';
import {StatusBar} from 'expo-status-bar'
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

let camera: Camera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: '500',
},
})

const Scan = () => {
  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState('off')
  
  let options = {
    quality: 1,
    base64: true,
    exif: false,
  };
  
  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync(options)
    // console.log(photo)
    
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  
  const __savePhoto = () => {}
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType(CameraType.front)
    } else {
      setCameraType(CameraType.back)
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%'
        }}
      >
        {previewVisible && capturedImage ? (
          <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
        ) : (
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={{flex: 1}}
            ref={(r) => {
              camera = r
            }}
          >
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '10%',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity
                  onPress={__handleFlashMode}
                  style={{
                    backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                    borderRadius: '50%',
                    height: 35,
                    width: 35,
                    alignItems: 'center',  // Aligns vertically
                    justifyContent: 'center', // Centers horizontally
                    backgroundColor: '#fff'
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20
                    }}
                  >
                    ⚡️
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={__switchCamera}
                  style={{
                    marginTop: 20,
                    borderRadius: '50%',
                    height: 35,
                    width: 35,
                    alignItems: 'center',  // Aligns vertically
                    justifyContent: 'center', // Centers horizontally
                    backgroundColor: '#fff'
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20
                    }}
                  >
                    {cameraType === 'front' ? '🤳' : '📷'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between'
                }}
              >
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: '#fff'
                    }}
                  />
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
    <StatusBar style="auto" />
    </View>
  )
}

interface ScanResult {
  app_id: string;
  id: string;
  name: string;
  value: number;
  }
 
const CameraPreview = ({photo, retakePicture}: any) => {
  const navigation = useNavigation();
  const [isRunning, setIsRunning] = useState(false);
  

   const PAT = '5af3f540e5be400b8ff9d3e59d88771c';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'food-item-recognition';
    const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';    
    const data = photo.base64;
      const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": data
                    }
                }
            }
        ]
    });
  
  const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  useEffect(() => {
  }, []);


  const [result, setResult] = useState<ScanResult[]>([]);
    
  const handlePrediction = async () => {
    setIsRunning(true);
    try {
      const res = await axios.post(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, raw, requestOptions)
      setResult(res.data.outputs[0].data.concepts);
      setIsRunning(false);
    } catch (error) {
      console.log('error', error);
    }
    console.log('Res',result) 
    // navigation.navigate('Recipe' as never);
    // retakePicture();
  };

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
            <Text style={[{ marginTop: 40, marginHorizontal: 30, fontSize: 18, textAlign:'center', color: '#3935FF',fontWeight: 'bold' }]}>
                Select 1 detected ingredient 
            </Text>
            {result.length === 0 ?  <Text style={[{fontSize: 15, textAlign:'center', color: '#3935FF' , marginTop: 5}]}>Please Click Button Detect</Text>  :
                <View>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems:'center', marginTop: 10, alignContent:'center', marginBottom:5 }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ paddingRight: 20 }}
                           
                        >
                            <Text style={[styles.subTitleText, { marginBottom: 10, color: '#3935FF'}]}>
                                1.{result[0].name}
                            </Text>
                        </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingRight: 20 }}
                            
                            >
                                <Text style={[styles.subTitleText, { marginBottom: 10, color: '#3935FF'}]}>
                                    2.{result[1].name}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingRight: 20 }}
                              
                            >
                                <Text style={[styles.subTitleText, { marginBottom: 10, color: '#3935FF'}]}>
                                    3.{result[2].name}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingRight: 20 }}
                              
                            >
                                <Text style={[styles.subTitleText, { marginBottom: 10, color: '#3935FF'}]}>
                                   4.{result[3].name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,
                backgroundColor: '#fff',
                alignItems: 'center',  // Aligns vertically
                justifyContent: 'center', // Centers horizontally
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 20
                }}
              >
                Retake
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePrediction}
              style={{
                width: 130,
                height: 40,
                backgroundColor: '#fff',
                alignItems: 'center',  // Aligns vertically
                justifyContent: 'center', // Centers horizontally
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Detect 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {isRunning ? (
        <ActivityIndicator
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

export default Scan