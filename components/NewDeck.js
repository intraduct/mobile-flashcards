import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitleToStorage } from '../utils/api'

class NewDeck extends Component {
  state = {
    value: ''
  }

  onChangeText = (value) => {
    this.setState({ value });
  }

  submitNewDeck = () => {
    const { value } = this.state
    const { dispatch, navigation } = this.props

    this.setState({ value: '' })
    dispatch(addDeck(value))
    saveDeckTitleToStorage(value);
    navigation.navigate('Home')
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
        <TouchableOpacity onPress={this.submitNewDeck} disabled={value === ''}>
          <Text>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(NewDeck)