export const ADD_DECK = "ADD_DECK"
export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const UPDATE_DECK = "UPDATE_DECK"

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function updateDeck(deckId, question) {
    return {
        type: UPDATE_DECK,
        deckId,
        question
    }
}

