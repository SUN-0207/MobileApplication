import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Camera, CameraType  } from 'expo-camera';
import {StatusBar} from 'expo-status-bar'
import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { useNavigation } from '@react-navigation/native';

let camera: Camera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Scan = () => {
  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState('off')
  
  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync()

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

 
const CameraPreview = ({photo, retakePicture}: any) => {
  const [isTfReady, setIsTfReady] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        // console.log(photo)
        setIsTfReady(true);
      } catch (error) {
        console.error('Error loading model:', error);
        // Handle model loading errors appropriately (e.g., display error message)
      }
    }

    loadModel();
  }, []);


  const handlePrediction = async () => {
    if (!isTfReady) {
      console.log('Model not ready yet');
      return;
    }
  
    const model = await mobilenet.load()

  // Make predictions
  const predictions = await model.classify(photo);

  const imageAssetPath = Image.resolveAssetSource(photo.uri);
  const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
  const imageDataArrayBuffer = await response.arrayBuffer();
  const imageData = new Uint8Array(imageDataArrayBuffer);
  const imageTensor = decodeJpeg(imageData);
  const prediction = await model.classify(imageTensor);
  // Display the results
  const topPrediction = tf.argMax(prediction, 1).dataSync()[0];
  console.log(`Predicted class: ${topPrediction}`);
  navigation.navigate('Recipe' as never);
  }

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
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
                Find Recipe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Scan