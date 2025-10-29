import React, { useState, useEffect } from 'react';
import { Quest, User, Tribe, TribeMember } from './types';

// Screen Imports
import SplashScreen from './screens/SplashScreen';
import AgeSelectionScreen from './screens/AgeSelectionScreen';
import TeenSignupScreen from './screens/TeenSignupScreen';
import GuardianVerificationScreen from './screens/GuardianVerificationScreen';
import VerificationPendingScreen from './screens/VerificationPendingScreen';
import HomeScreen from './screens/HomeScreen';
import QuestsScreen from './screens/QuestsScreen';
import TribesDiscoveryScreen from './screens/TribesDiscoveryScreen';
import TribeDetailScreen from './screens/TribeDetailScreen';
import TribeHomeScreen from './screens/TribeHomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuestDetailScreen from './screens/QuestDetailScreen';
import QuestApplicationScreen from './screens/QuestApplicationScreen';
import ApplicationSubmittedScreen from './screens/ApplicationSubmittedScreen';
import ActiveTaskScreen from './screens/ActiveTaskScreen';
import SubmissionConfirmationScreen from './screens/SubmissionConfirmationScreen';
import VerificationInProgressScreen from './screens/VerificationInProgressScreen';
import QuestCompleteScreen from './screens/QuestCompleteScreen';

import AdultSignupScreen from './screens/AdultSignupScreen';
import KYCVerificationScreen from './screens/KYCVerificationScreen';
import PaymentSetupScreen from './screens/PaymentSetupScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import OnboardingCompleteScreen from './screens/OnboardingCompleteScreen';
import CreateQuestScreen from './screens/CreateQuestScreen';

// MOCK DATA
const MOCK_USER_TEEN: User = {
    username: 'Alex_Design',
    isAdult: false,
    level: 1,
    xp: 150,
    isTribeMember: false,
    tasksCompleted: 0
};

const MOCK_USER_ADULT: User = {
    username: 'Priya_Designs',
    isAdult: true,
    level: 24,
    xp: 23500,
    isTribeMember: true,
    tasksCompleted: 42,
    rating: 4.9,
    fullName: "Priya Sharma",
    headline: "UX/UI Designer & Illustrator",
    bio: "Passionate designer with 5+ years of experience creating intuitive and beautiful digital products. Let's build something amazing together!",
    skills: ["UI/UX Design", "Figma", "Illustration", "Prototyping", "Web Design"]
};

const MOCK_QUESTS: Quest[] = [
    { id: 'q1', title: 'Design a Logo for "EcoFresh" startup', description: 'We need a modern, minimalist logo for our new eco-friendly cleaning products brand.', company: 'EcoFresh Inc.', logo: 'https://placehold.co/64x64/28a745/FFFFFF?text=E', type: 'Creative', deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), level: 5, budget: 5000, creatorId: 'Priya_Designs', status: 'OPEN', bids: [] },
    { id: 'q2', title: 'Write 3 Blog Posts about Sustainable Living', description: 'Looking for a writer to create three 500-word blog posts on topics related to sustainability.', company: 'GreenThumb Blog', logo: 'https://placehold.co/64x64/17a2b8/FFFFFF?text=G', type: 'Professional', deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), level: 8, reward: 3000, creatorId: 'some_other_user', status: 'OPEN', bids: [] },
    { id: 'q3', title: 'Create a Short promotional video', description: 'Create a 15-second video for social media promoting our new app.', company: 'Appify', logo: 'https://placehold.co/64x64/6f42c1/FFFFFF?text=A', type: 'Creative', deadline: new Date(Date.now() + 18 * 60 * 60 * 1000), level: 10, budget: 8000, creatorId: 'Priya_Designs', status: 'PENDING_VERIFICATION', bids: [], winner: { userId: 'Alex_Design', bidAmount: 7500 }},
];

const MOCK_TRIBE: Tribe = { id: 't1', name: 'Design Warriors', tagline: "Creating beauty, one pixel at a time", level: 18, levelName: "Gold", members: 42, maxMembers: 50, rank: 3, winRate: 67, tags: ["Design", "Creative", "Active"], status: 'Recruiting', bannerUrl: 'https://placehold.co/600x200/1a1a2e/e94560', iconUrl: 'https://placehold.co/64x64/e94560/1a1a2e?text=DW' };


type AppState = 'splash' | 'age_selection'
    | 'teen_signup' | 'guardian_verification' | 'verification_pending'
    | 'adult_signup' | 'kyc_verification' | 'payment_setup' | 'profile_setup' | 'onboarding_complete'
    | 'main_app' | 'quest_detail' | 'quest_application' | 'application_submitted'
    | 'active_task' | 'submitting_task' | 'submission_confirmation' | 'quest_complete'
    | 'tribe_detail' | 'create_quest';

