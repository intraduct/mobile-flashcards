import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

const STORAGE_KEY_DECKS = 'udacityMobileFlashcards:decks'
const NOTIFICATION_KEY = 'udacityMobileFlashcards:notification'

export async function fetchDecksFromStorage() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY_DECKS)
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export function saveCardToStorage({ question, answer, name }) {
  AsyncStorage.getItem(STORAGE_KEY_DECKS)
    .then(results => {
      const data = JSON.parse(results)
      data[name].cards.push({ question, answer })
      AsyncStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(data))
    })
}

export function saveDeckTitleToStorage(name) {
  AsyncStorage.mergeItem(STORAGE_KEY_DECKS, JSON.stringify({
    [name]: { name, cards: [] }
  }))
}

export function removeDeckFromStorage(name) {
  AsyncStorage.getItem(STORAGE_KEY_DECKS)
    .then(results => {
      const data = JSON.parse(results)
      delete data[name]
      AsyncStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(data))
    })
}

export function resetLocalNotificationTomorrow() {
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(setLocalNotification)
}

export async function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.requestPermissionsAsync()
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(8);
              tomorrow.setMinutes(0);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Start learning!",
                  body: "👋 don't forget to study today!"
                },
                trigger: tomorrow,
              })
            }
          })
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
      }
    })
}