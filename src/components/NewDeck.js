import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Dimensions } from "react-native";
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { addDeck } from '../actions/decks';
import Deck from '../shared/components/Deck';
import { storeDeck } from '../shared/utils/Storage'

class NewDeck extends Component {

    state = {
        title: ''
    }

    onChange = (event) =>{
        this.setState({
            title: event.target.value
        })
    }

    onCreate() {
        if (this.state.title !== '') {
            const deck = {
                id: `${this.props.decks.length + 1}`,
                title: this.state.title,
                questions: []
            }

            this.props.dispatch(addDeck(deck))
            this.setState({
                title: ''
            })
            storeDeck(deck).then((res) => {
                console.log(res)
            })
        }
    }

    render() {
        return (
            <View style={ styles.body }>
                <Text style={ styles.title }>Enter the title of your deck</Text>
                <View style={{ flex: .9, justifyContent: 'center', marginLeft: 40, marginRight: 40 }}>
                    <Input 
                        placeholder="Title" 
                        onChangeText={ text => { this.setState({title: text}) } }
                        value={ this.state.title }
                        />
                </View>
                <View style={ styles.btn }>
                    <TouchableNativeFeedback
                        onPress={ () => this.onCreate() }
                    >
                        <Text style={ styles.btnText }>Create </Text>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

const styles = StyleSheet.create({
    body: {
        display: "flex",
        flex: 1,
        width: width,
        height: height,
        paddingTop: 20
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    btn: {
        alignSelf: "center",
        position: "absolute",
        bottom: 20,
        backgroundColor: "#29E7CD",
        alignItems: "center",
        padding: 10,
        width: 200,
        borderRadius: 20,
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center"
    }
})

const mapState = appState => {
    return {
        decks: appState
    }
}

export default connect(mapState)(NewDeck)
