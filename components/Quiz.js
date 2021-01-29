import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends Component {

  state = {
    index: 0,
    correct: 0
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.deck.name })
  }

  correctAnswer() {
    this.setState(prevState => ({
      index: prevState.index + 1,
      correct: prevState.correct + 1
    }))
  }

  wrongAnswer() {
    this.setState(prevState => ({
      index: prevState.index + 1
    }))
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
    const { index } = this.state
    const { cards } = this.props.deck
    const card = cards[index]

    if (card) {
      return (
        <View>
          <View>
            <Text>
              {index + 1}/{cards.length}
            </Text>
            <Text>
              {card.question}
            </Text>
            <TouchableOpacity>
              <Text>
                Show Answer
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>
              {card.question}
            </Text>
            <Text>
              {card.answer}
            </Text>
            <TouchableOpacity onPress={() => this.correctAnswer()}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.wrongAnswer()}>
              <Text>Wrong</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.renderResult();
  }

  renderResult() {
    const { correct } = this.state
    const { cards } = this.props.deck
    const length = cards.length
    return (
      <View>
        <Text>
          Congratulation! You answered {correct} / {length} ({Math.round(correct / length * 100)} %) correctly.
        </Text>
      </View>
    );
  }

  render() {
    const { cards } = this.props.deck

    return (
      cards.length === 0 ?
        this.renderEmptyQuiz() :
        this.renderNextQuestion()
    );
  }
}

const mapStateToProps = (decks, props) => {
  return {
    deck: decks[props.route.params.name]
  }
}

export default connect(mapStateToProps)(Quiz)