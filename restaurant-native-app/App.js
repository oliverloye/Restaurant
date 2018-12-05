
import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView, ScrollView, Image } from 'react-native';
import { Constants, WebBrowser } from "expo";
import { createStackNavigator } from 'react-navigation';
//import FetchSite from './FetchSite.js';
//import TableData from './TableData.js';
import ListViewData from './ListViewData.js';

const Touchable = (props) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>)
 
class HomeScreen extends React.Component {
  static navigationOptions = { title: ' ' };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.white}>
      <Image 
        style={styles.image} 
        source={require('./img/new_logo.png')} 
      />
         {/* <Touchable onPress={() => navigate('tableData')} title="Find restaurants" />  */}
         <Touchable onPress={() => navigate('listViewData')} title="Find restaurants" /> 
        <Text></Text>
        <Text></Text>
      </ScrollView>
    )
  }
}

export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />

const RouteStack = createStackNavigator({
  Home: { screen: HomeScreen },
  //fetchsite: { screen: FetchSite },
  //tableData: {screen: TableData },
  listViewData: {screen: ListViewData },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 150,
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 70,
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 40
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    
  },
  white: {
    backgroundColor: 'white'
  },
  text: {
    marginTop: 50,
    textAlign: "center", 
    fontSize: 23, 
  },
  image: {
    width: 360, 
    height: 150, 
    marginLeft: 10, 
    marginRight: 10, 
    marginTop: 100, 
    marginBottom: 0
  }
  
});
