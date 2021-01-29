import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
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

    if (value === '') {
      Alert.alert('Title cannot be empty', 'Please enter a title!')
      return
    }

    if (this.props.decks.includes(value)) {
      Alert.alert('Deck already exists', 'Please enter another title!')
      return
    }

    this.setState({ value: '' })
    dispatch(addDeck(value))
    saveDeckTitleToStorage(value);
    navigation.goBack()
  }

  render() {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => this.onChangeText(text)}
          placeholder="Deck Title"
        />
        <TouchableOpacity onPress={this.submitNewDeck}>
          <Text style={styles.button}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 24,
  },
  input: {
    fontSize: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'dodgerblue',
    color: 'white',
    fontSize: 20,
  }
})

const mapStateToProps = (decks) => {
  return {
    decks: Object.keys(decks)
  }
}

export default connect(mapStateToProps)(NewDeck)