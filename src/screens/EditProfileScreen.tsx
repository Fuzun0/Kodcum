import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';
import logger from '../utils/logger';

const EditProfileScreen = () => {
  const { theme } = useTheme();
  const { user, updateUserProfile } = useAuth();
  const navigation = useNavigation();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isLocalPhoto, setIsLocalPhoto] = useState(false); // Local URI mi yoksa Firebase URL mi
  const [dailyGoal, setDailyGoal] = useState(String(user?.dailyGoal || 30));
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const handleSave = async () => {
    if (!user) return;
    
    if (!displayName.trim()) {
      Alert.alert('Hata', 'Kullanıcı adı boş olamaz.');
      return;
    }

    const goalMinutes = parseInt(dailyGoal);
    if (isNaN(goalMinutes) || goalMinutes < 5 || goalMinutes > 240) {
      Alert.alert('Hata', 'Günlük hedef 5-240 dakika arasında olmalıdır.');
      return;
    }

    setLoading(true);
    
    try {
      let finalPhotoURL = photoURL;
      
      // Fotoğraf local dosya mı kontrol et (file:// veya content:// ile başlıyorsa)
      const isLocalFile = photoURL && (
        photoURL.startsWith('file://') || 
        photoURL.startsWith('content://') || 
        photoURL.includes('/cache/')
      );
      
      // Eğer local fotoğraf varsa Firebase'e yükle
      if (isLocalFile) {
        console.log('📤 Local fotoğraf tespit edildi, Firebase\'e yükleniyor...');
        setUploadingPhoto(true);
        try {
          finalPhotoURL = await UserService.uploadProfilePhoto(user.id, photoURL);
          console.log('✅ Fotoğraf Firebase\'e yüklendi:', finalPhotoURL);
          setIsLocalPhoto(false);
        } catch (uploadError) {
          console.error('❌ Fotoğraf yüklenemedi:', uploadError);
          Alert.alert('Uyarı', 'Fotoğraf yüklenemedi. Lütfen tekrar deneyin veya farklı bir fotoğraf seçin.');
          finalPhotoURL = user.photoURL; // Eski fotoğrafı koru
        } finally {
          setUploadingPhoto(false);
        }
      }
      
      // Sadece geçerli URL'leri kaydet
      const photoToSave = finalPhotoURL && finalPhotoURL.startsWith('http') ? finalPhotoURL : undefined;
      
      await updateUserProfile({
        displayName: displayName.trim(),
        photoURL: photoToSave,
        dailyGoal: goalMinutes,
      });
      
      Alert.alert('Başarılı', 'Profiliniz güncellendi.', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Profil güncellenirken hata:', error);
      Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      // Galeri izni iste
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf seçmek için galeri izni gereklidir.');
        return;
      }

      // Galeriden fotoğraf seç
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setPhotoURL(result.assets[0].uri);
        setIsLocalPhoto(true); // Local URI olduğunu işaretle
      }
    } catch (error) {
      logger.error('Fotoğraf seçilirken hata:', error);
      Alert.alert('Hata', 'Fotoğraf seçilirken bir hata oluştu.');
    }
  };

  const takePhoto = async () => {
    try {
      // Kamera izni iste
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf çekmek için kamera izni gereklidir.');
        return;
      }

      // Kamera ile fotoğraf çek
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setPhotoURL(result.assets[0].uri);
        setIsLocalPhoto(true); // Local URI olduğunu işaretle
      }
    } catch (error) {
      logger.error('Fotoğraf çekilirken hata:', error);
      Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu.');
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Profil Fotoğrafı',
      'Fotoğraf kaynağını seçin',
      [
        { text: 'İptal', style: 'cancel' },
        { text: '📷 Kamera', onPress: takePhoto },
        { text: '🖼️ Galeri', onPress: pickImage },
      ]
    );
  };

  const dailyGoalOptions = [
    { label: '5 dakika', value: 5 },
    { label: '10 dakika', value: 10 },
    { label: '15 dakika', value: 15 },
    { label: '30 dakika', value: 30 },
    { label: '45 dakika', value: 45 },
    { label: '60 dakika', value: 60 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity 
            onPress={showImageOptions} 
            style={styles.avatarContainer}
            accessibilityLabel="Profil fotoğrafını değiştir"
            accessibilityRole="button"
            accessibilityHint="Kamera veya galeriden fotoğraf seçmek için dokunun"
          >
            {photoURL ? (
              <Image source={{ uri: photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {displayName?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
            )}
            <View style={styles.cameraButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>Profil fotoğrafını değiştir</Text>
        </View>

        {/* Kullanıcı Adı */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kullanıcı Adı</Text>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Kullanıcı adınızı girin"
            placeholderTextColor={theme.colors.textSecondary}
            accessibilityLabel="Kullanıcı adı"
            accessibilityHint="Kullanıcı adınızı değiştirin"
          />
        </View>

        {/* Email (Sadece gösterim) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-posta</Text>
          <View style={[styles.input, styles.disabledInput]}>
            <Text style={styles.disabledText}>{user?.email}</Text>
          </View>
          <Text style={styles.helperText}>E-posta adresi değiştirilemez</Text>
        </View>

        {/* Günlük Hedef */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Günlük Çalışma Hedefi</Text>
          <View style={styles.goalOptions}>
            {dailyGoalOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.goalOption,
                  parseInt(dailyGoal) === option.value && styles.goalOptionActive
                ]}
                onPress={() => setDailyGoal(String(option.value))}
                accessibilityLabel={`Günlük hedef: ${option.label}`}
                accessibilityRole="radio"
                accessibilityState={{ selected: parseInt(dailyGoal) === option.value }}
              >
                <Text style={[
                  styles.goalOptionText,
                  parseInt(dailyGoal) === option.value && styles.goalOptionTextActive
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.helperText}>
            Her gün ne kadar çalışmayı hedefliyorsun?
          </Text>
        </View>

        {/* Seviye ve XP (Sadece gösterim) */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={24} color="#fbbf24" />
            <Text style={styles.statValue}>Seviye {user?.level}</Text>
            <Text style={styles.statLabel}>Mevcut Seviye</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color="#3b82f6" />
            <Text style={styles.statValue}>{user?.xp || 0} XP</Text>
            <Text style={styles.statLabel}>Toplam Deneyim</Text>
          </View>
        </View>

        {/* Kaydet Butonu */}
        <TouchableOpacity
          style={[styles.saveButton, (loading || uploadingPhoto) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading || uploadingPhoto}
          accessibilityLabel={uploadingPhoto ? 'Fotoğraf yükleniyor' : loading ? 'Kaydediliyor' : 'Değişiklikleri kaydet'}
          accessibilityRole="button"
          accessibilityState={{ disabled: loading || uploadingPhoto }}
        >
          {loading || uploadingPhoto ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator color="#fff" />
              <Text style={[styles.saveButtonText, { marginLeft: 8 }]}>
                {uploadingPhoto ? 'Fotoğraf Yükleniyor...' : 'Kaydediliyor...'}
              </Text>
            </View>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </>
          )}
        </TouchableOpacity>

        {/* İptal Butonu */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>İptal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  changePhotoText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabledInput: {
    backgroundColor: colors.background,
  },
  disabledText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
  },
  goalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },
  goalOptionActive: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  goalOptionText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  goalOptionTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    marginTop: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
