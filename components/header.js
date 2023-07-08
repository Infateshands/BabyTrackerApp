import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ColourScheme } from '../src/ColourScheme';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';


const db = SQLite.openDatabase('db.db');



export default function Header({title, active}){


	/// local storage for saving last selected child
	const storeName = async (value) => {
		try {
		  await AsyncStorage.setItem('activeChildName', value,);
		//   console.log('stored ' +value+ ' into local storage')
		} catch (e) {
		  console.log(e);
		}
	  };
	  const storeGender = async (value) => {
		try {
		  await AsyncStorage.setItem('activeChildGender', value,);
		//   console.log('stored ' +value+ ' into local storage')
		} catch (e) {
		  console.log(e);
		}
	  };
	  const getData = async () => {
		try {
		  const value = await AsyncStorage.getItem('activeChildName');
		  if (value !== null) {
			setActiveChild(value);
			// console.log(value + ' read from local storage')
		  }
		} catch (e) {
		  // error reading value
		}
	  };
	

	const [modalVisible, setModalVisible] = useState(false);
	const [children, setChildren] = useState([]);
	const [activeChild, setActiveChild] = useState()


	useEffect(()=>{
		db.transaction(tx => {
			tx.executeSql('SELECT * FROM children', null,
			(txObj, resultSet)=>{
				setChildren(resultSet.rows._array);
				// console.log('children added to array MODAL')
			},
			(txObj, error)=> console.log(error)
			);
		})
		getData()
		active(activeChild)
		

	
		
	},[modalVisible])
	
	const handleChildPress = (kid) => {
		setModalVisible(!modalVisible)
		setActiveChild(kid)
		storeName(kid.name)
		storeGender(kid.gender)
		
	
	}

	const displayChildren = () => {
		
		return children.map((child, index)=>{
			return(
				<View key={index} >
					<TouchableOpacity onPress={()=>handleChildPress(child)}>
					<Text style={styles.childsName}>{child.name}</Text>
					</TouchableOpacity>
				</View>
			)
		})
		
		}
	
    return(
		<View style={styles.header}>
			<View style={styles.topBar}>
				<View style={{alignSelf: 'center'}}>
					<Text style={{fontSize: 20}}>{title}</Text>
				</View>
				

				<Modal
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
				setModalVisible(!modalVisible);
				}}>
					<View style={styles.modal}>
						{displayChildren()}
					</View>

				</Modal>
				<View style= {styles.dotsMenuView}>
				<TouchableOpacity style={styles.dotsButton}  onPress={()=>setModalVisible(true)}>
				<Image
				source={require('../assets/dotMenu.png')}
				style={styles.img}
				/>
				</TouchableOpacity>

				</View>
				
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
      flexDirection: 'row',
    },
    name: {
      fontSize: 24,
    },
    img: {
		position: 'absolute',
		
		transform: [
			{scale: 0.8}
		]
    },
	dotsMenuView: {
		position: 'absolute',
		right: 0,
		top: '70%',
		width: '10%',
		height: '100%',
		
	},
	dotsButton: {
		
		height: '100%'

	},
	dots: {
		color: 'black',
		fontSize: 10,
		fontWeight: 'bold',
		height: 10
	}, 
	modal: {
		position: 'absolute',
		right: '1%',
		backgroundColor: 'white',
		width: '20%',
		borderRadius: 5,
		borderWidth:2,
		elevation: 5
	},
	childsName: {
		fontSize: 18,
		marginLeft: '2%',
		height: 30
	}
})