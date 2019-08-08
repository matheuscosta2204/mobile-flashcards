export const SET_DECK = "SET_DECK";
export const SET_DECKS = "SET_DECKS";
export const SET_CARD = 'SET_CARD';

import { _setDeck, _getAllDecks, _getDeckById, _setCardToDeck } from '../services/deck';

function setDeck (deck) {
    return {
        type: SET_DECK,
        deck
    }
}

function setDecks (decks) {
    return {
        type: SET_DECKS,
        decks
    }
}

function setCardToDeck (id, card) {
    return {
        type: SET_CARD,
        id,
        card
    }
}

export function saveDeck(title) {
    return (dispatch) => {
        return _setDeck(title).then(deck => {
            dispatch(setDeck(deck));
            return deck;
        });
    }
}

export function saveCard(id, card) {
    return (dispatch) => {
        _setCardToDeck(id, card).then(() => {
            dispatch(setCardToDeck(id, card));
        });
    }
}

export function initializeDecksStore() {
    return (dispatch) => {
        return _getAllDecks().then(decks => {
            dispatch(setDecks(decks));
        })
    }
}
