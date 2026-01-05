import React, { useEffect, useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { DuelService, AktifDuello } from '../services/DuelService';
import { lightHaptic } from '../utils/haptics';

const MatchHistoryScreen = () => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [duelHistory, setDuelHistory] = useState<AktifDuello[]>([]);
  const [selectedDuel, setSelectedDuel] = useState<AktifDuello | null>(null);
  const [showDuelModal, setShowDuelModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  useEffect(() => {
    const loadDuelHistory = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          const history = await DuelService.getAktifDuelloHistory(user.id, 100);
          setDuelHistory(history);
        } catch (error) {
          console.error('Düello geçmişi yükleme hatası:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadDuelHistory();
  }, [user?.id]);

  const stats = useMemo(() => {
    if (!user?.id || duelHistory.length === 0) {
      return { total: 0, wins: 0, losses: 0, draws: 0, winRate: 0 };
    }

    let wins = 0, losses = 0, draws = 0;

    duelHistory.forEach(duel => {
      const isPlayer1 = duel.player1Id === user.id;
      const myScore = isPlayer1 ? duel.player1Score : duel.player2Score;
      const opponentScore = isPlayer1 ? duel.player2Score : duel.player1Score;

      if (myScore > opponentScore) wins++;
      else if (myScore < opponentScore) losses++;
      else draws++;
    });

    const winRate = duelHistory.length > 0 ? Math.round((wins / duelHistory.length) * 100) : 0;

    return { total: duelHistory.length, wins, losses, draws, winRate };
  }, [duelHistory, user?.id]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              lightHaptic();
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {locale === 'tr' ? 'Maç Geçmişi' : 'Match History'}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* İstatistikler */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>
              {locale === 'tr' ? 'Toplam' : 'Total'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#22c55e20' }]}>
            <Text style={[styles.statValue, { color: '#22c55e' }]}>{stats.wins}</Text>
            <Text style={styles.statLabel}>
              {locale === 'tr' ? 'Galibiyet' : 'Wins'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#ef444420' }]}>
            <Text style={[styles.statValue, { color: '#ef4444' }]}>{stats.losses}</Text>
            <Text style={styles.statLabel}>
              {locale === 'tr' ? 'Mağlubiyet' : 'Losses'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#f59e0b20' }]}>
            <Text style={[styles.statValue, { color: '#f59e0b' }]}>{stats.draws}</Text>
            <Text style={styles.statLabel}>
              {locale === 'tr' ? 'Berabere' : 'Draws'}
            </Text>
          </View>
        </View>

        {/* Kazanma Oranı */}
        <View style={styles.winRateCard}>
          <Text style={styles.winRateLabel}>
            {locale === 'tr' ? 'Kazanma Oranı' : 'Win Rate'}
          </Text>
          <Text style={styles.winRateValue}>{stats.winRate}%</Text>
          <View style={styles.winRateBar}>
            <View style={[styles.winRateFill, { width: `${stats.winRate}%` }]} />
          </View>
        </View>

        {/* Maç Listesi */}
        <ScrollView style={styles.matchList} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>
                {locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}
              </Text>
            </View>
          ) : duelHistory.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="game-controller-outline" size={64} color={theme.colors.textSecondary} />
              <Text style={styles.emptyText}>
                {locale === 'tr' ? 'Henüz düello oynamadın' : 'No matches played yet'}
              </Text>
              <Text style={styles.emptySubtext}>
                {locale === 'tr' 
                  ? 'Arkadaşlarınla düello yaparak burada görüntüle!' 
                  : 'Challenge your friends to see matches here!'}
              </Text>
            </View>
          ) : (
            duelHistory.map((duel, index) => {
              const isPlayer1 = duel.player1Id === user?.id;
              const myScore = isPlayer1 ? duel.player1Score : duel.player2Score;
              const opponentScore = isPlayer1 ? duel.player2Score : duel.player1Score;
              const opponentName = isPlayer1 ? duel.player2Name : duel.player1Name;
              const isWinner = myScore > opponentScore;
              const isDraw = myScore === opponentScore;

              return (
                <TouchableOpacity 
                  key={duel.id || index} 
                  style={styles.matchItem}
                  onPress={() => {
                    lightHaptic();
                    setSelectedDuel(duel);
                    setShowDuelModal(true);
                  }}
                >
                  <View style={[
                    styles.resultIndicator, 
                    { backgroundColor: isDraw ? '#f59e0b' : isWinner ? '#22c55e' : '#ef4444' }
                  ]} />
                  <View style={styles.matchContent}>
                    <View style={styles.matchHeader}>
                      <Text style={styles.opponentName}>{opponentName || (locale === 'tr' ? 'Rakip' : 'Opponent')}</Text>
                      <Text style={[
                        styles.resultText,
                        { color: isDraw ? '#f59e0b' : isWinner ? '#22c55e' : '#ef4444' }
                      ]}>
                        {isDraw 
                          ? (locale === 'tr' ? 'Berabere' : 'Draw') 
                          : isWinner 
                            ? (locale === 'tr' ? 'Kazandın' : 'Won') 
                            : (locale === 'tr' ? 'Kaybettin' : 'Lost')}
                      </Text>
                    </View>
                    <View style={styles.matchFooter}>
                      <Text style={styles.scoreText}>
                        {myScore || 0} - {opponentScore || 0}
                      </Text>
                      <Text style={styles.categoryText}>
                        {duel.category || 'N/A'}
                      </Text>
                      <Text style={styles.dateText}>
                        {duel.createdAt ? new Date(duel.createdAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US') : ''}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>

        {/* Düello Detay Modal */}
        <Modal
          visible={showDuelModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowDuelModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {locale === 'tr' ? 'Maç Detayları' : 'Match Details'}
                </Text>
                <TouchableOpacity onPress={() => setShowDuelModal(false)}>
                  <Ionicons name="close" size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
              
              {selectedDuel && (() => {
                const isPlayer1 = selectedDuel.player1Id === user?.id;
                const myScore = isPlayer1 ? selectedDuel.player1Score : selectedDuel.player2Score;
                const opponentScore = isPlayer1 ? selectedDuel.player2Score : selectedDuel.player1Score;
                const opponentName = isPlayer1 ? selectedDuel.player2Name : selectedDuel.player1Name;
                const myName = isPlayer1 ? selectedDuel.player1Name : selectedDuel.player2Name;
                const isWinner = myScore > opponentScore;
                const isDraw = myScore === opponentScore;

                return (
                  <ScrollView style={styles.modalBody}>
                    <View style={[
                      styles.modalResultBadge,
                      { backgroundColor: isDraw ? '#f59e0b' : isWinner ? '#22c55e' : '#ef4444' }
                    ]}>
                      <Text style={styles.modalResultText}>
                        {isDraw 
                          ? (locale === 'tr' ? 'Berabere' : 'Draw') 
                          : isWinner 
                            ? (locale === 'tr' ? 'Kazandın! 🎉' : 'You Won! 🎉') 
                            : (locale === 'tr' ? 'Kaybettin' : 'You Lost')}
                      </Text>
                    </View>

                    <View style={styles.modalScoreContainer}>
                      <View style={styles.modalPlayerScore}>
                        <Text style={styles.modalPlayerName}>{myName}</Text>
                        <Text style={styles.modalScore}>{myScore || 0}</Text>
                      </View>
                      <Text style={styles.modalVs}>VS</Text>
                      <View style={styles.modalPlayerScore}>
                        <Text style={styles.modalPlayerName}>{opponentName}</Text>
                        <Text style={styles.modalScore}>{opponentScore || 0}</Text>
                      </View>
                    </View>

                    <View style={styles.modalInfoRow}>
                      <Ionicons name="calendar" size={20} color={theme.colors.textSecondary} />
                      <Text style={styles.modalInfoText}>
                        {selectedDuel.createdAt 
                          ? new Date(selectedDuel.createdAt).toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US') 
                          : 'N/A'}
                      </Text>
                    </View>

                    <View style={styles.modalInfoRow}>
                      <Ionicons name="book" size={20} color={theme.colors.textSecondary} />
                      <Text style={styles.modalInfoText}>
                        {locale === 'tr' ? 'Kategori: ' : 'Category: '}
                        {selectedDuel.category || 'N/A'}
                      </Text>
                    </View>

                    <View style={styles.modalInfoRow}>
                      <Ionicons name="help-circle" size={20} color={theme.colors.textSecondary} />
                      <Text style={styles.modalInfoText}>
                        {locale === 'tr' ? 'Soru Sayısı: ' : 'Questions: '}
                        {selectedDuel.questionCount || 10}
                      </Text>
                    </View>
                  </ScrollView>
                );
              })()}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  winRateCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  winRateLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  winRateValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  winRateBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  winRateFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  matchList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
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
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resultIndicator: {
    width: 4,
    height: '100%',
    position: 'absolute',
    left: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  matchContent: {
    flex: 1,
    marginLeft: 12,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  opponentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  resultText: {
    fontSize: 14,
    fontWeight: '600',
  },
  matchFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryText: {
    fontSize: 12,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalBody: {
    padding: 20,
  },
  modalResultBadge: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  modalResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalPlayerScore: {
    alignItems: 'center',
  },
  modalPlayerName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  modalScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalVs: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalInfoText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
});

export default MatchHistoryScreen;
