
import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView, ScrollView, Image } from 'react-native';
import { Constants, WebBrowser } from "expo";
import { createStackNavigator } from 'react-navigation';
import FetchSite from './FetchSite.js';

const Touchable = (props) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>)
 
class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Welcome page' };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.white}>
      <Text></Text>
      <Text style={styles.text}>Welcome to</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Image 
        style={{width: 360, height: 150, marginLeft: 10, marginRight: 10}} 
        source={require('./img/new_logo.png')} 
      />
        <Touchable onPress={() => navigate('fetchsite')} title="Find restaurants" />
        <Text></Text>
        <Text></Text>
      </ScrollView>
    )
  }
}

export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />

const RouteStack = createStackNavigator({
  Home: { screen: HomeScreen },
  fetchsite: { screen: FetchSite },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 30,
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    marginHorizontal: 40
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  white: {
    backgroundColor: 'white'
  },
  text: {
    marginTop: 50,
    textAlign: "center", 
    fontSize: 23, 
    fontWeight: 'bold'
  }
  
});
