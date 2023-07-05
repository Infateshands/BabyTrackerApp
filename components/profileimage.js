import React, {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, Image} from 'react-native'
import { Pressable } from "react-native";
import ImageViewer from "./imageviewer";



const PlaceholderImage = require('../assets//baby.jpg');

export default function ProfileImage() {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);  

        } else {
          alert('You did not select any image.');
        }
      };
    return (
        <View>
            <Pressable onPress={pickImageAsync}>
                <ImageViewer 
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
                />
                
                
            </Pressable>
        </View>
    )
}