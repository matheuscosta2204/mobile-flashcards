import React from 'react';
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput,
    Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { saveCard } from '../../actions/deck';

class NewCardScreen extends React.Component {

    state = {
        question: ""
    }

    submit = (question, answer) => {
        const id = this.props.navigation.getParam('id');
        this.props.dispatch(saveCard(id, { question, answer }));
        this.props.navigation.navigate('DeckDetails');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text>Question: </Text>
                    <TextInput value={this.state.question} placeholder="Type your question" onChangeText={question => this.setState({ question })} />
                </View>
                <View style={styles.answerContainer}>
                <Text>Answer: </Text>
                    <TextInput value={this.state.answer} placeholder="Type your answer" onChangeText={answer => this.setState({ answer })} />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.submitButtonContainer} onPress={() => this.submit(this.state.question, this.state.answer)}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

NewCardScreen.navigationOptions = {
    title: 'New Card',
};

export default connect()(NewCardScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
        padding: 20
    },
    questionContainer: {
        flex: 1,
    },
    answerContainer: {
        flex: 1,
    },
    submitContainer: {
        flex: 1,
        alignItems: 'center',
    },
    submitButtonContainer: {
        borderWidth: 1,
        borderColor: 'green',
        padding: 10
    }
});