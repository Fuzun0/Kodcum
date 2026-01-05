import React, { useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { lightHaptic, mediumHaptic } from '../utils/haptics';

const ProfileScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t, locale, setLocale } = useLanguage();
  const { user, logout } = useAuth();
  const { level, totalXP, streak, progress } = useProgress();
  const navigation = useNavigation();
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
      ]
    );
  };

  const menuItems = [
    {
      id: 'matchHistory',
      icon: 'trophy',
      title: locale === 'tr' ? 'Maç Geçmişi' : 'Match History',
      color: '#8b5cf6',
      onPress: () => navigation.navigate('MatchHistory' as never),
    },
    {
      id: 'achievements',
      icon: 'trophy',
      title: t('achievements'),
      color: '#fbbf24',
      onPress: () => navigation.navigate('Achievements' as never),
    },
    {
      id: 'settings',
      icon: 'settings',
      title: t('settings'),
      color: theme.colors.textSecondary,
      onPress: () => navigation.navigate('Settings' as never),
    },
    {
      id: 'theme',
      icon: isDark ? 'sunny' : 'moon',
      title: isDark ? 'Açık Tema' : 'Koyu Tema',
      color: isDark ? '#fbbf24' : '#6366f1',
      onPress: toggleTheme,
    },
    {
      id: 'language',
      icon: 'language',
      title: locale === 'tr' ? 'English' : 'Türkçe',
      color: '#3b82f6',
      onPress: () => setLocale(locale === 'tr' ? 'en' : 'tr'),
    },
    {
      id: 'logout',
      icon: 'log-out',
      title: t('logout'),
      color: '#ef4444',
      onPress: handleLogout,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView style={styles.container}>
      {/* Profil Başlığı */}
      <View style={styles.header}>
        {/* Fotoğrafa tıklayınca büyüt */}
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={() => {
            if (user?.photoURL) {
              lightHaptic();
              setPhotoModalVisible(true);
            } else {
              lightHaptic();
              navigation.navigate('EditProfile' as never);
            }
          }}
          onLongPress={() => {
            lightHaptic();
            navigation.navigate('EditProfile' as never);
          }}
          accessibilityLabel="Profil fotoğrafını görüntüle"
          accessibilityHint="Fotoğrafı büyütmek için dokun, düzenlemek için basılı tut"
          accessibilityRole="button"
        >
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.displayName?.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
          )}
          <View style={styles.editButton}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.displayName}>{user?.displayName || 'Kullanıcı'}</Text>
        <Text style={styles.email}>@{user?.username || user?.email}</Text>
        
        {/* Seviye Rozeti */}
        <View style={styles.levelBadge}>
          <Ionicons name="shield" size={16} color={theme.colors.primary} />
          <Text style={styles.levelText}>Seviye {level}</Text>
        </View>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer} accessibilityLabel="Profil istatistikleri">
        <View style={styles.statItem} accessibilityLabel={`${totalXP} toplam deneyim puanı`}>
          <Text style={styles.statValue}>{totalXP}</Text>
          <Text style={styles.statLabel}>{t('total_xp')}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem} accessibilityLabel={`${progress.filter(p => p.completed).length} tamamlanmış ders`}>
          <Text style={styles.statValue}>{progress.filter(p => p.completed).length}</Text>
          <Text style={styles.statLabel}>{t('completed_lessons')}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem} accessibilityLabel={`${streak} günlük seri`}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>{t('streak')}</Text>
        </View>
      </View>

      {/* Menü */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              lightHaptic();
              item.onPress();
            }}
            accessibilityLabel={item.title}
            accessibilityRole="button"
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Uygulama Bilgisi */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Kodcum v1.0.0</Text>
        <Text style={styles.footerText}>Made with ❤️ by Furkan</Text>
      </View>
    </ScrollView>
    
    {/* Fotoğraf Büyütme Modal */}
    <Modal
      visible={photoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setPhotoModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.photoModalContainer}
        activeOpacity={1}
        onPress={() => setPhotoModalVisible(false)}
      >
        <View style={styles.photoModalContent}>
          {user?.photoURL && (
            <Image 
              source={{ uri: user.photoURL }} 
              style={styles.photoModalImage}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity 
            style={styles.photoModalCloseButton}
            onPress={() => setPhotoModalVisible(false)}
          >
            <Ionicons name="close-circle" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.photoModalEditButton}
            onPress={() => {
              setPhotoModalVisible(false);
              navigation.navigate('EditProfile' as never);
            }}
          >
            <Ionicons name="pencil" size={20} color="#fff" />
            <Text style={styles.photoModalEditText}>Düzenle</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
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
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.card,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  menuContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  // Fotoğraf Büyütme Modal Stilleri
  photoModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoModalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoModalImage: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').width - 40,
    borderRadius: 20,
  },
  photoModalCloseButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  photoModalEditButton: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  photoModalEditText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProfileScreen;
