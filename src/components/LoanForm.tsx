import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { openContractCall } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';

interface FormData {
    amount: string;
    token: string;
}

export const LoanForm: React.FC = () => {
    const { userSession } = useAuth();
    const [formData, setFormData] = useState<FormData>({ amount: '', token: 'STX' });
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userSession.isUserSignedIn()) {
            setStatus("Please connect your wallet first.");
            return;
        }

        const amount = parseInt(formData.amount);
        if (isNaN(amount) || amount <= 0) {
            setStatus("Invalid amount.");
            return;
        }

        // Logic to trigger flash loan contract call
        const network = new StacksTestnet();
        
        const options = {
            contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
            contractName: 'flasher',
            functionName: 'flash-stx',
            functionArgs: [], // TODO: Add clarity arguments (uint, trait)
            network,
            appDetails: {
                name: 'Stacks Flash Loan',
                icon: window.location.origin + '/vite.svg',
            },
            onFinish: (data: any) => {
                setStatus('Transaction submitted: ' + data.txId);
            },
            onCancel: () => {
                setStatus('Transaction canceled.');
            },
        };

        // await openContractCall(options);
        setStatus("Simulating contract call for " + amount + " " + formData.token);
    };

    return (
        <form onSubmit={handleSubmit} className="loan-form p-4 border rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Request Flash Loan</h3>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Enter amount"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Token</label>
                <select 
                    value={formData.token} 
                    onChange={(e) => setFormData({...formData, token: e.target.value})}
                    className="w-full p-2 border rounded"
                >
                    <option value="STX">Stacks (STX)</option>
                    <option value="SIP10">SIP-010 Token</option>
                </select>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Execute Loan
            </button>

            {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
        </form>
    );
};