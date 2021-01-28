import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

export default class Quiz extends Component {

  state = {
    index: 2,
    correct: 1,
    questions: [
      { question: 'q0', answer: 'a0' },
      { question: 'q1', answer: 'a1' },
      { question: 'q2', answer: 'a2' },
    ]
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.name })
  }

  renderEmptyQuiz() {
    return (
      <View>
        <Text>
          Sorry, you cannot start a quiz because there are no cards in the deck!
        </Text>
      </View>
    );
  }

  renderNextQuestion() {
    const { index, questions } = this.state;
    const question = questions[index];

    if (question) {
      return (
        <View>
          <View>
            <Text>
              {index + 1}/{questions.length}
            </Text>
            <Text>
              {question.question}
            </Text>
            <TouchableOpacity>
              <Text>
                Show Answer
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>
              {question.question}
            </Text>
            <Text>
              {question.answer}
            </Text>
            <TouchableOpacity>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Wrong</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.renderResult();
  }

  renderResult() {
    const { correct, questions } = this.state;
    const length = questions.length
    return (
      <View>
        <Text>
          Congratulation! You answered {correct} / {length} ({Math.round(correct / length * 100)} %) correctly.
        </Text>
      </View>
    );
  }

  render() {
    const { questions } = this.state;

    return (
      questions.length === 0 ?
        this.renderEmptyQuiz() :
        this.renderNextQuestion()
    );
  }
}