import React, { useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Category } from '../types';
import { lightHaptic } from '../utils/haptics';

const CategoriesScreen = () => {
  const { theme } = useTheme();
  const { t, locale } = useLanguage();
  const navigation = useNavigation();

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  // Kategoriler
  const categories: Category[] = [
    {
      id: 'html',
      name: 'HTML',
      nameEn: 'HTML',
      icon: 'code-slash',
      image: require('../../assets/language-icons/html.png'),
      color: '#e34c26',
      description: 'Web sayfalarının yapısını oluşturmayı öğren',
      descriptionEn: 'Learn to create the structure of web pages',
      lessonsCount: 20,
      order: 1,
    },
    {
      id: 'css',
      name: 'CSS',
      nameEn: 'CSS',
      icon: 'color-palette',
      image: require('../../assets/language-icons/css.png'),
      color: '#264de4',
      description: 'Web sayfalarını stilize etmeyi öğren',
      descriptionEn: 'Learn to style web pages',
      lessonsCount: 30,
      order: 2,
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      nameEn: 'JavaScript',
      icon: 'logo-javascript',
      image: require('../../assets/language-icons/javascript.png'),
      color: '#f7df1e',
      description: 'Web sayfalarına interaktiflik ekle',
      descriptionEn: 'Add interactivity to web pages',
      lessonsCount: 30,
      order: 3,
    },
    {
      id: 'react',
      name: 'React',
      nameEn: 'React',
      icon: 'logo-react',
      color: '#61dafb',
      description: 'Modern web uygulamaları geliştir',
      descriptionEn: 'Build modern web applications',
      lessonsCount: 30,
      order: 4,
    },
    {
      id: 'python',
      name: 'Python',
      nameEn: 'Python',
      icon: 'logo-python',
      color: '#3776ab',
      description: 'Güçlü ve kolay bir programlama dili',
      descriptionEn: 'A powerful and easy programming language',
      lessonsCount: 30,
      order: 5,
    },
    {
      id: 'kotlin',
      name: 'Kotlin',
      nameEn: 'Kotlin',
      icon: 'phone-portrait',
      image: require('../../assets/language-icons/kotlin.png'),
      color: '#7F52FF',
      description: 'Android uygulama geliştirme',
      descriptionEn: 'Android app development',
      lessonsCount: 30,
      order: 6,
    },
    {
      id: 'swift',
      name: 'Swift',
      nameEn: 'Swift',
      icon: 'logo-apple',
      image: require('../../assets/language-icons/swift.png'),
      color: '#FA7343',
      description: 'iOS uygulama geliştirme',
      descriptionEn: 'iOS app development',
      lessonsCount: 30,
      order: 7,
    },
  ];

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => {
        lightHaptic();
        // Tüm kategoriler için LessonDetail ekranına git, lessonId gönderme
        // LessonDetail ekranı AsyncStorage'dan son kalınan dersi yükleyecek
        // @ts-ignore
        navigation.navigate('LessonDetail', { categoryId: item.id });
      }}
      accessibilityLabel={`${item.name} kategorisi, ${item.lessonsCount} ders`}
      accessibilityHint={locale === 'tr' ? item.description : item.descriptionEn}
      accessibilityRole="button"
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
        {item.image ? (
          <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
        ) : (
          <Ionicons name={item.icon as any} size={32} color={item.color} />
        )}
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDescription}>
          {locale === 'tr' ? item.description : item.descriptionEn}
        </Text>
        <View style={styles.categoryMeta}>
          <Ionicons name="book-outline" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.lessonsCount}>{item.lessonsCount} {t('lessons')}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('categories')}</Text>
        </View>
        
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 40,
    height: 40,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  categoryDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  categoryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  lessonsCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});

export default CategoriesScreen;
