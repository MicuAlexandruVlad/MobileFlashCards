import React, { Component } from 'react'
import { FlatList, Platform, Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions/decks'
import Deck from '../shared/components/Deck'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { getDecks } from '../shared/utils/Storage'

class Decks extends Component {
    componentDidMount() {
        // get decks from asyncStorage
        getDecks().then((res) => {
            if (res !== null) {
                // console.log('Decks', res)
                this.props.dispatch(receiveDecks(JSON.parse(res).decks))
            }
        })
    }

    renderItem = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={ () => {this.onDeckPress(item)} }>
            <Deck 
                title={ item.title }
                questionCount={ item.questions.length }
             />
        </TouchableWithoutFeedback>
    )

    renderList(list) {
        return (
            <FlatList 
                contentContainerStyle={ styles.list }
                data={ list }
                renderItem={ this.renderItem }
                numColumns={ 1 }
                keyExtractor={ item => item.id }
                navigator={ this.props.navigator }
            />
        )
    }

    onDeckPress(item) {
        this.props.navigation.navigate('IndividualDeck', { deck: item })
    }

    render() {
        return (
            Platform.OS === 'ios' ? 
            <SafeAreaView>
                { this.renderList(this.props.decks) }
            </SafeAreaView>
            : 
            <View>
                { this.renderList(this.props.decks) }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        // flexDirection: 'column',
        
    },
})

const mapState = appState => {
    return {
        decks: appState
    }
}

export default connect(mapState)(Decks)