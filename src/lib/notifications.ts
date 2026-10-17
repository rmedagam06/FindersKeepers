/**
 * Local browser Notification API only — NOT Firebase Cloud Messaging. This
 * can show a notification while the browser is running, but can't wake up a
 * closed app or be triggered by a server. Real "come back" push (closed-app,
 * server-triggered) needs FCM once Firebase is configured — see
 * src/lib/firebase.ts and the Risks section of the plan for the iOS caveat.
 */

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function showLocalNotification(title: string, body: string): void {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return
  new Notification(title, { body, icon: '/favicon.svg' })
}
