import React, { useRef, useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../../constants'



const CameraComponent = () => {
  const storage = getStorage();
  const db = getFirestore();
  const [uploaded, setUploaded] = useState(false);
  const [videoUri, setVideoUri] = useState('');
  const { currentUser } = getAuth();
  const videoRef = useRef(null)

  const takeVideoHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (result.canceled || !result.assets?.length) return;

      const { uri } = result.assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `videos/${Date.now()}.mp4`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      const videoDocRef = doc(collection(db, 'videos'));
      await setDoc(videoDocRef, {
        userId: currentUser?.uid,
        videoURL: downloadURL,
        createdAt: Date.now(),
      });

      setUploaded(true);
      setVideoUri(uri);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const playVideoHandler = async () => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(0); // Reset to the beginning
      await videoRef.current.playAsync();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

      }}
    >
      {uploaded && videoUri &&
        (
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            resizeMode={ResizeMode.COVER}
            style={{
              height: '50%',
              width: '100%',
              borderWidth: 2,
              borderBlockEndColor: 'gray'
            }}
          />
        )
      }
      <TouchableOpacity
        onPress={takeVideoHandler}
      >
        {
          (uploaded && videoUri) ? (<Video
            source={{ uri: videoUri }}
            style={{ width: '100%', height: 64, borderRadius: 5 }}
            resizeMode={ResizeMode.COVER}
          />) :
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </View>
        }
      </TouchableOpacity >

      {
        <Button title="Play Video" onPress={playVideoHandler} />

      }

    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    paddingHorizontal: 16,
    // backgroundColor: '#000', // Assuming black-100 translates to black
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FF6F61', // Assuming secondary color
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  },
});