import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';

class DeckView extends Component {

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.name })
  }

  render() {
    const { name } = this.props.route.params;
    return (
      <View>
        <Text>Betriebssysteme</Text>
        <Text>Cards: 12</Text>
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'Home'
        )}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckView;