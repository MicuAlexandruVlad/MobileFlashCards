import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Dimensions } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';

class IndividualDeck extends Component {

    onStartQuiz(deck) {
        
        if (deck.questions.length === 0) {
            alert("You need to add cards in the deck before starting the quiz.")
        } else {
            this.props.navigation.navigate('Quiz', { deck: deck })
        }
    }

    render() {

        const deck = this.props.route.params.deck

        return (
            <View style={ styles.body }>
                <Text style={ styles.title }> { deck.title } </Text>
                {
                    deck.questions.length === 1 ? 
                    <Text style={ styles.questionNumber }> 1 question </Text>
                    :
                    <Text style={ styles.questionNumber }>{ deck.questions.length } questions</Text>
                }
                <View style={ styles.btnHolder }>
                    <TouchableHighlight
                        onPress={ () => { this.props.navigation.navigate('NewQuestion', { deckId: deck.id }) } }
                        underlayColor="#D6D6D6"
                        style={[ styles.btnBackground, styles.addCard ]}>
                        <View>
                            <Text style={ styles.btnText }>Add Card</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#47EBD5"
                        style={[ styles.btnBackground, styles.quiz ]}
                        onPress={ () => { this.onStartQuiz(deck) } }>
                        <View>
                            <Text style={ styles.btnText }>Start Quiz</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    body: {
        width: width,
        height: height,
        paddingTop: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
    questionNumber: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 16,
    },
    btnHolder: {
        position: 'absolute',
        bottom: 20
    },  
    btnBackground: {
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 30,
        marginBottom: 10,
    },
    btnText: {
        fontSize: 18,
        width: 200,
        textAlign: 'center'
    },
    quiz: {
        backgroundColor: "#29E7CD"
    },
    addCard: {
        borderStyle: 'solid',
        borderWidth: 2,
    },
})

const mapState = appState => {
    return {
        decks: appState
    }
}

export default connect(mapState)(IndividualDeck)