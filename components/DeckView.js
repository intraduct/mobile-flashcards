import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeDeck } from '../actions';
import { removeDeckFromStorage } from '../utils/api';

class DeckView extends Component {

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.deck.name })
  }

  removeDeck() {
    const { dispatch, deck, navigation } = this.props
    const { name } = deck

    removeDeckFromStorage(name)
    dispatch(removeDeck(name))
    navigation.navigate('Home')
  }

  render() {
    const { deck } = this.props
    if (typeof deck === 'undefined') {
      return (<View />);
    }
    const { name } = deck;
    return (
      <View>
        <Text>{name}</Text>
        <Text>Cards: {deck.cards.length}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { name }
          )}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'Add Card',
          { name }
        )}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.removeDeck()}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (decks, props) => {
  return {
    deck: decks[props.route.params.name]
  }
}

export default connect(mapStateToProps)(DeckView);