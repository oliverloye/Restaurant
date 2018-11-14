import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
//const URL = "http://be43ac45.ngrok.io/CA3/api/resource/swapi";
//const URL = "http://2235b022.ngrok.io/CA3/api/resource/swapi";
const URL = "http://00aa50bc.ngrok.io/CA3/api/resource/swapi";

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={person: ""};
  }

  async componentDidMount(){
    try{
    const swapitest = await fetch(URL).then(res=>res.json());
    const luke = JSON.parse(swapitest[0]);
    this.setState({person:luke});

    }catch(err){
      Alert.alert("UPS " + err);
    }
  }

  render() {
    const person = this.state.person;
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20}}>{person.name}</Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
