// Mesajlaşma Sistemi Servisi - Firebase Firestore Tabanlı

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  limit as firestoreLimit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
// NotificationService disabled
// import { NotificationService } from './NotificationService';
import { Message, Conversation, MessageMetadata } from '../types';

// Firestore koleksiyon isimleri (Türkçe)
const CONVERSATIONS_COLLECTION = KOLEKSIYONLAR.KONUSMALAR;
const MESSAGES_COLLECTION = KOLEKSIYONLAR.MESAJLAR;

export class MessageService {
  
  // ==================== KONUŞMALAR ====================

  /**
   * Kullanıcının tüm konuşmalarını getir - güncel profil fotoğraflarıyla
   */
  static async getConversations(userId: string): Promise<Conversation[]> {
    try {
      const conversationsRef = collection(db, CONVERSATIONS_COLLECTION);
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', userId)
      );
      
      const snapshot = await getDocs(q);
      const conversations: Conversation[] = [];
      
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const participants = data.participants || [];
        
        // Her katılımcının güncel profil fotoğrafını çek
        const updatedPhotos: { [key: string]: string } = {};
        for (const participantId of participants) {
          if (participantId !== userId) {
            try {
              // Kullanıcı profilini Firestore'dan çek
              const userDocRef = doc(db, 'kullanicilar', participantId);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                // Hem photoURL hem de fotoUrl alanlarını kontrol et
                const photo = userData.photoURL || userData.fotoUrl;
                console.log(`[MessageService] Kullanıcı ${participantId}:`, {
                  displayName: userData.displayName,
                  photoURL: userData.photoURL,
                  fotoUrl: userData.fotoUrl,
                  allKeys: Object.keys(userData)
                });
                // Sadece geçerli URL'leri kabul et (http/https ile başlayanlar)
                if (photo && (photo.startsWith('http://') || photo.startsWith('https://'))) {
                  updatedPhotos[participantId] = photo;
                } else if (photo) {
                  console.log(`[MessageService] Geçersiz fotoğraf URL'si (local dosya):`, photo.substring(0, 50));
                }
              } else {
                console.log(`[MessageService] Kullanıcı ${participantId} bulunamadı`);
              }
            } catch (err) {
              console.log(`[MessageService] Kullanıcı ${participantId} fotoğraf çekme hatası:`, err);
              // Hata varsa mevcut fotoğrafı kullan
              if (data.participantPhotos?.[participantId]) {
                updatedPhotos[participantId] = data.participantPhotos[participantId];
              }
            }
          }
        }
        
