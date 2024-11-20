import React from 'react';
import { render } from '@testing-library/react-native';
import WelcomePage from '@/app/WelcomePage';

jest.mock('expo-font', () => ({
  useFonts: () => [true], // Simule que les fonts sont déjà chargées
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }), // Simule le routeur
}));

describe('WelcomePage', () => {
  it('renders correctly when fonts are loaded', async () => {
    const { getByTestId, getByText } = render(<WelcomePage />);

    // Vérifie que le logo est affiché
    const logo = getByTestId('logo');
    expect(logo).toBeTruthy();

    // Vérifie que le titre est affiché
    const title = getByText('Bonjour !');
    expect(title).toBeTruthy();
  });
});
