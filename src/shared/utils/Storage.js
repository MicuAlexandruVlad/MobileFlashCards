import { AsyncStorage } from 'react-native'
const STORAGE_KEY = '_STORAGE_'

export async function storeDeck(deck) {
    try {
        const storedDecks = await AsyncStorage.getItem(STORAGE_KEY)
        if (storedDecks === null) {
            const decks = {
                decks: [deck]
            }
            AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks))
        } else {
            const decks = JSON.parse(storedDecks).decks
            decks.push(deck)
            const d = {
                decks: decks
            }
            AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(d))
        }
    } catch (error) {
        
    }
}

export async function updateDeck(deck) {
    const d1 = await AsyncStorage.getItem(STORAGE_KEY)
    const decks = JSON.parse(d1).decks
    decks.map((storedDeck) => {
        if (storedDeck.id === deck.id) {
            storedDeck.questions = deck.questions
        }

        return storedDeck
    })

    const d = {
        decks: decks
    }
    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(d))
}

export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
}