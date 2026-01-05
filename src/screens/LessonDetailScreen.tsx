import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  PanResponder,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// WebView'i optional import et
let WebView: any = null;
try {
  WebView = require('react-native-webview').WebView;
} catch (e) {
  console.log('WebView not available');
}

import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  htmlLessons,
  cssLessons,
  javascriptLessons,
  reactLessons,
  pythonLessons,
  kotlinLessons,
  swiftLessons,
} from '../data/lessons';

const { width, height } = Dimensions.get('window');

const LessonDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { completedQuizzes, progress } = useProgress();

  const { lessonId, categoryId } = route.params as { lessonId?: string; categoryId?: string };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState(lessonId || '');
  const [userCode, setUserCode] = useState('');
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [blankValues, setBlankValues] = useState<{ [key: string]: string }>({});
  const [codeOutput, setCodeOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [isHtmlOutput, setIsHtmlOutput] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  // Kategori ID'yi belirle (daha erken)
  const determineCategoryFromLessonId = (lid: string): string => {
    if (!lid) return categoryId || 'html';
    const prefix = lid.split('-')[0];
    const categoryMap: { [key: string]: string } = {
      html: 'html',
      css: 'css',
      js: 'javascript',
      react: 'react',
      py: 'python',
      kt: 'kotlin',
      sw: 'swift',
    };
    return categoryMap[prefix] || categoryId || 'html';
  };

  const initialCategoryId = categoryId || determineCategoryFromLessonId(currentLessonId);

  // Son kalınan ders pozisyonunu yükle
  useEffect(() => {
    const loadLastPosition = async () => {
      try {
        const lastLesson = await AsyncStorage.getItem(`lastLesson_${initialCategoryId}`);
        // Eğer lessonId route'dan gelmediyse, AsyncStorage'dan son dersi yükle
        if (lastLesson && !lessonId) {
          setCurrentLessonId(lastLesson);
        } else if (!lessonId && !lastLesson) {
          // Hiç ders yoksa ilk dersi yükle
          const lessons = getLessonsForCategory(initialCategoryId);
          if (lessons.length > 0) {
            setCurrentLessonId(lessons[0].id);
          }
        }
      } catch (error) {
        console.log('Last position load error:', error);
      }
    };
    loadLastPosition();
  }, [initialCategoryId, lessonId]);

  // Ders değiştiğinde pozisyonu kaydet
  useEffect(() => {
    const saveLastPosition = async () => {
      try {
        if (currentLessonId) {
          await AsyncStorage.setItem(`lastLesson_${initialCategoryId}`, currentLessonId);
        }
      } catch (error) {
        console.log('Last position save error:', error);
      }
    };
    saveLastPosition();
  }, [currentLessonId, initialCategoryId]);

  // Swipe gesture for drawer
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Sağdan sola kaydırma algıla
        return gestureState.dx < -20;
      },
      onPanResponderMove: () => {
        // Sadece gesture'ı algıla, içeriği kaydırma
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 100) {
          setDrawerOpen(true);
        }
      },
    })
  ).current;

  // Navigation değiştiğinde challenge state'lerini sıfırla
  useEffect(() => {
    setBlankValues({});
    setCodeOutput('');
    setShowOutput(false);
    setChallengeCompleted(false);
    setShowChallenge(false);
    setIsHtmlOutput(false);
  }, [currentLessonId]);

  // Klavye açıldığında scroll yap
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  // Kategori derslerini al
  const getLessonsForCategory = (category: string) => {
    switch (category) {
      case 'html':
        return htmlLessons;
      case 'css':
        return cssLessons;
      case 'javascript':
      case 'js':
        return javascriptLessons;
      case 'react':
        return reactLessons;
      case 'python':
      case 'py':
        return pythonLessons;
      case 'kotlin':
      case 'kt':
        return kotlinLessons;
      case 'swift':
      case 'sw':
        return swiftLessons;
      default:
        return htmlLessons;
    }
  };

  // Kategori ID'yi lesson ID'den belirle
  const determineCategoryId = (lid: string): string => {
    const prefix = lid.split('-')[0];
    const categoryMap: { [key: string]: string } = {
      html: 'html',
      css: 'css',
      js: 'javascript',
      react: 'react',
      py: 'python',
      kt: 'kotlin',
      sw: 'swift',
    };
    return categoryMap[prefix] || 'html';
  };

  const detectedCategoryId = initialCategoryId || determineCategoryId(currentLessonId);
  const lessons = getLessonsForCategory(detectedCategoryId);
  const currentLesson = lessons.find((l) => l.id === currentLessonId) || lessons[0];
  const currentIndex = lessons.findIndex((l) => l.id === currentLessonId);

  const hasNext = currentIndex < lessons.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      const nextLesson = lessons[currentIndex + 1];
      setCurrentLessonId(nextLesson.id);
      setDrawerOpen(false);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      const prevLesson = lessons[currentIndex - 1];
      setCurrentLessonId(prevLesson.id);
      setDrawerOpen(false);
    }
  };

  const handleQuiz = () => {
    // @ts-ignore
    navigation.navigate('LessonQuiz', { lessonId: currentLessonId });
  };

  const handleRunCode = () => {
    // Tüm boşlukları doldurulmuş mu kontrol et
    const blanksNeeded = currentLesson.challenge.blanks.length;
    const blanksFilled = Object.keys(blankValues).filter(key => blankValues[key].trim() !== '').length;

    if (blanksFilled < blanksNeeded) {
      setCodeOutput('❌ Lütfen tüm boşlukları doldurun!');
      setShowOutput(true);
      setIsHtmlOutput(false);
      return;
    }

    // Kullanıcının kodunu oluştur - BLANK'ları değerlerle değiştir
    let userGeneratedCode = currentLesson.challenge.starterCode;
    Object.keys(blankValues).forEach((blankKey) => {
      userGeneratedCode = userGeneratedCode.replace(blankKey, blankValues[blankKey]);
    });

    // Çözümle karşılaştır (boşluk/büyük-küçük harf toleranslı)
    const normalizeCode = (code: string) => code.replace(/\s+/g, ' ').trim().toLowerCase();
    const userNormalized = normalizeCode(userGeneratedCode);
    const solutionNormalized = normalizeCode(currentLesson.challenge.solution);

    if (userNormalized === solutionNormalized) {
      setChallengeCompleted(true);
      
      // HTML kodu mu kontrol et
      if (detectedCategoryId === 'html' && userGeneratedCode.toLowerCase().includes('<!doctype html>')) {
        setCodeOutput(userGeneratedCode);
        setIsHtmlOutput(true);
      } else if (currentLesson.challenge.expectedOutput) {
        // Beklenen çıktı varsa onu göster (Python, JS vb. için)
        setCodeOutput('✅ Mükemmel! Kodun doğru çalışıyor.\n\nÇıktı:\n' + currentLesson.challenge.expectedOutput);
        setIsHtmlOutput(false);
      } else {
        setCodeOutput('✅ Mükemmel! Kodun doğru çalışıyor.\n\n' + userGeneratedCode);
        setIsHtmlOutput(false);
      }
      setShowOutput(true);
    } else {
      // Kısmi doğruluk kontrolü
      let correctBlanks = 0;
      currentLesson.challenge.blanks.forEach((correctAnswer, index) => {
        const blankKey = `___BLANK${index + 1}___`;
        const userAnswer = blankValues[blankKey]?.trim().toLowerCase() || '';
        const correctAnswerNormalized = correctAnswer.trim().toLowerCase();
        if (userAnswer === correctAnswerNormalized) {
          correctBlanks++;
        }
      });

      if (correctBlanks > 0) {
        setCodeOutput(`⚠️ Yaklaşıyorsun! ${correctBlanks}/${blanksNeeded} boşluk doğru.\n\nTekrar dene veya çözüme bak.`);
      } else {
        setCodeOutput('❌ Kod doğru çalışmıyor. Kontrol edip tekrar dene!');
      }
      setShowOutput(true);
      setIsHtmlOutput(false);
      setChallengeCompleted(false);
    }
  };

  const isQuizCompleted = completedQuizzes?.includes(currentLessonId) || false;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
      <View 
        style={{ flex: 1 }}
        {...panResponder.panHandlers}
      >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText} numberOfLines={1}>
            {currentLesson.title}
          </Text>
          <Text style={styles.headerSubtitle}>
            Ders {currentIndex + 1} / {lessons.length}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.lessonCard}>
          <Text style={styles.lessonTitle}>{currentLesson.title}</Text>
          <Text style={styles.lessonDescription}>{currentLesson.description}</Text>

          {/* Detaylı İçerik */}
          {currentLesson.detailedContent && (
            <View style={styles.detailedSection}>
              <Text style={styles.detailedText}>{currentLesson.detailedContent}</Text>
            </View>
          )}

          {/* Alt Bölümler */}
          {currentLesson.sections?.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          {/* Kod Örneği */}
          {currentLesson.exampleCode && (
            <View style={styles.codeSection}>
              <View style={styles.codeHeader}>
                <Ionicons name="code-slash" size={20} color={theme.colors.primary} />
                <Text style={styles.codeHeaderText}>Örnek Kod</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={styles.codeText}>{currentLesson.exampleCode}</Text>
              </ScrollView>
            </View>
          )}

          {/* Pratik Challenge - Boşluk Doldurma */}
          {currentLesson.challenge && (
            <View style={styles.challengeSection}>
              <View style={styles.challengeHeader}>
                <Ionicons name="flash" size={20} color="#fbbf24" />
                <Text style={styles.challengeHeaderText}>Pratik Yap</Text>
              </View>
              <Text style={styles.challengeInstructions}>
                {currentLesson.challenge.instructions}
              </Text>

              {!showChallenge ? (
                <TouchableOpacity
                  style={styles.startChallengeButton}
                  onPress={() => {
                    setShowChallenge(true);
                    setBlankValues({});
                  }}
                >
                  <Ionicons name="play-circle" size={20} color="#fff" />
                  <Text style={styles.startChallengeText}>Challenge'ı Başlat</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.challengeContent}>
                  <View style={styles.challengeCodeContainer}>
                    {currentLesson.challenge.starterCode.split('\n').map((line, lineIndex) => {
                      // BLANK'ları bul ve TextInput'la değiştir
                      const blankRegex = /___BLANK\d+___/g;
                      const parts = [];
                      let lastIndex = 0;
                      let match;

                      while ((match = blankRegex.exec(line)) !== null) {
                        // BLANK öncesi metin
                        if (match.index > lastIndex) {
                          parts.push({
                            type: 'text',
                            content: line.substring(lastIndex, match.index),
                          });
                        }
                        // BLANK
                        parts.push({
                          type: 'blank',
                          content: match[0],
                        });
                        lastIndex = match.index + match[0].length;
                      }
                      
                      // Son kısım
                      if (lastIndex < line.length) {
                        parts.push({
                          type: 'text',
                          content: line.substring(lastIndex),
                        });
                      }

                      if (parts.length === 0) {
                        // Hiç BLANK yok, sadece metin
                        return (
                          <Text key={lineIndex} style={styles.codeText}>
                            {line}
                          </Text>
                        );
                      }

                      return (
                        <View key={lineIndex} style={styles.codeLineContainer}>
                          {parts.map((part, partIndex) => {
                            if (part.type === 'text') {
                              return (
                                <Text key={partIndex} style={styles.codeText}>
                                  {part.content}
                                </Text>
                              );
                            } else {
                              // BLANK - TextInput göster
                              const blankKey = part.content;
                              return (
                                <TextInput
                                  key={partIndex}
                                  style={styles.blankInput}
                                  value={blankValues[blankKey] || ''}
                                  onChangeText={(text) => {
                                    setBlankValues({
                                      ...blankValues,
                                      [blankKey]: text,
                                    });
                                  }}
                                  placeholder="..."
                                  placeholderTextColor={theme.colors.textSecondary}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                />
                              );
                            }
                          })}
                        </View>
                      );
                    })}
                  </View>

                  {showOutput && (
                    <View style={styles.outputSection}>
                      <View style={styles.outputHeader}>
                        <Ionicons 
                          name={challengeCompleted ? "checkmark-circle" : "information-circle"} 
                          size={18} 
                          color={challengeCompleted ? "#10b981" : theme.colors.primary} 
                        />
                        <Text style={styles.outputHeaderText}>
                          {isHtmlOutput ? 'HTML Çıktısı' : 'Sonuç'}
                        </Text>
                      </View>
                      {isHtmlOutput && WebView ? (
                        <View style={styles.webviewContainer}>
                          <WebView
                            source={{ html: codeOutput }}
                            style={styles.webview}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            originWhitelist={['*']}
                          />
                        </View>
                      ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                          <Text style={[
                            styles.outputText,
                            challengeCompleted && styles.outputTextSuccess
                          ]}>
                            {codeOutput}
                          </Text>
                        </ScrollView>
                      )}
                    </View>
                  )}

                  <View style={styles.challengeActions}>
                    <TouchableOpacity
                      style={styles.runCodeButton}
                      onPress={handleRunCode}
                    >
                      <Ionicons name="play" size={18} color="#fff" />
                      <Text style={styles.runCodeText}>Çalıştır</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.showSolutionButton}
                      onPress={() => {
                        // Çözümü göster - tüm BLANK'ları çözümle doldur
                        const newBlankValues: { [key: string]: string } = {};
                        currentLesson.challenge.blanks.forEach((answer, index) => {
                          newBlankValues[`___BLANK${index + 1}___`] = answer;
                        });
                        setBlankValues(newBlankValues);
                        setCodeOutput('💡 Çözüm gösterildi. "Çalıştır" butonuna bas!');
                        setShowOutput(true);
                        setChallengeCompleted(false);
                      }}
                    >
                      <Ionicons name="bulb" size={18} color={theme.colors.primary} />
                      <Text style={styles.showSolutionText}>Çözümü Göster</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resetChallengeButton}
                      onPress={() => {
                        setBlankValues({});
                        setChallengeCompleted(false);
                        setShowOutput(false);
                        setCodeOutput('');
                      }}
                    >
                      <Ionicons name="refresh" size={18} color={theme.colors.text} />
                      <Text style={styles.resetChallengeText}>Sıfırla</Text>
                    </TouchableOpacity>
                  </View>

                  {challengeCompleted && (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                      <Text style={styles.completedText}>🎉 Harika! Challenge'ı tamamladın</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Alt Navigasyon */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, !hasPrevious && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={!hasPrevious}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={hasPrevious ? theme.colors.text : theme.colors.textSecondary}
          />
          <Text
            style={[
              styles.navButtonText,
              !hasPrevious && styles.navButtonTextDisabled,
            ]}
          >
            Önceki
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quizButton, isQuizCompleted && styles.quizButtonCompleted]}
          onPress={handleQuiz}
        >
          <Ionicons
            name={isQuizCompleted ? 'checkmark-circle' : 'help-circle'}
            size={20}
            color="#fff"
          />
          <Text style={styles.quizButtonText}>
            {isQuizCompleted ? 'Quiz Tamamlandı' : 'Quiz Çöz'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !hasNext && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!hasNext}
        >
          <Text
            style={[
              styles.navButtonText,
              !hasNext && styles.navButtonTextDisabled,
            ]}
          >
            Sonraki
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={hasNext ? theme.colors.text : theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Drawer Menu */}
      <Modal
        visible={drawerOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDrawerOpen(false)}
      >
        <TouchableOpacity
          style={styles.drawerOverlay}
          activeOpacity={1}
          onPress={() => setDrawerOpen(false)}
        >
          <View style={[styles.drawer, { flexDirection: 'row-reverse' }]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.drawerContent}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>Dersler</Text>
                <TouchableOpacity onPress={() => setDrawerOpen(false)}>
                  <Ionicons name="close" size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {lessons.map((lesson, index) => {
                  const isCurrentLesson = lesson.id === currentLessonId;
                  const isQuizCompletedForLesson =
                    completedQuizzes?.includes(lesson.id) || false;

                  return (
                    <TouchableOpacity
                      key={lesson.id}
                      style={[
                        styles.drawerItem,
                        isCurrentLesson && styles.drawerItemActive,
                      ]}
                      onPress={() => {
                        setCurrentLessonId(lesson.id);
                        setDrawerOpen(false);
                      }}
                    >
                      <View style={styles.drawerItemContent}>
                        <Text style={styles.drawerItemNumber}>{index + 1}</Text>
                        <Text
                          style={[
                            styles.drawerItemText,
                            isCurrentLesson && styles.drawerItemTextActive,
                          ]}
                          numberOfLines={2}
                        >
                          {lesson.title}
                        </Text>
                      </View>
                      {isQuizCompletedForLesson && (
                        <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
      backgroundColor: colors.card,
    },
    backButton: {
      padding: 8,
    },
    menuButton: {
      padding: 8,
    },
    headerTitle: {
      flex: 1,
      marginHorizontal: 12,
    },
    headerTitleText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    headerSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    content: {
      flex: 1,
    },
    lessonCard: {
      padding: 20,
    },
    lessonTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    lessonDescription: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 24,
    },
    detailedSection: {
      marginBottom: 20,
    },
    detailedText: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 24,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
      marginBottom: 12,
    },
    sectionContent: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 24,
    },
    codeSection: {
      backgroundColor: colors.codeBackground,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
    },
    codeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    codeHeaderText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
      marginLeft: 8,
    },
    codeText: {
      fontFamily: 'monospace',
      fontSize: 13,
      color: colors.code,
      lineHeight: 20,
    },
    codeLineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 4,
    },
    blankInput: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: '#fbbf24',
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
      minWidth: 80,
      fontFamily: 'monospace',
      fontSize: 13,
      color: colors.text,
      marginHorizontal: 2,
    },
    challengeSection: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginTop: 24,
      borderWidth: 2,
      borderColor: '#fbbf24',
    },
    challengeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    challengeHeaderText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fbbf24',
      marginLeft: 8,
    },
    challengeInstructions: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 22,
      marginBottom: 16,
    },
    startChallengeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fbbf24',
      paddingVertical: 14,
      borderRadius: 8,
      gap: 8,
    },
    startChallengeText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#000',
    },
    challengeContent: {
      gap: 12,
    },
    challengeCodeContainer: {
      backgroundColor: colors.codeBackground,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    challengeActions: {
      flexDirection: 'row',
      gap: 12,
      flexWrap: 'wrap',
    },
    runCodeButton: {
      flex: 1,
      minWidth: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#10b981',
      paddingVertical: 12,
      borderRadius: 8,
      gap: 6,
    },
    runCodeText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
    },
    showSolutionButton: {
      flex: 1,
      minWidth: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary + '20',
      paddingVertical: 12,
      borderRadius: 8,
      gap: 6,
    },
    showSolutionText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    resetChallengeButton: {
      flex: 1,
      minWidth: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 6,
    },
    resetChallengeText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    outputSection: {
      backgroundColor: colors.codeBackground,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    outputHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 6,
    },
    outputHeaderText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
    outputText: {
      fontFamily: 'monospace',
      fontSize: 12,
      color: colors.code,
      lineHeight: 18,
    },
    outputTextSuccess: {
      color: '#10b981',
    },
    webviewContainer: {
      height: 300,
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    webview: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    completedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#10b981' + '20',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      gap: 8,
    },
    completedText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#10b981',
    },
    bottomNav: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 12,
    },
    navButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      backgroundColor: colors.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 6,
    },
    navButtonDisabled: {
      opacity: 0.4,
    },
    navButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    navButtonTextDisabled: {
      color: colors.textSecondary,
    },
    quizButton: {
      flex: 1.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      backgroundColor: colors.primary,
      borderRadius: 8,
      gap: 6,
    },
    quizButtonCompleted: {
      backgroundColor: '#10b981',
    },
    quizButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
    },
    drawerOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    drawer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    drawerContent: {
      width: width * 0.85,
      height: '100%',
      backgroundColor: colors.card,
      padding: 20,
      borderLeftWidth: 1,
      borderLeftColor: colors.border,
    },
    drawerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    drawerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    drawerItemActive: {
      backgroundColor: colors.primary + '20',
    },
    drawerItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    drawerItemNumber: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginRight: 12,
      width: 24,
    },
    drawerItemText: {
      fontSize: 15,
      color: colors.text,
      flex: 1,
    },
    drawerItemTextActive: {
      fontWeight: '600',
      color: colors.primary,
    },
  });

export default LessonDetailScreen;
