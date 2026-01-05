// Daily Challenge Ekranı - AI Entegrasyonlu

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { DailyChallengeService, AIAnalysisResult } from '../services/DailyChallengeService';
import { DailyChallenge } from '../data/dailyChallenges';
import ToastNotification from '../components/ToastNotification';
import { Confetti } from '../components/Celebration';
import { successHaptic, errorHaptic, lightHaptic } from '../utils/haptics';

const DailyChallengeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { awardXP } = useProgress();
  const { user } = useAuth();
  
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const [isCompleted, setIsCompleted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  useEffect(() => {
    const loadChallenge = async () => {
      setIsLoading(true);
      try {
        // Firestore'dan bugünün challenge'ını getir (AI ile üretilmiş olabilir)
        const todayChallenge = await DailyChallengeService.getTodayChallenge();
        if (todayChallenge) {
          setChallenge(todayChallenge);
          setUserCode(todayChallenge.starterCode);
          
          // Kullanıcıya özel tamamlanma kontrolü (Firestore)
          if (user?.id) {
            const completed = await DailyChallengeService.isChallengeCompleted(
              todayChallenge.id, 
              user.id
            );
            setIsCompleted(completed);
          }
        }
      } catch (error) {
        console.error('Challenge yükleme hatası:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChallenge();
  }, [user?.id]);

  // Loading ekranı
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>🤖 AI günlük görevinizi hazırlıyor...</Text>
      </View>
    );
  }

  if (!challenge) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Bugün için görev yükleniyor...</Text>
      </View>
    );
  }

  // 🤖 AI Analiz Fonksiyonu - Gerçek AI Entegrasyonu
  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    
    if (userCode.trim() === challenge.starterCode.trim()) {
      setToastMessage('Önce kodu tamamlamalısın!');
      setToastType('error');
      setShowToast(true);
      errorHaptic();
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    lightHaptic();
    
    try {
      // 🤖 Gerçek AI analizi
      const result = await DailyChallengeService.analyzeUserCode(userCode, challenge);
      
      setAnalysisResult(result);
      
      if (result.isCorrect) {
        // ✅ Doğru cevap - Görevi tamamla
        successHaptic();
        setShowConfetti(true);
        
        if (!isCompleted && user?.id) {
          // Bonus XP: AI puanına göre
          const bonusXP = Math.floor((result.score - 70) / 10) * 5;
          const totalXP = challenge.xpReward + Math.max(0, bonusXP);
          
          await DailyChallengeService.completeChallenge(
            challenge.id,
            user.id,
            userCode,
            totalXP
          );
          
          setIsCompleted(true);
          awardXP(totalXP);
          
          setToastMessage(`🎉 Tebrikler! AI Puanı: ${result.score}/100 | +${totalXP} XP kazandın!`);
          setToastType('success');
          setShowToast(true);
          
          // Konfeti 3 saniye sonra kapat
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        // ❌ Yanlış cevap
        errorHaptic();
        setToastMessage(`AI Puanı: ${result.score}/100 - Tekrar dene!`);
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('AI analiz hatası:', error);
      setToastMessage('AI analizi başarısız. Tekrar deneyin.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleComplete = async () => {
    // Artık handleAnalyze kullanılacak
    await handleAnalyze();
  };

  // Çözümü göster (sadece tamamlandıktan sonra veya 3 yanlıştan sonra)
  const handleShowSolution = () => {
    if (isCompleted) {
      setShowSolution(!showSolution);
    } else {
      setToastMessage('Önce görevi tamamlamayı dene!');
      setToastType('info');
      setShowToast(true);
    }
  };

  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return theme.colors.text;
    }
  };

  const getDifficultyText = () => {
    switch (challenge.difficulty) {
      case 'easy': return 'Kolay';
      case 'medium': return 'Orta';
      case 'hard': return 'Zor';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ToastNotification
        message={toastMessage}
        type={toastType}
        visible={showToast}
        onHide={() => setShowToast(false)}
      />

      {/* Header */}
      <View style={styles.header} accessibilityRole="header">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          accessibilityLabel="Günlük görevi kapat"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="today" size={24} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>Günün Görevi</Text>
        </View>
        <View style={styles.headerRight}>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={18} color="#10b981" />
              <Text style={styles.completedText}>Tamamlandı</Text>
            </View>
          )}
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
            <Text style={styles.difficultyText}>{getDifficultyText()}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Challenge Info */}
        <View style={styles.challengeCard}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{challenge.category}</Text>
          </View>
          
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          
          <View style={styles.taskBox}>
            <View style={styles.taskHeader}>
              <Ionicons name="checkbox-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.taskTitle}>Görev</Text>
            </View>
            <Text style={styles.taskText}>{challenge.task}</Text>
          </View>

          <View style={styles.xpBadge}>
            <Ionicons name="star" size={20} color="#fbbf24" />
            <Text style={styles.xpText}>+{challenge.xpReward} XP</Text>
          </View>
        </View>

        {/* Code Editor */}
        <View style={styles.editorCard}>
          <View style={styles.editorHeader}>
            <Ionicons name="code-slash" size={20} color={theme.colors.text} />
            <Text style={styles.editorTitle}>Kod Editörü</Text>
          </View>
          
          <TextInput
            style={styles.codeInput}
            value={userCode}
            onChangeText={setUserCode}
            multiline
            placeholder="Kodunu buraya yaz..."
            placeholderTextColor={theme.colors.text + '60'}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
        </View>

        {/* AI Analiz Sonucu */}
        {analysisResult && (
          <View style={[styles.analysisCard, analysisResult.isCorrect ? styles.analysisSuccess : styles.analysisError]}>
            <View style={styles.analysisHeader}>
              <View style={styles.aiScoreBadge}>
                <Ionicons name="sparkles" size={16} color="#fff" />
                <Text style={styles.aiScoreText}>{analysisResult.score}/100</Text>
              </View>
              <Ionicons 
                name={analysisResult.isCorrect ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={analysisResult.isCorrect ? "#10b981" : "#ef4444"} 
              />
              <Text style={[styles.analysisTitle, { color: analysisResult.isCorrect ? "#10b981" : "#ef4444" }]}>
                {analysisResult.isCorrect ? "🎉 Doğru Çözüm!" : "❌ Tekrar Dene"}
              </Text>
            </View>
            <Text style={styles.analysisText}>{analysisResult.feedback}</Text>
            
            {/* Öneriler */}
            {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>💡 Öneriler:</Text>
                {analysisResult.suggestions.map((suggestion, index) => (
                  <Text key={index} style={styles.suggestionItem}>• {suggestion}</Text>
                ))}
              </View>
            )}
            
            {/* Detaylı Analiz */}
            {analysisResult.detailedAnalysis && (
              <View style={styles.detailedAnalysisContainer}>
                <Text style={styles.detailedAnalysisTitle}>📝 Detaylı Analiz:</Text>
                <Text style={styles.detailedAnalysisText}>{analysisResult.detailedAnalysis}</Text>
              </View>
            )}
          </View>
        )}

        {/* Konfeti Efekti */}
        {showConfetti && <Confetti />}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setUserCode(challenge.starterCode)}
        >
          <Ionicons name="refresh" size={20} color={theme.colors.text} />
          <Text style={styles.resetButtonText}>Sıfırla</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.analyzeButton, 
            isAnalyzing && styles.analyzeButtonDisabled,
            isCompleted && styles.completeButtonSuccess
          ]}
          onPress={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.analyzeButtonText}>AI Analiz Ediyor...</Text>
            </>
          ) : (
            <>
              <Ionicons name="sparkles" size={20} color="#fff" />
              <Text style={styles.analyzeButtonText}>
                {isCompleted ? "✓ Tamamlandı" : "🤖 AI ile Kontrol Et"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981' + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  completedText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  challengeCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  taskBox: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  taskText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  xpText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 6,
  },
  editorCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  editorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  codeInput: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.text,
    padding: 16,
    minHeight: 300,
    textAlignVertical: 'top',
  },
  solutionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  solutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  solutionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  solutionCode: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
  // AI Analiz Butonu
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  analyzeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  analyzeButtonDisabled: {
    opacity: 0.7,
  },
  // Analiz Sonucu Kartları
  analysisCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  analysisSuccess: {
    backgroundColor: '#10b98115',
    borderColor: '#10b981',
  },
  analysisError: {
    backgroundColor: '#ef444415',
    borderColor: '#ef4444',
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  analysisText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  // AI Skor Badge
  aiScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  aiScoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Öneriler
  suggestionsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  suggestionItem: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
    paddingLeft: 8,
  },
  // Detaylı Analiz
  detailedAnalysisContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailedAnalysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  detailedAnalysisText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  // Loading
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  resetButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  analyzeButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  completeButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonDisabled: {
    opacity: 0.6,
    backgroundColor: colors.textSecondary,
  },
  completeButtonSuccess: {
    backgroundColor: '#10b981',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default DailyChallengeScreen;
