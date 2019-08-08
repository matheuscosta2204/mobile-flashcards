import React from 'react';
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

class DeckDetailsScreen extends React.Component {

    goToAddCard = (id) => {
        this.props.navigation.navigate('NewCard', { id });
    }

    goToStartQuiz = (id) => {
        this.props.navigation.navigate('Quiz', { id });
    }

    render() {
        const {id, title, cards } = this.props.deck[this.props.navigation.getParam("id")];
    
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text>{cards.length} cards</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.add} onPress={() => this.goToAddCard(id)}>
                        <Text style={styles.addText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.start} onPress={() => this.goToStartQuiz(id)}>
                        <Text style={styles.startText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

DeckDetailsScreen.navigationOptions = {
    title: 'Decks',
};

function mapStateToProps ({ deck }) {
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckDetailsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    infoContainer: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
    },
    add: {
        width: Dimensions.get('window').width,
        borderColor: 'black',
        borderWidth: 1,
        margin: 10
    },
    addText: {
        alignSelf: 'center',
        padding: 10,
    },
    start: {
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
        margin: 10
    },
    startText: {
        alignSelf: 'center',
        padding: 10,
        color: 'white',
    }
});