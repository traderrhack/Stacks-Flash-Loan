import React from 'react';
import { LoanForm } from '../components/LoanForm';
import { ConnectButton } from '../components/ConnectButton';
// import { Container } from '../components/ui/Container';

export const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-page">
            <header className="flex justify-between items-center p-4 bg-white border-b">
                <h1 className="text-2xl font-bold text-primary">Stacks Flash Loans</h1>
                <ConnectButton />
            </header>
            
            <main className="p-8">
                 <div className="container mx-auto">
                    <section className="hero text-center mb-12">
                        <h2 className="text-4xl font-extrabold mb-4">Instant Liquidity, Zero Collateral</h2>
                        <p className="text-lg text-gray-600">Execute arbitrage, liquidations, and collateral swaps in a single transaction.</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="info-panel">
                            {/* Stats or Info */}
                            <div className="bg-white p-6 rounded shadow">
                                <h3 className="font-bold mb-2">Protocol Stats</h3>
                                <div className="stat-row flex justify-between">
                                    <span>Total Liquidity</span>
                                    <span className="font-mono">1,234,567 STX</span>
                                </div>
                                <div className="stat-row flex justify-between mt-2">
                                    <span>Flash Fee</span>
                                    <span className="font-mono">0.05%</span>
                                </div>
                            </div>
                        </div>

                        <div className="action-panel">
                            <LoanForm />
                        </div>
                    </div>
                 </div>
            </main>
        </div>
    );
};