import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface AuthContextType {
  userSession: UserSession;
  authenticate: () => void;
  userData: any;
  isAuthenticated: boolean;
}

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const AuthContext = createContext<AuthContextType>({
  userSession,
  authenticate: () => {},
  userData: null,
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setIsAuthenticated(true);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setIsAuthenticated(true);
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
        setIsAuthenticated(true);
      },
      userSession,
    });
  };

  return (
    <AuthContext.Provider value={{ userSession, authenticate, userData, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);