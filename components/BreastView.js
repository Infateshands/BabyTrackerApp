import React from 'react'
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity, Touchable} from 'react-native';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';

import {ScrollPicker} from 'react-native-value-picker';

export default function BreastView() {

    return (
        <View style={styles.internal}>
            <Text style={{alignSelf: 'center'}}>Breast content goes here</Text>
        </View>
    )
}