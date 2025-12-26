import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ConnectButtonProps } from './types';
// Note: We need to ensure lucide-react is installed, but for now we use text fallback or simple SVG if missing
// import { Wallet, LogOut } from 'lucide-react'; 

export const ConnectButton: React.FC<ConnectButtonProps> = ({ className }) => {
  const { authenticate, userData, userSession } = useAuth();
    
  const handleDisconnect = () => {
      userSession.signUserOut(); 
      window.location.reload(); 
  };

  if (userData) {
    const address = userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet;
    const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">{truncated}</span>
        </div>
        <button
          onClick={handleDisconnect}
          className="flex items-center space-x-1 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          <span>Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <button 
        onClick={authenticate} 
        className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium ${className}`}
    >
      <span>Connect Wallet</span>
    </button>
  );
};