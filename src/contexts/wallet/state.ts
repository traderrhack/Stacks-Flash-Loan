import { UserSession } from '@stacks/connect';

export interface WalletContextState {
    userSession: UserSession;
    userData: any;
    network: string; // 'mainnet' | 'testnet'
    isAuthenticated: boolean;
}

export const initialState: Partial<WalletContextState> = {
    userData: null,
    network: 'testnet',
    isAuthenticated: false,
};