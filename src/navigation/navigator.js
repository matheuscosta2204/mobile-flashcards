import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DecksScreen from '../screens/decks/decksScreen';
import DeckDetailsScreen from '../screens/decks/deckDetailsScreen';
import NewCardScreen from '../screens/cards/newCardScreen';
import QuizScreen from '../screens/quiz/quizScreen';
import NewDeckScreen from '../screens/decks/newDeckScreen';

const DecksStack = createStackNavigator(
  {
    Decks: DecksScreen,
    DeckDetails: DeckDetailsScreen,
    NewCard: NewCardScreen,
    Quiz: QuizScreen,
  }
);

DecksStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-albums` : 'md-albums'
      }
    />
  ),
};

const NewDeckStack = createStackNavigator(
  {
    NewDeck: NewDeckScreen,
  }
);

NewDeckStack.navigationOptions = {
  tabBarLabel: 'New Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
  ),
};

const tabNavigator = createBottomTabNavigator({
  DecksStack,
  NewDeckStack
});

export default createAppContainer(tabNavigator);
