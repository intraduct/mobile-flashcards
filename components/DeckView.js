import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { removeDeck } from '../actions';
import { removeDeckFromStorage } from '../utils/api';
import AppLoading from 'expo-app-loading';

class DeckView extends Component {

  state = {
    opacity: new Animated.Value(0)
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.deck.name })

    const { opacity } = this.state
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start()
  }

  removeDeck() {
    const { dispatch, deck, navigation } = this.props
    const { name } = deck

    removeDeckFromStorage(name)
    dispatch(removeDeck(name))
    navigation.goBack()
  }

  render() {
    const { deck } = this.props
    const { opacity } = this.state

    if (typeof deck === 'undefined') {
      return <AppLoading />;
    }

    const { name } = deck;
    return (
      <Animated.View style={[styles.deck, { opacity }]}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.count}>Cards: {deck.cards.length}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { name }
          )}>
          <Text style={styles.startButton}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'Add Card',
          { name }
        )}>
          <Text style={styles.addCardButton}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.removeDeck()}>
          <Text style={styles.deleteButton}>
            Delete Deck
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  deck: {
    paddingVertical: 30,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  },
  count: {
    fontSize: 16,
    color: 'gray'
  },
  startButton: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'dodgerblue',
    color: 'white',
    fontSize: 20,
  },
  addCardButton: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'darkslateblue',
    color: 'white',
    fontSize: 20
  },
  deleteButton: {
    fontSize: 16,
    marginTop: 20,
    color: 'red',
    borderBottomWidth: 1,
    borderColor: 'red'
  }
})

const mapStateToProps = (decks, props) => {
  return {
    deck: decks[props.route.params.name]
  }
}

export default connect(mapStateToProps)(DeckView);