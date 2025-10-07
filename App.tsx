import React, { useState, useCallback, useEffect } from 'react';
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
import SpeakingScreen from './components/SpeakingScreen';
import SpeakingPart1Screen from './components/SpeakingPart1Screen';
import SpeakingPart2Screen from './components/SpeakingPart2Screen';
import SpeakingPart3Screen from './components/SpeakingPart3Screen';
import SpeakingPart4Screen from './components/SpeakingPart4Screen';
import SpeakingPart5Screen from './components/SpeakingPart5Screen';
import WritingPracticeScreen from './components/WritingPracticeScreen';
import WritingPart1Screen from './components/WritingPart1Screen';
import WritingPart2Screen from './components/WritingPart2Screen';
import WritingPart3Screen from './components/WritingPart3Screen';
import StatsFooter from './components/StatsFooter';
import LoginScreen from './components/LoginScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import MyProgressScreen from './components/MyProgressScreen';
import StudentManagementScreen from './components/StudentManagementScreen';
import HomeScreen from './components/HomeScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import { AppState, ReadingTestData, VocabularyTest, VocabularyPart, User, TestData, UserAnswers } from './types';
import { getReadingTest } from './services/readingLibrary';
import { getVocabularyPart, getVocabularyTest } from './services/vocabularyLibrary';
import { addTestResult } from './services/progressService';
import { LogoIcon } from './components/icons';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([
    { username: 'tester2', password: '123456' },
    { username: 'admin', password: 'phattoeic' },
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.PracticeHub);
  
  // Grammar State
  const [selectedGrammarTopic, setSelectedGrammarTopic] = useState<string | null>(null);
  
  // Reading State
  const [selectedReadingPart, setSelectedReadingPart] = useState<number | null>(null);
  const [selectedReadingTestData, setSelectedReadingTestData] = useState<ReadingTestData | null>(null);

  // Vocabulary State
  const [selectedVocabularyPart, setSelectedVocabularyPart] = useState<VocabularyPart | null>(null);
  const [selectedVocabularyTest, setSelectedVocabularyTest] = useState<VocabularyTest | null>(null);

  // Speaking State
  const [selectedSpeakingPart, setSelectedSpeakingPart] = useState<number | null>(null);
  
  // Writing State
  const [selectedWritingPart, setSelectedWritingPart] = useState<number | null>(null);

  // AI Mini-Test State
  const [miniTestData, setMiniTestData] = useState<TestData | null>(null);
  const [miniTestUserAnswers, setMiniTestUserAnswers] = useState<UserAnswers>({});
  
  // Admin State
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);


  const handleLoginSuccess = useCallback((user: User) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setAppState(AppState.PracticeHub);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedGrammarTopic(null);
    setSelectedReadingPart(null);
    setSelectedReadingTestData(null);
    setSelectedVocabularyPart(null);
    setSelectedVocabularyTest(null);
    setSelectedSpeakingPart(null);
    setSelectedWritingPart(null);
    setMiniTestData(null);
    setMiniTestUserAnswers({});
    setSelectedStudent(null);
    setAppState(AppState.PracticeHub);
  }, []);

  const handleStartMiniTest = useCallback((testData: TestData) => {
      setMiniTestData(testData);
      setMiniTestUserAnswers({});
      setAppState(AppState.MiniTest);
  }, []);
  
  const handleStartRandomGrammarTest = useCallback((testData: TestData) => {
    setMiniTestData(testData);
    setMiniTestUserAnswers({});
    setAppState(AppState.MiniTest);
  }, []);

  const handleSubmitMiniTest = useCallback((answers: UserAnswers) => {
      if (miniTestData && currentUser) {
          const score = miniTestData.questions.reduce((acc, q) => {
              return answers[q.id] === q.correctAnswer ? acc + 1 : acc;
          }, 0);
          addTestResult(currentUser.username, miniTestData.category, {
              id: `${miniTestData.category}-${Date.now()}`,
              title: miniTestData.testTitle,
              score,
              total: miniTestData.questions.length,
              date: Date.now()
          });
      }
      setMiniTestUserAnswers(answers);
      setAppState(AppState.MiniTestResults);
  }, [miniTestData, currentUser]);

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

  // Speaking Navigation Handlers
    const handleSelectSpeakingPart = useCallback((part: number) => {
        setSelectedSpeakingPart(part);
        switch (part) {
            case 1: setAppState(AppState.SpeakingPart1); break;
            case 2: setAppState(AppState.SpeakingPart2); break;
            case 3: setAppState(AppState.SpeakingPart3); break;
            case 4: setAppState(AppState.SpeakingPart4); break;
            case 5: setAppState(AppState.SpeakingPart5); break;
            default: setAppState(AppState.SpeakingHome); break;
        }
    }, []);

    const handleBackToSpeakingHome = useCallback(() => {
        setSelectedSpeakingPart(null);
        setAppState(AppState.SpeakingHome);
    }, []);

    // Writing Navigation Handlers
    const handleNavigateToWritingPractice = useCallback(() => {
        setAppState(AppState.WritingPracticeHome);
    }, []);

    const handleSelectWritingPart = useCallback((part: number) => {
        setSelectedWritingPart(part);
        switch (part) {
            case 1: setAppState(AppState.WritingPart1); break;
            case 2: setAppState(AppState.WritingPart2); break;
            case 3: setAppState(AppState.WritingPart3); break;
            default: setAppState(AppState.WritingPracticeHome); break;
        }
    }, []);

    const handleBackToWritingHome = useCallback(() => {
        setSelectedWritingPart(null);
        setAppState(AppState.WritingPracticeHome);
    }, []);

  // Password Change Handlers
  const handleNavigateToChangePassword = useCallback(() => {
    setAppState(AppState.ChangePassword);
  }, []);

  const handlePasswordChanged = useCallback((newPassword: string) => {
    if (currentUser) {
        setUsers(prevUsers => prevUsers.map(u => 
            u.username === currentUser.username ? { ...u, password: newPassword } : u
        ));
        setCurrentUser(prevUser => prevUser ? { ...prevUser, password: newPassword } : null);
    }
  }, [currentUser]);

  const handleNavigateToMyProgress = useCallback(() => {
    setSelectedStudent(null);
    setAppState(AppState.MyProgress);
  }, []);

  const handleNavigateToStudentManagement = useCallback(() => {
    setAppState(AppState.StudentManagement);
  }, []);

  const handleViewStudentProgress = useCallback((user: User) => {
    setSelectedStudent(user);
    setAppState(AppState.MyProgress);
  }, []);


  const renderContent = () => {
    switch (appState) {
      case AppState.DictationHome:
        return <DictationScreen currentUser={currentUser!} />;
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
          return <ReadingTestScreen testData={selectedReadingTestData} onBack={handleBackToReadingPartHome} currentUser={currentUser!} />;
        }
        handleBackToReadingPartHome();
        return null;
      case AppState.GrammarHome:
        return <GrammarScreen onSelectTopic={handleNavigateToGrammarTopic} onStartRandomTest={handleStartRandomGrammarTest} />;
      case AppState.GrammarTopic:
        if (selectedGrammarTopic) {
          return <GrammarTopicScreen topic={selectedGrammarTopic} onBack={handleBackToGrammarHome} currentUser={currentUser!} />;
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
        if(selectedVocabularyTest && currentUser) {
            return <VocabularyTestScreen testData={selectedVocabularyTest} onBack={handleBackToVocabularyPartHome} currentUser={currentUser} />
        }
        handleBackToVocabularyPartHome();
        return null;
       case AppState.SpeakingHome:
            return <SpeakingScreen onSelectPart={handleSelectSpeakingPart} />;
        case AppState.SpeakingPart1:
            if (selectedSpeakingPart === 1) return <SpeakingPart1Screen onBack={handleBackToSpeakingHome} currentUser={currentUser!} />;
            handleBackToSpeakingHome(); return null;
        case AppState.SpeakingPart2:
            if (selectedSpeakingPart === 2) return <SpeakingPart2Screen onBack={handleBackToSpeakingHome} currentUser={currentUser!} />;
            handleBackToSpeakingHome(); return null;
        case AppState.SpeakingPart3:
            if (selectedSpeakingPart === 3) return <SpeakingPart3Screen onBack={handleBackToSpeakingHome} currentUser={currentUser!} />;
            handleBackToSpeakingHome(); return null;
        case AppState.SpeakingPart4:
            if (selectedSpeakingPart === 4) return <SpeakingPart4Screen onBack={handleBackToSpeakingHome} currentUser={currentUser!} />;
            handleBackToSpeakingHome(); return null;
        case AppState.SpeakingPart5:
            if (selectedSpeakingPart === 5) return <SpeakingPart5Screen onBack={handleBackToSpeakingHome} currentUser={currentUser!} />;
            handleBackToSpeakingHome(); return null;
        case AppState.WritingPracticeHome:
            return <WritingPracticeScreen onSelectPart={handleSelectWritingPart} />;
        case AppState.WritingPart1:
            if (selectedWritingPart === 1) return <WritingPart1Screen onBack={handleBackToWritingHome} currentUser={currentUser!} />;
            handleBackToWritingHome(); return null;
        case AppState.WritingPart2:
            if (selectedWritingPart === 2) return <WritingPart2Screen onBack={handleBackToWritingHome} currentUser={currentUser!} />;
            handleBackToWritingHome(); return null;
        case AppState.WritingPart3:
            if (selectedWritingPart === 3) return <WritingPart3Screen onBack={handleBackToWritingHome} currentUser={currentUser!} />;
            handleBackToWritingHome(); return null;
      case AppState.ChangePassword:
        if (currentUser) {
            return <ChangePasswordScreen currentPasswordValue={currentUser.password} onPasswordChanged={handlePasswordChanged} onBack={handleGoHome} />;
        }
        handleGoHome();
        return null;
      case AppState.MiniTestHome:
        return <HomeScreen onStartTest={handleStartMiniTest} />;
      case AppState.MiniTest:
        if (miniTestData) {
            return <TestScreen testData={miniTestData} userAnswers={miniTestUserAnswers} onSubmit={handleSubmitMiniTest} />;
        }
        return <HomeScreen onStartTest={handleStartMiniTest} />;
      case AppState.MiniTestResults:
        if (miniTestData) {
            return <ResultsScreen testData={miniTestData} userAnswers={miniTestUserAnswers} onGoHome={handleGoHome} />;
        }
        return <HomeScreen onStartTest={handleStartMiniTest} />;
      case AppState.StudentManagement:
        if (currentUser?.username === 'admin') {
            return <StudentManagementScreen users={users} onViewStudentProgress={handleViewStudentProgress} />;
        }
        handleGoHome();
        return null;
      case AppState.MyProgress:
        if (currentUser) {
            const isAdminViewingStudent = currentUser.username === 'admin' && selectedStudent;
            const userToView = isAdminViewingStudent ? selectedStudent : currentUser;
            const onBackAction = isAdminViewingStudent ? handleNavigateToStudentManagement : handleGoHome;
            return <MyProgressScreen viewingUser={userToView!} isOwnProgress={!isAdminViewingStudent} onBack={onBackAction} />;
        }
        handleGoHome();
        return null;
      case AppState.PracticeHub:
      default:
        return <PracticeHub 
          onNavigateToPracticeTest={() => setAppState(AppState.MiniTestHome)}
          onNavigateToDictation={() => setAppState(AppState.DictationHome)}
          onNavigateToReadingPractice={() => setAppState(AppState.ReadingPracticeHome)}
          onNavigateToGrammar={() => setAppState(AppState.GrammarHome)}
          onNavigateToVocabulary={() => setAppState(AppState.VocabularyHome)}
          onNavigateToSpeaking={() => setAppState(AppState.SpeakingHome)}
          onNavigateToWritingPractice={handleNavigateToWritingPractice}
        />;
    }
  };

  if (!isAuthenticated || !currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} users={users} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10 border-b border-slate-200">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={handleGoHome}>
              <LogoIcon className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-slate-800 tracking-tight">TOEIC Zone with Mr. Phat</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
                <button 
                    onClick={handleGoHome}
                    className="font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="Go to home page"
                >
                    Home
                </button>
                {currentUser.username === 'admin' && (
                    <button
                        onClick={handleNavigateToStudentManagement}
                        className="font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                        aria-label="Manage students"
                    >
                        Quản lý học viên
                    </button>
                )}
                 <button
                    onClick={handleNavigateToMyProgress}
                    className="font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    aria-label="View my progress"
                >
                    Kết quả học của tôi
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