        conversations.push({
          id: docSnap.id,
          participants: participants,
          participantNames: data.participantNames || {},
          participantPhotos: { ...data.participantPhotos, ...updatedPhotos },
          messages: [],
          lastMessage: data.lastMessage ? {
            id: data.lastMessage.id || '',
            conversationId: docSnap.id,
            senderId: data.lastMessage.senderId || '',
            senderName: data.lastMessage.senderName || '',
            receiverId: data.lastMessage.receiverId || '',
            content: data.lastMessage.content || '',
            type: data.lastMessage.type || 'text',
            read: data.lastMessage.read || false,
            createdAt: data.lastMessage.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          } : undefined,
          lastMessageAt: data.lastMessageAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          unreadCount: data.unreadCount || {},
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        });
      }
      
      // Son mesaja göre sırala
      return conversations.sort((a, b) => 
        new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
      );
    } catch (error) {
      console.error('Konuşmaları getirme hatası:', error);
      return [];
    }
  }

  /**
   * Konuşmaları gerçek zamanlı dinle
   */
  static subscribeToConversations(
    userId: string, 
    callback: (conversations: Conversation[]) => void
  ): () => void {
    try {
      const conversationsRef = collection(db, CONVERSATIONS_COLLECTION);
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', userId)
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const conversations: Conversation[] = [];
        
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          conversations.push({
            id: docSnap.id,
            participants: data.participants || [],
            participantNames: data.participantNames || {},
            participantPhotos: data.participantPhotos || {},
            messages: [],
            lastMessage: data.lastMessage ? {
              id: data.lastMessage.id || '',
              conversationId: docSnap.id,
              senderId: data.lastMessage.senderId || '',
              senderName: data.lastMessage.senderName || '',
              receiverId: data.lastMessage.receiverId || '',
              content: data.lastMessage.content || '',
              type: data.lastMessage.type || 'text',
              read: data.lastMessage.read || false,
              createdAt: data.lastMessage.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            } : undefined,
            lastMessageAt: data.lastMessageAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            unreadCount: data.unreadCount || {},
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          });
        });
        
        // Son mesaja göre sırala
        conversations.sort((a, b) => 
          new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );
        
        callback(conversations);
      }, (error) => {
        console.error('Konuşma dinleme hatası:', error);
      });
      
      return unsubscribe;
    } catch (error) {
      console.error('Konuşma abonelik hatası:', error);
      return () => {};
    }
  }

  /**
   * İki kullanıcı arasındaki konuşmayı getir veya oluştur
   */
  static async getOrCreateConversation(
    userId: string,
    userName: string,
    userPhoto: string | undefined,
    friendId: string,
    friendName: string,
    friendPhoto: string | undefined
  ): Promise<Conversation> {
    try {
      // Güncel fotoğrafları her iki kullanıcı için de Firestore'dan çek
      let updatedUserPhoto = userPhoto;
      let updatedFriendPhoto = friendPhoto;
      
      try {
        const userDocRef = doc(db, 'kullanicilar', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          updatedUserPhoto = userData.photoURL || userData.fotoUrl || userPhoto;
        }
      } catch (err) {
        console.log('[MessageService] Kullanıcı fotoğrafı çekilemedi:', err);
      }
      
      try {
        const friendDocRef = doc(db, 'kullanicilar', friendId);
        const friendDoc = await getDoc(friendDocRef);
        if (friendDoc.exists()) {
          const friendData = friendDoc.data();
          updatedFriendPhoto = friendData.photoURL || friendData.fotoUrl || friendPhoto;
        }
      } catch (err) {
        console.log('[MessageService] Arkadaş fotoğrafı çekilemedi:', err);
      }
      
      // Önce mevcut konuşmayı ara
      const conversationsRef = collection(db, CONVERSATIONS_COLLECTION);
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', userId)
      );
      
      const snapshot = await getDocs(q);
      let existingConv: Conversation | null = null;
      let existingDocId: string | null = null;
      
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.participants?.includes(friendId)) {
          existingDocId = docSnap.id;
          existingConv = {
            id: docSnap.id,
            participants: data.participants,
            participantNames: data.participantNames || {},
            participantPhotos: {
              [userId]: updatedUserPhoto,
              [friendId]: updatedFriendPhoto
            },
            messages: [],
            lastMessageAt: data.lastMessageAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            unreadCount: data.unreadCount || {},
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          };
        }
      });
      
      if (existingConv && existingDocId) {
        // Mevcut konuşmanın fotoğraflarını güncelle
        try {
          await updateDoc(doc(db, CONVERSATIONS_COLLECTION, existingDocId), {
            participantPhotos: {
              [userId]: updatedUserPhoto || null,
              [friendId]: updatedFriendPhoto || null
            }
          });
        } catch (err) {
          console.log('[MessageService] Konuşma fotoğrafları güncellenemedi:', err);
        }
        return existingConv;
      }

      // Yeni konuşma oluştur
      const conversationId = `conv_${userId}_${friendId}_${Date.now()}`;
      const newConversationData = {
        participants: [userId, friendId],
        participantNames: {
          [userId]: userName,
          [friendId]: friendName
        },
        participantPhotos: {
          [userId]: updatedUserPhoto || null,
          [friendId]: updatedFriendPhoto || null
        },
        lastMessageAt: serverTimestamp(),
        unreadCount: {
          [userId]: 0,
          [friendId]: 0
        },
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, CONVERSATIONS_COLLECTION, conversationId), newConversationData);

      return {
        id: conversationId,
        participants: [userId, friendId],
        participantNames: {
          [userId]: userName,
          [friendId]: friendName
        },
        participantPhotos: {
          [userId]: userPhoto,
          [friendId]: friendPhoto
        },
        messages: [],
        lastMessageAt: new Date().toISOString(),
        unreadCount: {
          [userId]: 0,
          [friendId]: 0
        },
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Konuşma oluşturma hatası:', error);
      throw error;
    }
  }

  /**
   * Konuşmayı ID ile getir
   */
  static async getConversation(conversationId: string): Promise<Conversation | null> {
    try {
      const docRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }
      
      const data = docSnap.data();
      const messages = await this.getMessages(conversationId);
      
      return {
        id: docSnap.id,
        participants: data.participants || [],
        participantNames: data.participantNames || {},
        participantPhotos: data.participantPhotos || {},
        messages,
        lastMessage: data.lastMessage,
        lastMessageAt: data.lastMessageAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        unreadCount: data.unreadCount || {},
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    } catch (error) {
      console.error('Konuşma getirme hatası:', error);
      return null;
    }
  }

  /**
   * Konuşmayı sil
   */
  static async deleteConversation(userId: string, conversationId: string): Promise<void> {
    try {
      // Mesajları sil
      const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
      const messagesSnapshot = await getDocs(messagesRef);
      
      const deletePromises = messagesSnapshot.docs.map(d => deleteDoc(d.ref));
      await Promise.all(deletePromises);
      
      // Konuşmayı sil
      await deleteDoc(doc(db, CONVERSATIONS_COLLECTION, conversationId));
    } catch (error) {
      console.error('Konuşma silme hatası:', error);
      throw error;
    }
  }

  // ==================== MESAJLAR ====================

  /**
   * Konuşmadaki mesajları getir
   */
  static async getMessages(conversationId: string, messageLimit: number = 50): Promise<Message[]> {
    try {
      const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
      const q = query(
        messagesRef,
        orderBy('createdAt', 'asc'),
        firestoreLimit(messageLimit)
      );
      
      const snapshot = await getDocs(q);
      const messages: Message[] = [];
      
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        messages.push({
          id: docSnap.id,
          conversationId,
          senderId: data.senderId || '',
          senderName: data.senderName || '',
          receiverId: data.receiverId || '',
          content: data.content || '',
          type: data.type || 'text',
          read: data.read || false,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          metadata: data.metadata
        });
      });
      
      return messages;
    } catch (error) {
      console.error('Mesajları getirme hatası:', error);
      return [];
    }
  }

  /**
   * Mesajları gerçek zamanlı dinle
   */
  static subscribeToMessages(
    conversationId: string, 
    callback: (messages: Message[]) => void
  ): () => void {
    try {
      const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
      const q = query(
        messagesRef,
        orderBy('createdAt', 'asc')
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages: Message[] = [];
        
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          messages.push({
            id: docSnap.id,
            conversationId,
            senderId: data.senderId || '',
            senderName: data.senderName || '',
            receiverId: data.receiverId || '',
            content: data.content || '',
            type: data.type || 'text',
            read: data.read || false,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            metadata: data.metadata
          });
        });
        
        callback(messages);
      }, (error) => {
        console.error('Mesaj dinleme hatası:', error);
      });
      
      return unsubscribe;
    } catch (error) {
      console.error('Mesaj abonelik hatası:', error);
      return () => {};
    }
  }

  /**
   * Mesaj gönder
   */
  static async sendMessage(
    conversationId: string,
    senderId: string,
    receiverId: string,
    content: string,
    type: Message['type'] = 'text',
    metadata?: MessageMetadata
  ): Promise<Message> {
    try {
      // Gönderen ismini al (Firestore'dan)
      const senderDoc = await getDoc(doc(db, 'users', senderId));
      const senderData = senderDoc.data();
      const senderName = senderData?.displayName || 'Kullanıcı';

      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date();
      
      const messageData = {
        senderId,
        senderName,
        receiverId,
        content,
        type,
        read: false,
        createdAt: serverTimestamp(),
        metadata: metadata || null
      };

      // Mesajı kaydet
      await setDoc(
        doc(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION, messageId),
        messageData
      );

      // Konuşmanın son mesajını ve okunmamış sayısını güncelle
      const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
      const convDoc = await getDoc(conversationRef);
      const convData = convDoc.data();
      const currentUnread = convData?.unreadCount?.[receiverId] || 0;
      
      await updateDoc(conversationRef, {
        lastMessage: {
          id: messageId,
          senderId,
          senderName,
          receiverId,
          content,
          type,
          read: false,
          createdAt: serverTimestamp()
        },
        lastMessageAt: serverTimestamp(),
        [`unreadCount.${receiverId}`]: currentUnread + 1
      });

      const message: Message = {
        id: messageId,
        conversationId,
        senderId,
        senderName,
        receiverId,
        content,
        type,
        read: false,
        createdAt: now.toISOString(),
        metadata
      };

      // 🔔 Push notification gönder (text mesajları için) - DISABLED
      // if (type === 'text') {
      //   try {
      //     await NotificationService.sendMessageNotification(
      //       receiverId,
      //       senderName,
      //       content,
      //       conversationId
      //     );
      //   } catch (notifError) {
      //     console.log('Mesaj bildirimi gönderilemedi:', notifError);
      //   }
      // }

      return message;
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      throw error;
    }
  }

  /**
   * Düello daveti gönder
   */
  static async sendDuelInvite(
    conversationId: string,
    senderId: string,
    receiverId: string,
    duelId: string,
    category: string
  ): Promise<Message> {
    return this.sendMessage(
      conversationId,
      senderId,
      receiverId,
      `🎮 Düello daveti: ${category} kategorisinde yarışmak ister misin?`,
      'duel_invite',
      {
        duelId,
        duelStatus: 'pending',
        duelCategory: category
      }
    );
  }

  /**
   * Düello sonucu gönder
   */
  static async sendDuelResult(
    conversationId: string,
    senderId: string,
    receiverId: string,
    duelId: string,
    winnerId: string | null,
    senderScore: number,
    receiverScore: number
  ): Promise<Message> {
    let resultText: string;
    if (winnerId === null) {
      resultText = `🤝 Düello berabere bitti! (${senderScore}-${receiverScore})`;
    } else if (winnerId === senderId) {
      resultText = `🏆 Düelloyu kazandım! (${senderScore}-${receiverScore})`;
    } else {
      resultText = `🎉 Düelloyu kazandın! (${receiverScore}-${senderScore})`;
    }

    return this.sendMessage(
      conversationId,
      senderId,
      receiverId,
      resultText,
      'duel_result',
      {
        duelId,
        duelStatus: 'completed'
      }
    );
  }

  /**
   * Mesajları okundu olarak işaretle
   */
  static async markAsRead(
    conversationId: string,
    userId: string
  ): Promise<void> {
    try {
      // Okunmamış mesajları bul ve güncelle
      const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION);
      const q = query(
        messagesRef,
        where('receiverId', '==', userId),
        where('read', '==', false)
      );
      
      const snapshot = await getDocs(q);
      const updatePromises = snapshot.docs.map(d => 
        updateDoc(d.ref, { read: true })
      );
      await Promise.all(updatePromises);

      // Konuşmanın okunmamış sayısını sıfırla
      const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
      await updateDoc(conversationRef, {
        [`unreadCount.${userId}`]: 0
      });
    } catch (error) {
      console.error('Okundu işaretleme hatası:', error);
    }
  }

  /**
   * Toplam okunmamış mesaj sayısı
   */
  static async getTotalUnreadCount(userId: string): Promise<number> {
    try {
      const conversations = await this.getConversations(userId);
      return conversations.reduce((total, conv) => {
        return total + (conv.unreadCount?.[userId] || 0);
      }, 0);
    } catch (error) {
      console.error('Okunmamış sayı hatası:', error);
      return 0;
    }
  }

  /**
   * Okunmamış mesaj sayısını gerçek zamanlı dinle
   */
  static subscribeToUnreadCount(
    userId: string,
    callback: (count: number) => void
  ): () => void {
    return this.subscribeToConversations(userId, (conversations) => {
      const total = conversations.reduce((sum, conv) => {
        return sum + (conv.unreadCount?.[userId] || 0);
      }, 0);
      callback(total);
    });
  }

  /**
   * Mesajı sil
   */
  static async deleteMessage(conversationId: string, messageId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_COLLECTION, messageId));
    } catch (error) {
      console.error('Mesaj silme hatası:', error);
      throw error;
    }
  }

  /**
   * Son mesajları ara
   */
  static async searchMessages(
    userId: string, 
    searchQuery: string
  ): Promise<Message[]> {
    try {
      if (!searchQuery || searchQuery.length < 2) return [];

      const conversations = await this.getConversations(userId);
      const results: Message[] = [];

      for (const conv of conversations) {
        const messages = await this.getMessages(conv.id, 100);
        const matching = messages.filter(m => 
          m.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        results.push(...matching);
      }

      return results.slice(0, 50); // Max 50 sonuç
    } catch {
      return [];
    }
  }
}
