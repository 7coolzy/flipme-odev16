import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Index from '../../app/(tabs)/index';

// Animasyon kütüphanelerini mock'la
jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated/mock'),
  useSharedValue: jest.fn,
  useAnimatedStyle: jest.fn,
  withTiming: jest.fn,
}));

jest.mock('expo-linear-gradient', () => 'LinearGradient');
jest.mock('@react-native-masked-view/masked-view', () => 'MaskedView');

describe('Index Screen', () => {
  const originalConsoleError = console.error;
  
  beforeAll(() => {
    console.error = (message) => {
      if (message.includes('Animated: `useNativeDriver`')) return;
      originalConsoleError(message);
    };
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('Metni tersine çevirip sonuç gösterir', () => {
    render(<Index />);
    
    fireEvent.changeText(screen.getByPlaceholderText('Metin giriniz...'), 'hello');
    fireEvent.press(screen.getByText('Ters Çevir'));
    
    expect(screen.getByText('Ters Çevrilmiş Metin:')).toBeTruthy();
    expect(screen.getByText('olleh')).toBeTruthy();
  });

  test('20 karakter sınırını aşınca hata gösterir', () => {
    render(<Index />);
    
    const longText = 'a'.repeat(21);
    fireEvent.changeText(screen.getByPlaceholderText('Metin giriniz...'), longText);
    fireEvent.press(screen.getByText('Ters Çevir'));
    
    expect(screen.getByText(`Metin 20 karakteri aşamaz!`)).toBeTruthy();
    expect(screen.queryByText('Ters Çevrilmiş Metin:')).toBeNull();
  });

  test('Temizle butonu tüm stateleri sıfırlar', async () => {
    render(<Index />);
    
    const input = screen.getByPlaceholderText('Metin giriniz...');
    fireEvent.changeText(input, 'test');
    fireEvent.press(screen.getByText('Ters Çevir'));
    fireEvent.press(screen.getByText('Temizle'));
    
    expect(input.props.value).toBe('');
    expect(screen.queryByText('tset')).toBeNull();
    expect(screen.queryByText('Ters Çevrilmiş Metin:')).toBeNull();
  });

  test('"flip" yazıldığında özel animasyon tetiklenir', () => {
    render(<Index />);
    
    fireEvent.changeText(screen.getByPlaceholderText('Metin giriniz...'), 'FLIP');
    fireEvent.press(screen.getByText('Ters Çevir'));
    
    const resultContainer = screen.getByTestId('result-container');
    expect(resultContainer.props.style.transform[0].rotate).toBeDefined();
  });
});