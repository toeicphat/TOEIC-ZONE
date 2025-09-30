import React, { useState, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import PracticeHub from './components/PracticeHub';
import DictationScreen from './components/DictationScreen';
import ReadingPracticeScreen from './components/ReadingPracticeScreen';
import ReadingPartScreen from './components/ReadingPartScreen';
import ReadingTestScreen from './components/ReadingTestScreen';
import GrammarScreen from './components/GrammarScreen';
import GrammarTopicScreen from './components/GrammarTopicScreen';
import VocabularyScreen from './components/VocabularyScreen';
import VocabularyPartScreen from './components/VocabularyPartScreen';
import VocabularyTestScreen from './components/VocabularyTestScreen';
import StatsFooter from './components/StatsFooter';
import LoginScreen from './components/LoginScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import { AppState, TestData, UserAnswers, ReadingTestData, VocabularyTest, VocabularyPart } from './types';
import { getReadingTest } from './services/readingLibrary';
import { getVocabularyPart, getVocabularyTest } from './services/vocabularyLibrary';
import { LogoIcon } from './components/icons';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username] = useState<string>('tester1');
  const [password, setPassword] = useState<string>('phattoeic');
  const [appState, setAppState] = useState<AppState>(AppState.PracticeHub);
  const [testData, setTestData] = useState<TestData | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null);
  
  // Grammar State
  const [selectedGrammarTopic, setSelectedGrammarTopic] = useState<string | null>(null);
  
  // Reading State
  const [selectedReadingPart, setSelectedReadingPart] = useState<number | null>(null);
  const [selectedReadingTestData, setSelectedReadingTestData] = useState<ReadingTestData | null>(null);

  // Vocabulary State
  const [selectedVocabularyPart, setSelectedVocabularyPart] = useState<VocabularyPart | null>(null);
  const [selectedVocabularyTest, setSelectedVocabularyTest] = useState<VocabularyTest | null>(null);
  
  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setAppState(AppState.PracticeHub);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const handleStartTest = useCallback((data: TestData) => {
    setTestData(data);
    const initialAnswers: UserAnswers = {};
    data.questions.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setUserAnswers(initialAnswers);
    setAppState(AppState.Test);
  }, []);

  const handleSubmitTest = useCallback((answers: UserAnswers) => {
    setUserAnswers(answers);
    setAppState(AppState.Results);
  }, []);

  const handleGoHome = useCallback(() => {
    setTestData(null);
    setUserAnswers(null);
    setSelectedGrammarTopic(null);
    setSelectedReadingPart(null);
    setSelectedReadingTestData(null);
    setSelectedVocabularyPart(null);
    setSelectedVocabularyTest(null);
    setAppState(AppState.PracticeHub);
  }, []);

  const handleNavigateToGrammarTopic = useCallback((topic: string) => {
    setSelectedGrammarTopic(topic);
    setAppState(AppState.GrammarTopic);
  }, []);

  const handleBackToGrammarHome = useCallback(() => {
    setSelectedGrammarTopic(null);
    setAppState(AppState.GrammarHome);
  }, []);

  const handleSelectReadingPart = useCallback((part: number) => {
    setSelectedReadingPart(part);
    setAppState(AppState.ReadingPartHome);
  }, []);

  const handleSelectReadingTest = useCallback((part: number, testId: number) => {
    const test = getReadingTest(part, testId);
    setSelectedReadingTestData(test);
    setAppState(AppState.ReadingTest);
  }, []);

  const handleBackToReadingPracticeHome = useCallback(() => {
    setSelectedReadingPart(null);
    setAppState(AppState.ReadingPracticeHome);
  }, []);

  const handleBackToReadingPartHome = useCallback(() => {
    setSelectedReadingTestData(null);
    setAppState(AppState.ReadingPartHome);
  }, []);

  // Vocabulary Navigation Handlers
  const handleSelectVocabularyPart = useCallback((partId: number) => {
    const partData = getVocabularyPart(partId);
    setSelectedVocabularyPart(partData);
    setAppState(AppState.VocabularyPartHome);
  }, []);

  const handleSelectVocabularyTest = useCallback((partId: number, testId: number) => {
    const test = getVocabularyTest(partId, testId);
    setSelectedVocabularyTest(test);
    setAppState(AppState.VocabularyTest);
  }, []);
  
  const handleBackToVocabularyHome = useCallback(() => {
      setSelectedVocabularyPart(null);
      setAppState(AppState.VocabularyHome);
  }, []);
  
  const handleBackToVocabularyPartHome = useCallback(() => {
      setSelectedVocabularyTest(null);
      setAppState(AppState.VocabularyPartHome);
  }, []);

  // Password Change Handlers
  const handleNavigateToChangePassword = useCallback(() => {
    setAppState(AppState.ChangePassword);
  }, []);

  const handlePasswordChanged = useCallback((newPassword: string) => {
    setPassword(newPassword);
  }, []);


  const renderContent = () => {
    switch (appState) {
      case AppState.PracticeTestHome:
        return <HomeScreen onStartTest={handleStartTest} />;
      case AppState.DictationHome:
        return <DictationScreen />;
      case AppState.ReadingPracticeHome:
        return <ReadingPracticeScreen onSelectPart={handleSelectReadingPart} />;
      case AppState.ReadingPartHome:
        if (selectedReadingPart) {
          return <ReadingPartScreen part={selectedReadingPart} onSelectTest={handleSelectReadingTest} onBack={handleBackToReadingPracticeHome} />;
        }
        handleGoHome();
        return null;
      case AppState.ReadingTest:
        if (selectedReadingTestData) {
          return <ReadingTestScreen testData={selectedReadingTestData} onBack={handleBackToReadingPartHome} />;
        }
        handleBackToReadingPartHome();
        return null;
      case AppState.GrammarHome:
        return <GrammarScreen onSelectTopic={handleNavigateToGrammarTopic} />;
      case AppState.GrammarTopic:
        if (selectedGrammarTopic) {
          return <GrammarTopicScreen topic={selectedGrammarTopic} onBack={handleBackToGrammarHome} />;
        }
        handleBackToGrammarHome();
        return null;
      case AppState.VocabularyHome:
          return <VocabularyScreen onSelectPart={handleSelectVocabularyPart} />;
      case AppState.VocabularyPartHome:
        if(selectedVocabularyPart) {
            return <VocabularyPartScreen partData={selectedVocabularyPart} onSelectTest={handleSelectVocabularyTest} onBack={handleBackToVocabularyHome} />
        }
        handleBackToVocabularyHome();
        return null;
      case AppState.VocabularyTest:
        if(selectedVocabularyTest) {
            return <VocabularyTestScreen testData={selectedVocabularyTest} onBack={handleBackToVocabularyPartHome} />
        }
        handleBackToVocabularyPartHome();
        return null;
      case AppState.ChangePassword:
        return <ChangePasswordScreen currentPasswordValue={password} onPasswordChanged={handlePasswordChanged} onBack={handleGoHome} />;
      case AppState.Test:
        if (testData && userAnswers) {
          return <TestScreen testData={testData} userAnswers={userAnswers} onSubmit={handleSubmitTest} />;
        }
        handleGoHome();
        return null;
      case AppState.Results:
        if (testData && userAnswers) {
          return <ResultsScreen testData={testData} userAnswers={userAnswers} onGoHome={handleGoHome} />;
        }
        handleGoHome();
        return null;
      case AppState.PracticeHub:
      default:
        return <PracticeHub 
          onNavigateToPracticeTest={() => setAppState(AppState.PracticeTestHome)}
          onNavigateToDictation={() => setAppState(AppState.DictationHome)}
          onNavigateToReadingPractice={() => setAppState(AppState.ReadingPracticeHome)}
          onNavigateToGrammar={() => setAppState(AppState.GrammarHome)}
          onNavigateToVocabulary={() => setAppState(AppState.VocabularyHome)}
        />;
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} validUsername={username} validPassword={password} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={handleGoHome}>
              <LogoIcon className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-slate-800 tracking-tight">TOEIC Zone with Mr. Phat</h1>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6">
                <button 
                    onClick={handleGoHome}
                    className="font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="Go to home page"
                >
                    Home
                </button>
                <button
                    onClick={handleNavigateToChangePassword}
                    className="font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="Change password"
                >
                    Change Password
                </button>
                <button
                    onClick={handleLogout}
                    className="font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="Log out"
                >
                    Log Out
                </button>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        {renderContent()}
      </main>
      <StatsFooter />
    </div>
  );
};

export default App;