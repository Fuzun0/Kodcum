// Ders Sonu Quiz Ekranı - 15 Soruluk Test

import React, { useState, useMemo, useCallback, memo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { lessonQuizzes, QuizQuestion } from '../data/quizzes';
import { successHaptic, errorHaptic, lightHaptic, mediumHaptic } from '../utils/haptics';
import { Confetti } from '../components/Celebration';

const LessonQuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { awardXP, addProgress } = useProgress();
  
  const { lessonId } = route.params as { lessonId: string };
  const quiz = lessonQuizzes[lessonId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(15).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Bu ders için henüz quiz eklenmemiş.</Text>
      </View>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    lightHaptic();
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Testi bitir
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setShowResult(true);

    // Yüzdelik hesapla
    const percentage = Math.round((correct / quiz.length) * 100);

    // Quiz sonucu başarılıysa ders tamamlandı olarak işaretle, değilse sadece puanı kaydet
    const passed = percentage >= 60;

    // Haptic feedback
    if (passed) {
      successHaptic();
    } else {
      errorHaptic();
    }

    // Kaydet: quizScore olarak yüzde değerini gönder
    addProgress(lessonId, passed, percentage).catch(() => {});

    // XP kazan (her doğru cevap için 5 XP)
    awardXP(correct * 5);
  };

  const currentQ = quiz[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== -1;
  const progressPercent = ((currentQuestion + 1) / quiz.length) * 100;

  if (showResult) {
    const percentage = Math.round((score / quiz.length) * 100);
    const passed = percentage >= 60;

    return (
      <SafeAreaView style={styles.container}>
        {passed && <Confetti visible={true} pieceCount={40} />}
        <View style={styles.resultContainer}>
          <Ionicons 
            name={passed ? 'checkmark-circle' : 'close-circle'} 
            size={100} 
            color={passed ? '#10b981' : '#ef4444'} 
          />
          
          <Text style={styles.resultTitle}>
            {passed ? 'Tebrikler! 🎉' : 'Başarısız 😔'}
          </Text>
          
          <Text style={styles.resultScore}>
            {score} / {quiz.length} Doğru
          </Text>
          
          <Text style={styles.resultPercentage}>
            %{percentage}
          </Text>

          <Text style={styles.resultMessage}>
            {passed 
              ? 'Harika! Dersi çok iyi anlamışsın. Bir sonraki derse geçebilirsin.'
              : 'Dersi tekrar gözden geçirmelisin. Tekrar denemek ister misin?'
            }
          </Text>

          <View style={styles.resultButtons}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => {
                setShowResult(false);
                setCurrentQuestion(0);
                setSelectedAnswers(new Array(15).fill(-1));
              }}
            >
              <Text style={styles.reviewButtonText}>Tekrar Dene</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.continueButton, !passed && styles.disabledButton]}
              onPress={() => navigation.goBack()}
              disabled={!passed}
            >
              <Text style={styles.continueButtonText}>
                {passed ? 'Devam Et' : 'Dersi Tekrarla'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Yanlış Cevaplar */}
          <ScrollView style={styles.wrongAnswersContainer}>
            <Text style={styles.wrongAnswersTitle}>Cevap Anahtarı:</Text>
            {quiz.map((q, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <View key={q.id} style={styles.answerReviewCard}>
                  <View style={styles.answerReviewHeader}>
                    <Text style={styles.answerReviewNumber}>Soru {index + 1}</Text>
                    <Ionicons 
                      name={isCorrect ? 'checkmark-circle' : 'close-circle'} 
                      size={24} 
                      color={isCorrect ? '#10b981' : '#ef4444'} 
                    />
                  </View>
                  
                  <Text style={styles.answerReviewQuestion}>{q.question}</Text>
                  
                  {!isCorrect && (
                    <>
                      <Text style={styles.answerReviewLabel}>Senin Cevabın:</Text>
                      <Text style={styles.wrongAnswer}>
                        {userAnswer >= 0 ? q.options[userAnswer] : 'Cevap verilmedi'}
                      </Text>
                      
                      <Text style={styles.answerReviewLabel}>Doğru Cevap:</Text>
                      <Text style={styles.correctAnswer}>
                        {q.options[q.correctAnswer]}
                      </Text>
                    </>
                  )}
                  
                  <Text style={styles.explanation}>{q.explanation}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header} accessibilityRole="header">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          accessibilityLabel="Quiz'i kapat"
          accessibilityRole="button"
          accessibilityHint="Derse geri döner"
        >
          <Ionicons name="close" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>
        
        <Text style={styles.questionCounter}>
          {currentQuestion + 1}/{quiz.length}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Soru */}
        <View 
          style={styles.questionCard}
          accessibilityRole="header"
          accessibilityLabel={`Soru ${currentQuestion + 1}: ${currentQ.question}`}
        >
          <Text style={styles.questionNumber}>Soru {currentQuestion + 1}</Text>
          <Text style={styles.questionText}>{currentQ.question}</Text>
        </View>

        {/* Seçenekler */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(index)}
                accessibilityLabel={`Seçenek ${index + 1}: ${option}`}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityHint="Cevabı seçmek için dokunun"
              >
                <View style={[
                  styles.optionCircle,
                  isSelected && styles.selectedCircle
                ]}>
                  {isSelected && (
                    <View style={styles.innerCircle} />
                  )}
                </View>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Alt Butonlar */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
          <Text style={styles.navButtonText}>Önceki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton, !isAnswered && styles.disabledButton]}
          onPress={handleNext}
          disabled={!isAnswered}
        >
          <Text style={styles.navButtonText}>
            {currentQuestion === quiz.length - 1 ? 'Bitir' : 'Sonraki'}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    backgroundColor: colors.card,
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionNumber: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: colors.primary,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  selectedOptionText: {
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text + '20',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.4,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Sonuç Ekranı
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  resultPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  resultMessage: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 24,
  },
  reviewButton: {
    flex: 1,
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  reviewButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  wrongAnswersContainer: {
    flex: 1,
    width: '100%',
  },
  wrongAnswersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  answerReviewCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  answerReviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  answerReviewNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  answerReviewQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  answerReviewLabel: {
    fontSize: 14,
    color: colors.text + '80',
    marginTop: 8,
    marginBottom: 4,
  },
  wrongAnswer: {
    fontSize: 15,
    color: '#ef4444',
    marginBottom: 8,
  },
  correctAnswer: {
    fontSize: 15,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default LessonQuizScreen;
