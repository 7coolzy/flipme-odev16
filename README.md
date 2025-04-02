# ÖDEV 16 METİNLERİ TERS ÇEVİRME UYGULAMASI

React Native ve Expo ile geliştirdiğim, reanimated kullanarak animasyonlu hale getirdiğim metin ters çevirme uygulaması. Belli bir inputa özel tetiklenen bir animasyon da ekledim zordu :>

[![Expo](https://img.shields.io/badge/Expo-6.5.0-mavi.svg)](https://expo.io)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-yeşil.svg)](https://reactnative.dev)




## Özellikler

- **Metni Ters Çevirme**: Girdiğiniz metni anında tersine çevirir
- **360° Dönüş Animasyonu**: "flip" komutu için özel efekt
- **Akıllı Doğrulama**: 20 karakter sınırı ve hata yönetimi
- **Animasyonlu Arayüz**:
  - Dinamik geçişli metin efektleri
  - Yüzen gölge efektleri
  - Yumuşak geçiş animasyonları
- **Tam Test Edilmiş**: Temel özellikler için %100 test kapsamı

## Kullandığım Teknolojiler

**Çekirdek:**
- React Native
- Expo SDK
- TypeScript

**Animasyonlar:**
- React Native Reanimated
- Expo Linear Gradient
- Masked View

**UI/UX:**
- Google Fonts (Bebas Neue)
- StyleSheet
- Platforma özel stil yönetimi

**Test:**
- Jest
- React Testing Library
- Native Modül Mock'ları

## 🚀 Kurulum

1. Repoyu klonla:
```bash
git clone https://github.com/7coolzy/flipmaster.git
cd flipmaster