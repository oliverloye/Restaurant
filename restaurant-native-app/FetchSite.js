import React from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

//const URL = "http://4f0fbf03.ngrok.io/Restaurant/api/info/getlist";
const URL = "https://oloye.dk/api/info/getlist";

export default class FetchSite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /* restaurant: "", */
            tableHead: ['Navn', 'Madtype', 'Zip', 'By'],
            tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd']
            ],
            restaurant: [[""]]
        }
    }

    async componentDidMount() {
        try {
            const resttest = await fetch(URL).then(res => res.json());
            const rest1 = resttest[0];
            this.setState({ restaurant: rest1 });

        } catch (err) {
            Alert.alert("UPS " + err);
        }
    }

    render() {
        const state = this.state;
    
        return (
            
            /*
            <ScrollView style={styles.white}>
                <Text> </Text>
                <Text style={styles.table}>{restaurant.restName}</Text>
                <Text style={styles.table}>{
                    'Madtype: ' + restaurant.foodType
                }</Text>
            </ScrollView> */


            <ScrollView style={styles.container}>
                <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
    white: {
        backgroundColor: 'white'
    },

    container: { 
        flex: 1, 
        padding: 5, 
        paddingTop: 5, 
        backgroundColor: 'white' 
    },
  
    head: { 
        height: 40, 
        backgroundColor: 'white' 
    },

    text: { 
        margin: 6 
    }
});