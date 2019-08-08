import { SET_DECK, SET_DECKS, SET_CARD } from '../actions/deck';
import _ from 'lodash';

export default function deck (state = {}, action) {
    switch(action.type) {
        case SET_DECK:
            return {
                ...state,
                [action.deck.id]: action.deck
            }
        case SET_DECKS:
            return {
                ...state,
                ..._.mapKeys(action.decks, 'id')
            }
        case SET_CARD:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    cards: [...state[action.id].cards, action.card]
                }
            }
        default:
            return state
    }
}