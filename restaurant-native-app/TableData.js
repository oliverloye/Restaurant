import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Image
} from 'react-native'
import Table from 'react-native-simple-table'

const URL = "https://oloye.dk/api/info/getlists";

const columns = [
  {
    title: 'Navn',
    dataIndex: 'restName',
    width: 150,
  },
  {
    title: 'Madtype',
    dataIndex: 'foodType',
    width: 120
  },
  {
    title: 'Zip',
    dataIndex: 'cityInfo.zip',
    width: 50
  },
  {
    title: 'By',
    dataIndex: 'cityInfo.city',
    width: 50
  }, 
];

export default class TableData extends Component {

    constructor(props) {
        super(props);
        this.state={restaurant: ""}
    }

    async componentDidMount() {
        try {
          this.mounted = true;
            const restaurantList = await fetch(URL).then(res => res.json());
            if(this.mounted) {
            this.setState({ restaurantList });
            }
        } catch (err) {
            Alert.alert("Der er sket en fejl med at hente data \n \n " + err);
        }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

  render() {
    console.log(this.state.restaurantList);
    let dataSource = this.state.restaurantList;
    return (
      <ScrollView style={styles.container}>
      <Image 
        style={styles.logo} 
        source={require('./img/new_logo.png')} 
      />
        <Text></Text>
        <Table style={styles.title} columns={columns} dataSource={dataSource} height={500} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 5,
        backgroundColor: 'white'
      },
      android: {}
    }),
  },
  title: {
    //virker ikke
    fontSize: 25,
    padding: 5,
    textAlign: 'left',
    fontFamily: 'Times New Roman',
    fontWeight: 'bold'
  },
  logo: {
    alignContent: 'center', 
    width: 200, 
    height: 80, 
    marginLeft: 90
  }
});
