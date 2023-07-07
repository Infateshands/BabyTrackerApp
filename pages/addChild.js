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
const [dob, setDob] = useState();
const [day, setDay] = useState();
const [month, setMonth] = useState();
const [year, setYear] = useState();
const [height, setHeight] = useState(undefined);
const [weight, setWeight] = useState(undefined);
const [gender, setGender] = useState(undefined);




const handleSave =()=>{
    db.transaction((tx) =>{
        tx.executeSql('INSERT INTO children (name, dobDay, dobMonth, dobYear, weight, height, gender) VALUES (?,?,?,?,?,?,?)', 
        [name, day, month, year, weight, height, gender]);
        console.log(name + ' saved to database');
        
        
    })
    Alert.alert("Child Added!", name + " added!")
    navigation.navigate('Main');
    

}





    return (
        <View style={styles.container}>
            <Text>Add Child</Text>
            <Text style={styles.label}>Name: </Text>
            <TextInput 
            style={styles.input}
            onChangeText={setName}
            />
            <Text style={styles.label}>Date of Birth: </Text>
            <View style={{flexDirection: 'row'}}>
            <View>
                <Text style={styles.label}>Day </Text>
                <TextInput 
                style={styles.inputDate}
                keyboardType={'numeric'}
                onChangeText={setDay}
                />
            </View>
            <View>
                <Text style={styles.label}>Month </Text>
                <TextInput 
                style={styles.inputDate}
                keyboardType={'numeric'}
                onChangeText={setMonth}
                />
            </View>
            <View>
                <Text style={styles.label}>Year </Text>
                <TextInput 
                style={styles.inputDate}
                keyboardType={'numeric'}
                onChangeText={setYear}
                />
            </View>
            </View>
            
            
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
    inputDate: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: ColourScheme.mainColour,
        marginRight: 10
    },
})
