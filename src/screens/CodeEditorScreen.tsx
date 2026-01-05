import React, { useState, useRef, useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import AIService from '../services/AIService';
import SafeCodeRunner from '../utils/SafeCodeRunner';

const CodeEditorScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const route = useRoute();
  const navigation = useNavigation();
  
  const { lessonId, initialCode } = route.params as { lessonId: string; initialCode?: string };
  
  const [code, setCode] = useState(initialCode || '// Kodunuzu buraya yazın\nconsole.log("Merhaba Dünya!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showAI, setShowAI] = useState(false);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput('');
    
    // Güvenli sandbox ile kodu çalıştır
    const result = SafeCodeRunner.runJavaScript(code);
    setOutput(SafeCodeRunner.formatOutput(result));
    setIsRunning(false);
  }, [code]);

  const resetCode = () => {
    setCode(initialCode || '// Kodunuzu buraya yazın\nconsole.log("Merhaba Dünya!");');
    setOutput('');
    setAiSuggestion('');
  };

  const askAI = async () => {
    setShowAI(true);
    setAiSuggestion('AI analiz ediyor...');
    
    try {
      const suggestion = await AIService.analyzeCode(code);
      setAiSuggestion(suggestion);
    } catch (error) {
      setAiSuggestion('AI şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const getAIHint = async () => {
    setShowAI(true);
    setAiSuggestion('İpucu hazırlanıyor...');
    
    try {
      const hint = await AIService.getHint(lessonId, code);
      setAiSuggestion(hint);
    } catch (error) {
      setAiSuggestion('İpucu alınamadı.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Üst Toolbar */}
      <View style={styles.toolbar} accessibilityRole="toolbar">
        <TouchableOpacity 
          style={styles.toolButton} 
          onPress={resetCode}
          accessibilityLabel="Kodu sıfırla"
          accessibilityRole="button"
        >
          <Ionicons name="refresh" size={20} color={theme.colors.text} />
          <Text style={styles.toolText}>Sıfırla</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.toolButton} 
          onPress={askAI}
          accessibilityLabel="AI ile kodu analiz et"
          accessibilityRole="button"
        >
          <Ionicons name="sparkles" size={20} color="#fbbf24" />
          <Text style={styles.toolText}>AI Analiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.toolButton} 
          onPress={getAIHint}
          accessibilityLabel="AI'dan ipucu al"
          accessibilityRole="button"
        >
          <Ionicons name="bulb" size={20} color="#22c55e" />
          <Text style={styles.toolText}>İpucu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.runButton, isRunning && styles.runningButton]} 
          onPress={runCode}
          disabled={isRunning}
          accessibilityLabel={isRunning ? 'Kod çalışıyor' : 'Kodu çalıştır'}
          accessibilityRole="button"
          accessibilityState={{ disabled: isRunning }}
        >
          <Ionicons 
            name={isRunning ? "hourglass" : "play"} 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.runText}>
            {isRunning ? 'Çalışıyor...' : 'Çalıştır'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Kod Editörü */}
      <View style={styles.editorContainer}>
        <View style={styles.editorHeader}>
          <Text style={styles.editorTitle}>📝 Kod Editörü</Text>
          <Text style={styles.editorLanguage}>JavaScript</Text>
        </View>
        <TextInput
          style={styles.editor}
          multiline
          value={code}
          onChangeText={setCode}
          placeholder="Kodunuzu buraya yazın..."
          placeholderTextColor={theme.colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          accessibilityLabel="Kod editörü"
          accessibilityHint="JavaScript kodunuzu buraya yazın"
        />
      </View>

      {/* Çıktı Paneli */}
      <View style={styles.outputContainer}>
        <View style={styles.outputHeader}>
          <Text style={styles.outputTitle}>📤 Çıktı</Text>
          {output && (
            <TouchableOpacity onPress={() => setOutput('')}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={styles.output}>
          <Text style={styles.outputText}>
            {output || 'Kodunuzu çalıştırın, çıktı burada görünecek.'}
          </Text>
        </ScrollView>
      </View>

      {/* AI Öneri Paneli */}
      {showAI && (
        <View style={styles.aiContainer}>
          <View style={styles.aiHeader}>
            <Text style={styles.aiTitle}>🤖 AI Asistan</Text>
            <TouchableOpacity onPress={() => setShowAI(false)}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.aiContent}>
            <Text style={styles.aiText}>{aiSuggestion}</Text>
          </ScrollView>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  toolbar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  toolText: {
    marginLeft: 6,
    color: colors.text,
    fontSize: 13,
  },
  runButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  runningButton: {
    backgroundColor: colors.textSecondary,
  },
  runText: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
  },
  editorContainer: {
    flex: 1,
    margin: 12,
    marginBottom: 6,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  editorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  editorLanguage: {
    fontSize: 12,
    color: colors.primary,
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  editor: {
    flex: 1,
    padding: 16,
    color: colors.code,
    backgroundColor: colors.codeBackground,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
  outputContainer: {
    height: 150,
    margin: 12,
    marginTop: 6,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  outputTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  output: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.codeBackground,
  },
  outputText: {
    color: colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
  aiContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  aiContent: {
    flex: 1,
  },
  aiText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default CodeEditorScreen;
