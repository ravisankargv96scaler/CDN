import React, { useState } from 'react';
import { Award, RefreshCcw, Cloud, ShieldCheck, Zap } from 'lucide-react';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does CDN stand for?",
    options: ["Central Data Network", "Content Delivery Network", "Computer Distributed Node", "Control Data Node"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which server is physically closest to the user?",
    options: ["Origin Server", "DNS Server", "Edge Server", "Database"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "If content is NOT in the Edge server cache, what happens?",
    options: ["Error 404 is returned", "The user waits forever", "It fetches from the Origin Server", "The internet breaks"],
    correctAnswer: 2
  }
];

const providers = [
  { name: 'Cloudflare', icon: Cloud, desc: "Known for massive global scale and free tier." },
  { name: 'AWS CloudFront', icon: Zap, desc: "Deeply integrated with Amazon S3 and EC2." },
  { name: 'Akamai', icon: ShieldCheck, desc: "One of the oldest and largest enterprise CDNs." },
];

const QuizSection: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    const correct = index === questions[currentQ].correctAnswer;
    
    setTimeout(() => {
        if (correct) setScore(s => s + 1);
        
        if (currentQ < questions.length - 1) {
            setCurrentQ(c => c + 1);
            setSelectedOption(null);
        } else {
            setShowResult(true);
        }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Top Section: Providers Carousel (Static Grid for simplicity) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((p) => (
            <div key={p.name} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center hover:border-network-accent transition-colors">
                <div className="bg-slate-700 p-3 rounded-full mb-3">
                    <p.icon size={24} className="text-network-accent" />
                </div>
                <h4 className="font-bold text-white">{p.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
            </div>
        ))}
      </div>

      <div className="border-t border-slate-700 my-2"></div>

      {/* Quiz Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {!showResult ? (
            <div className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-mono text-network-accent">Question {currentQ + 1}/{questions.length}</span>
                    <span className="text-xs text-slate-500">Test your knowledge</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-6">{questions[currentQ].question}</h3>
                
                <div className="space-y-3">
                    {questions[currentQ].options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={selectedOption !== null}
                            className={`w-full p-4 rounded-lg text-left transition-all border
                            ${selectedOption === idx 
                                ? idx === questions[currentQ].correctAnswer 
                                    ? 'bg-green-900/50 border-green-500 text-green-200' 
                                    : 'bg-red-900/50 border-red-500 text-red-200'
                                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            <div className="text-center animate-in zoom-in duration-300">
                <Award size={64} className="mx-auto text-yellow-500 mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
                <p className="text-xl text-slate-400 mb-6">You scored <span className="text-network-accent font-bold">{score} / {questions.length}</span></p>
                
                <button 
                    onClick={resetQuiz}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-network-accent hover:bg-cyan-600 text-slate-900 font-bold rounded-lg transition-colors"
                >
                    <RefreshCcw size={18} /> Try Again
                </button>
            </div>
        )}
      </div>

    </div>
  );
};

export default QuizSection;