import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

export default class NewDeck extends Component {
  state = {
    value: ''
  }

  onChangeText = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (
      <View>
        <TextInput
          value={value}
          onChangeText={text => this.onChangeText(text)}
          placeholder="Decktitle"
        />
        <TouchableOpacity>
          <Text>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}