

import React, { useState } from 'react';
import { IdCardIcon } from '../components/common/Icons';

interface KYCVerificationScreenProps {
  onComplete: () => void;
}

const FileInput: React.FC<{ label: string, id: string }> = ({ label, id }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            id={id} 
            type="file" 
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
        />
    </div>
);

const KYCVerificationScreen: React.FC<KYCVerificationScreenProps> = ({ onComplete }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <IdCardIcon className="w-16 h-16 text-indigo-400" />
            </div>
            <p className="text-gray-400">Step 2 of 4</p>
            <h1 className="text-3xl font-bold text-white">Identity Verification (KYC)</h1>
            <p className="text-gray-400 mt-2">We need to verify your identity to enable secure payments and comply with regulations.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
            <div>
                <label htmlFor="doc-type" className="block text-sm font-medium text-gray-300 mb-1">Document Type</label>
                <select id="doc-type" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>National ID Card</option>
                    <option>Passport</option>
                    <option>Driver's License</option>
                </select>
            </div>
            
            <FileInput label="Upload Front of Document" id="doc-front" />
            <FileInput label="Upload Back of Document" id="doc-back" />
            <FileInput label="Upload a Selfie Holding Your ID" id="doc-selfie" />
            
            <div className="text-xs text-gray-500 pt-2">
                Your information is encrypted and securely stored. It will only be used for verification purposes.
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors duration-200">
                Submit for Verification
            </button>
        </form>
      </div>
    </div>
  );
};

export default KYCVerificationScreen;