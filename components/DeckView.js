import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';

class DeckView extends Component {
  render() {
    return (
      <View>
        <Text>Betriebssysteme</Text>
        <Text>Cards: 12</Text>
        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckView;