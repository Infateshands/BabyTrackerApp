
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, Touchable} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

import * as ImagePicker from 'expo-image-picker';



import BottleView from '../components/BottleView';
import BreastView from '../components/breastview';
import SolidsView from '../components/SolidsView';

// database
const db = SQLite.openDatabase('test.db');




export default function Feed({route, navigation}) {

	const id = route.params;

	
	const [viewType, setViewType] = useState ('Bottle');
  
	const [time, setTime] = useState(undefined);
	const [amount, setAmount] = useState(undefined);
	const [clicked, setClicked] = useState(false);
	const [hour, setHour] = useState(undefined);
	const [mins, setMins] = useState(undefined);
	const [type, setType] = useState(undefined);
	const [milkType, setMilkType] = useState(undefined);
	const [breastSide, setBreastSide] = useState(undefined);


	

	useEffect(()=>{
		var hours = new Date().getHours(); //Current Hours
		var min = new Date().getMinutes();
		if(min<10){
			min = '0' + min;
		} //Current Minutes
		setTime(hours + ':' + min);
		if(viewType == "Bottle"){
			setType("Bottle");
		}else if(viewType == "Breast"){
			setType("Breast")
		}else if(viewType == "Solids"){
			setType("Solids")
		}
		
	})


	const handleBottle = () => {
		setViewType('Bottle');
	}
	const handleBreast = () => {
		setViewType('Breast');
	}
	const handleSolids = () => {
		setViewType('Solids');
	}

	

	const addFeed = () => { 
		var userTime = hour + ':' + mins;

		if(hour == undefined){
			db.transaction((tx)=>{
				tx.executeSql('INSERT INTO feeds (time, amount, type, breastside, milktype) VALUES (?,?,?,?,?)', [time, amount, type, breastSide, milkType])
			})
			Alert.alert('feed added');
			navigation.replace('Main');
		}
		else{
			db.transaction((tx)=>{
				tx.executeSql('INSERT INTO feeds (time, amount, type, breastside, milktype) VALUES (?,?,?,?,?)', [userTime, amount, type, breastSide, milkType])
			})
			Alert.alert('feed added');
			navigation.replace('Main');
		}
	}

	const view = () => {
		if (viewType == 'Bottle'){
			return (

				<BottleView />


			)
		}else if (viewType == 'Breast'){
			return (
				<BreastView />
				
			)
		}else if(viewType == 'Solids'){
			return (
				<SolidsView />
			)
		}
	}
	
	return (
		<View style={styles.container}>
			{/* HEADER START */}
			<View style={styles.header}>
				<Text style={{paddingBottom:10, fontSize: 22}}>Feeding</Text>
			</View>
			{/* HEADER END */}

			{/* MENU START */}
			<View style={styles.menuView}>
				<View style={styles.menu}>
					<TouchableOpacity 
					style={[styles.menuButton, {backgroundColor: '#a1ffe8'}]}
					onPress={handleBottle}
					>
						<Text>Bottle</Text>
					</TouchableOpacity>
					<TouchableOpacity 
					style={[styles.menuButton, {backgroundColor: '#a1fcff'}]}
					onPress={handleBreast}
					>
						<Text>Breast</Text>
					</TouchableOpacity>
					<TouchableOpacity 
					style={[styles.menuButton, {backgroundColor: '#a1c0ff'}]}
					onPress={handleSolids}
					>
						<Text>Solids</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/* MENU END */}

			{/* MAIN START */}
			<View style={styles.main}>
				<View style={styles.mainBox}>
					{view()}
				</View>
			</View>
			{/* MAIN END */}

			{/* BOTTOM START */}
			<View style={styles.bottom}>
				<TouchableOpacity 
				style={styles.button}
				onPress={addFeed}
				>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}>Save</Text>
				</TouchableOpacity>
			</View>
			{/* BOTTOM END */}
		</View>
			
		
  );
}


const styles = StyleSheet.create({
	pickerContainer: {
		width: '100%'
	},
  container: {
	flexGrow: 1,
    backgroundColor: '#EEF6F7',
  },
  header: {
	flex: 0.5,
	backgroundColor: '#CFECEF',
	elevation: 5,
	alignItems: 'center',
	justifyContent: 'flex-end',
  },

  // MENU START
  menuView: {
	flex: 1,
	// backgroundColor: 'blue',
	justifyContent: 'center'
  },
  menu: {
	elevation: 10,
	height: '80%',
	flexDirection: 'row',
	backgroundColor: '#CFECEF',
	padding: 10
  },
  menuButton: {
	flex: 1,
	margin: '1%',
	elevation: 5,
	borderRadius: 5,
	justifyContent: 'center',
	alignItems: 'center'

  },
  // MENU END

  // MAIN START
  main: {
	flex: 4,
	padding: 10,
	
  },
  mainBox: {
	flex: 1,
	backgroundColor: '#CFECEF',
	elevation: 5,
	borderRadius: 10,
	justifyContent: 'center'

  },
  // MAIN END
  
  // BOTTOM START
  bottom: {
	flex: 0.75,
	alignItems: 'center',
	justifyContent: 'center'
  },
  button: {
	width: '50%',
	aspectRatio: 4,
	elevation: 2,
	borderRadius: 10,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#b6d5f3'
  },
  // BOTTOM END

  // BOTTLE VIEW START
 
  bottleSroll: {
	// margin: '5%',
	flexGrow: 1,
	backgroundColor: 'white',
	alignItems: 'center',
	justifyContent: 'center'
  },
  mls: {
	flex: 1,
	borderBottomWidth: 1,
	borderTopWidth: 1,
	// fontSize: 20,
	backgroundColor: 'red'
  }
  
});
