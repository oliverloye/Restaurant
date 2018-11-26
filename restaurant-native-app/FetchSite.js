import React from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';

//const URL = "http://ba98380c.ngrok.io/CA3-2/api/info/swapi";
const URL = "http://2e2fb80d.ngrok.io/Restaurant/api/info/getlist";

export default class FetchSite extends React.Component {
    constructor(props) {
        super(props)
        this.state = { restaurant: "" };
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
        const restaurant = this.state.restaurant;
        return (
            <ScrollView style={styles.white}>
                <Text> </Text>
                <Text style={styles.table}>{restaurant.restName}</Text>
                <Text style={styles.table}>{
                    'Madtype: ' + restaurant.foodType
                }</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },

    table: {
        fontSize: 20,
        flex: 1,
        textAlign: 'left',
        backgroundColor: '#fff',
        margin: 20
    },

    white: {
        backgroundColor: 'white'
    }
});