import react from "react";
import { useState, useEffect } from "react";
import {View, TextInput, Text, StyleSheet, Button, Alert, TouchableOpacity} from "react-native"
import * as SQLite from 'expo-sqlite';
import { ColourSchemeBoy } from "../src/ColourScheme";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase('db.db');

export default function AddChild({navigation}) {

const [name, setName] = useState(undefined);
const [dob, setDob] = useState();
const [day, setDay] = useState();
const [month, setMonth] = useState();
const [year, setYear] = useState();
const [height, setHeight] = useState(undefined);
const [weight, setWeight] = useState(undefined);
const [gender, setGender] = useState(undefined);


const storeName = async (value) => {
    try {
      await AsyncStorage.setItem('activeChildName', value,);
      console.log('stored ' +value+ ' into local storage')
    } catch (e) {
      console.log(e);
    }
  };
  const setItem = async (value) => {
    try {
      await AsyncStorage.setItem('0', value,);
      console.log('stored ' +value+ ' into local storage')
    } catch (e) {
      console.log(e);
    }
  };
  const storeGender = async (value) => {
    try {
      await AsyncStorage.setItem('activeChildGender', value,);
      
      console.log('stored ' +value+ ' into local storage')
    } catch (e) {
      console.log(e);
    }
  };


const handleSave =()=>{
    db.transaction((tx) =>{
        tx.executeSql('INSERT INTO children (name, dobDay, dobMonth, dobYear, weight, height, gender) VALUES (?,?,?,?,?,?,?)', 
        [name, day, month, year, weight, height, gender]);
        console.log(name + ' saved to database');
        
        
    })
    storeName(name)
    storeGender(gender)
    setItem('yes')
    Alert.alert("Child Added!", name + " added!")
    navigation.replace('Main');
    

}





    return (
        <View style={styles.container}>
         	{/* HEADER START */}

			<View style={styles.header}>
				<View style={styles.topBar}>
					<View style={{alignSelf: 'center'}}>
						<Text style={{fontSize: 24, fontWeight: 'bold'}}>Add Child</Text>
					</View>
					
				</View>
    		</View>
			{/* HEADER END */}

				
      
            <Text style={styles.label}>Name: </Text>
            <TextInput 
            style={styles.input}
            onChangeText={setName}
            />
            <Text style={styles.label}>Date of Birth: </Text>
            <View style={styles.row}>
                <TextInput 
                style={styles.inputDate}
                keyboardType={'numeric'}
                onChangeText={setDay}
				placeholder={'DD'}
                />
                <TextInput 
                style={styles.inputDate}
                keyboardType={'numeric'}
                onChangeText={setMonth}
				placeholder={'MM'}

                />
                <TextInput 
                style={styles.inputDate}
                keyboardType={'numeric'}
                onChangeText={setYear}
				placeholder={'YYYY'}

                />
            </View>
			<Text style={styles.label}>Gender: </Text>
			<View style={styles.pickerContainer}>
				<Picker 
				style={styles.picker}
				selectedValue={gender}
				onValueChange={setGender}
				>
					<Picker.Item label="Choose..." enabled={false}/>
					<Picker.Item label="Boy" value="Boy"/>
					<Picker.Item label="Girl" value="Girl"/>
				</Picker>

			</View>
            
            
            <Text style={styles.label}>Weight (kg): </Text>
            <TextInput 
            style={styles.input}
            keyboardType={'numeric'}
            onChangeText={setWeight}
            />
            <Text style={styles.label}>Height (cm): </Text>
            <TextInput 
            style={styles.input}
            keyboardType={'numeric'}
            onChangeText={setHeight}
            />
            
            
			
            <TouchableOpacity style={styles.button}onPress={handleSave}>
                <Text style={styles.buttontext}>Save</Text>
            </TouchableOpacity>

            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
		alignItems: 'center',

    },
	header: {
		width: '100%',
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e6cfef',
		marginBottom: '10%'


	  },
	  topBar: {
		height: 70,
		paddingTop: 30,
		width: '100%',
		backgroundColor: '#e6cfef',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	  },
    label: {
		fontSize: 18,
		margin: 10

    },
    input: {
        width: '70%',
        height: 50,
        borderRadius: 5,
        backgroundColor: '#e6cfef',
		textAlign: 'center'
    },
    inputDate: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#e6cfef',
		textAlign: 'center'
    },
	row: {
		width: '50%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	picker: {
		borderRadius: 5
	},
	pickerContainer: {
		width: '60%',
		backgroundColor: '#e6cfef',
		borderRadius: 5,
		
	},
	button: {
		width: '50%',
		height: 50,
        backgroundColor: '#e6cfef',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '10%'

	},
	buttontext: {
		fontSize: 22,
		fontWeight: 'bold'
	}
})
