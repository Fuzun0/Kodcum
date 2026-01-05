import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { getTodayChallenge } from '../data/dailyChallenges';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { level, totalXP, streak, progress, completedQuizzes } = useProgress();
  const navigation = useNavigation();

  const styles = createStyles(theme.colors);

  // Debug: Kullanıcı bilgilerini logla
  React.useEffect(() => {
    if (user) {
      console.log('🔍 [HomeScreen DEBUG] Kullanıcı bilgileri:', {
        id: user.id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        photoURLType: user.photoURL ? (user.photoURL.startsWith('http') ? 'VALID_URL' : 'LOCAL_FILE') : 'NONE'
      });
    }
  }, [user]);

  // Bugün tamamlanan ders sayısı
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayCompletedLessons = progress.filter(p => {
    if (!p.completedAt || !p.completed) return false;
    const completedDate = new Date(p.completedAt);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  }).length;

  // Bugün tamamlanan quiz sayısı
  const todayCompletedQuizzes = progress.filter(p => {
    if (!p.quizCompletedAt) return false;
    const quizDate = new Date(p.quizCompletedAt);
    quizDate.setHours(0, 0, 0, 0);
    return quizDate.getTime() === today.getTime();
  }).length;

  // Bugün çalışma süresi (dakika)
  const todayStudyTime = progress.filter(p => {
    if (!p.completedAt) return false;
    const completedDate = new Date(p.completedAt);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  }).reduce((sum, p) => sum + (p.timeSpent || 10), 0);

  // Günlük hedefler - dinamik
  const dailyGoals = [
    { id: 1, title: '1 Ders Tamamla', completed: todayCompletedLessons >= 1, icon: 'book' },
    { id: 2, title: '1 Quiz Çöz', completed: todayCompletedQuizzes >= 1, icon: 'help-circle' },
    { id: 3, title: '10 Dakika Çalış', completed: todayStudyTime >= 10, icon: 'time' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* AI Asistan ve Düello - En Üstte */}
      <View style={styles.aiSection}>
        <TouchableOpacity 
          style={styles.aiCardWrapper}
          onPress={() => (navigation as any).navigate('AIAssistant')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8b5cf6', '#6366f1', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiCard}
          >
            <View style={styles.aiIcon}>
              <Text style={styles.geminiEmoji}>✨</Text>
            </View>
            <View style={styles.aiContent}>
              <Text style={styles.aiTitle}>✨ Gemini AI Asistan</Text>
              <Text style={styles.aiSubtitle}>
                Takıldığın yerde AI'dan yardım al, kodunu analiz ettir!
              </Text>
            </View>
            <Ionicons name="sparkles" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.duelCardWrapper}
          onPress={() => (navigation as any).navigate('Duel')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#ef4444', '#f59e0b', '#eab308']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.duelCard}
          >
            <View style={styles.duelIcon}>
              <Text style={styles.duelEmoji}>⚔️</Text>
            </View>
            <View style={styles.aiContent}>
              <Text style={styles.duelTitle}>🔥 Düello Modu</Text>
              <Text style={styles.aiSubtitle}>
                Arkadaşlarınla yarış, bilgini test et!
              </Text>
            </View>
            <Ionicons name="flash" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={24} color={theme.colors.primary} />
          <Text style={styles.statValue}>{level}</Text>
          <Text style={styles.statLabel}>{t('level')}</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={24} color="#fbbf24" />
          <Text style={styles.statValue}>{totalXP}</Text>
          <Text style={styles.statLabel}>{t('xp')}</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={24} color="#ef4444" />
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>{t('streak')}</Text>
        </View>
      </View>

      {/* Günlük Hedefler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Günlük Hedefler</Text>
        <View style={styles.goalsContainer}>
          {dailyGoals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <View style={[styles.goalIcon, goal.completed && styles.goalCompleted]}>
                <Ionicons 
                  name={goal.completed ? 'checkmark' : goal.icon as any} 
                  size={16} 
                  color={goal.completed ? '#fff' : theme.colors.textSecondary} 
                />
              </View>
              <Text style={[styles.goalText, goal.completed && styles.goalTextCompleted]}>
                {goal.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Günlük Challenge */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Günün Meydan Okuması</Text>
        <TouchableOpacity 
          style={styles.dailyChallengeCard}
          onPress={() => navigation.navigate('DailyChallenge' as never)}
        >
          <View style={styles.challengeHeader}>
            <View style={[styles.challengeBadge, { backgroundColor: (getTodayChallenge().color || theme.colors.primary) + '20' }]}>
              <Ionicons name="flash" size={20} color={getTodayChallenge().color || theme.colors.primary} />
            </View>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{getTodayChallenge().title}</Text>
              <Text style={styles.challengeCategory}>{getTodayChallenge().category}</Text>
            </View>
          </View>
          <Text style={styles.challengeDescription} numberOfLines={2}>
            {getTodayChallenge().description}
          </Text>
          <View style={styles.challengeFooter}>
            <View style={styles.challengeXP}>
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text style={styles.challengeXPText}>+{getTodayChallenge().xpReward} XP</Text>
            </View>
            <View style={styles.challengeAction}>
              <Text style={styles.challengeActionText}>Çöz</Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Devam Et Bölümü */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Kaldığın Yerden Devam Et</Text>
        {progress.filter(p => typeof p.quizScore === 'number' && (p.quizScore || 0) >= 60).slice(-3).reverse().map((item, index) => {
          const lessonColors = {
            html: '#e34c26',
            css: '#264de4',
            javascript: '#f7df1e',
            react: '#61dafb',
            python: '#3776ab',
            kotlin: '#7F52FF',
            swift: '#FA7343',
          };
          
          // Lesson ID'den kategori belirleme
          const categoryPrefix = item.lessonId.split('-')[0];
          const categoryColor = lessonColors[categoryPrefix as keyof typeof lessonColors] || theme.colors.primary;
          const categoryIcons = {
            html: 'code-slash',
            css: 'color-palette',
            js: 'logo-javascript',
            react: 'logo-react',
            py: 'logo-python',
            kt: 'logo-android',
            sw: 'logo-apple',
          };
          const iconName = categoryIcons[categoryPrefix as keyof typeof categoryIcons] || 'book';
          
          // İlerleme yüzdesi
          const categoryProgress = progress.filter(p => 
            p.lessonId.startsWith(categoryPrefix) && typeof p.quizScore === 'number' && (p.quizScore || 0) >= 60
          ).length;
          const totalLessons = 20; // Yaklaşık değer
          const progressPercent = Math.min((categoryProgress / totalLessons) * 100, 100);
          
          return (
            <TouchableOpacity 
              key={item.lessonId}
              style={[styles.continueCard, index > 0 && { marginTop: 12 }]}
              onPress={() => (navigation as any).navigate('LessonDetail', { 
                categoryId: categoryPrefix 
              })}
            >
              <View style={styles.continueContent}>
                <View style={[styles.continueIcon, { backgroundColor: categoryColor + '20' }]}>
                  <Ionicons name={iconName as any} size={24} color={categoryColor} />
                </View>
                <View style={styles.continueInfo}>
                  <Text style={styles.continueTitle}>{item.lessonId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</Text>
                  <Text style={styles.continueSubtitle}>Tamamlandı ✓</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          );
        })}
        {progress.filter(p => typeof p.quizScore === 'number' && (p.quizScore || 0) >= 60).length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Henüz tamamlanmış ders yok</Text>
            <Text style={styles.emptyStateSubtext}>Kategoriler sekmesinden derslerini başlat!</Text>
          </View>
        )}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  streakBadge: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
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
    marginTop: 24,
    paddingHorizontal: 20,
  },
  aiSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dailyChallengeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  challengeCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  challengeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeXP: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeXPText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fbbf24',
    marginLeft: 4,
  },
  challengeAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  goalsContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  goalIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalCompleted: {
    backgroundColor: colors.success,
  },
  goalText: {
    fontSize: 14,
    color: colors.text,
  },
  goalTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  continueCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f7df1e20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  continueInfo: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  continueSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  aiCardWrapper: {
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  aiCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  geminiEmoji: {
    fontSize: 32,
  },
  aiEmoji: {
    fontSize: 24,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  aiSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    lineHeight: 18,
  },
  duelCardWrapper: {
    borderRadius: 20,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  duelCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  duelIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  duelEmoji: {
    fontSize: 32,
  },
  duelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 48,
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  socialButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  termsText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 32,
  },
});

export default HomeScreen;
