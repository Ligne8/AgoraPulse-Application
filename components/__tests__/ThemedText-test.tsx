import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ThemedText } from '../ThemedText';

test('renders correctly', async () => {
  const { getByText } = render(<ThemedText>Bonjour !</ThemedText>);

  await waitFor(() => {
    expect(getByText('Bonjour !')).toBeTruthy();
  });
});