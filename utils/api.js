import AsyncStorage from '@react-native-async-storage/async-storage'

/*
getDecks: return all of the decks along with their titles, questions, and answers.
getDeck: take in a single id argument and return the deck associated with that id.
saveDeckTitle: take in a single title argument and add it to the decks.
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
*/

const STORAGE_KEY = 'udacityMobileFlashcards'

export async function fetchDecksFromStorage() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export function saveCardToStorage({ question, answer, name }) {
  AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [name]: {
      cards: [{ question, answer }]
    }
  }))
}

export function saveDeckTitleToStorage(name) {
  AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [name]: { name, cards: [] }
  }))
}

export function removeDeckFromStorage(name) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results)
      delete data[name]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}