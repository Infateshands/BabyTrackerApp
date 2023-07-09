import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';



// pages
import Feed from './pages/feed';
import Main from './pages/main';
import Sleep from './pages/sleep';
import Nappy from './pages/nappy';
import AddChild from './pages/addChild';
import Load from './pages/load';


const Stack = createNativeStackNavigator();

function App() {

  const db = SQLite.openDatabase('db.db');
  const [children, setChildren] = useState([]);
  const [first, setFirst] = useState();
  const check = () => {

    if (children.length == 0){
      setFirst(true)

    }else{
      setFirst(false)
    }
    console.log('run check: ' + first)

  }

  useEffect(()=>{
    // child database
  db.transaction((tx) => {
    // tx.executeSql('DROP TABLE children');
    tx.executeSql(
    'CREATE TABLE IF NOT EXISTS children (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dobDay TEXT, dobMonth TEXT, dobYear TEXT, height INTEGER, weight INTEGER, gender TEXT)');
    console.log('children table created');
      
    });
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM children', null,
    (txObj, resultSet)=>{
      setChildren(resultSet.rows._array);
      // console.log('children added to array')
    },
    (txObj, error)=> console.log(error)
    );
  });
  check();


  })
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={first ? 'Main' : 'Load'}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Feed" component={Feed}/>
        <Stack.Screen name="Sleep" component={Sleep}/>
        <Stack.Screen name="Nappy" component={Nappy}/>
        <Stack.Screen name="AddChild" component={AddChild}/>
        <Stack.Screen name='Load' component={Load}/>


        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;