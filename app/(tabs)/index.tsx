import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform } from 'react-native';
import TextInputComponent from '../../src/components/TextInputComponent';
import ButtonComponent from '../../src/components/ButtonComponent';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  runOnJS,
  withRepeat,
  Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function TabIndex() {
  const [inputText, setInputText] = useState<string>('');
  const [reversedText, setReversedText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const spinValue = useSharedValue(0);
  const viewAnim = useSharedValue(0);
  const isFlip = useSharedValue(false);
  const titleTranslateX = useSharedValue(-300);

  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  const MAX_LENGTH = 20;

  // Başlık animasyonu
  useEffect(() => {
    titleTranslateX.value = withRepeat(
      withTiming(300, { duration: 5000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const TitleComponent = () => (
    <View style={styles.titleContainer}>
      <AnimatedGradient
        colors={['#FF0080', '#FF8C00', '#40E0D0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.titleGradient, useAnimatedStyle(() => ({
          transform: [{ translateX: titleTranslateX.value }]
        }))]}
      />
      
      <MaskedView
        maskElement={<Text style={styles.title}>Flip Me</Text>}
        style={styles.maskContainer}>
        <LinearGradient
          colors={['#FF416C', '#FF4B2B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </MaskedView>

      <Text style={[styles.title, styles.titleShadow]}>Flip Me</Text>
    </View>
  );

  const handleReverse = () => {
    if (inputText.length > MAX_LENGTH) {
      setError(`Metin ${MAX_LENGTH} karakteri aşamaz!`);
      setReversedText('');
      return;
    }
    
    if (inputText.toLowerCase() === 'flip') {
      isFlip.value = true;
      spinValue.value = withTiming(1, { duration: 1000 });
      viewAnim.value = 1;
    } else {
      isFlip.value = false;
      viewAnim.value = withTiming(1, { duration: 500 });
    }
    
    setError('');
    setReversedText(inputText.split('').reverse().join(''));
  };

  const triggerClear = () => {
    viewAnim.value = withTiming(
      0, 
      { duration: 500 }, 
      (finished) => {
        if (finished) {
          runOnJS(setReversedText)('');
          runOnJS(setInputText)('');
          runOnJS(setError)('');
          spinValue.value = 0;
          isFlip.value = false;
        }
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return isFlip.value 
      ? {
          transform: [{ rotate: `${spinValue.value * 360}deg` }],
          opacity: 1
        }
      : {
          opacity: viewAnim.value,
          transform: [{ scale: viewAnim.value }]
        };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {fontsLoaded ? <TitleComponent /> : <Text style={styles.fallbackTitle}>Flip Me</Text>}
        
        <TextInputComponent
          value={inputText}
          onChangeText={setInputText}
          placeholder="Metin giriniz..."
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <View style={styles.buttonContainer}>
          <ButtonComponent title="Flip" onPress={handleReverse} />
          <ButtonComponent title="Clean" onPress={triggerClear} />
        </View>
        
        {reversedText ? (
          <Animated.View   testID="result-container"
          style={[styles.resultContainer, animatedStyle]}>
            <Text style={styles.resultTitle}>Flipped Text:</Text>
            <Text style={styles.resultText}>{reversedText}</Text>
          </Animated.View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  titleContainer: {
    marginBottom: 40,
    overflow: 'hidden',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: 'BebasNeue_400Regular',
    letterSpacing: 4,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  fallbackTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  titleShadow: {
    position: 'absolute',
    color: 'transparent',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  titleGradient: {
    position: 'absolute',
    height: 120,
    width: '200%',
    opacity: 0.15,
    transform: [{ rotate: '-20deg' }],
  },
  maskContainer: {
    height: 60,
    width: '100%',
  },
  gradient: {
    flex: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    gap: 16,
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignSelf: 'center',
    width: '100%',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  resultText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
});