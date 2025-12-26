import { UserSession } from '@stacks/connect';

export interface ConnectButtonProps {
    className?: string;
    onConnect?: () => void;
    onDisconnect?: () => void;
}

export interface WalletState {
    userData: any | null;
    isSigningIn: boolean;
}
