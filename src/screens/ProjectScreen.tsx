// Pratik Proje Ekranı - Kullanıcı sadece öğrendiklerini yazacak

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { projects } from '../data/projects';
import ToastNotification from '../components/ToastNotification';

const ProjectScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { awardXP } = useProgress();
  
  const { lessonId } = route.params as { lessonId: string };
  const project = projects[lessonId];

  const [userCode, setUserCode] = useState(project?.baseCode || '');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Bu ders için henüz proje eklenmemiş.</Text>
      </View>
    );
  }

  const checkCode = () => {
    // Basit kod kontrolü - gerçek uygulamada daha gelişmiş olabilir
    const userCodeLower = userCode.toLowerCase().trim();
    
    // Beklenen etiketlerin olup olmadığını kontrol et
    const expectedPatterns = project.expectedCode.match(/<[^>]+>/g) || [];
    const missingTags = expectedPatterns.filter(pattern => {
      const tag = pattern.replace(/___\w+___/g, '').trim();
      return tag && !userCodeLower.includes(tag.toLowerCase());
    });

    if (missingTags.length === 0) {
      // Başarılı!
      setToastMessage(`🎉 Harika! +${project.xpReward} XP kazandın!`);
      setToastType('success');
      setShowToast(true);
      awardXP(project.xpReward);
      
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } else {
      setToastMessage('Kodunda bazı eksiklikler var. İpuçlarına bak!');
      setToastType('error');
      setShowToast(true);
    }
  };

  const showNextHint = () => {
    if (currentHint < project.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const getDifficultyColor = () => {
    switch (project.difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return theme.colors.text;
    }
  };

  const getDifficultyText = () => {
    switch (project.difficulty) {
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
          accessibilityLabel="Projeyi kapat"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pratik Proje</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
          <Text style={styles.difficultyText}>{getDifficultyText()}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Proje Bilgisi */}
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          
          <View style={styles.xpBadge}>
            <Ionicons name="star" size={20} color="#fbbf24" />
            <Text style={styles.xpText}>+{project.xpReward} XP</Text>
          </View>
        </View>

        {/* Görev */}
        <View style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Ionicons name="checkbox-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.taskTitle}>Yapman Gerekenler</Text>
          </View>
          <Text style={styles.taskText}>{project.userTask}</Text>
        </View>

        {/* Kod Editörü */}
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
            accessibilityLabel="Kod editörü"
            accessibilityHint="Proje kodunuzu buraya yazın"
          />

          <View style={styles.editorFooter}>
            <Text style={styles.lineCount}>
              {userCode.split('\n').length} satır
            </Text>
          </View>
        </View>

        {/* İpuçları */}
        {showHints ? (
          <View style={styles.hintsCard}>
            <View style={styles.hintsHeader}>
              <Ionicons name="bulb" size={24} color="#fbbf24" />
              <Text style={styles.hintsTitle}>İpuçları</Text>
            </View>
            
            {project.hints.slice(0, currentHint + 1).map((hint, index) => (
              <View key={index} style={styles.hintItem}>
                <View style={styles.hintNumber}>
                  <Text style={styles.hintNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.hintText}>{hint}</Text>
              </View>
            ))}

            {currentHint < project.hints.length - 1 && (
              <TouchableOpacity 
                style={styles.moreHintsButton}
                onPress={showNextHint}
              >
                <Text style={styles.moreHintsText}>Başka İpucu Göster</Text>
                <Ionicons name="chevron-down" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.showHintsButton}
            onPress={() => setShowHints(true)}
          >
            <Ionicons name="bulb-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.showHintsText}>İpuçlarını Göster</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Alt Butonlar */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setUserCode(project.baseCode)}
          accessibilityLabel="Kodu sıfırla"
          accessibilityRole="button"
        >
          <Ionicons name="refresh" size={20} color={theme.colors.text} />
          <Text style={styles.resetButtonText}>Sıfırla</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkButton}
          onPress={checkCode}
          accessibilityLabel="Kodu kontrol et"
          accessibilityRole="button"
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.checkButtonText}>Kontrol Et</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginLeft: 16,
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
  projectInfo: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
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
  taskCard: {
    backgroundColor: colors.primary + '15',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  taskText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
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
  editorFooter: {
    padding: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  lineCount: {
    fontSize: 12,
    color: colors.text + '80',
  },
  hintsCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hintsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hintsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  hintItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  hintNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hintNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  hintText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  moreHintsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  moreHintsText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  showHintsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary + '30',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  showHintsText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
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
  checkButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  checkButtonText: {
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

export default ProjectScreen;
