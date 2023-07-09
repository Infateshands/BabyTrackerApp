import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import Header from '../components/header';
import ProfileImage from '../components/profileimage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ColourSchemeBoy, ColourSchemeGirl} from '../src/ColourScheme.js'



export default function Main({navigation}) {
	
	// DATABASE
	const db = SQLite.openDatabase('db.db');

	// HOOKS
	const [feeds, setFeeds] = useState([]); // 
	const [children, setChildren] = useState([]);
	const [activeChild, setActiveChild] = useState();
	const [defaultStyle, setDefaultStyle] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	const [activeChildID, setActiveChildID] = useState();

	// FUNCTIONS
	// calculate age - update to calculate from childs DOB
  	function calcAge() {
		var birthday = +new Date('2023-05-16');
		var temp = ((Date.now() - birthday) / (31557600000))+.001;
		return Math.floor(temp*52);
	
	};
	
	// import active childs when loading new app session, remembers active user from last session
	const getName = async () => {
		try {
		  const value = await AsyncStorage.getItem('activeChildName');
		  if (value !== null) {
			setActiveChild(value);
			// console.log(value + ' read from local storage main')
		  }
		} catch (e) {
		  // error reading value
		}
	};
	// import gender
	const getGender = async () => {
		try {
		  const value = await AsyncStorage.getItem('activeChildGender');
		  if (value !== null) {
			if(value == "Boy"){
				setDefaultStyle(true)
			}else{
				setDefaultStyle(false)
			}
			// console.log(value + ' read from local storage main')
		  }
		} catch (e) {
		  console.log(e)
		}
	};
	const getID = async () => {
		try {
		  const value = await AsyncStorage.getItem('activeChildID');
		  if (value !== null) {
			setActiveChildID(value)
			
			// console.log(value + ' read from local storage main')
		  }
		} catch (e) {
		  console.log(e)
		}
	};
	const storeName = async (value) => {
		try {
		  await AsyncStorage.setItem('activeChildName', value);
		//   console.log('stored ' +value+ ' into local storage')
		} catch (e) {
		  console.log(e);
		}
	  };
	  const storeID = async (value) => {
		try {
		  await AsyncStorage.setItem('activeChildID', JSON.stringify(value));
		//   console.log('stored ' +value+ ' into local storage')
		} catch (e) {
		  console.log(e);
		}
	  };
	  const storeGender = async (value) => {
		try {
		  await AsyncStorage.setItem('activeChildGender', value,);
		  
		  console.log('stored ' +value+ ' into local storage')
		} catch (e) {
		  console.log(e);
		}
	  };
	// run on star of app, and again whenever activeChild changes
    useEffect(() => {
        db.transaction((tx) => {
            // tx.executeSql('DROP TABLE feeds');
            tx.executeSql(
            'CREATE TABLE IF NOT EXISTS feeds (id ID, amount INT, time TEXT, type TEXT, breastside TEXT, milktype TEXT)');
			// console.log('feeds table created')
        });
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM feeds', null, 
			  (txObj, resultSet) => {
				setFeeds(resultSet.rows._array);
				// console.log("imported feeds")
			  },
			  (txObj, error) => console.log(error)
			);
		  });
		// child database
		db.transaction((tx) => {
			// tx.executeSql('DROP TABLE children');
			tx.executeSql(
			'CREATE TABLE IF NOT EXISTS children (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dobDay TEXT, dobMonth TEXT, dobYear TEXT, height INTEGER, weight INTEGER, gender TEXT)');
			// console.log('children table created');
				
		  });
		db.transaction(tx => {
			tx.executeSql('SELECT * FROM children', null,
			(txObj, resultSet)=>{
				setChildren(resultSet.rows._array);
				// console.log('children added to array')
			},
			(txObj, error)=> console.log(error)
			);
		})
		getName();
		getGender();
		getID();
		
	},[activeChild]);
	// show childs history
	const showHistory = () => {
	
		const reverse = [...feeds].reverse();
		return reverse.map((feed, index) =>{
			if(feed.id == activeChildID){
				if(feed.type == "Bottle"){
					return(
						<TouchableOpacity key={index} style={[styles.history, styles.shadow]} onPress={()=>navigation.navigate('Feed', feed.id)}>
								<View style={[styles.type,{backgroundColor: ColourSchemeBoy.secondColour}]}>
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
						<TouchableOpacity key = {index} style={styles.history}  >
							<View style={[styles.type,{backgroundColor: ColourSchemeBoy.thirdColour}]}>
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
						<TouchableOpacity key ={index} style={styles.history}  >
							<View style={[styles.type,{backgroundColor: ColourSchemeBoy.fourthColour}]}>
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

			}
			
	})};
	// show active child details
	const showActiveChild = () => {
		if(children.length == 0){ // if array is empty (no added children), display message
			return ( 
				<View style={{alignItems: 'center'}}>
						<Text style={{fontSize:24, margin: 2, color: ColourSchemeBoy.text}}>
							Add a child
						</Text>
						<Text style={{fontSize:24, margin: 2, color: ColourSchemeBoy.text}}>
							to see details
						</Text>
					</View>
			)
		} else {
			return children.map((child, index)=>{ // loop through array
				if(child.name == activeChild ){ // find active child in array
					return ( // display active childs details
						<View key={index} style={{alignItems: 'flex-end'}}>
							<Text style={{fontSize:24, margin: 2, color: ColourSchemeBoy.text}}>{child.name}</Text>
							<Text style={{margin: 2, color: ColourSchemeBoy.text}}>{child.dobDay}/{child.dobMonth}/{child.dobYear}</Text>
							<Text style={{margin: 2, color: ColourSchemeBoy.text}}>Height: {child.height}cm</Text>
							<Text style={{margin: 2, color: ColourSchemeBoy.text}}>Weight: {child.weight}kg</Text> 
						</View>
					)
				}
		})

		}
		
	};
	// for menu
	const handleAddNewChild = () => {
		setModalVisible(!modalVisible)

		navigation.navigate('AddChild');

	}

	const displayChildren = () => {
		
		return children.map((child, index)=>{
			return(
				<View key={index} >
					<TouchableOpacity onPress={()=>handleChildPress(child)}>
					<Text style={styles.childsName}>{child.name}</Text>
					</TouchableOpacity>
				</View>
			)
		})
		
	}
	const handleChildPress = (kid) => {
		setModalVisible(!modalVisible)
		setActiveChild(kid)
		storeName(kid.name)
		storeGender(kid.gender)
		storeID(kid.id)
	}
	

	/// make new saved child activeChild

  	return (
	
		<View style={styles.outer}>
			{/* HEADER START */}

			<View style={styles.header}>
			<View style={defaultStyle ? styles.topBar : styles.topBarGirl}>
				<View style={{alignSelf: 'center'}}>
					<Text style={{fontSize: 20}}>7 Weeks Old</Text>
				</View>
				

				<Modal
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
				setModalVisible(!modalVisible);
				}}>
					<View style={defaultStyle ? styles.modal : styles.modalGirl}>
						{displayChildren()}
						<TouchableOpacity onPress={handleAddNewChild}>
							<Text style={[styles.childsName, {fontWeight: 'bold'}]}>Add Child</Text>
						</TouchableOpacity>
					</View>

				</Modal>
				<View style= {styles.dotsMenuView}>
				<TouchableOpacity style={styles.dotsButton}  onPress={()=>setModalVisible(true)}>
				<Image
				source={require('../assets/dotMenu.png')}
				style={styles.img}
				/>
				</TouchableOpacity>

				</View>
				
			</View>
    	</View>
			{/* HEADER END */}

			<View style={styles.container}> 

				{/* NAME AND PHOTO START */}
				<View style={styles.nameSection}>
					<View>
            <ProfileImage />
					</View>
					<View style={{alignItems: 'flex-end'}}> 

						{showActiveChild()}
						
						<View style ={{flexDirection: 'row'}}>
							{/* <TouchableOpacity onPress={()=>navigation.replace('AddChild')}>
								<Text style={{fontSize: 30}}>+</Text>
							</TouchableOpacity> */}
							

						</View>
						
						

					</View>
					
					
				</View>
				{/* NAME AND PHOTO END */}
				
				

				{/* MENU START */}
				<View style = {[defaultStyle ? styles.menuArea : styles.menuAreaGirl, styles.shadow]}>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={[styles.menuItem, styles.shadow]} onPress={()=>navigation.navigate('Feed', activeChildID)}>
						<Image
						source={require('../assets/feed.png')}
						style={styles.pageButtonImg}
						/>
            			<Text style={styles.menuItemText}>Feeding</Text>
						</TouchableOpacity>
						
						
					</View>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={[styles.menuItem, {backgroundColor: ColourSchemeBoy.thirdColour}]}>
						<Image
						source={require('../assets/sleep.png')}
						style={styles.pageButtonImg}
						/>
           				<Text style={styles.menuItemText}>Sleep</Text>
						</TouchableOpacity>
						
					</View>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={[styles.menuItem, {backgroundColor: ColourSchemeBoy.fourthColour}]}>
						<Image
						source={require('../assets/nappy.png')}
						style={styles.pageButtonImg}
						/>
            			<Text style={styles.menuItemText}>Nappy</Text>
						</TouchableOpacity>
						
					</View>
					<View style={styles.menuItemColumn}>
						<TouchableOpacity style={[styles.menuItem, {backgroundColor: ColourSchemeBoy.fifthColour}]}>
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
				<View style={[defaultStyle ? styles.timelineContainer : styles.timelineContainerGirl, styles.shadow]}>
					<ScrollView contentContainerStyle={StyleSheet.timelineScroll} showsVerticalScrollIndicator={false}>
						<Text style={{padding: '2%'}}>Today</Text>
						{showHistory()}

					</ScrollView>

				</View>
				{/* TIMELINE END */}


			</View>
			<StatusBar style="auto" />
		</View>
        
  );}


