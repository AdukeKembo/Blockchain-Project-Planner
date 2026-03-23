import React, { useState, useCallback } from 'react';
import { ProjectPlan } from './types';
import { generateProjectPlan } from './services/geminiService';
import ProjectPlanDisplay from './components/ProjectPlanDisplay';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { CodeBracketIcon, SparklesIcon } from './components/icons/Icons';

const initialProjectDescription = `Building a payment gateway using blockchain with Python involves creating a system that facilitates cryptocurrency transactions and integrates with a blockchain network. This process can be broken down into several key components:
Blockchain Core Development (or Integration):
Building a basic blockchain: You can create a simplified blockchain from scratch in Python, defining blocks, transactions, proof-of-work mechanisms, and a chain validation process. Libraries like hashlib for hashing and Flask for creating a REST API to interact with the blockchain can be used.
Integrating with existing blockchains: For more robust solutions, you would integrate with established blockchain networks like Ethereum or Bitcoin. This involves using libraries like web3.py for Ethereum or python-bitcoinlib for Bitcoin to interact with nodes, send transactions, and retrieve blockchain data.
Payment Gateway Logic:
Transaction handling: Implement logic to create, sign, and broadcast cryptocurrency transactions to the chosen blockchain network. This includes managing sender/receiver addresses, amounts, and transaction fees.
Wallet integration: Decide on a wallet strategy (custodial or non-custodial) and integrate with wallet solutions like MetaMask, WalletConnect, or develop a custom wallet system.
Payment processing: Develop the core payment processing logic, including handling payment requests, generating invoices, and confirming transaction completion on the blockchain.
API and User Interface:
RESTful API: Create a RESTful API using a framework like Flask or Django REST Framework to expose payment functionalities to external applications and merchants. This API would handle requests for creating payments, checking transaction status, and managing user accounts.
User interface (optional but recommended): Develop a user-friendly interface for merchants and potentially users to manage payments, view transaction history, and configure settings. Frontend frameworks like React.js or Vue.js can be used for this.
Security and Compliance:
Security measures: Implement robust security practices, including secure key management, data encryption, protection against common web vulnerabilities (e.g., SQL injection, XSS), and secure API authentication.
Compliance: Address regulatory requirements like KYC (Know Your Customer) and AML (Anti-Money Laundering) by integrating with identity verification services.
Deployment and Scalability:
Cloud infrastructure: Utilize cloud platforms like AWS, Google Cloud, or Azure for hosting and ensuring scalability, reliability, and security of the payment gateway.
Database: Choose a suitable database (e.g., PostgreSQL, MongoDB) to store transaction logs, user data, and system events.
Key Python Libraries and Tools:
Web Frameworks: Flask, Django, FastAPI
Blockchain Integration: web3.py (for Ethereum), python-bitcoinlib (for Bitcoin), pyStratis (for Stratis)
Cryptography and Hashing: hashlib, cryptography
Database Interaction: SQLAlchemy (for relational databases), pymongo (for MongoDB)
API Development: Django REST Framework, Flask-RESTful
Security: PyJWT, Flask-Bcrypt`;

export default function App() {
  const [projectDescription, setProjectDescription] = useState<string>(initialProjectDescription);
  const [projectPlan, setProjectPlan] = useState<ProjectPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async () => {
    if (!projectDescription.trim()) {
      setError("Project description cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setProjectPlan(null);

    try {
      const planJsonString = await generateProjectPlan(projectDescription);
      const parsedPlan: ProjectPlan = JSON.parse(planJsonString);
      setProjectPlan(parsedPlan);
    } catch (e) {
      console.error(e);
      setError("Failed to generate project plan. Please ensure the project description is clear and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [projectDescription]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans print:bg-white print:text-slate-900">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10 no-print">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
            Blockchain Project Planner
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Powered by Gemini, this tool transforms your project ideas into a structured and actionable plan.
          </p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl p-6 md:p-8 mb-12 no-print">
          <div className="flex items-center mb-4">
            <CodeBracketIcon className="h-6 w-6 text-indigo-400 mr-3" />
            <h2 className="text-2xl font-semibold text-slate-100">Project Description</h2>
          </div>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full h-48 md:h-64 p-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-slate-300 mb-6 placeholder-slate-600"
            placeholder="Describe your blockchain project in detail..."
          />
          <div className="flex justify-end">
            <button
              onClick={handleGeneratePlan}
              disabled={isLoading}
              className={`flex items-center px-8 py-3 rounded-lg font-bold text-white transition-all transform active:scale-95 ${
                isLoading 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader />
                  <span>Generating Plan...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  <span>Generate Plan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 no-print">
            <ErrorMessage message={error} />
          </div>
        )}

        {projectPlan && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ProjectPlanDisplay plan={projectPlan} />
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-slate-800 text-center text-slate-500 text-sm no-print">
        <p>&copy; {new Date().getFullYear()} Blockchain Project Planner. Built with Gemini 2.5 Flash.</p>
      </footer>
    </div>
  );
}
