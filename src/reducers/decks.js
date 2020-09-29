import { ADD_DECK, RECEIVE_DECKS, UPDATE_DECK } from '../actions/decks'
import { storeDeck, updateDeck } from '../shared/utils/Storage'

export default function decks(state = [], action) {
    switch (action.type) {
        case ADD_DECK:
            
            return Object.assign([], state, state.concat(action.deck))
    
        case RECEIVE_DECKS:
            return Object.assign([], state, action.decks)

        case UPDATE_DECK: 
            return Object.assign([], state, state.map((deck) => {
                if (deck.id === action.deckId) {
                    deck.questions.push(action.question)
                    updateDeck(deck)
                }

                return deck
            }))   
        default:
            return state
    }
}