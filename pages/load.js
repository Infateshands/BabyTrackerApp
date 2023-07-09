import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

import Main from "./main";

export default function Load({navigation}){



    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                logo goes here
            </Text>
            <Text style={styles.continue}>
                Add a child to continue...
            </Text>
            <TouchableOpacity
            style={styles.button}
            onPress={()=>navigation.navigate('AddChild')}
            >
                <Text style={styles.buttonText}>
                    Add Child
                </Text>
            </TouchableOpacity>
            

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8cfef',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    welcome: {
        fontSize: 50
    },
    continue: {
        margin: 10,
        fontSize: 20
    },
    button: {
        width: '50%',
        height: '5%',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
    }
})