import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';




// pages
import Feed from './pages/feed';
import Main from './pages/main';
import Sleep from './pages/sleep';
import Nappy from './pages/nappy';
import AddChild from './pages/addChild';
import Load from './pages/load';
import LoadingScreen from './pages/LoadingScreen';

const Stack = createNativeStackNavigator();

function App() {

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    await AsyncStorage.getItem('0').then(result => {
      console.log('RES: ', result)
        if (result == null) {
           setLoading(true);

        } else {
           setLoading(false);
        }
    })

}

 
  


  return (
    <NavigationContainer>
     
     {loading === null ? (
        <LoadingScreen />
      ) : 
        <Stack.Navigator initialRouteName={loading ? 'Load' : 'Main'}>
         <Stack.Screen
          name="Load"
          component={Load}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="AddChild"
        component = {AddChild}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Feed"
        component = {Feed}
        options={{ headerShown: false }}
        />
         <Stack.Screen
        name="Sleep"
        component = {Sleep}
        options={{ headerShown: false }}
        />
         <Stack.Screen
        name="Nappy"
        component = {Nappy}
        options={{ headerShown: false }}
        />

    
     

      </Stack.Navigator>
    } 
    </NavigationContainer>
  );
};

export default App;