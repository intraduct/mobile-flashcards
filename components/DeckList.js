import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { fetchDecksFromStorage } from '../utils/api'
import AppLoading from 'expo-app-loading';
import { connect } from 'react-redux'
import { receiveDecks } from '../actions';

class DeckList extends Component {

  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    fetchDecksFromStorage()
      .then(decks => {
        dispatch(receiveDecks(decks))
      })
      .then(() => this.setState(() => ({ ready: true })))
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {Object.keys(decks).map(name => (
          <TouchableOpacity
            key={name}
            onPress={() => this.props.navigation.navigate(
              'DeckView',
              { name }
            )}>
            <View>
              <Text>{name}</Text>
              <Text>Cards: {decks[name].cards.length}</Text>
            </View>
          </TouchableOpacity>
        ))
        }
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)