import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '@/app/(tabs)/index'; // Chemin vers ton composant WelcomeScreen
import * as SplashScreen from 'expo-splash-screen';

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

describe('WelcomeScreen', () => {
    beforeEach(() => {
      // Mock du console.log pour chaque test
      jest.spyOn(console, 'log').mockImplementation(() => {});
    });
  
    afterEach(() => {
      // Nettoyage après chaque test
      jest.restoreAllMocks();
    });
  
    it('renders correctly when fonts are loaded', async () => {
      const { getByText, getByTestId } = render(<WelcomeScreen />);
  
      await waitFor(() => {
        expect(getByText('Bonjour !')).toBeTruthy();
        expect(getByText('Nous sommes ravis de vous accueillir. Connectez-vous pour découvrir les dernières promotions près de chez vous, ou inscrivez-vous pour commencer.')).toBeTruthy();
        expect(getByTestId('logo')).toBeTruthy();
      });
    });
  
    it('renders the login button and handles press', () => {
      const { getByText } = render(<WelcomeScreen />);
  
      const loginButton = getByText('Se connecter');
      expect(loginButton).toBeTruthy();
  
      fireEvent.press(loginButton);
  
      expect(console.log).toHaveBeenCalledWith('Se connecter');
    });
  
    it('renders the signup button and handles press', () => {
      const { getByText } = render(<WelcomeScreen />);
  
      const signupButton = getByText("S'inscrire");
      expect(signupButton).toBeTruthy();
  
      fireEvent.press(signupButton);
  
      expect(console.log).toHaveBeenCalledWith("S'inscrire");
    });
  });