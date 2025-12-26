import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ConnectButton } from '../ConnectButton';
import { renderWithAuth } from '../../../utils/test-utils';

describe('ConnectButton', () => {
  it('renders connect wallet text when not signed in', () => {
    renderWithAuth(<ConnectButton />);
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });
});