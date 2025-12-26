import { ChainhooksClient } from '@hirosystems/chainhooks-client';

const API_KEY = import.meta.env.VITE_HIRO_API_KEY || '';

export const chainhooks = new ChainhooksClient({
    apiKey: API_KEY,
    network: 'testnet' 
});

export const subscribeToFlashLoanEvents = async () => {
    // Placeholder for subscription logic
    console.log('Subscribing to Flash Loan events...');
};