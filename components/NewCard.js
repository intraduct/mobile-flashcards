import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
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

    this.setState({ question: '', answer: '' })
    const card = { name, question, answer }
    saveCardToStorage(card)
    dispatch(addCard(card))
    navigation.goBack()
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View>
        <TextInput
          value={question}
          onChangeText={question => this.onChangeText('question', question)}
          placeholder="Question"
        />
        <TextInput
          value={answer}
          onChangeText={answer => this.onChangeText('answer', answer)}
          placeholder="Answer"
        />
        <TouchableOpacity onPress={() => this.submitNewCard()}>
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(NewCard)