import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { clearLocalNotification, setLocalNotification } from '../../services/helper';

class QuizScreen extends React.Component {

    state = {
        title: null,
        currentQuestion: 0,
        viewFront: true,
        totalCorrect: 0,
        cards: [],
    }

    async componentDidMount() {
        const id = this.props.navigation.getParam('id');
        const deck = this.props.deck[id];

        this.setState({
            id: deck.id,
            title: deck.title,
            cards: deck.cards,
        });

        await clearLocalNotification();
        setLocalNotification();
    }

    flipCard = () => 
        this.setState((prev) => ({
            viewFront: !prev.viewFront
        }));

    onClickCorrect = () =>
        this.setState((prev) => ({
            totalCorrect: ++prev.totalCorrect,
            currentQuestion: ++prev.currentQuestion,
            viewFront: true,
        }));

    onClickIncorrect = () =>
        this.setState((prev) => ({
            currentQuestion: ++prev.currentQuestion,
            viewFront: true,
        }));

    render() {
    const { cards, currentQuestion, viewFront, totalCorrect, id } = this.state;
    const { navigation } = this.props;

    if (cards.length && currentQuestion === cards.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.card}>
                    You got {totalCorrect} out of {cards.length} questions right!
                </Text>
                <TouchableOpacity
                    style={styles.backDeckContainer}
                    onPress={() => navigation.navigate('DeckDetails', { id })}>
                    <Text style={styles.backDeckText}>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.restartContainer}
                    onPress={() => this.setState({ currentQuestion: 0, viewFront: true, totalCorrect: 0 })}>
                    <Text>Restart Quiz</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //display question
    return (
        <View style={styles.container}>
        { cards.length 
            ? (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.count}> {currentQuestion + 1} / {cards.length} </Text>
                <Text style={styles.card}>
                {viewFront
                    ? cards[currentQuestion].question
                    : cards[currentQuestion].answer
                }
                </Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.flipCard}><Text>{viewFront ? 'Answer' : 'Question'}</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.correcContainer} onPress={this.onClickCorrect}><Text style={styles.correcText}>Correct</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.incorrecContainer} color='red' onPress={this.onClickIncorrect}><Text style={styles.incorrecText}>Incorrect</Text></TouchableOpacity>
                </View>
            </ScrollView>
            )
            : (
                <Text style={styles.card}> 
                    Deck Empty
                </Text>
            )
        }
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    card: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
        margin: 20,
    },
    count: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        margin: 20
    },
    backDeckContainer: {
        backgroundColor: 'black',
        padding: 10,
    },
    backDeckText: {
        color: 'white'
    },
    restartContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8
    },
    correcContainer: {
        backgroundColor: 'green',
        padding: 10,
    },
    correcText: {
        color: 'white',
    },
    incorrecContainer: {
        backgroundColor: 'red',
        padding: 10,
    },
    incorrecText: {
        color: 'white',
    },
    button: {
        borderRadius: 2,
        marginVertical: 10,
        marginHorizontal: 'auto'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        fontWeight: '500',
    },
});

function mapStateToProps ({ deck }) {
    return { deck };
}

export default connect(mapStateToProps)(QuizScreen);