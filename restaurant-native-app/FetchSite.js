

import React from 'react';
import { StyleSheet, Text, ScrollView, Alert, ListView } from 'react-native';
import { Table, Row, Rows, Column } from 'react-native-table-component';

//const URL = "http://4f0fbf03.ngrok.io/Restaurant/api/info/getlist";
const URL = "https://oloye.dk/api/info/getlist";

export default class FetchSite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurant: "",
            /* tableHead: ['Navn', 'Madtype', 'Zip', 'By'],
            tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd']
            ], */
        }
    }

    async componentDidMount() {
        try {
            const restaurantList = await fetch(URL).then(res => res.json());
            const rest1 = restaurantList[0];
            this.setState({ restaurant: rest1 });

        } catch (err) {
            Alert.alert("UPS " + err);
        }
    }

    render() {
        const restaurant = this.state.restaurant;
        return (

            /*             <ScrollView style={styles.white}>
             */
            /* <Table rowGetter={({ index }) => restaurant[index]}>
                <Column
                    label='restName'
                    dataKey='restName'
                />
                <Column
                    label='foodType'
                    dataKey='foodType'
                />
            </Table> */



            /* <Text> </Text>
            <Text>{'Navn' + ' ' + 'Madtype' + ' ' + 'Postnummer' + ' ' + 'By'}</Text>
            <Text>{restaurant.restName + ' ' + restaurant.foodType}</Text>
            <Text></Text> */


            /* 

              <Table>
                <Row data={['Navn', 'Madtype', 'Postnummer', 'By']} />
                <Rows data={['name', 'm', '', '']} />
            </Table> 
        </ScrollView> */

            <ScrollView style={styles.white}>
                <Text> </Text>
                <Text>{restaurant.restName}</Text>
                <Text>{'Madtype: ' + restaurant.foodType}</Text>

                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>

                {/* <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table> */}

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