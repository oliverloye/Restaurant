import React from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';

const URL = "http://ba98380c.ngrok.io/CA3-2/api/info/swapi";

export default class FetchSite extends React.Component {
    constructor(props) {
        super(props)
        this.state = { person: "" };
    }

    async componentDidMount() {
        try {
            const swapitest = await fetch(URL).then(res => res.json());
            const luke = swapitest[0];
            this.setState({ person: luke });

        } catch (err) {
            Alert.alert("UPS " + err);
        }
    }

    render() {
        const person = this.state.person;
        return (
            <ScrollView style={styles.white}>
                <Text> </Text>
                <Text style={styles.table}>{person.name}</Text>
                <Text style={styles.table}>{
                    'Gender: ' + person.gender + '\n'
                    + 'Height: ' + person.height + '\n'
                    + 'Mass: ' + person.mass + '\n'
                    + 'Hair-color: ' + person.hair_color + '\n'
                    + 'Skin-color: ' + person.skin_color + '\n'
                    + 'Eye-color: ' + person.eye_color + '\n'
                    + 'Birth-year: ' + person.birth_year + '\n'
                    + 'Homeworld: ' + person.homeworld + '\n\n'
                    + 'Films: ' + person.films + '\n\n'
                    + 'Species: ' + person.species + '\n\n'
                    + 'Vehicles: ' + person.vehicles + '\n\n'
                    + 'Starships: ' + person.starships + '\n\n'
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