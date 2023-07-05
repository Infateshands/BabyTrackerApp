import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';


// pages
import Feed from './pages/feed';
import Main from './pages/main';
import Sleep from './pages/sleep';
import Nappy from './pages/nappy';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Main'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Feed" component={Feed}/>
        <Stack.Screen name="Sleep" component={Sleep}/>
        <Stack.Screen name="Nappy" component={Nappy}/>


        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;