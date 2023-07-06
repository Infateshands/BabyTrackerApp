import React from "react";
import { useState } from "react";
import * as SQLite from 'expo-sqlite';



// THEME COLOURS
// light or dark
const colorMode = 'Light'
// boy or girl
var gender = "Boy"
//
export {gender}


export const ColourScheme = [
    {
        themeMode: undefined,
        themeModeBorder: undefined,
        text: undefined,
        mainColour: undefined,
        secondColour: undefined,
        thirdColour: undefined,
        fourthColour: undefined,
        fifthColour: undefined,
        sixthColour: undefined,
    }
]
if(colorMode == 'Dark') {
    ColourScheme.themeMode = '#242526';
    ColourScheme.themeModeBorder = 'white';
    ColourScheme.text = 'white';
} else {
    ColourScheme.themeMode = '#EEF6F7';
    ColourScheme.themeModeBorder = 'black';
    ColourScheme.text = 'black'

}
if(gender == 'Girl'){
    ColourScheme.mainColour = '#efcfe4';
    ColourScheme.secondColour = '#ffa1f9',
    ColourScheme.thirdColour = '#caa1ff',
    ColourScheme.fourthColour = '#f2ffa1',
    ColourScheme. fifthColour = '#ffa1a1',
    ColourScheme.sixthColour = '#f3b6be'
} else {
    ColourScheme.mainColour = '#CFECEF'; // light blue
    ColourScheme.secondColour = '#a1ffe8'; // teal
    ColourScheme.thirdColour = '#a1fcff'; // neon blue
    ColourScheme.fourthColour = '#a1c0ff'; // blue purple
    ColourScheme.fifthColour = '#b9a1ff'; // purple
    ColourScheme.sixthColour = '#b6d5f3'; // blue
}

