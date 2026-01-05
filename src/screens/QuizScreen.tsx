import React, { useState, useMemo, useCallback, memo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Animated
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { successHaptic, errorHaptic, lightHaptic } from '../utils/haptics';

// Örnek quiz soruları
const quizData = {
  quiz_javascript_1: {
    questions: [
      {
        id: 1,
        question: 'JavaScript\'te değişken tanımlamak için hangi anahtar kelime kullanılır?',
        options: ['var', 'let', 'const', 'Hepsi'],
        correctAnswer: 3,
        explanation: 'JavaScript\'te var, let ve const anahtar kelimeleri değişken tanımlamak için kullanılır.',
      },
      {
        id: 2,
        question: 'Aşağıdakilerden hangisi bir veri tipi DEĞİLDİR?',
        options: ['String', 'Number', 'Loop', 'Boolean'],
        correctAnswer: 2,
        explanation: 'Loop (döngü) bir kontrol yapısıdır, veri tipi değildir.',
      },
      {
        id: 3,
        question: 'console.log("5" + 3) ifadesinin çıktısı nedir?',
        options: ['8', '53', 'Hata', '5 + 3'],
        correctAnswer: 1,
        explanation: 'JavaScript\'te string + number işleminde, number string\'e dönüştürülür ve birleştirilir.',
      },
      {
        id: 4,
        question: 'const ile tanımlanan bir değişkenin değeri değiştirilebilir mi?',
        options: ['Evet', 'Hayır', 'Sadece nesnelerde', 'Sadece dizilerde'],
        correctAnswer: 1,
        explanation: 'const ile tanımlanan değişkenlerin değeri yeniden atanamaz.',
      },
      {
        id: 5,
        question: 'typeof null ifadesinin sonucu nedir?',
        options: ['null', 'undefined', 'object', 'Hata'],
        correctAnswer: 2,
        explanation: 'Bu JavaScript\'te tarihi bir hatadır. typeof null "object" döndürür.',
      },
    ],
  },
};

const QuizScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { addProgress, awardXP } = useProgress();
  const route = useRoute();
  const navigation = useNavigation();
  
  const { lessonId, quizId } = route.params as { lessonId: string; quizId: string };
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  // Quiz verilerini al
  const quiz = quizData[quizId as keyof typeof quizData] || quizData.quiz_javascript_1;
  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    const isCorrect = index === question.correctAnswer;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
      successHaptic();
    } else {
      errorHaptic();
    }
  };

  const nextQuestion = async () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz tamamlandı
      setQuizCompleted(true);
      const finalScore = Math.round((score / totalQuestions) * 100);
      
      // İlerlemeyi kaydet
      await addProgress(lessonId, true, finalScore);
      
      // XP ver (her doğru cevap için 10 XP)
      await awardXP(score * 10);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
  };

  // Quiz tamamlandı ekranı
  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 60;
    
    return (
      <View style={styles.container}>
        <View style={styles.completedContainer}>
          <View style={[styles.scoreCircle, isPassed ? styles.passedCircle : styles.failedCircle]}>
            <Text style={styles.scorePercentage}>{percentage}%</Text>
            <Text style={styles.scoreLabel}>{score}/{totalQuestions}</Text>
          </View>
          
          <Text style={styles.completedTitle}>
            {isPassed ? '🎉 Tebrikler!' : '💪 Tekrar Dene!'}
          </Text>
          
          <Text style={styles.completedSubtitle}>
            {isPassed 
              ? 'Quiz\'i başarıyla tamamladınız!'
              : 'Biraz daha pratik yapmanız gerekiyor.'
            }
          </Text>

          <View style={styles.xpEarned}>
            <Ionicons name="star" size={24} color="#fbbf24" />
            <Text style={styles.xpText}>+{score * 10} XP kazandınız!</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.restartButton}
              onPress={restartQuiz}
            >
              <Ionicons name="refresh" size={20} color={theme.colors.text} />
              <Text style={styles.restartText}>Tekrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.continueText}>Devam Et</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* İlerleme Çubuğu */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestion + 1} / {totalQuestions}
        </Text>
      </View>

      {/* Soru */}
      <View 
        style={styles.questionContainer}
        accessibilityRole="header"
        accessibilityLabel={`Soru ${currentQuestion + 1}: ${question.question}`}
      >
        <Text style={styles.questionNumber}>Soru {currentQuestion + 1}</Text>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      {/* Seçenekler */}
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          let optionStyle = styles.option;
          let textStyle = styles.optionText;
          
          if (showResult) {
            if (index === question.correctAnswer) {
              optionStyle = { ...styles.option, ...styles.correctOption };
              textStyle = { ...styles.optionText, ...styles.correctText };
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              optionStyle = { ...styles.option, ...styles.wrongOption };
              textStyle = { ...styles.optionText, ...styles.wrongText };
            }
          } else if (index === selectedAnswer) {
            optionStyle = { ...styles.option, ...styles.selectedOption };
          }
          
          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleAnswer(index)}
              disabled={showResult}
              accessibilityLabel={`Seçenek ${String.fromCharCode(65 + index)}: ${option}`}
              accessibilityRole="button"
              accessibilityState={{ 
                selected: index === selectedAnswer,
                disabled: showResult 
              }}
              accessibilityHint={showResult ? (index === question.correctAnswer ? 'Doğru cevap' : 'Yanlış cevap') : 'Cevabı seçmek için dokunun'}
            >
              <View style={styles.optionLetter}>
                <Text style={styles.optionLetterText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={textStyle}>{option}</Text>
              {showResult && index === question.correctAnswer && (
                <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              )}
              {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Açıklama */}
      {showResult && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>
            {selectedAnswer === question.correctAnswer ? '✅ Doğru!' : '❌ Yanlış!'}
          </Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}

      {/* İleri Butonu */}
      {showResult && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentQuestion < totalQuestions - 1 ? 'Sonraki Soru' : 'Sonuçları Gör'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionNumber: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  correctOption: {
    borderColor: '#22c55e',
    backgroundColor: '#22c55e20',
  },
  wrongOption: {
    borderColor: '#ef4444',
    backgroundColor: '#ef444420',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  correctText: {
    color: '#22c55e',
  },
  wrongText: {
    color: '#ef4444',
  },
  explanationContainer: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  // Tamamlandı ekranı
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  passedCircle: {
    backgroundColor: '#22c55e20',
    borderWidth: 4,
    borderColor: '#22c55e',
  },
  failedCircle: {
    backgroundColor: '#f59e0b20',
    borderWidth: 4,
    borderColor: '#f59e0b',
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  completedSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  xpEarned: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 32,
  },
  xpText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 12,
  },
  restartText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default QuizScreen;
