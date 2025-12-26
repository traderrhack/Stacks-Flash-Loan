import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';

export const renderWithAuth = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );
};