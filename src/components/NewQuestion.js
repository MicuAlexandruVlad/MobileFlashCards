import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux'
import { Input } from 'react-native-elements';
import { Dimensions } from "react-native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { abs } from 'react-native-reanimated';
import { updateDeck } from '../actions/decks';
import { updateDeck as update } from '../shared/utils/Storage'

class NewQuestion extends Component {

    state = {
        question: '',
        answer: '',
        correct: false
    }

    onNewQuestion() {
        const deckId = this.props.route.params.deckId
        if (this.state.question === '' || this.state.answer === '') {
            alert('One or more fields are empty')
        } else {
            const question = {
                question: this.state.question,
                answer: this.state.answer,
                correct: this.state.correct,
            }
            
            this.props.dispatch(updateDeck(deckId, question))
            this.setState({
                question: '',
                answer: '',
                correct: false,
            })
        }
    }

    render() {
        return (
            <View style={ styles.body }>
                <Text style={ styles.title }> Add card </Text>
                <View style={ styles.inputHolder }>
                    <Input 
                        value={ this.state.question }
                        onChangeText={ text => { this.setState({ question: text }) } }
                        placeholder="Type a question here" />
                    <Input 
                        value={ this.state.answer }
                        onChangeText={ text => { this.setState({ answer: text }) } }
                        placeholder="Type an answer here" />
                </View>
                <View style={ styles.btnHolder }>
                    <TouchableHighlight
                        underlayColor="#47EBD5"
                        style={ styles.btn }
                        onPress={ () => { this.onNewQuestion() } }>
                        <Text style={ styles.btnText }>Add Question</Text>
                    </TouchableHighlight>
                </View>
                <View style={ styles.cbHolder }>
                    <CheckBox
                        value={ this.state.correct }
                        onValueChange={ (value) => { this.setState({ correct: value }) } }
                        /> 
                    <Text style={ styles.cbText }>Correct answer</Text>
                </View>
            </View>
        )
    }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        height: height
    },
    title: {
        fontSize: 30,
        marginTop: 20,
    },
    inputHolder: {
        width: width - 40,
        marginTop: 100
    },
    btnHolder: {
        position: 'absolute',
        bottom: 20
    },
    btn: {
        backgroundColor: "#29E7CD",
        borderRadius: 30
    },
    btnText: {
        width: 200,
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10
    },
    cbHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cbText: {
        fontSize: 16
    }
})

export default connect()(NewQuestion)
