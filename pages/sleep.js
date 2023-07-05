import React from "react";
import { View, StyleSheet, Text } from 'react-native'

export default function Sleep({navigation}){
    

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text>Hello</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    box: {
        margin: 10,
        borderWidth: 1,
        backgroundColor: 'yellow',
        marginTop: 100,
        flex: 1
    }
})