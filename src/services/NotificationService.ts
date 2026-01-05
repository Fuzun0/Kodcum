// Push Notification Servisi - DEVRE DIŞI
// Expo Go'da push bildirimler SDK 53'te kaldırıldı

// Bildirim türleri (interface için tutuldu)
export type NotificationType = 'message' | 'friend_request' | 'duel_request' | 'duel_accepted' | 'duel_rejected' | 'friend_accepted';

export interface NotificationData {
  type: NotificationType;
  senderId?: string;
  senderName?: string;
  duelRequestId?: string;
  friendRequestId?: string;
  conversationId?: string;
  category?: string;
  aktivDuelloId?: string;
  [key: string]: any;
}

// Tüm fonksiyonlar boş - push notification devre dışı
export class NotificationService {
  static async registerForPushNotificationsAsync(): Promise<string | null> {
    return null;
  }

  static async savePushTokenToFirestore(userId: string, token: string): Promise<void> {}

  static async getUserPushToken(userId: string): Promise<string | null> {
    return null;
  }

  static async sendPushNotification(
    pushToken: string,
    title: string,
    body: string,
    data?: NotificationData,
    channelId?: string
  ): Promise<boolean> {
    return false;
  }

  static async sendMessageNotification(
    receiverId: string,
    senderName: string,
    messagePreview: string,
    conversationId?: string
  ): Promise<void> {}

  static async sendFriendRequestNotification(
    receiverId: string,
    senderName: string,
    friendRequestId: string
  ): Promise<void> {}

  static async sendFriendAcceptedNotification(
    receiverId: string,
    accepterName: string
  ): Promise<void> {}

  static async sendDuelRequestNotification(
    receiverId: string,
    senderName: string,
    category: string,
    duelRequestId: string
  ): Promise<void> {}

  static async sendDuelAcceptedNotification(
    receiverId: string,
    accepterName: string,
    aktivDuelloId: string,
    category: string
  ): Promise<void> {}

  static async sendDuelRejectedNotification(
    receiverId: string,
    rejecterName: string
  ): Promise<void> {}

  static async showLocalNotification(
    title: string,
    body: string,
    data?: NotificationData
  ): Promise<void> {}

  static setupNotificationListeners(
    onNotificationReceived: (notification: any) => void,
    onNotificationResponse: (response: any) => void
  ): () => void {
    return () => {};
  }

  static async getLastNotificationResponse(): Promise<any | null> {
    return null;
  }

  static async setBadgeCount(count: number): Promise<void> {}

  static async clearAllNotifications(): Promise<void> {}
}
