import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { ColourScheme } from '../src/ColourScheme';




export default function Header({title}){

  
    return (
        
    <View style={styles.header}>
        <View style={styles.topBar}>
          
        <Text style={{fontSize: 20}}>{title}</Text>
        </View>
    </View>

    )
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
      // alignItems: 'center'
    },
    topBar: {
      
      height: 70,
      paddingTop: 30,
      width: '100%',
      backgroundColor: ColourScheme.mainColour,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    name: {
      fontSize: 24,
    },
    img: {
      width: '10%',
      height: '100%',
      position: 'absolute',
      top: '70%',
      left: "2%"
    }
})