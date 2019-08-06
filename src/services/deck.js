import AsyncStorage from '@react-native-community/async-storage';

import { generateUID } from './helper';

const KEY = 'decks';

export const setDeck = (title) => {
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
    } catch (e) {
        console.log('Could not set a new Deck', e);
    }
}
