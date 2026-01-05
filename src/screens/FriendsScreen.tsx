// Sosyal Ekranı (Arkadaşlar)

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  Modal,
  Alert,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FriendService } from '../services/FriendService';
import { MessageService } from '../services/MessageService';
import { DuelService, DuelRequest } from '../services/DuelService';
// NotificationService disabled
// import { NotificationService } from '../services/NotificationService';
import { Friend, FriendRequest, FriendProfile, Conversation } from '../types';
import { FriendsScreenSkeleton } from '../components/Skeleton';
import { lightHaptic, successHaptic, errorHaptic } from '../utils/haptics';

const { width } = Dimensions.get('window');

const FriendsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { user } = useAuth();
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const [activeTab, setActiveTab] = useState<'friends' | 'messages' | 'search'>('friends');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [duelRequests, setDuelRequests] = useState<any[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FriendProfile[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requestsModalVisible, setRequestsModalVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  // Real-time listener for friend requests and duel requests
  useEffect(() => {
    if (!user?.id || !db) return;

    console.log('🔔 Real-time listener başlatılıyor...');
    const unsubscribers: (() => void)[] = [];

    // Arkadaşlık istekleri dinleyicisi (her iki koleksiyonu da dinle)
    const friendRequestsCollections = [KOLEKSIYONLAR.ARKADASLIK_ISTEKLERI, 'friendRequests'];
    
    for (const collectionName of friendRequestsCollections) {
      try {
        const friendRequestsQuery = query(
          collection(db, collectionName),
          where('toUserId', '==', user.id),
          where('status', '==', 'pending')
        );
        
        const unsubFriendRequests = onSnapshot(friendRequestsQuery, (snapshot) => {
          console.log(`📬 [${collectionName}] Yeni arkadaşlık isteği geldi:`, snapshot.size);
          if (snapshot.size > 0) {
            // Yeni istek geldiğinde verileri yenile
            loadData();
            successHaptic();
          }
        }, (error) => {
          console.log(`ℹ️ ${collectionName} dinleyici hatası:`, error.message);
        });
        
        unsubscribers.push(unsubFriendRequests);
      } catch (err) {
        console.log(`ℹ️ ${collectionName} dinleyici kurulamadı`);
      }
    }

    // Düello istekleri dinleyicisi (her iki koleksiyonu da dinle)
    const duelRequestsCollections = [KOLEKSIYONLAR.DUELLO_ISTEKLERI, 'duelRequests'];
    
    for (const collectionName of duelRequestsCollections) {
      try {
        const duelRequestsQuery = query(
          collection(db, collectionName),
          where('opponentId', '==', user.id),
          where('status', '==', 'pending')
        );
        
        const unsubDuelRequests = onSnapshot(duelRequestsQuery, (snapshot) => {
          console.log(`⚔️ [${collectionName}] Yeni düello isteği geldi:`, snapshot.size);
          if (snapshot.size > 0) {
            // Yeni istek geldiğinde verileri yenile
            loadData();
            successHaptic();
          }
        }, (error) => {
          console.log(`ℹ️ ${collectionName} dinleyici hatası:`, error.message);
        });
        
        unsubscribers.push(unsubDuelRequests);
      } catch (err) {
        console.log(`ℹ️ ${collectionName} dinleyici kurulamadı`);
      }
    }

    // Arkadaşlıklar dinleyicisi - Arkadaşlık silindiğinde veya eklendiğinde otomatik güncelle
    try {
      const arkadasliklarRef = collection(db, KOLEKSIYONLAR.ARKADASLIKLAR);
      
      // user1Id olarak kayıtlı arkadaşlıkları dinle
      const friendsQuery1 = query(
        arkadasliklarRef,
        where('user1Id', '==', user.id)
      );
      
      const unsubFriends1 = onSnapshot(friendsQuery1, (snapshot) => {
        console.log('👥 Arkadaşlık değişikliği algılandı (user1):', snapshot.size);
        loadData(); // Listeyi yenile
      }, (error) => {
        console.log('ℹ️ Arkadaşlıklar dinleyici hatası:', error.message);
      });
      
      // user2Id olarak kayıtlı arkadaşlıkları dinle
      const friendsQuery2 = query(
        arkadasliklarRef,
        where('user2Id', '==', user.id)
      );
      
      const unsubFriends2 = onSnapshot(friendsQuery2, (snapshot) => {
        console.log('👥 Arkadaşlık değişikliği algılandı (user2):', snapshot.size);
        loadData(); // Listeyi yenile
      }, (error) => {
        console.log('ℹ️ Arkadaşlıklar dinleyici hatası:', error.message);
      });
      
      unsubscribers.push(unsubFriends1, unsubFriends2);
    } catch (err) {
      console.log('ℹ️ Arkadaşlıklar dinleyici kurulamadı');
    }

    // Cleanup function
    return () => {
      console.log('🔕 Real-time listener kapatılıyor...');
      unsubscribers.forEach(unsub => unsub());
    };
  }, [user?.id]);

  // Sayfa her odaklandığında (geri dönüldüğünde) verileri yenile
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [user?.id])
  );

  const loadData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const [friendsList, requestsList, conversationsList, duelRequestsList] = await Promise.all([
        FriendService.getFriends(user.id),
        FriendService.getPendingRequests(user.id),
        MessageService.getConversations(user.id),
        DuelService.getPendingDuelRequests(user.id)
      ]);
      setFriends(friendsList);
      setRequests(requestsList);
      setConversations(conversationsList);
      setDuelRequests(duelRequestsList);
      
      // Okunmamış mesaj sayısını hesapla
      const totalUnread = conversationsList.reduce((sum, conv) => {
        return sum + (conv.unreadCount?.[user.id] || 0);
      }, 0);
      setUnreadCount(totalUnread);
      
      // Toplam bildiri sayısı (arkadaşlık + düello istekleri + okunmamış mesajlar)
      setTotalNotifications(requestsList.length + duelRequestsList.length + totalUnread);
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    try {
      const results = await FriendService.searchUsers(query, user?.id || '');
      setSearchResults(results);
    } catch (error) {
      console.error('Arama hatası:', error);
    }
  };

  const handleSendRequest = async (targetUser: FriendProfile) => {
    if (!user) return;
    
    try {
      // Önce kullanıcıyı arama sonuçlarından kaldır ve bildirimi göster
      setSearchResults(searchResults.filter(r => r.userId !== targetUser.userId));
      Alert.alert('Başarılı', 'Arkadaşlık isteği gönderiliyor...');
      lightHaptic();
      
      // Sonra arka planda isteği gönder
      await FriendService.sendFriendRequest(
        user.id,
        user.displayName,
        user.photoURL,
        user.level,
        targetUser.userId
      );
      
      successHaptic();
      console.log('✅ Arkadaşlık isteği gönderildi:', targetUser.displayName);
    } catch (error: any) {
      // Hata olursa kullanıcıyı geri ekle
      setSearchResults(prev => [...prev, targetUser]);
      Alert.alert('Hata', error.message || 'İstek gönderilemedi');
      errorHaptic();
    }
  };

  const handleAcceptRequest = async (request: FriendRequest) => {
    if (!user) return;
    
    try {
      await FriendService.acceptFriendRequest(user.id, request.id);
      setRequests(prev => prev.filter(r => r.id !== request.id));
      setTotalNotifications(prev => Math.max(0, prev - 1));
      Alert.alert('Başarılı', `${request.senderName} artık arkadaşınız!`);
      setRequestsModalVisible(false);
      await loadData();
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'İstek kabul edilemedi');
    }
  };

  const handleRejectRequest = async (request: FriendRequest) => {
    if (!user) return;
    
    try {
      await FriendService.rejectFriendRequest(user.id, request.id);
      setRequests(prev => prev.filter(r => r.id !== request.id));
      setTotalNotifications(prev => Math.max(0, prev - 1));
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'İstek reddedilemedi');
    }
  };

  // Düello istek handler'ları
  const handleAcceptDuelRequest = async (duelRequest: DuelRequest) => {
    if (!user) return;
    
    try {
      console.log('🎮 Düello kabul ediliyor:', duelRequest);
      console.log('📝 Düello isteğindeki sorular:', duelRequest.questions?.length);
      
      // Eğer sorular yoksa hata ver
      if (!duelRequest.questions || duelRequest.questions.length === 0) {
        Alert.alert('Hata', 'Düello soruları bulunamadı. Lütfen tekrar deneyin.');
        return;
      }
      
      // Önce modal'ı kapat
      setRequestsModalVisible(false);
      
      // Aktif düello oluştur
      const aktivDuello = await DuelService.createAktifDuello(
        duelRequest.senderId,
        duelRequest.senderName,
        duelRequest.senderPhoto,
        user.id,
        user.displayName,
        user.photoURL,
        duelRequest.category,
        duelRequest.questions
      );
      
      // AktifDuello objesi döner, id'sini alalım
      const aktivDuelloId = aktivDuello.id;
      
      console.log('✅ Aktif düello oluşturuldu:', aktivDuelloId);
      
      // Firestore'da durumu 'accepted' olarak güncelle ve aktivDuelloId ekle
      if (db) {
        const { doc, updateDoc } = await import('firebase/firestore');
        try {
          await updateDoc(doc(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI, duelRequest.id), {
            status: 'accepted',
            acceptedAt: new Date().toISOString(),
            aktivDuelloId: aktivDuelloId
          });
          console.log('✅ Düello isteği Firestore\'da kabul edildi');
        } catch (err) {
          // Eski koleksiyonda dene
          try {
            await updateDoc(doc(db, 'duelRequests', duelRequest.id), {
              status: 'accepted',
              acceptedAt: new Date().toISOString(),
              aktivDuelloId: aktivDuelloId
            });
          } catch (err2) {
            console.log('Düello güncelleme hatası:', err2);
          }
        }
      }
      
      // Düello isteğini listeden kaldır ve bildirim sayacını güncelle
      setDuelRequests(prev => prev.filter(r => r.id !== duelRequest.id));
      setTotalNotifications(prev => Math.max(0, prev - 1));
      
      // Düello ekranına git - aktivDuelloId ile (modal kapandıktan sonra)
      setTimeout(() => {
        console.log('🚀 Düello ekranına yönlendiriliyor...');
        // @ts-ignore
        navigation.navigate('Duel', { 
          opponentId: duelRequest.senderId,
          opponentName: duelRequest.senderName,
          category: duelRequest.category,
          duelRequestId: duelRequest.id,
          questions: duelRequest.questions,
          aktivDuelloId: aktivDuelloId
        });
      }, 500);
    } catch (error: any) {
      console.error('Düello kabul hatası:', error);
      Alert.alert('Hata', error.message || 'Düello kabul edilemedi');
    }
  };

  const handleRejectDuelRequest = async (duelRequest: DuelRequest) => {
    if (!user) return;
    
    try {
      // Firestore'da durumu 'rejected' olarak güncelle
      if (db) {
        const { doc, updateDoc } = await import('firebase/firestore');
        try {
          await updateDoc(doc(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI, duelRequest.id), {
            status: 'rejected',
            rejectedAt: new Date().toISOString()
          });
        } catch (err) {
          try {
            await updateDoc(doc(db, 'duelRequests', duelRequest.id), {
              status: 'rejected',
              rejectedAt: new Date().toISOString()
            });
          } catch (err2) {
            console.log('Düello reddetme hatası:', err2);
          }
        }
      }
      
      // 🔔 Gönderene düello red bildirimi gönder - DISABLED
      // try {
      //   await NotificationService.sendDuelRejectedNotification(
      //     duelRequest.senderId,
      //     user.displayName
      //   );
      // } catch (notifError) {
      //   console.log('Düello red bildirimi gönderilemedi:', notifError);
      // }
      
      setDuelRequests(prev => prev.filter(r => r.id !== duelRequest.id));
      setTotalNotifications(prev => Math.max(0, prev - 1));
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'Düello reddedilemedi');
    }
  };

  const handleRemoveFriend = async (friend: Friend) => {
    Alert.alert(
      'Arkadaşlıktan Çıkar',
      `${friend.displayName} arkadaşlıktan çıkarılsın mı?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkar',
          style: 'destructive',
          onPress: async () => {
            try {
              await FriendService.removeFriend(user?.id || '', friend.odakId);
              setFriends(friends.filter(f => f.odakId !== friend.odakId));
            } catch (error) {
              Alert.alert('Hata', 'Arkadaş çıkarılamadı');
            }
          }
        }
      ]
    );
  };

  const navigateToProfile = (friendId: string) => {
    // @ts-ignore
    navigation.navigate('FriendProfile', { odakId: friendId });
  };

  const navigateToChat = (friend: Friend | { odakId: string; displayName: string; photoURL?: string }) => {
    // @ts-ignore
    navigation.navigate('Chat', { 
      friendId: friend.odakId, 
      friendName: friend.displayName,
      friendPhoto: 'photoURL' in friend ? friend.photoURL : undefined
    });
  };

  const renderFriendItem = (friend: Friend) => (
    <TouchableOpacity 
      key={friend.id} 
      style={styles.friendCard}
      onPress={() => navigateToProfile(friend.odakId)}
      onLongPress={() => handleRemoveFriend(friend)}
    >
      <View style={styles.friendAvatar}>
        {friend.photoURL ? (
          <Image source={{ uri: friend.photoURL }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarText}>{friend.displayName[0]}</Text>
        )}
        {friend.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{friend.displayName}</Text>
        <View style={styles.friendStats}>
          <Text style={styles.friendStat}>Seviye {friend.level}</Text>
          <Text style={styles.friendStat}>🔥 {friend.streak} gün</Text>
        </View>
      </View>

      <View style={styles.friendActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigateToChat(friend)}
        >
          <Ionicons name="chatbubble-outline" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Duel', { opponentId: friend.odakId });
          }}
        >
          <Ionicons name="game-controller-outline" size={20} color={theme.colors.warning} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRequestItem = (request: FriendRequest) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.friendAvatar}>
        {request.senderPhoto ? (
          <Image source={{ uri: request.senderPhoto }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarText}>{request.senderName[0]}</Text>
        )}
      </View>
      
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{request.senderName}</Text>
        <Text style={styles.requestTime}>Seviye {request.senderLevel}</Text>
      </View>

      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.requestButton, styles.acceptButton]}
          onPress={() => handleAcceptRequest(request)}
        >
          <Ionicons name="checkmark" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.requestButton, styles.rejectButton]}
          onPress={() => handleRejectRequest(request)}
        >
          <Ionicons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDuelRequestItem = (duelRequest: DuelRequest) => (
    <View key={duelRequest.id} style={[styles.requestCard, styles.duelRequestCard]}>
      <View style={[styles.friendAvatar, styles.duelAvatar]}>
        <Ionicons name="game-controller" size={24} color="#f97316" />
      </View>
      
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{duelRequest.senderName}</Text>
        <Text style={[styles.requestTime, { color: '#f97316' }]}>
          🎮 Düello daveti • {duelRequest.category}
        </Text>
      </View>

      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.requestButton, styles.duelAcceptButton]}
          onPress={() => handleAcceptDuelRequest(duelRequest)}
        >
          <Ionicons name="checkmark" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.requestButton, styles.rejectButton]}
          onPress={() => handleRejectDuelRequest(duelRequest)}
        >
          <Ionicons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchResult = (profile: FriendProfile) => (
    <View key={profile.userId} style={styles.searchResultCard}>
      <View style={styles.friendAvatar}>
        {profile.photoURL ? (
          <Image source={{ uri: profile.photoURL }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarText}>{profile.displayName[0]}</Text>
        )}
      </View>
      
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{profile.displayName}</Text>
        <Text style={styles.username}>@{profile.username}</Text>
        <Text style={styles.friendStat}>Seviye {profile.level} • 🔥 {profile.streak} gün</Text>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleSendRequest(profile)}
      >
        <Ionicons name="person-add" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  // Sohbet silme
  const handleDeleteConversation = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find(p => p !== user?.id) || '';
    const displayName = conversation.participantNames?.[otherParticipantId] || 'Kullanıcı';
    
    Alert.alert(
      'Sohbeti Sil',
      `${displayName} ile olan sohbeti silmek istediğinize emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await MessageService.deleteConversation(conversation.id);
              setConversations(prev => prev.filter(c => c.id !== conversation.id));
              successHaptic();
            } catch (error) {
              Alert.alert('Hata', 'Sohbet silinemedi');
            }
          }
        }
      ]
    );
  };

  const renderConversationItem = (conversation: Conversation) => {
    // Diğer katılımcının bilgilerini al
    const otherParticipantId = conversation.participants.find(p => p !== user?.id) || '';
    const displayName = conversation.participantNames?.[otherParticipantId] || 'Kullanıcı';
    const photoURL = conversation.participantPhotos?.[otherParticipantId];
    const unreadCount = conversation.unreadCount?.[user?.id || ''] || 0;
    const lastMessage = conversation.lastMessage?.content || '';
    const lastMessageTime = conversation.lastMessageAt || conversation.lastMessage?.createdAt || '';

    return (
      <TouchableOpacity 
        key={conversation.id} 
        style={styles.conversationCard}
        onPress={() => navigateToChat({ odakId: otherParticipantId, displayName, photoURL })}
        onLongPress={() => handleDeleteConversation(conversation)}
        delayLongPress={500}
      >
        <View style={styles.friendAvatar}>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{displayName[0]}</Text>
          )}
        </View>
        
        <View style={styles.conversationInfo}>
          <View style={styles.conversationHeader}>
            <Text style={styles.friendName}>{displayName}</Text>
            {lastMessageTime && (
              <Text style={styles.conversationTime}>
                {new Date(lastMessageTime).toLocaleDateString('tr-TR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            )}
          </View>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage || 'Henüz mesaj yok'}
          </Text>
        </View>

        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // İstekler Modal
  const renderRequestsModal = () => (
    <Modal
      visible={requestsModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setRequestsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bildirimler</Text>
            <TouchableOpacity onPress={() => setRequestsModalVisible(false)}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalScroll}>
            {/* Düello İstekleri */}
            {duelRequests.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>🎮 Düello İstekleri</Text>
                {duelRequests.map(renderDuelRequestItem)}
              </>
            )}
            
            {/* Arkadaşlık İstekleri */}
            {requests.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>👥 Arkadaşlık İstekleri</Text>
                {requests.map(renderRequestItem)}
              </>
            )}
            
            {/* Boş durum */}
            {requests.length === 0 && duelRequests.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="notifications-off-outline" size={48} color={theme.colors.textSecondary} />
                <Text style={styles.emptyText}>Bekleyen bildirim yok</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            lightHaptic();
            navigation.goBack();
          }} 
          style={styles.backButton}
          accessibilityLabel="Geri git"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sosyal</Text>
        
        {/* İstekler Bildirim Butonu */}
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => {
            lightHaptic();
            setRequestsModalVisible(true);
          }}
          accessibilityLabel={`Bildirimler, ${totalNotifications} yeni`}
          accessibilityRole="button"
        >
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
          {totalNotifications > 0 && (
            <View style={[styles.badge, duelRequests.length > 0 && styles.duelBadge]}>
              <Text style={styles.badgeText}>{totalNotifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Tabs - Sadece Arkadaşlar, Mesajlar ve Ara */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Ionicons 
            name="people" 
            size={20} 
            color={activeTab === 'friends' ? theme.colors.primary : theme.colors.textSecondary} 
          />
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Arkadaşlar ({friends.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
          onPress={() => setActiveTab('messages')}
        >
          <View style={styles.tabIconContainer}>
            <Ionicons 
              name="chatbubbles" 
              size={20} 
              color={activeTab === 'messages' ? theme.colors.primary : theme.colors.textSecondary} 
            />
            {unreadCount > 0 && (
              <View style={styles.unreadDot} />
            )}
          </View>
          <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
            Mesajlar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'search' && styles.activeTab]}
          onPress={() => setActiveTab('search')}
        >
          <Ionicons 
            name="search" 
            size={20} 
            color={activeTab === 'search' ? theme.colors.primary : theme.colors.textSecondary} 
          />
          <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>
            Ara
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <FriendsScreenSkeleton />
      ) : (
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'friends' && (
          <>
            {friends.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={64} color={theme.colors.textSecondary} />
                <Text style={styles.emptyText}>Henüz arkadaşınız yok</Text>
                <Text style={styles.emptySubtext}>Kullanıcı arayarak arkadaş ekleyin</Text>
                <TouchableOpacity 
                  style={styles.emptyButton}
                  onPress={() => setActiveTab('search')}
                >
                  <Text style={styles.emptyButtonText}>Arkadaş Bul</Text>
                </TouchableOpacity>
              </View>
            ) : (
              friends.map(renderFriendItem)
            )}
          </>
        )}

        {activeTab === 'messages' && (
          <>
            {(() => {
              // Sadece gerçek mesaj içeren sohbetleri göster
              const activeConversations = conversations.filter(conv => 
                conv.lastMessage?.content && conv.lastMessage.content.trim().length > 0
              );
              
              return activeConversations.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="chatbubbles-outline" size={64} color={theme.colors.textSecondary} />
                  <Text style={styles.emptyText}>Henüz mesajınız yok</Text>
                  <Text style={styles.emptySubtext}>Arkadaşlarınıza mesaj gönderin</Text>
                </View>
              ) : (
                activeConversations.map(renderConversationItem)
              );
            })()}
          </>
        )}

        {activeTab === 'search' && (
          <>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Kullanıcı adı ile ara..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={handleSearch}
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch('')}>
                  <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            {searchResults.length > 0 ? (
              searchResults.map(renderSearchResult)
            ) : searchQuery.length >= 2 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Kullanıcı bulunamadı</Text>
                <Text style={styles.emptySubtext}>Farklı bir kullanıcı adı deneyin</Text>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="at-outline" size={64} color={theme.colors.textSecondary} />
                <Text style={styles.emptyText}>Kullanıcı adı ile arayın</Text>
                <Text style={styles.emptySubtext}>En az 2 karakter girin</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
      )}

      {/* İstekler Modal */}
      {renderRequestsModal()}
    </SafeAreaView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 8,
    },
    notificationButton: {
      padding: 8,
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: colors.error,
      borderRadius: 10,
      minWidth: 18,
      height: 18,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
    },
    badgeText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: 'bold',
    },
    tabs: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      gap: 6,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      padding: 16,
    },
    friendCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },
    friendAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    avatarImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    avatarText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#10b981',
      borderWidth: 2,
      borderColor: colors.card,
    },
    friendInfo: {
      flex: 1,
      marginLeft: 12,
    },
    friendName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    friendStats: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 4,
    },
    friendStat: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    username: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    friendActions: {
      flexDirection: 'row',
      gap: 6,
    },
    actionButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    requestCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },
    requestTime: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    requestActions: {
      flexDirection: 'row',
      gap: 8,
    },
    requestButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    acceptButton: {
      backgroundColor: '#10b981',
    },
    rejectButton: {
      backgroundColor: '#ef4444',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      fontSize: 16,
      color: colors.text,
    },
    searchResultCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },
    addButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    conversationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    },
    conversationInfo: {
      flex: 1,
      marginLeft: 12,
    },
    conversationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    conversationTime: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    lastMessage: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    unreadBadge: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      minWidth: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 6,
    },
    unreadText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: 16,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
      textAlign: 'center',
    },
    emptyButton: {
      marginTop: 20,
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    emptyButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    // Tab Icon with Badge
    tabIconContainer: {
      position: 'relative',
    },
    unreadDot: {
      position: 'absolute',
      top: -2,
      right: -6,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#ef4444',
    },
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '70%',
      paddingBottom: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    modalScroll: {
      padding: 16,
    },
    // Düello istekleri stilleri
    sectionLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 12,
      marginTop: 8,
    },
    duelRequestCard: {
      borderLeftWidth: 3,
      borderLeftColor: '#f97316',
    },
    duelAvatar: {
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
    },
    duelAcceptButton: {
      backgroundColor: '#f97316',
    },
    duelBadge: {
      backgroundColor: '#f97316',
    },
  });

export default FriendsScreen;
