import { AsyncStorage } from "react-native"
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIF_KEY = "MOBILE_FLASH_CARDS_NOTIF"
export function setLocalNotif() {
  AsyncStorage.getItem(NOTIF_KEY)
  .then(JSON.parse)
  .then((data) => {
      if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
              if(status === 'granted') {
                  Notifications.cancelAllScheduledNotificationsAsync()

                  Notifications.setNotificationHandler({
                      handleNotification: async () => ({
                          shouldPlaySound: true,
                          shouldShowAlert: true,
                          shouldSetBadge: false
                      })
                  })

                  let tomorrow = new Date()
                  tomorrow = tomorrow.getTime() + 60 * 60 * 1000 * 24
                  let notificationDate = new Date(tomorrow)

                  console.log(notificationDate)

                  Notifications.scheduleNotificationAsync({
                      content: {
                          title: ' Time to study!',
                          body: 'complete at least one quiz for the day'
                      },
                      trigger: notificationDate
                  })

                  AsyncStorage.setItem(NOTIF_KEY, JSON.stringify(true))
              }
          })
      }
  })
}

export function clearLocalNotif() {
  return AsyncStorage.removeItem(NOTIF_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}
