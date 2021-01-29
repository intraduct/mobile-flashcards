import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { saveCardToStorage } from '../utils/api';

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onChangeText = (key, value) => {
    this.setState(
      {
        [key]: value
      }
    );
  }

  submitNewCard() {
    const { question, answer } = this.state
    const { dispatch, navigation, route } = this.props
    const { name } = route.params

    if (question === '' || answer === '') {
      Alert.alert('Neither question nor answer can be empty', 'Please fill out the form!')
      return
    }

    this.setState({ question: '', answer: '' })
    const card = { name, question, answer }
    saveCardToStorage(card)
    dispatch(addCard(card))
    navigation.goBack()
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={question => this.onChangeText('question', question)}
          placeholder="Question"
        />
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={answer => this.onChangeText('answer', answer)}
          placeholder="Answer"
        />
        <TouchableOpacity onPress={() => this.submitNewCard()}>
          <Text style={styles.button}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  input: {
    fontSize: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'dodgerblue',
    color: 'white',
    fontSize: 20,
  }
})

export default connect()(NewCard)