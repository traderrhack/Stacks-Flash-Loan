import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface AuthContextType {
  userSession: UserSession;
  authenticate: () => void;
  userData: any;
}

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const AuthContext = createContext<AuthContextType>({
  userSession,
  authenticate: () => {},
  userData: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const authenticate = () => {
    showConnect({
      appDetails: {
        name: 'Stacks Flash Loans',
        icon: window.location.origin + '/vite.svg',
      },
      redirectTo: '/',
      onFinish: () => {
        setUserData(userSession.loadUserData());
      },
      userSession,
    });
  };

  return (
    <AuthContext.Provider value={{ userSession, authenticate, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);