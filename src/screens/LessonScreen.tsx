import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';

const { height } = Dimensions.get('window');

// Örnek ders içeriği
const lessonContent = {
  javascript_1: {
    title: 'JavaScript\'e Giriş',
    titleEn: 'Introduction to JavaScript',
    content: `
# JavaScript Nedir?

JavaScript, web sayfalarına interaktiflik eklemek için kullanılan bir programlama dilidir.

## Değişkenler

JavaScript'te değişken tanımlamak için \`let\`, \`const\` veya \`var\` anahtar kelimelerini kullanırız:

\`\`\`javascript
let isim = "Furkan";
const yas = 25;
var sehir = "İstanbul";
\`\`\`

### let vs const vs var

- **let**: Değeri değiştirilebilir
- **const**: Değeri değiştirilemez (sabit)
- **var**: Eski yöntem, artık önerilmiyor

## Veri Tipleri

JavaScript'te temel veri tipleri:

1. **String**: Metin (\`"Merhaba"\`)
2. **Number**: Sayı (\`42\`, \`3.14\`)
3. **Boolean**: Mantıksal (\`true\`, \`false\`)
4. **Array**: Dizi (\`[1, 2, 3]\`)
5. **Object**: Nesne (\`{ad: "Ali", yas: 30}\`)
    `,
    codeExample: `// Değişken tanımlama
let mesaj = "Merhaba Dünya!";
console.log(mesaj);

// Sayı işlemleri
let sayi1 = 10;
let sayi2 = 5;
console.log(sayi1 + sayi2);

// Dizi kullanımı
let renkler = ["kırmızı", "yeşil", "mavi"];
console.log(renkler[0]);`,
    xpReward: 50,
  },
  html_1: {
    title: 'HTML\'e Giriş',
    titleEn: 'Introduction to HTML',
    content: `
# HTML Nedir?

HTML (HyperText Markup Language), web sayfalarının yapısını oluşturmak için kullanılan bir işaretleme dilidir.

## Temel Yapı

Her HTML belgesi şu yapıya sahiptir:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Sayfa Başlığı</title>
</head>
<body>
    <h1>Merhaba Dünya!</h1>
    <p>Bu bir paragraf.</p>
</body>
</html>
\`\`\`

## Temel Etiketler

- \`<h1>\` - \`<h6>\`: Başlıklar
- \`<p>\`: Paragraf
- \`<a>\`: Bağlantı
- \`<img>\`: Resim
- \`<div>\`: Bölüm
- \`<span>\`: Satır içi eleman
    `,
    codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>İlk Sayfam</title>
</head>
<body>
    <h1>Merhaba!</h1>
    <p>Bu benim ilk web sayfam.</p>
    <a href="https://google.com">Google</a>
</body>
</html>`,
    xpReward: 50,
  },
};

const LessonScreen = () => {
  const { theme } = useTheme();
  const { t, locale } = useLanguage();
  const { addProgress, awardXP, isLessonCompleted } = useProgress();
  const route = useRoute();
  const navigation = useNavigation();
  
  const { lessonId, categoryId } = route.params as { lessonId: string; categoryId: string };
  const [showCode, setShowCode] = useState(false);

  const styles = createStyles(theme.colors);

  // Ders içeriğini al
  const lesson = lessonContent[lessonId as keyof typeof lessonContent] || lessonContent.javascript_1;
  const isCompleted = isLessonCompleted(lessonId);

  const handleComplete = async () => {
    if (!isCompleted) {
      await addProgress(lessonId, true);
      await awardXP(lesson.xpReward);
    }
    // @ts-ignore
    navigation.navigate('CodeEditor', { lessonId, initialCode: lesson.codeExample });
  };

  const handleQuiz = () => {
    // @ts-ignore
    navigation.navigate('Quiz', { lessonId, quizId: `quiz_${lessonId}` });
  };

  // Markdown'ı basit HTML'e çevir
  const renderContent = () => {
    let html = lesson.content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br/>');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            padding: 16px;
            color: ${theme.colors.text};
            background-color: ${theme.colors.background};
            line-height: 1.6;
          }
          h1 { color: ${theme.colors.primary}; font-size: 24px; }
          h2 { color: ${theme.colors.text}; font-size: 20px; margin-top: 24px; }
          h3 { color: ${theme.colors.text}; font-size: 18px; margin-top: 20px; }
          code {
            background-color: ${theme.colors.codeBackground};
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
          }
          pre {
            background-color: ${theme.colors.codeBackground};
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
          }
          pre code {
            background: none;
            padding: 0;
          }
          li { margin: 8px 0; }
          strong { color: ${theme.colors.primary}; }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      {/* İçerik */}
      <WebView
        source={{ html: renderContent() }}
        style={styles.webview}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />

      {/* Alt Butonlar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.codeButton}
          onPress={() => setShowCode(!showCode)}
        >
          <Ionicons name="code-slash" size={20} color={theme.colors.text} />
          <Text style={styles.codeButtonText}>Örnek Kod</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.practiceButton, isCompleted && styles.completedButton]}
          onPress={handleComplete}
        >
          <Ionicons 
            name={isCompleted ? "checkmark-circle" : "play"} 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.practiceButtonText}>
            {isCompleted ? 'Tamamlandı' : 'Pratik Yap'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quizButton}
          onPress={handleQuiz}
        >
          <Ionicons name="help-circle" size={20} color={theme.colors.primary} />
          <Text style={styles.quizButtonText}>Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Örnek Kod Modal */}
      {showCode && (
        <View style={styles.codeModal}>
          <View style={styles.codeHeader}>
            <Text style={styles.codeTitle}>Örnek Kod</Text>
            <TouchableOpacity onPress={() => setShowCode(false)}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.codeScroll}>
            <Text style={styles.codeText}>{lesson.codeExample}</Text>
          </ScrollView>
          <TouchableOpacity 
            style={styles.runCodeButton}
            onPress={handleComplete}
          >
            <Text style={styles.runCodeText}>Kodu Çalıştır</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  codeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginRight: 8,
  },
  codeButtonText: {
    marginLeft: 8,
    color: colors.text,
    fontWeight: '600',
  },
  practiceButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  completedButton: {
    backgroundColor: colors.success,
  },
  practiceButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: '600',
  },
  quizButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: colors.primary + '20',
    borderRadius: 12,
    marginLeft: 8,
  },
  quizButtonText: {
    marginLeft: 8,
    color: colors.primary,
    fontWeight: '600',
  },
  codeModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  codeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  codeScroll: {
    flex: 1,
    backgroundColor: colors.codeBackground,
    borderRadius: 12,
    padding: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.code,
    lineHeight: 22,
  },
  runCodeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  runCodeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LessonScreen;
