import React from 'react'
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, Touchable} from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

import {ScrollPicker} from 'react-native-value-picker';
import { bottleData } from '../src/data';

export default function BottleView({childToParent}) {
	// for time
	const [selectedHours, setSelectedHours] = useState(0);
	const [selectedMinutes, setSelectedMinutes] = useState(0);
	// for milk amount
    const [pickedValue, setPickedValue] = useState(undefined);
	const [data, setData] = useState();
	
	useEffect(()=>{
		setData(pickedValue);
		console.log('hello');
		
		//// PASSING VARIABLES FROM CHILD COMPONENT (THIS) TO PARENT (FEED.JS)
		//// TRYING TO PASS AMOUNT WHEN SELECTING MLS OF SCROLL PICKER
		//// NOT LOGGING IT, NOT LOGGING ANYTHING
		//// MIGHT BE BECAUSE THIS IS A COMPONENT

	})

    return (
        <View style={{flex: 1, padding: '5%'}}>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<View style={{elevation: 2,height: '50%', width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#B6D5F3', borderRadius: 5, padding: '1%'}}>
							<Text>Tue July 100th</Text>
						</View>
					</View>
					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
						<View style={{elevation: 2, height: '50%', width: '50%', justifyContent: 'center',backgroundColor: '#B6D5F3', borderRadius: 5,padding: '1%'}}>
							<Text>Forumla</Text>
						</View>
						<View style={{elevation: 2, height: '50%', width: '30%', alignItems: 'flex-end', justifyContent: 'center', backgroundColor: '#B6D5F3', borderRadius: 5,padding: '1%'}}>
							<Text>{pickedValue} mls</Text>
						</View>
					</View>
					<View style={{flex: 5, elevation: 2, backgroundColor: '#B6D5F3', borderRadius: 5, padding: '1%', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Image
						source={require('../assets/pickerBottle.png')}
						style={{position: 'absolute', transform: [{scale: 0.8}]}}
						/>
						<View style={{width: '80%', height: '60%', alignItems: 'center', justifyContent: 'center', marginTop: '20%'}}>
							<ScrollPicker
							currentValue={pickedValue}
							extraData={pickedValue}
							list={bottleData}
							onItemPress={setPickedValue}
							labelColor="black"
							separatorColor='rgba(0,0,0,0)'
							selectedColor="#B6D5F3"
							/>
						</View>
					</View>		
            </View>			
					
    );
}