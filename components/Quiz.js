import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import { connect } from 'react-redux'
import { resetLocalNotificationTomorrow } from '../utils/api'

class Quiz extends Component {

  state = {
    index: 0,
    correct: 0,
    degree: new Animated.Value(0),
    displayQuestion: true
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.deck.name })
  }

  frontInterpolate = this.state.degree.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  })

  backInterpolate = this.state.degree.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })

  showAnswer() {
    Animated.timing(this.state.degree, {
      toValue: -180,
      duration: 800,
      useNativeDriver: true,
    }).start()
    this.setState({ displayQuestion: false })
  }

  showQuestion() {
    Animated.timing(this.state.degree, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start()
    this.setState({ displayQuestion: true })
  }

  correctAnswer() {
    this.setState(prevState => ({
      index: prevState.index + 1,
      correct: prevState.correct + 1,
      displayQuestion: true,
    }))
    this.state.degree.setValue(0)
  }

  wrongAnswer() {
    this.setState(prevState => ({
      index: prevState.index + 1,
      displayQuestion: true,
    }))
    this.state.degree.setValue(0)
  }

  renderEmptyQuiz() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 20 }}>
          There are no cards in this deck.
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 20, marginHorizontal: 20 }}>
          Try adding a card before starting the quiz!
        </Text>
      </View>
    );
  }

  renderNextQuestion() {
    const { index } = this.state
    const { cards } = this.props.deck
    const card = cards[index]

    if (card) {
      const frontRotation = {
        transform: [
          { rotateY: this.frontInterpolate }
        ]
      }

      const backRotation = {
        transform: [
          { rotateY: this.backInterpolate }
        ]
      }

      return (
        <View style={styles.container}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.count}>
              {index + 1}/{cards.length}
            </Text>
          </View>
          <View style={{}}>
            <Animated.View style={[styles.card, frontRotation]}>
              <Text style={styles.cardText}>
                {card.question}
              </Text>
            </Animated.View>
            <Animated.View style={[styles.card, styles.cardBack, backRotation]}>
              <Text style={styles.cardText}>
                {card.answer}
              </Text>
            </Animated.View>
          </View>
          {this.state.displayQuestion &&
            <TouchableOpacity onPress={() => this.showAnswer()}>
              <Text style={styles.flipButton}>
                Answer
              </Text>
            </TouchableOpacity>}
          {!this.state.displayQuestion &&
            <TouchableOpacity onPress={() => this.showQuestion()}>
              <Text style={styles.flipButton}>
                Question
              </Text>
            </TouchableOpacity>}
          <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.correctAnswer()}>
              <Text style={[styles.button, { backgroundColor: 'limegreen' }]}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.wrongAnswer()}>
              <Text style={[styles.button, { backgroundColor: 'crimson' }]}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View >
      );
    }

    return this.renderResult();
  }

  restartQuiz() {
    this.setState({
      index: 0,
      correct: 0,
      displayQuestion: true
    })
    this.state.degree.setValue(0)
  }

  renderResult() {
    const { correct } = this.state
    const { cards } = this.props.deck
    const length = cards.length

    resetLocalNotificationTomorrow()

    return (
      <View style={{ justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
        <Text style={{ textAlign: 'center', fontSize: 24, margin: 20 }}>
          🎉 Congratulation! 🎉
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 16, margin: 20 }}>
          You answered {correct} / {length} ({Math.round(correct / length * 100)} %) correctly.
        </Text>
        <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.restartQuiz()}>
            <Text style={[styles.button, { backgroundColor: 'dodgerblue' }]}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={[styles.button, { backgroundColor: 'darkslateblue' }]}>Back To Deck</Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  card: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
    height: 220,
    width: 310,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 24
  },
  count: {
    fontSize: 16,
    color: 'gray',
    padding: 10,
  },
  cardText: {
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    color: 'white',
    fontSize: 20
  },
  flipButton: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10
  }
})

export default connect(mapStateToProps)(Quiz)