// AI Asistan Ekranı - Sohbet, Kod Çevirisi, Hata Ayıklama

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AIService from '../services/AIService';
import { lightHaptic, successHaptic } from '../utils/haptics';

const { width } = Dimensions.get('window');

type AIMode = 'sohbet' | 'ceviri' | 'hata' | 'aciklama';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistantScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { user } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const [mode, setMode] = useState<AIMode>('sohbet');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hoşgeldin mesajı
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Merhaba${user?.displayName ? ` ${user.displayName}` : ''}! 👋 Ben Gemini AI'yım. Programlama hakkında soru sorabilir, kod yazmamı isteyebilirsin!`,
        timestamp: new Date()
      }]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    lightHaptic();
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      const response = await AIService.chat(inputText.trim());
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      successHaptic();
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleTranslate = async () => {
    if (!sourceCode.trim() || isLoading) return;

    lightHaptic();
    setIsLoading(true);
    setTranslationResult('');

    try {
      const result = await AIService.translateCode(sourceCode, fromLang, toLang);
      setTranslationResult(result);
      successHaptic();
    } catch (error) {
      setTranslationResult('❌ Çeviri yapılamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebug = async () => {
    if (!errorMessage.trim() || isLoading) return;

    lightHaptic();
    setIsLoading(true);
    setDebugResult('');

    try {
      const result = await AIService.debugError(errorMessage, errorCode || undefined);
      setDebugResult(result);
      successHaptic();
    } catch (error) {
      setDebugResult('❌ Hata analiz edilemedi. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!codeToExplain.trim() || isLoading) return;

    lightHaptic();
    setIsLoading(true);
    setExplanationResult('');

    try {
      const result = await AIService.explainCode(codeToExplain);
      setExplanationResult(result);
      successHaptic();
    } catch (error) {
      setExplanationResult('❌ Kod açıklanamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderModeSelector = () => null;

  const renderChatMode = () => (
    <>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.assistantBubble
            ]}
          >
            {msg.role === 'assistant' && (
              <View style={styles.assistantIcon}>
                <Text style={styles.assistantIconText}>✨</Text>
              </View>
            )}
            <View style={[
              styles.messageContent,
              msg.role === 'user' ? styles.userContent : styles.assistantContent
            ]}>
              <Text style={[
                styles.messageText,
                msg.role === 'user' && styles.userMessageText
              ]}>
                {msg.content}
              </Text>
            </View>
          </View>
        ))}
        {isLoading && (
          <View style={[styles.messageBubble, styles.assistantBubble]}>
            <View style={styles.assistantIcon}>
              <Text style={styles.assistantIconText}>✨</Text>
            </View>
            <View style={[styles.messageContent, styles.assistantContent]}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <Text style={styles.typingText}>Yazıyor...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Bir soru sor..."
          placeholderTextColor={theme.colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity 
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderTranslateMode = () => (
    <ScrollView style={styles.toolContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.toolTitle}>🔄 Kod Çevirisi</Text>
      <Text style={styles.toolSubtitle}>Kodunuzu bir dilden diğerine çevirin</Text>

      <View style={styles.langSelector}>
        <View style={styles.langColumn}>
          <Text style={styles.langLabel}>Kaynak Dil</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DILLER.map((dil) => (
              <TouchableOpacity
                key={dil.id}
                style={[styles.langChip, fromLang === dil.id && styles.langChipActive]}
                onPress={() => setFromLang(dil.id)}
              >
                <Text style={styles.langChipIcon}>{dil.icon}</Text>
                <Text style={[styles.langChipText, fromLang === dil.id && styles.langChipTextActive]}>
                  {dil.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Ionicons name="arrow-forward" size={24} color={theme.colors.primary} style={styles.arrowIcon} />

        <View style={styles.langColumn}>
          <Text style={styles.langLabel}>Hedef Dil</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DILLER.map((dil) => (
              <TouchableOpacity
                key={dil.id}
                style={[styles.langChip, toLang === dil.id && styles.langChipActive]}
                onPress={() => setToLang(dil.id)}
              >
                <Text style={styles.langChipIcon}>{dil.icon}</Text>
                <Text style={[styles.langChipText, toLang === dil.id && styles.langChipTextActive]}>
                  {dil.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <Text style={styles.inputLabel}>Kaynak Kod</Text>
      <TextInput
        style={styles.codeInput}
        placeholder="Çevirmek istediğiniz kodu yapıştırın..."
        placeholderTextColor={theme.colors.textSecondary}
        value={sourceCode}
        onChangeText={setSourceCode}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity 
        style={[styles.actionButton, (!sourceCode.trim() || isLoading) && styles.actionButtonDisabled]}
        onPress={handleTranslate}
        disabled={!sourceCode.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="swap-horizontal" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Çevir</Text>
          </>
        )}
      </TouchableOpacity>

      {translationResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Sonuç</Text>
          <Text style={styles.resultText}>{translationResult}</Text>
        </View>
      )}
    </ScrollView>
  );

  const renderDebugMode = () => (
    <ScrollView style={styles.toolContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.toolTitle}>🐛 Hata Ayıklama</Text>
      <Text style={styles.toolSubtitle}>Hata mesajınızı analiz edip çözüm önerelim</Text>

      <Text style={styles.inputLabel}>Hata Mesajı *</Text>
      <TextInput
        style={styles.codeInput}
        placeholder="Aldığınız hata mesajını yapıştırın..."
        placeholderTextColor={theme.colors.textSecondary}
        value={errorMessage}
        onChangeText={setErrorMessage}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.inputLabel}>İlgili Kod (Opsiyonel)</Text>
      <TextInput
        style={[styles.codeInput, { height: 100 }]}
        placeholder="Hataya neden olan kodu yapıştırın..."
        placeholderTextColor={theme.colors.textSecondary}
        value={errorCode}
        onChangeText={setErrorCode}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity 
        style={[styles.actionButton, (!errorMessage.trim() || isLoading) && styles.actionButtonDisabled]}
        onPress={handleDebug}
        disabled={!errorMessage.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="search" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Analiz Et</Text>
          </>
        )}
      </TouchableOpacity>

      {debugResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Analiz Sonucu</Text>
          <Text style={styles.resultText}>{debugResult}</Text>
        </View>
      )}
    </ScrollView>
  );

  const renderExplainMode = () => (
    <ScrollView style={styles.toolContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.toolTitle}>📝 Kod Açıklama</Text>
      <Text style={styles.toolSubtitle}>Kodunuzu satır satır açıklayalım</Text>

      <Text style={styles.inputLabel}>Açıklanacak Kod</Text>
      <TextInput
        style={[styles.codeInput, { height: 180 }]}
        placeholder="Açıklanmasını istediğiniz kodu yapıştırın..."
        placeholderTextColor={theme.colors.textSecondary}
        value={codeToExplain}
        onChangeText={setCodeToExplain}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity 
        style={[styles.actionButton, (!codeToExplain.trim() || isLoading) && styles.actionButtonDisabled]}
        onPress={handleExplain}
        disabled={!codeToExplain.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="bulb" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Açıkla</Text>
          </>
        )}
      </TouchableOpacity>

      {explanationResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Açıklama</Text>
          <Text style={styles.resultText}>{explanationResult}</Text>
        </View>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>✨ Gemini AI</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Mode Selector */}
      {renderModeSelector()}

      {/* Content */}
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
      >
        {renderChatMode()}
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  modeSelector: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
  },
  modeButtonText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 100,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  assistantBubble: {
    justifyContent: 'flex-start',
  },
  assistantIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  assistantIconText: {
    fontSize: 16,
  },
  messageContent: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: 16,
  },
  userContent: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  assistantContent: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  typingText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderRadius: 22,
    fontSize: 15,
    color: colors.text,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
  toolContainer: {
    flex: 1,
    padding: 16,
  },
  toolTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  langSelector: {
    marginBottom: 20,
  },
  langColumn: {
    marginBottom: 12,
  },
  langLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
  },
  langChipActive: {
    backgroundColor: colors.primary,
  },
  langChipIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  langChipText: {
    fontSize: 13,
    color: colors.text,
  },
  langChipTextActive: {
    color: '#fff',
  },
  arrowIcon: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 8,
  },
  codeInput: {
    height: 150,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    fontSize: 14,
    color: colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  actionButtonDisabled: {
    backgroundColor: colors.border,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
});

export default AIAssistantScreen;
