import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const ConnectButton: React.FC = () => {
  const { authenticate, userData } = useAuth();

  if (userData) {
    return (
      <button className="btn-connected">
        {userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet}
      </button>
    );
  }

  return (
    <button onClick={authenticate} className="btn-connect">
      Connect Wallet
    </button>
  );
};