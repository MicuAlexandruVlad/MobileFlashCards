import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Dimensions } from "react-native";


export default class Deck extends Component {
    render() {
        return (
            <View style={ styles.deckBody }>
                <Text style={ styles.title }> { this.props.title } </Text>
                <Text style={ styles.questions }> { this.props.questionCount === 1 ? 
                    `${ this.props.questionCount } question` : `${ this.props.questionCount } questions` } </Text>
            </View>
        )
    }
}

var width = Dimensions.get('window').width - 40


const styles = StyleSheet.create({
    deckBody: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        width: width,
        alignItems: 'center',
        margin: 20,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },  
    questions: {
        fontSize: 16
    },
})
