import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default class DeckList extends Component {
  decks = {
    'Betriebssysteme': {
      name: 'Betriebssysteme',
      count: 12
    },
    'Another Deck': {
      name: 'Another Deck',
      count: 0
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {Object.keys(this.decks).map(name => (
          <TouchableOpacity
            key={name}
            onPress={() => this.props.navigation.navigate(
              'DeckView',
              { name }
            )}>
            <View>
              <Text>{name}</Text>
              <Text>Cards: {this.decks[name].count}</Text>
            </View>
          </TouchableOpacity>
        ))
        }
      </View>
    );
  }
}