const TaskTribeApp: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('splash');
    const [user, setUser] = useState<User | null>(null);
    const [guardianPhone, setGuardianPhone] = useState('');
    const [quests, setQuests] = useState<Quest[]>(MOCK_QUESTS);
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
    const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);
    const [currentView, setCurrentView] = useState<'home' | 'quests' | 'tribes' | 'profile'>('home');

    // Splash screen effect
    useEffect(() => {
        if (appState === 'splash') {
            const timer = setTimeout(() => setAppState('age_selection'), 2500);
            return () => clearTimeout(timer);
        }
    }, [appState]);


    const handleSelectTeen = () => setAppState('teen_signup');
    const handleSelectAdult = () => setAppState('adult_signup');
    const handleTeenSignup = (username: string) => {
        setUser({ ...MOCK_USER_TEEN, username });
        setAppState('guardian_verification');
    };
    const handleGuardianVerification = (phone: string) => {
        setGuardianPhone(phone);
        setAppState('verification_pending');
    };
    const handleVerificationComplete = () => {
        // In a real app, this would be triggered by a server event
        setAppState('main_app');
    };

    const handleAdultSignup = () => setAppState('kyc_verification');
    const handleKYCComplete = () => setAppState('payment_setup');
    const handlePaymentComplete = () => setAppState('profile_setup');
    const handleProfileComplete = () => {
        setUser(MOCK_USER_ADULT);
        setAppState('onboarding_complete');
    }
    const handleOnboardingComplete = () => setAppState('main_app');

    const handleSelectQuest = (quest: Quest) => {
        setSelectedQuest(quest);
        setAppState('quest_detail');
    };

    const handleSelectTribe = (tribe: Tribe) => {
        setSelectedTribe(tribe);
        setAppState('tribe_detail');
    };

    const handleNavigate = (view: 'home' | 'quests' | 'tribes' | 'profile') => {
        setCurrentView(view);
    };

    const handleCreateQuest = (questData: Omit<Quest, 'id' | 'creatorId' | 'logo' | 'company' | 'status' | 'bids' | 'duration' | 'level'> & { deadline: Date }) => {
        if(!user) return;
        const newQuest: Quest = {
            ...questData,
            id: `q${quests.length + 1}`,
            creatorId: user.username,
            logo: 'https://placehold.co/64x64/6f42c1/FFFFFF?text=C',
            company: user.fullName || user.username,
            status: 'OPEN',
            bids: [],
            level: user.level,
        };
        setQuests(prev => [newQuest, ...prev]);
        setAppState('main_app');
        setCurrentView('quests');
    };
    

    const renderMainApp = () => {
        if (!user) return <AgeSelectionScreen onSelectTeen={handleSelectTeen} onSelectAdult={handleSelectAdult} />;

        if (user.isTribeMember && currentView === 'tribes') {
             return <TribeHomeScreen tribe={MOCK_TRIBE} onNavigate={handleNavigate} />;
        }

        switch (currentView) {
            case 'quests':
                return <QuestsScreen user={user} quests={quests} onSelectQuest={handleSelectQuest} onNavigate={handleNavigate} />;
            case 'tribes':
                return <TribesDiscoveryScreen onSelectTribe={handleSelectTribe} onBack={() => handleNavigate('home')} />;
            case 'profile':
                return <ProfileScreen user={user} quests={quests} onSelectQuest={handleSelectQuest} onBack={() => handleNavigate('home')} />;
            case 'home':
            default:
                return <HomeScreen user={user} quests={quests} onNavigate={handleNavigate} onSelectQuest={handleSelectQuest} onCreateQuest={() => setAppState('create_quest')} />;
        }
    };


    switch (appState) {
        case 'splash':
            return <SplashScreen onComplete={() => setAppState('age_selection')} />;
        case 'age_selection':
            return <AgeSelectionScreen onSelectTeen={handleSelectTeen} onSelectAdult={handleSelectAdult} />;
        case 'teen_signup':
            return <TeenSignupScreen onSignup={handleTeenSignup} />;
        case 'guardian_verification':
            return <GuardianVerificationScreen onVerify={handleGuardianVerification} />;
        case 'verification_pending':
            return <VerificationPendingScreen guardianPhone={guardianPhone} onComplete={handleVerificationComplete} />;
        
        case 'adult_signup':
            return <AdultSignupScreen onSignup={handleAdultSignup} />;
        case 'kyc_verification':
            return <KYCVerificationScreen onComplete={handleKYCComplete} />;
        case 'payment_setup':
            return <PaymentSetupScreen onComplete={handlePaymentComplete} />;
        case 'profile_setup':
            return <ProfileSetupScreen onComplete={handleProfileComplete} />;
        case 'onboarding_complete':
            return <OnboardingCompleteScreen onContinue={handleOnboardingComplete} />;

        case 'quest_detail':
            return selectedQuest && <QuestDetailScreen quest={selectedQuest} onBack={() => setAppState('main_app')} onApply={() => setAppState('quest_application')} />;
        case 'quest_application':
            return selectedQuest && <QuestApplicationScreen quest={selectedQuest} onBack={() => setAppState('quest_detail')} onSubmit={() => setAppState('application_submitted')} />;
        case 'application_submitted':
            return <ApplicationSubmittedScreen onContinue={() => setAppState('active_task')} />;
        case 'active_task':
            return selectedQuest && <ActiveTaskScreen quest={selectedQuest} onSubmit={() => setAppState('submitting_task')} />;
        case 'submitting_task':
            return <VerificationInProgressScreen />;
        case 'submission_confirmation':
            return <SubmissionConfirmationScreen onContinue={() => setAppState('quest_complete')} />;
        case 'quest_complete':
            return selectedQuest && <QuestCompleteScreen quest={selectedQuest} onContinue={() => {
                setAppState('main_app');
                setSelectedQuest(null);
            }} />;
        case 'tribe_detail':
            return selectedTribe && <TribeDetailScreen tribe={selectedTribe} onBack={() => setAppState('main_app')} onJoin={() => {
                if (user) setUser({ ...user, isTribeMember: true });
                setAppState('main_app');
                setCurrentView('tribes');
            }} />;
        
        case 'create_quest':
            return <CreateQuestScreen onCreate={handleCreateQuest} onBack={() => setAppState('main_app')} />;

        case 'main_app':
        default:
            return renderMainApp();
    }
};

export default TaskTribeApp;