//STYLES
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 8
    
  },
	outer: {
		// width: '100%',
		// height: '100%'
	},
  container: {
    // backgroundColor: ColourSchemeBoy.themeMode,
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
	backgroundColor: ColourSchemeBoy.mainColour,
	// borderRadius: 10,
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	padding: '2%',
	// elevation: 8,
  // paddingLeft: '6%',
  // paddingRight: '6%'
 

  },
  menuAreaGirl: {
	width: '100%',
	height: '12%',
	backgroundColor: ColourSchemeGirl.mainColour,
	// borderRadius: 10,
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	padding: '2%',
	// elevation: 8,
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
	backgroundColor: ColourSchemeBoy.secondColour,
	elevation: 2,
	alignItems: 'center',
	justifyContent: 'center',
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
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    elevation: 5,
	  alignSelf: 'center',
    
    
  },
  timelineContainer: {
	width: '90%',
  	borderRadius: 5,
	backgroundColor: ColourSchemeBoy.mainColour,
	height: '42 %',
	marginTop: '10%',
	elevation: 10,
  },
  timelineContainerGirl: {
	width: '90%',
  	borderRadius: 5,
	backgroundColor: ColourSchemeGirl.mainColour,
	height: '42 %',
	marginTop: '10%',
	elevation: 10,
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
    fontWeight: '600',
    color: ColourSchemeBoy.text
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
    borderLeftWidth: 1,
    borderColor: 'black'
    
  },
  milkType: {
    fontSize: 18,
    fontWeight: '400',
    color: ColourSchemeBoy.text
    
    
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
	
  },

  // HEADER

  topBar: {
	height: 70,
	paddingTop: 30,
	width: '100%',
	backgroundColor: ColourSchemeBoy.mainColour,
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'row',
  },
  topBarGirl: {
	  height: 70,
	  paddingTop: 30,
	  width: '100%',
	  backgroundColor: ColourSchemeGirl.mainColour,
	  alignItems: 'center',
	  justifyContent: 'center',
	  flexDirection: 'row',
	},
  name: {
	fontSize: 24,
  },
  img: {
	  position: 'absolute',
	  
	  transform: [
		  {scale: 0.8}
	  ]
  },
  dotsMenuView: {
	  position: 'absolute',
	  right: 0,
	  top: '70%',
	  width: '10%',
	  height: '100%',
	  
  },
  dotsButton: {
	  
	  height: '100%'

  },
  dots: {
	  color: 'black',
	  fontSize: 10,
	  fontWeight: 'bold',
	  height: 10
  }, 
  modal: {
	  position: 'absolute',
	  right: '1%',
	  backgroundColor: ColourSchemeBoy.mainColour,
	  width: '30%',
	  borderRadius: 5,
	  borderWidth:2,
	  elevation: 5
  },
  modalGirl: {
	  position: 'absolute',
	  right: '1%',
	  backgroundColor: ColourSchemeGirl.mainColour,
	  width: '30%',
	  borderRadius: 5,
	  borderWidth:2,
	  elevation: 5
  },
  childsName: {
	  fontSize: 18,
	  marginLeft: '2%',
	  height: 30
  },
  header: {
	width: '100%'
  }
 
  
  

   
});
