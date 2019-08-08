import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { initializeDecksStore } from '../../actions/deck';

class DecksScreen extends React.Component {
  componentDidMount() {
    this.props.dispatch(initializeDecksStore());
  }

  setChoosenDeck = ({ id }) => {
    this.props.navigation.navigate('DeckDetails', { id });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.decks.map(deck => (
          <TouchableOpacity key={deck.id} style={styles.deckContainer} onPress={() => this.setChoosenDeck(deck)}>
            <Text style={styles.deckTitle}>{deck.title}</Text>
            <Text>{deck.cards.length} cards</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

DecksScreen.navigationOptions = {
  title: 'Decks',
};

function mapStateToProps ({ deck }) {
  return {
    decks: Object.keys(deck).map(d => {
        return deck[d];
    }),
  }
}

//export default DecksScreen;
export default connect(mapStateToProps)(DecksScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  deckContainer: {
    paddingVertical: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});
