import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { Dimensions } from "react-native";
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { 
    setLocalNotif,
    getDailyReminderValue,
    clearLocalNotif } from '../shared/utils/Notif'

export default class Quiz extends Component {

    state = {
        questionIndex: 0,
        hideAnswer: true,
        score: 0
    }

    toggleAnswer() {
        this.setState((state) => ({
            hideAnswer: !state.hideAnswer 
        }))
    }

    // option = 1 => correct, option = 2 => incorrect
    onAnswerPicked(option) {
        const deck = this.props.route.params.deck
        if (deck.questions[this.state.questionIndex] !== undefined) {
            if (option === 1) {
                if (deck.questions[this.state.questionIndex].correct) {
                    this.setState((state) => ({
                        hideAnswer: true,
                        score: state.score + 1
                    }), () => this.checkQuizEnd(deck))
                } else {
                    this.setState((state) => ({
                        hideAnswer: true
                    }), () => this.checkQuizEnd(deck))
                }
            } else if (option === 2) {
                if (deck.questions[this.state.questionIndex].correct) {
                    this.setState((state) => ({
                        hideAnswer: true
                    }), () => this.checkQuizEnd(deck))
                } else {
                    this.setState((state) => ({
                        hideAnswer: true,
                        score: state.score + 1
                    }), () => this.checkQuizEnd(deck))
                }
            }
        }
    }

    checkQuizEnd(deck) {
        if (this.state.questionIndex + 1 < deck.questions.length) {
            this.setState((state) => ({
                questionIndex: state.questionIndex + 1
            }))
        } else {
            this.createAlert(deck)
            clearLocalNotif().then(setLocalNotif)
        }
        console.log("State -> ", this.state)
    }

    createAlert(deck) {
        return Alert.alert(
            "Quiz ended",
            `You answered ${this.state.score} out of ${deck.questions.length} questions correct`,
            [
                {
                    text: "Go back",
                    onPress: () => { this.props.navigation.goBack() }
                }, {
                    text: "Restart",
                    onPress: () => { this.setState({
                        questionIndex: 0,
                        hideAnswer: true,
                        score: 0
                    }) }
                }
            ]
        )
    }

    render() {
        const deck = this.props.route.params.deck

        return (
            <View style={ styles.body }>
                <Text style={ styles.questionIndex }>{ `${this.state.questionIndex + 1}/${deck.questions.length}` }</Text>
                <Text style={ styles.question }>{ deck.questions[this.state.questionIndex].question }</Text>
                <Text 
                    style={ this.state.hideAnswer ? styles.answer : [styles.answer, styles.display] }>
                        { deck.questions[this.state.questionIndex].answer }
                </Text>
                <TouchableWithoutFeedback
                    onPress={ () => { this.toggleAnswer() }}>
                    <View>
                        <Text style={ styles.showAnswer }>
                            { this.state.hideAnswer ? "Show answer" : "Hide answer" }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={ styles.btnHolder }>
                    <TouchableHighlight
                        underlayColor="#277191"
                        style={[ styles.btnBackground, styles.correct ]}
                        onPress={ () => { this.onAnswerPicked(1) } }
                        >
                        <View>
                            <Text style={ styles.btnText }>Correct</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="#E61D0F"
                        style={[ styles.btnBackground, styles.incorrect ]}
                        onPress={ () => { this.onAnswerPicked(2) } }
                        >
                        <View>
                            <Text style={ styles.btnText }>Incorrect</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

const styles = StyleSheet.create({
    body: {
        width: width,
        height: height,
        padding: 20
    },
    questionIndex: {
        fontSize: 18
    },
    question: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 20
    },
    answer: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 12,
        display: 'none'
    },
    display: {
        display: 'flex'
    },
    showAnswer: {
        fontSize: 16,
        color: '#29E7CD',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
    },
    btnHolder: {
        position: 'absolute',
        bottom: 20,
        width: width,
        display: "flex",
        alignItems: 'center'
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
        textAlign: 'center',
        color: '#ffffff'
    },
    correct: {
        backgroundColor: '#2E86AB'
    },
    incorrect: {
        backgroundColor: '#F24236',
    },
})