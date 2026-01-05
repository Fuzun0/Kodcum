// Arkadaş Profil Ekranı

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FriendService } from '../services/FriendService';
import { DuelService } from '../services/DuelService';
import { FriendProfile, WeeklyActivity, DuelStats } from '../types';

type RouteParams = {
  FriendProfile: {
    odakId: string;
  };
};

const { width } = Dimensions.get('window');

const FriendProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'FriendProfile'>>();
  const { theme } = useTheme();
  const { user } = useAuth();
  const styles = createStyles(theme.colors);

  const [profile, setProfile] = useState<FriendProfile | null>(null);
  const [duelStats, setDuelStats] = useState<DuelStats | null>(null);
  const [friendDuelHistory, setFriendDuelHistory] = useState<{ wins: number; losses: number; draws: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const [friendProfile, stats] = await Promise.all([
        FriendService.getFriendProfile(route.params.odakId),
        DuelService.getStats(route.params.odakId)
      ]);
      setProfile(friendProfile);
      setDuelStats(stats);
      
      // Bu arkadaşla olan düello geçmişini yükle
      if (user?.id) {
        const history = await DuelService.getDuelHistoryBetweenUsers(user.id, route.params.odakId);
        setFriendDuelHistory(history);
      }
    } catch (error) {
      console.error('Profil yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!profile) return;
    // @ts-ignore
    navigation.navigate('Chat', {
      friendId: profile.userId,
      friendName: profile.displayName,
      friendPhoto: profile.photoURL
    });
  };

  const handleChallengeDuel = () => {
    if (!profile) return;
    // @ts-ignore
    navigation.navigate('Duel', {
      opponentId: profile.userId,
      opponentName: profile.displayName
    });
  };

  const handleRemoveFriend = () => {
    if (!profile || !user) return;
    
    Alert.alert(
      'Arkadaşlıktan Çıkar',
      `${profile.displayName} arkadaşlıktan çıkarılsın mı?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkar',
          style: 'destructive',
          onPress: async () => {
            try {
              await FriendService.removeFriend(user.id, profile.userId);
              Alert.alert('Başarılı', 'Arkadaş çıkarıldı');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Hata', 'Arkadaş çıkarılamadı');
            }
          }
        }
      ]
    );
  };

  const getActivityColor = (level: number) => {
    if (level === 0) return theme.colors.border;
    if (level <= 25) return '#86efac';
    if (level <= 50) return '#4ade80';
    if (level <= 75) return '#22c55e';
    return '#16a34a';
  };

  const renderWeeklyActivity = () => {
    if (!profile?.weeklyActivity) return null;

    const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    
    return (
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Haftalık Aktivite</Text>
        <View style={styles.activityGrid}>
          {profile.weeklyActivity.map((activity, index) => (
            <View key={index} style={styles.activityDay}>
              <View 
                style={[
                  styles.activityBlock,
                  { backgroundColor: getActivityColor(activity.activityLevel) }
                ]}
              />
              <Text style={styles.activityDayText}>{days[index]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.activityLegend}>
          <Text style={styles.legendText}>Az</Text>
          <View style={styles.legendBlocks}>
            {[0, 25, 50, 75, 100].map((level) => (
              <View 
                key={level}
                style={[styles.legendBlock, { backgroundColor: getActivityColor(level) }]}
              />
            ))}
          </View>
          <Text style={styles.legendText}>Çok</Text>
        </View>
      </View>
    );
  };

  const renderBadges = () => {
    if (!profile?.badges || profile.badges.length === 0) return null;

    return (
      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>Rozetler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.badgesContainer}>
            {profile.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="person-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.errorText}>Profil bulunamadı</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => profile?.photoURL && setPhotoModalVisible(true)}
            disabled={!profile?.photoURL}
          >
            {profile.photoURL ? (
              <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{profile.displayName[0]}</Text>
              </View>
            )}
            {profile.isOnline && <View style={styles.onlineIndicator} />}
          </TouchableOpacity>

          <Text style={styles.displayName}>{profile.displayName}</Text>
          <Text style={styles.username}>@{profile.username}</Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.messageButton} onPress={handleSendMessage}>
              <Ionicons name="chatbubble-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Mesaj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.duelButton} onPress={handleChallengeDuel}>
              <Ionicons name="game-controller-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Düello</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton} onPress={handleRemoveFriend}>
              <Ionicons name="person-remove-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Ionicons name="trophy-outline" size={24} color={theme.colors.warning} />
            <Text style={styles.statValue}>{profile.level}</Text>
            <Text style={styles.statLabel}>Seviye</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="flame-outline" size={24} color="#ef4444" />
            <Text style={styles.statValue}>{profile.streak}</Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="star-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.statValue}>{profile.totalXP}</Text>
            <Text style={styles.statLabel}>Toplam XP</Text>
          </View>
        </View>

        {/* Quiz Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz Başarısı</Text>
          <View style={styles.quizStatsCard}>
            <View style={styles.quizStatItem}>
              <Text style={styles.quizStatValue}>{profile.quizStats.totalQuizzes}</Text>
              <Text style={styles.quizStatLabel}>Toplam Quiz</Text>
            </View>
            <View style={styles.quizStatDivider} />
            <View style={styles.quizStatItem}>
              <Text style={styles.quizStatValue}>{profile.quizStats.correctAnswers}</Text>
              <Text style={styles.quizStatLabel}>Doğru Cevap</Text>
            </View>
            <View style={styles.quizStatDivider} />
            <View style={styles.quizStatItem}>
              <Text style={[styles.quizStatValue, { color: theme.colors.success }]}>
                %{profile.quizStats.successRate}
              </Text>
              <Text style={styles.quizStatLabel}>Başarı Oranı</Text>
            </View>
          </View>
        </View>

        {/* Bu arkadaşla olan düello geçmişi */}
        {friendDuelHistory && (friendDuelHistory.wins > 0 || friendDuelHistory.losses > 0 || friendDuelHistory.draws > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎮 Karşılıklı Düello Sonuçları</Text>
            <View style={styles.duelStatsCard}>
              <View style={styles.duelMainStats}>
                <View style={styles.duelStatBox}>
                  <Text style={[styles.duelStatValue, { color: '#10b981', fontWeight: 'bold' }]}>
                    {friendDuelHistory.wins}
                  </Text>
                  <Text style={[styles.duelStatLabel, { color: '#10b981' }]}>Galibiyet</Text>
                </View>
                <View style={styles.duelStatBox}>
                  <Text style={[styles.duelStatValue, { color: '#ef4444', fontWeight: 'bold' }]}>
                    {friendDuelHistory.losses}
                  </Text>
                  <Text style={[styles.duelStatLabel, { color: '#ef4444' }]}>Mağlubiyet</Text>
                </View>
                <View style={styles.duelStatBox}>
                  <Text style={[styles.duelStatValue, { color: theme.colors.textSecondary, fontWeight: 'bold' }]}>
                    {friendDuelHistory.draws}
                  </Text>
                  <Text style={styles.duelStatLabel}>Beraberlik</Text>
                </View>
              </View>
              
              {/* Toplam skor */}
              <View style={styles.duelExtraStats}>
                <View style={styles.duelExtraStat}>
                  <Ionicons name="trophy" size={16} color="#fbbf24" />
                  <Text style={styles.duelExtraText}>
                    Toplam {friendDuelHistory.wins + friendDuelHistory.losses + friendDuelHistory.draws} düello
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Duel Stats */}
        {duelStats && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Düello İstatistikleri</Text>
            <View style={styles.duelStatsCard}>
              <View style={styles.duelMainStats}>
                <View style={styles.duelStatBox}>
                  <Text style={[styles.duelStatValue, { color: '#10b981' }]}>
                    {duelStats.wins}
                  </Text>
                  <Text style={styles.duelStatLabel}>Galibiyet</Text>
                </View>
                <View style={styles.duelStatBox}>
                  <Text style={[styles.duelStatValue, { color: '#ef4444' }]}>
                    {duelStats.losses}
                  </Text>
                  <Text style={styles.duelStatLabel}>Mağlubiyet</Text>
                </View>
                <View style={styles.duelStatBox}>
                  <Text style={[styles.duelStatValue, { color: theme.colors.textSecondary }]}>
                    {duelStats.draws}
                  </Text>
                  <Text style={styles.duelStatLabel}>Beraberlik</Text>
                </View>
              </View>

              <View style={styles.duelExtraStats}>
                <View style={styles.duelExtraStat}>
                  <Ionicons name="flame" size={16} color="#f97316" />
                  <Text style={styles.duelExtraText}>
                    En uzun seri: {duelStats.longestStreak}
                  </Text>
                </View>
                <View style={styles.duelExtraStat}>
                  <Ionicons name="star" size={16} color={theme.colors.primary} />
                  <Text style={styles.duelExtraText}>
                    Toplam XP: {duelStats.totalXPEarned}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Weekly Activity */}
        {renderWeeklyActivity()}

        {/* Badges */}
        {renderBadges()}

        {/* Member Since */}
        <View style={styles.memberSince}>
          <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.memberSinceText}>
            {new Date(profile.joinedAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long'
            })} tarihinden beri üye
          </Text>
        </View>
      </ScrollView>
      
      {/* Fotoğraf Büyütme Modal */}
      <Modal
        visible={photoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.photoModalContainer}
          activeOpacity={1}
          onPress={() => setPhotoModalVisible(false)}
        >
          <View style={styles.photoModalContent}>
            {profile?.photoURL && (
              <Image 
                source={{ uri: profile.photoURL }} 
                style={styles.photoModalImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity 
              style={styles.photoModalCloseButton}
              onPress={() => setPhotoModalVisible(false)}
            >
              <Ionicons name="close-circle" size={36} color="#fff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      color: colors.text,
      marginTop: 16,
    },
    backBtn: {
      marginTop: 20,
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    backBtnText: {
      color: '#fff',
      fontWeight: '600',
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
      textAlign: 'center',
    },
    content: {
      flex: 1,
    },
    profileCard: {
      alignItems: 'center',
      padding: 24,
      backgroundColor: colors.card,
      margin: 16,
      borderRadius: 16,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 4,
      right: 4,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#10b981',
      borderWidth: 3,
      borderColor: colors.card,
    },
    displayName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 16,
    },
    username: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 4,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
    },
    messageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
    },
    duelButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.warning,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
    },
    removeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: '#ef4444',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    statsGrid: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      gap: 12,
    },
    statBox: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 8,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    section: {
      margin: 16,
      marginBottom: 0,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    quizStatsCard: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
    },
    quizStatItem: {
      flex: 1,
      alignItems: 'center',
    },
    quizStatDivider: {
      width: 1,
      backgroundColor: colors.border,
    },
    quizStatValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    quizStatLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    duelStatsCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
    },
    duelMainStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    duelStatBox: {
      alignItems: 'center',
    },
    duelStatValue: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    duelStatLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    duelExtraStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    duelExtraStat: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    duelExtraText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    activitySection: {
      margin: 16,
      marginBottom: 0,
    },
    activityGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
    },
    activityDay: {
      alignItems: 'center',
    },
    activityBlock: {
      width: 36,
      height: 36,
      borderRadius: 6,
    },
    activityDayText: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 6,
    },
    activityLegend: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      gap: 8,
    },
    legendBlocks: {
      flexDirection: 'row',
      gap: 4,
    },
    legendBlock: {
      width: 16,
      height: 16,
      borderRadius: 3,
    },
    legendText: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    badgesSection: {
      margin: 16,
      marginBottom: 0,
    },
    badgesContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    badge: {
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
    },
    badgeIcon: {
      fontSize: 32,
    },
    badgeName: {
      fontSize: 12,
      color: colors.text,
      marginTop: 6,
    },
    memberSince: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      margin: 24,
    },
    memberSinceText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    // Fotoğraf Büyütme Modal Stilleri
    photoModalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoModalContent: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoModalImage: {
      width: width - 40,
      height: width - 40,
      borderRadius: 20,
    },
    photoModalCloseButton: {
      position: 'absolute',
      top: 60,
      right: 20,
    },
  });

export default FriendProfileScreen;
