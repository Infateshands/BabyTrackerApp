import react from "react";
import { useState, useEffect } from "react";
import {View, TextInput, Text, StyleSheet, Button, Alert, TouchableOpacity} from "react-native"
import * as SQLite from 'expo-sqlite';
import { ColourScheme } from "../src/ColourScheme";
import { Picker } from "@react-native-picker/picker";
import { SelectedItem } from "react-native-wheel-scroll-picker";

const db = SQLite.openDatabase('db.db');

export default function AddChild({navigation}) {

const [name, setName] = useState(undefined);
const [dob, setDob] = useState(undefined);
const [height, setHeight] = useState(undefined);
const [weight, setWeight] = useState(undefined);
const [gender, setGender] = useState(undefined);


const [clicked, setClicked] = useState();


const handleSave =()=>{
    db.transaction((tx) =>{
        tx.executeSql('INSERT INTO children (name, dob, weight, height, gender) VALUES (?,?,?,?,?)', 
        [name, dob, weight, height, gender]);
        console.log(name + ' saved to database');
        setClicked('yes')
        
        
    })
    Alert.alert("Child Added!", name + " added!")
    navigation.replace('Main');
    

}
useEffect(()=>{
    console.log('hello')
})




    return (
        <View style={styles.container}>
            <Text>Add Child</Text>
            <Text style={styles.label}>Name: </Text>
            <TextInput 
            style={styles.input}
            onChangeText={setName}
            />
            <Text style={styles.label}>Date of Birth: </Text>
            <TextInput 
            style={styles.input}
            onChangeText={setDob}
            />
            <Text style={styles.label}>Weight: </Text>
            <TextInput 
            style={styles.input}
            keyboardType={'numeric'}
            onChangeText={setWeight}
            />
            <Text style={styles.label}>Height: </Text>
            <TextInput 
            style={styles.input}
            keyboardType={'numeric'}
            onChangeText={setHeight}
            />
            <Text style={styles.label}>Gender: </Text>
            <Picker 
            style={{width: '30%'}}
            selectedItem={gender}
            onValueChange={setGender}
            >
                <Picker.Item label="Choose..."/>
                <Picker.Item label="Boy" value="Boy"/>
                <Picker.Item label="Girl" value="Girl"/>
            </Picker>
            <TouchableOpacity style={{borderWidth: 1}}onPress={handleSave}>
                <Text>Save</Text>
            </TouchableOpacity>

            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        
    },
    label: {

    },
    input: {
        width: '50%',
        height: '5%',
        borderRadius: 5,
        backgroundColor: ColourScheme.mainColour
    },
})
