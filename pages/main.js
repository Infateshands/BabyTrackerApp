import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import Header from '../components/header';
import ProfileImage from '../components/profileimage';

const db = SQLite.openDatabase('test.db');

export default function Main({navigation}) {

    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            // UNCOMMENT AND SAVE TO DELETE TABLE
            // tx.executeSql('DROP TABLE feeds');
            tx.executeSql(
            'CREATE TABLE IF NOT EXISTS feeds (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INT, time TEXT, type TEXT, breastside TEXT, milktype TEXT)');
            console.log('table created')
        });
    
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM feeds', null, 
            (txObj, resultSet) => {
              setFeeds(resultSet.rows._array);
              console.log("imported feeds")
            },
            (txObj, error) => console.log(error)
          );
        });
    
      },[]);

	
      const showHistory = () => {
        
        const reverse = [...feeds].reverse();
        return reverse.map(feed =>{

         if(feed.type == "Bottle"){
            return(
                <TouchableOpacity style={styles.history} key={feed.id} onPress={()=>navigation.navigate('Feed', feed.id)}>
                     <View style={[styles.type,{backgroundColor: '#a1ffe8'}]}>
                        <Image 
                        style={styles.typeImage}
                        source={require('../assets/bottle.png')} 
                        />
                    </View>
                    <View style={styles.historyDetails}>
                        <View style={styles.historyDetailsRow}>
                            <View style={styles.historyDetailsAmount}>
                                <Text style={styles.detailsText}>{feed.time + ' '}</Text>
                                <Text style={styles.detailsText}>{feed.amount + ' mls'}</Text>
                            </View>
                            <View style={styles.historyDetailsMilkType}>
                                <Text style={styles.milkType}>{feed.milktype}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
              );
         }else if(feed.type == "Breast"){
            return(
                <TouchableOpacity style={styles.history} key={feed.id} >
                    <View style={[styles.type,{backgroundColor: '#a1fcff'}]}>
                        <Image 
                         style={styles.typeImage}
                        source={require('../assets/breast.png')} 
                        />
                    </View>
                    <View style={styles.historyDetails}>
                        <View style={styles.historyDetailsRow}>
                            <View style={styles.historyDetailsAmount}>
                                <Text style={styles.detailsText}>{feed.time + ' '}</Text>
                                <Text style={styles.detailsText}>{feed.amount + ' mins'}</Text>
                            </View>
                            <View style={styles.historyDetailsMilkType}>
                                <Text style={styles.milkType}>{feed.breastside}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
              );
         }else if(feed.type == "Solids"){
            return(
                <TouchableOpacity style={styles.history} key={feed.id} >
                    <View style={[styles.type,{backgroundColor: '#a1c0ff'}]}>
                        <Image 
                         style={styles.typeImage}
                        source={require('../assets/solids.png')} 
                        />
                    </View>
                    <View style={styles.historyDetails}>
                        <View style={styles.historyDetailsRow}>
                            <View style={{width: '100%'}}>
                                <Text style={styles.detailsText}>{feed.time + ' '}</Text>
                                <Text style={styles.detailsText}>{'solids'}</Text>
                            </View>
                            {/* <View style={styles.historyDetailsMilkType}>
                                <Text style={styles.milkType}>{feed.breastside}</Text>
                            </View> */}
                        </View>
                    </View>
                </TouchableOpacity>
              );
       }
	})}
  

  	return (
	
		<View style={styles.outer}>

			<Header />
			<View style={styles.container}> 

				{/* NAME AND PHOTO START */}
				<View style={styles.nameSection}>
					<View>
            <ProfileImage />
					</View>
					<View style={{alignItems: 'flex-end', marginTop: -20}}> 
						<Text style={{fontSize:24, margin: 2}}>Dallas-James</Text>
						<Text style={{margin: 2}}>16th May 2023</Text>
						<Text style={{margin: 2}}>Height: 57cm</Text>
						<Text style={{margin: 2}}>Weight: 6kg</Text>
						

					</View>
					
					
				</View>
				{/* NAME AND PHOTO END */}
				
				

				{/* MENU START */}
				<View style = {styles.menuArea}>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate('Feed')}>
						<Image
						source={require('../assets/feed.png')}
						style={styles.pageButtonImg}
						/>
            			<Text style={styles.menuItemText}>Feeding</Text>
						</TouchableOpacity>
						
						
					</View>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={[styles.menuItem, {backgroundColor: '#a1fcff'}]}>
						<Image
						source={require('../assets/sleep.png')}
						style={styles.pageButtonImg}
						/>
           				<Text style={styles.menuItemText}>Sleep</Text>
						</TouchableOpacity>
						
					</View>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={[styles.menuItem, {backgroundColor: '#a1c0ff'}]}>
						<Image
						source={require('../assets/nappy.png')}
						style={styles.pageButtonImg}
						/>
            			<Text style={styles.menuItemText}>Nappy</Text>
						</TouchableOpacity>
						
					</View>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={[styles.menuItem, {backgroundColor: '#b9a1ff'}]}>
						<Image
						source={require('../assets/other.png')}
						style={styles.pageButtonImg}
						/>
            			<Text style={styles.menuItemText}>Other</Text>
						</TouchableOpacity>
						
					</View>
				</View>
				{/* HEADER MENU */}

				{/* TIMELINE START */}
				<View style={styles.timelineContainer}>
					<ScrollView contentContainerStyle={StyleSheet.timelineScroll} showsVerticalScrollIndicator={false}>
						<Text style={{padding: '2%'}}>Today</Text>
						{showHistory()}

					</ScrollView>

				</View>
				{/* TIMELINE END */}


			</View>
			<StatusBar style="auto" />
		</View>
        
  );
}


