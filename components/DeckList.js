import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
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

  renderDeck({ item }, { navigation }) {
    const { name, cards } = item
    return (
      <TouchableOpacity style={styles.deck}
        onPress={() => navigation.navigate(
          'DeckView',
          { name }
        )}>
        <View style={{}}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.count}>Cards: {cards.length}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    const decks = Object.values(this.props.decks)
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={item => this.renderDeck(item, this.props)}
          keyExtractor={deck => deck.name}
          extraData={this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  deck: {
    paddingVertical: 30,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  count: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center'
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)