import { PushNotificationIOS } from "react-native"
import PushNotification from "react-native-push-notification"
import { any, values } from "ramda"

/**
 * The notification service.
 */
export class Notifications {
  constructor() {
    this.updatePushToken = () => {}
    this.onNotificationCallback = () => {}
  }

  /**
   * Logs something thru Reactotron.
   *
   * @param topic The subject of the log event.
   * @param value The value to log.
   */
  log(topic, value) {
    __DEV__ &&
      console.tron &&
      console.tron.display({
        name: "NOTIFICATIONS",
        preview: topic,
        value,
      })
  }

  /**
   * Setup push notifications
   */
  setup(analytics) {
    // configure push notifications
    PushNotification.configure({
      // Called when Token is generated (iOS and Android)
      onRegister: notification => {
        this.log("token", notification.token)
        this.updatePushToken(notification.token)
      },

      // Called when a remote or local notification is opened or received
      onNotification: notification => {
        this.log("notification", notification)

        // forward to handler
        this.onNotificationCallback(notification)

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },

      // Android FCM Sender ID
      senderID: "<Your ID Here>",

      // Request permissions on first app load?
      requestPermissions: true,
    })

    // Log registration errors
    __DEV__ && PushNotificationIOS.addEventListener("registrationError", console.tron.log)
  }

  /**
   * Setup the notification handler.
   *
   * @param callback The notification handler.
   */
  onNotification(callback) {
    this.onNotificationCallback = callback
  }

  /**
   * Check what notifications are permitted
   */
  static async checkPermissions() {
    return await new Promise(resolve => {
      PushNotification.checkPermissions(permissions => {
        resolve(any(Boolean)(values(permissions)) ? "authorized" : "denied")
      })
    })
  }

  /**
   * Request notification permissions
   */
  static async requestPermissions() {
    return await new Promise(resolve => {
      PushNotification.requestPermissions(permissions => {
        resolve(any(Boolean)(values(permissions)) ? "authorized" : "denied")
      })
    })
  }

  /**
   * Register for remote notifications. Assumes authorized. Get a new push token.
   */
  register() {
    PushNotification.registerForRemoteNotifications()
  }

  /**
   * Send a local notification. Message prop required.
   * See https://github.com/zo0r/react-native-push-notification#local-notifications for options.
   */
  localNotification(args) {
    PushNotification.localNotification(args)
  }

  /**
   * Set the badge number indicating number of unread notifications.
   */
  setApplicationIconBadgeNumber(n) {
    PushNotification.setApplicationIconBadgeNumber(n)
  }
}