const styles = StyleSheet.create({
	outer: {
		// width: '100%',
		// height: '100%'
	},
  container: {
    backgroundColor: '#EEF6F7',
    alignItems: 'center',
	height: '100%',
	width: '100%',
  },
  
  header: {
    width: '90%',
	height: '10%',
    alignItems: 'center',
	justifyContent: 'center',
  },
  menuArea: {
	width: '100%',
	height: '12%',
	backgroundColor: '#CFECEF',
	// borderRadius: 10,
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	padding: '2%',
	elevation: 8,
	// paddingLeft: '6%',
	// paddingRight: '6%'

  },
  menuItemColumn: {
	width: '26%',
	height: '100%',
	alignItems: 'center',
  justifyContent: 'center'
  
	// margin: 10,
	

  },

  menuItem: {
	height: '80%',
	width: '80%',
	borderRadius: 5,
	backgroundColor: '#a1ffe8',
	elevation: 2,
	alignItems: 'center',
	justifyContent: 'center'
  },
  menuItemText: {
	textAlign: 'center',
  fontSize: 12,
  marginTop: "5%"
  // paddingTop: 1
  },
  weeksOld: {
    fontSize: 28,
	color: 'black'
  },
  history: {
    flexDirection: 'row',
    aspectRatio: 5,
    width: '95%',
    backgroundColor: '#FCFFFE',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    elevation: 5,
	  alignSelf: 'center'
    
  },
  timelineContainer: {
	width: '90%',
  
	backgroundColor: '#CFECEF',
	height: '42 %',
	marginTop: '10%',
	elevation: 10
	
	

  },
  timelineScroll: {
	width: '100%',
	borderWidth: 1,
	borderColor: 'red',


  },
  nameSection: {
	width: '100%',
	height: '20%',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '10%'
	
  },
  type: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '100%',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
 
  historyDetails: {
    width: '78%',
    marginLeft:'2%',
    justifyContent: 'center',
    alignItems: 'center',
	
  },
  detailsText: {
    height: 30,
    fontSize: 18,
    fontWeight: '600'
  },
  typeImage: {
    width: '80%',
    height: '80%'
  }, 
  historyDetailsRow: {
    flexDirection: 'row'
  },
  historyDetailsMilkColumn: {

  },
  historyDetailsAmount: {
    width: '40%',
    height: '100%',
    
    justifyContent: 'center',
    

  },
  historyDetailsMilkType: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5
    
  },
  milkType: {
    fontSize: 18,
    fontWeight: '400',
    
    
  },
  pageButtonName: {
	width: '50%',
	height: '20%',
	backgroundColor: '#242E38',
	borderRadius: 5,
	position: 'absolute',
	bottom: '-5%',
	elevation: 10,
	alignItems: 'center',
	justifyContent: 'center',
	borderWidth: 1,
	borderColor: '#14C0CC'
	
  },

  pageButtonImg: {
	width:"60%",
	height: '60%',
	
  }
 
  
  

   
});
