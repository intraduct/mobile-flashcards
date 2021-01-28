import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions'

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck]: {
          name: action.deck,
          cards: []
        }
      }
    case REMOVE_DECK:
      const next = { ...state }
      delete next[action.deck]
      return next
    case ADD_CARD:
      const { deck, question, answer } = action
      return {
        ...state,
        [deck]: {
          ...state[deck],
          cards: [...state[deck].cards, { question, answer }]
        }
      }
    default:
      return state
  }
}