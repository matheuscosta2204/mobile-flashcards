import { AsyncStorage } from 'react-native';

import { generateUID } from './helper';

const KEY = 'decks';

const defaultDecks = {
    "vthrdm985a262al8qx3do": {
        id: "vthrdm985a262al8qx3do",
        title: 'React',
        cards: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    "xj352vofupe1dqz9emx13r": {
        id: "xj352vofupe1dqz9emx13r",
        title: 'JavaScript',
        cards: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export const _setDeck = async (title) => {
    const id = generateUID();

    const deck = {
        id,
        title,
        cards: []
    }

    try {
        AsyncStorage.mergeItem(KEY, JSON.stringify({
           [id]: deck
        }));
        return deck;
    } catch (e) {
        console.log('Could not set a new Deck', e);
    }
}

export const _getAllDecks = async () => {
    //AsyncStorage.clear();
    try {
        const decks = await AsyncStorage.getItem(KEY);
        if(decks === null) {
            await AsyncStorage.setItem(KEY, JSON.stringify(defaultDecks));
            return defaultDecks;
        } else {
            return JSON.parse(decks);
        }
    } catch (e) {
        console.log('Could not get decks', e);
    }
}

export const _getDeckById = async (id) => {
    try {
        const decks = await AsyncStorage.getItem(KEY);
        const decksObject = await JSON.parse(decks);
        return decksObject[id];
    } catch(e) {
        console.log('Could not get deck', e);
    }
}

export const _setCardToDeck = async (id, card) => {
    try {
        const deck = await _getDeckById(id);
        const cards = [...deck.cards, card];

        await AsyncStorage.mergeItem(KEY, JSON.stringify({
            [id]: {
                id,
                title: deck.title,
                cards
            }
        }));
        return await _getAllDecks();
    } catch(e) {
        console.log('Could not add card to deck', e);
    }
}