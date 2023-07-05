import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage !== null
    ? { uri: selectedImage }
    : placeholderImageSource;
  return (
    <Image source={imageSource} style={{width: 130, height: 130, borderRadius: 65}} />
  );
}

