import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';




export default function Header(){

  function calcAge() {
		var birthday = +new Date('2023-05-16');
		var temp = ((Date.now() - birthday) / (31557600000))+.001;
		return Math.floor(temp*52);

	  }
    return (
        
    <View style={styles.header}>
        <View style={styles.topBar}>
          
        <Text style={{fontSize: 20}}>{calcAge()} Weeks Old</Text>
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
      backgroundColor: '#CFECEF',
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