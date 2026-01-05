// Mesajlaşma Ekranı

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { MessageService } from '../services/MessageService';
import { Message, Conversation } from '../types';

type RouteParams = {
  Chat: {
    friendId: string;
    friendName: string;
    friendPhoto?: string;
  };
};

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'Chat'>>();
  const { theme } = useTheme();
  const { user } = useAuth();
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);
  const scrollViewRef = useRef<ScrollView>(null);

  const { friendId, friendName, friendPhoto } = route.params;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversation();
  }, []);

  // Gerçek zamanlı mesaj dinleme
  useEffect(() => {
    if (!conversation?.id || !user?.id) return;
    
    // Firebase onSnapshot ile gerçek zamanlı dinleme
    const unsubscribe = MessageService.subscribeToMessages(
      conversation.id,
      (newMessages) => {
        setMessages(newMessages);
        // Scroll'u aşağı kaydır
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );
    
    // Okundu olarak işaretle
    MessageService.markAsRead(conversation.id, user.id);
    
    return () => unsubscribe();
  }, [conversation?.id, user?.id]);

  const loadConversation = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const conv = await MessageService.getOrCreateConversation(
        user.id, 
        user.displayName, 
        user.photoURL, 
        friendId, 
        friendName, 
        friendPhoto
      );
      setConversation(conv);
      
      // İlk mesajları yükle
      const initialMessages = await MessageService.getMessages(conv.id);
      setMessages(initialMessages);
      
      // Okundu olarak işaretle
      await MessageService.markAsRead(conv.id, user.id);
    } catch (error) {
      console.error('Konuşma yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || !user || !conversation) return;

    const messageText = inputText.trim();
    setInputText(''); // Hemen temizle

    try {
      await MessageService.sendMessage(
        conversation.id,
        user.id,
        friendId,
        messageText
      );
      
      // Mesaj Firebase'e gidince onSnapshot otomatik güncelleyecek
      // Scroll'u aşağı kaydır
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      Alert.alert('Hata', 'Mesaj gönderilemedi');
      setInputText(messageText); // Hata durumunda geri yükle
    }
  };

  const handleSendDuelInvite = async () => {
    if (!user || !conversation) return;

    Alert.alert(
      'Düello Daveti',
      `${friendName} kullanıcısına düello daveti göndermek istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Gönder',
          onPress: async () => {
            try {
              // @ts-ignore
              navigation.navigate('Duel', {
                opponentId: friendId,
                opponentName: friendName
              });
            } catch (error) {
              Alert.alert('Hata', 'Davet gönderilemedi');
            }
          }
        }
      ]
    );
  };

  const renderMessage = (message: Message, index: number) => {
    const isOwn = message.senderId === user?.id;
    const showAvatar = index === 0 || messages[index - 1]?.senderId !== message.senderId;

    // Özel mesaj türleri
    if (message.type === 'duel_invite') {
      return (
        <View key={message.id} style={styles.specialMessageContainer}>
          <View style={styles.duelInviteCard}>
            <Ionicons name="game-controller" size={32} color={theme.colors.warning} />
            <Text style={styles.duelInviteTitle}>Düello Daveti</Text>
            <Text style={styles.duelInviteText}>
              {isOwn ? 'Düello daveti gönderdiniz' : `${message.senderName} sizi düelloya davet etti`}
            </Text>
            {!isOwn && message.metadata?.status === 'pending' && (
              <View style={styles.duelInviteActions}>
                <TouchableOpacity 
                  style={[styles.duelInviteBtn, styles.acceptBtn]}
                  onPress={() => {
                    // @ts-ignore
                    navigation.navigate('Duel', { duelId: message.metadata?.duelId });
                  }}
                >
                  <Text style={styles.duelInviteBtnText}>Kabul Et</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.duelInviteBtn, styles.declineBtn]}>
                  <Text style={styles.duelInviteBtnText}>Reddet</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    }

    if (message.type === 'duel_result') {
      const result = message.metadata;
      return (
        <View key={message.id} style={styles.specialMessageContainer}>
          <View style={styles.duelResultCard}>
            <Ionicons 
              name={result?.isWinner ? 'trophy' : 'ribbon'} 
              size={32} 
              color={result?.isWinner ? '#fbbf24' : '#94a3b8'} 
            />
            <Text style={styles.duelResultTitle}>
              {result?.isWinner ? 'Kazandınız! 🎉' : result?.isDraw ? 'Berabere' : 'Kaybettiniz'}
            </Text>
            <Text style={styles.duelResultText}>
              Skor: {result?.yourScore} - {result?.opponentScore}
            </Text>
          </View>
        </View>
      );
    }

    if (message.type === 'system') {
      return (
        <View key={message.id} style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{message.content}</Text>
        </View>
      );
    }

    // Mesaj silme fonksiyonu
    const handleDeleteMessage = () => {
      Alert.alert(
        'Mesajı Sil',
        'Bu mesajı silmek istediğinizden emin misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Sil',
            style: 'destructive',
            onPress: async () => {
              try {
                if (conversation?.id) {
                  await MessageService.deleteMessage(conversation.id, message.id);
                }
              } catch (error) {
                Alert.alert('Hata', 'Mesaj silinemedi');
              }
            }
          }
        ]
      );
    };

    return (
      <TouchableOpacity 
        key={message.id} 
        style={[styles.messageRow, isOwn && styles.messageRowOwn]}
        onLongPress={isOwn ? handleDeleteMessage : undefined}
        delayLongPress={500}
        activeOpacity={0.8}
      >
        {!isOwn && showAvatar && (
          <View style={styles.messageAvatar}>
            {friendPhoto ? (
              <Image source={{ uri: friendPhoto }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{friendName[0]}</Text>
            )}
          </View>
        )}
        {!isOwn && !showAvatar && <View style={styles.avatarPlaceholder} />}
        
        <View style={[styles.messageBubble, isOwn && styles.messageBubbleOwn]}>
          <Text style={[styles.messageText, isOwn && styles.messageTextOwn]}>
            {message.content}
          </Text>
          <Text style={[styles.messageTime, isOwn && styles.messageTimeOwn]}>
            {new Date(message.createdAt).toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          accessibilityLabel="Geri git"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.headerInfo}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('FriendProfile', { odakId: friendId });
          }}
          accessibilityLabel={`${friendName} profili`}
          accessibilityHint="Profil sayfasını açar"
          accessibilityRole="button"
        >
          <View style={styles.headerAvatar}>
            {friendPhoto ? (
              <Image source={{ uri: friendPhoto }} style={styles.headerAvatarImage} accessibilityIgnoresInvertColors />
            ) : (
              <Text style={styles.headerAvatarText}>{friendName[0]}</Text>
            )}
          </View>
          <Text style={styles.headerName}>{friendName}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.duelButton} 
          onPress={handleSendDuelInvite}
          accessibilityLabel="Düello daveti gönder"
          accessibilityRole="button"
        >
          <Ionicons name="game-controller-outline" size={24} color={theme.colors.warning} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="chatbubbles-outline" size={64} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>Henüz mesaj yok</Text>
              <Text style={styles.emptySubtext}>İlk mesajı siz gönderin!</Text>
            </View>
          ) : (
            messages.map(renderMessage)
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mesaj yazın..."
            placeholderTextColor={theme.colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            onFocus={() => {
              setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
            }}
            multiline
            maxLength={500}
            accessibilityLabel="Mesaj yazma alanı"
            accessibilityHint="Mesajınızı buraya yazın"
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
            accessibilityLabel="Mesaj gönder"
            accessibilityRole="button"
            accessibilityState={{ disabled: !inputText.trim() }}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputText.trim() ? '#fff' : theme.colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    headerInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
    },
    headerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerAvatarImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    headerAvatarText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    headerName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 12,
    },
    duelButton: {
      padding: 8,
    },
    messagesContainer: {
      flex: 1,
    },
    messagesList: {
      flex: 1,
    },
    messagesContent: {
      padding: 16,
      flexGrow: 1,
    },
    emptyState: {
      flex: 1,
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
    },
    messageRow: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'flex-end',
    },
    messageRowOwn: {
      justifyContent: 'flex-end',
    },
    messageAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    avatarPlaceholder: {
      width: 32,
      marginRight: 8,
    },
    avatarImage: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    avatarText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
    messageBubble: {
      maxWidth: '75%',
      backgroundColor: colors.card,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      borderBottomLeftRadius: 4,
    },
    messageBubbleOwn: {
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 4,
    },
    messageText: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 20,
    },
    messageTextOwn: {
      color: '#fff',
    },
    messageTime: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
      alignSelf: 'flex-end',
    },
    messageTimeOwn: {
      color: 'rgba(255,255,255,0.7)',
    },
    specialMessageContainer: {
      alignItems: 'center',
      marginVertical: 16,
    },
    duelInviteCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.warning,
      maxWidth: '80%',
    },
    duelInviteTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 8,
    },
    duelInviteText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
      textAlign: 'center',
    },
    duelInviteActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    duelInviteBtn: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    acceptBtn: {
      backgroundColor: '#10b981',
    },
    declineBtn: {
      backgroundColor: '#ef4444',
    },
    duelInviteBtnText: {
      color: '#fff',
      fontWeight: '600',
    },
    duelResultCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      maxWidth: '80%',
    },
    duelResultTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 8,
    },
    duelResultText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    systemMessageContainer: {
      alignItems: 'center',
      marginVertical: 8,
    },
    systemMessageText: {
      fontSize: 12,
      color: colors.textSecondary,
      backgroundColor: colors.card,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: Platform.OS === 'android' ? 16 : 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    input: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.text,
      maxHeight: 100,
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
    sendButtonDisabled: {
      backgroundColor: colors.card,
    },
  });

export default ChatScreen;
