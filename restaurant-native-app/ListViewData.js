import React, {Component} from 'react';
import { 
    StyleSheet, Text, View, 
    Alert, ListView, Image, 
    ScrollView, TouchableOpacity 
} from 'react-native';
//import {connect } from 'react-redux';

export default class ListViewData extends Component {

    async componentWillMount() {
        const restaurantList = await fetch(URL).then(res => res.json());
        this.setState({restaurantList});
    }

    render() {
        return (
            <View style={StyleSheet.container}>
            <p>Hej</p>
            </View>
        )
    }
}