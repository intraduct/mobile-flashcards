import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

export default class NewCard extends Component {
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
        <TouchableOpacity>
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}