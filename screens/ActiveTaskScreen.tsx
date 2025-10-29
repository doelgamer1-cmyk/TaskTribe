import React, { useState } from 'react';
import { Quest, ChatMessage } from '../types';
import { ArrowLeftIcon } from '../components/common/Icons';
import MessageBox from '../components/common/MessageBox';
import UserInput from '../components/views/UserInput'; // Assuming UserInput is in views

interface ActiveTaskScreenProps {
  quest: Quest;
  onSubmit: (submission: string) => void;
}

const ActiveTaskScreen: React.FC<ActiveTaskScreenProps> = ({ quest, onSubmit }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: `Welcome! I'm your Quest Master AI. I'm here to help you with the "${quest.title}" quest. What's your first question?` }
    ]);
    const [submissionText, setSubmissionText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = (input: string) => {
        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        // Mock AI response
        setTimeout(() => {
            const modelMessage: ChatMessage = { role: 'model', content: "That's a great question! Based on the quest details, you should focus on creating a vector-based design in SVG format. Let me know if you need more clarification!" };
            setMessages(prev => [...prev, modelMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const handleSubmit = () => {
        if (submissionText.trim()) {
            onSubmit(submissionText);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="p-4 flex items-center border-b border-gray-800">
                <div className="flex-1">
                    <p className="text-sm text-gray-400">Working on:</p>
                    <h1 className="text-lg font-bold truncate">{quest.title}</h1>
                </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left: Submission Pane */}
                <div className="w-full md:w-1/2 flex flex-col p-4 bg-gray-800/50 border-b md:border-b-0 md:border-r border-gray-700/50">
                    <h2 className="text-xl font-bold mb-4">Your Submission</h2>
                    <p className="text-sm text-gray-400 mb-2">
                        Enter your final submission text, links, or notes here. The client will review this once you submit.
                    </p>
                    <textarea 
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        className="flex-1 w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Type your submission here..."
                    ></textarea>
                    <button 
                        onClick={handleSubmit}
                        disabled={!submissionText.trim()}
                        className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                        Submit Task for Review
                    </button>
                </div>

                {/* Right: Chat Pane */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="p-2 border-b border-gray-700/50">
                         <h3 className="text-center font-semibold">Quest Master AI</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <MessageBox key={index} message={msg} />
                        ))}
                         {isLoading && (
                          <div className="flex justify-start mb-4">
                            <div className="max-w-prose rounded-2xl px-5 py-3 bg-gray-700 text-gray-200 rounded-bl-none flex items-center">
                               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse mr-2"></div>
                               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse mr-2 delay-150"></div>
                               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                          </div>
                        )}
                    </div>
                    <UserInput onSend={handleSend} isLoading={isLoading} placeholder="Ask the AI for help..." />
                </div>
            </div>
        </div>
    );
};

export default ActiveTaskScreen;
