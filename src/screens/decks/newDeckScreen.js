import React from 'react';
import { 
    StyleSheet,
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { saveDeck } from '../../actions/deck';

class NewDeckScreen extends React.Component {
    state = {
        title: ''
    }

    onSubmit = () => {
        this.props.dispatch(saveDeck(this.state.title)).then(deck => {
            this.props.navigation.navigate("DeckDetails", { id: deck.id });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>What is the title of your new deck?</Text>
                    <TextInput value={this.state.title} placeholder="Type your title here" onChangeText={title => this.setState({ title })} />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                        <Text>Create Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

NewDeckScreen.navigationOptions = {
    title: 'New Deck',
};

export default connect()(NewDeckScreen);

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
    inputContainer: {
        flex: 1
    },
    submitContainer: {
        flex: 1
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: Dimensions.get('window').witdh
    }
});