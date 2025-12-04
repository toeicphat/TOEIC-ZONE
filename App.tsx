
import React, { useState, useCallback, useEffect } from 'react';
import PracticeHub from './components/PracticeHub';
import DictationScreen from './components/DictationScreen';
import ReadingPracticeScreen from './components/ReadingPracticeScreen';
import ReadingPracticeSetupScreen from './components/ReadingPartScreen';
import ReadingTestScreen from './components/ReadingTestScreen';
import GrammarScreen from './components/GrammarScreen';
import GrammarTopicScreen from './components/GrammarTopicScreen';
import VocabularyScreen from './components/VocabularyScreen';
import VocabularyPartScreen from './components/VocabularyPartScreen';
import VocabularyTestScreen from './components/VocabularyTestScreen';
import SpokenTranslationScreen from './components/SpokenTranslationScreen';
import ListeningTranslationHomeScreen from './components/ListeningTranslationHomeScreen';
import ListeningTranslationSetupScreen from './components/ListeningTranslationSetupScreen';
import ListeningTranslationScreen from './components/ListeningTranslationScreen';
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
import PronunciationHomeScreen from './components/PronunciationHomeScreen';
import PronunciationPracticeScreen from './components/PronunciationPracticeScreen';
import StatsFooter from './components/StatsFooter';
import LoginScreen from './components/LoginScreen';
import { MyProgressScreen } from './components/MyProgressScreen';
import StudentManagementScreen from './components/StudentManagementScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import SettingsScreen from './components/SettingsScreen';
import { AppState, ReadingTestData, VocabularyTest, VocabularyPart, User, TestData, UserAnswers, LibraryDictationExercise, UserSettings } from './types';
import { getReadingTest, allReadingTests, allReading700Tests, allReading2023Tests } from './services/readingLibrary';
import { getVocabularyPart, getVocabularyTest } from './services/vocabularyLibrary';
import { getGrammarQuizQuestions } from './services/grammarLibrary';
import { addTestResult } from './services/progressService';
import { getSettings, saveSettings } from './services/settingsService';
import { LoadingIcon, HeadphoneIcon } from './components/icons';
import { allDictationTests, getDictationExercisesForParts } from './services/dictationLibrary';
import DictationPracticeSetupScreen from './components/DictationPracticeSetupScreen';
import DictationTestScreen from './components/DictationTestScreen';

const NavButton: React.FC<{ onClick: () => void, children: React.ReactNode, isActive: boolean }> = ({ onClick, children, isActive }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            isActive ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
    >
        {children}
    </button>
);

interface NewsPopupProps {
    onClose: () => void;
}

const NewsPopup: React.FC<NewsPopupProps> = ({ onClose }) => (
    <div className="fixed top-24 right-4 z-50 w-80 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 animate-fade-in-down">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Thông báo quan trọng!</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                &times;
            </button>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
            <span className="font-semibold">Thời gian:</span> 15:00 - 13/11/2025
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Hiện tại trang web đang bị cắt giảm các tính năng sử dụng AI nên người dùng có thể gặp lỗi "Failed to generate text from API". Khi gặp lỗi này, các bạn hãy thoát trang web và đợi trong vài phút rồi thử lại nhé.
        </p>
    </div>
);


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([
    { username: 'tester2', password: '123456' },
    { username: 'admin', password: 'phattoeic' },
    { username: 'hongquyen22102004@gmail.com', password: 'thidautoeic' },
    { username: 'myquynh070404@gmail.com', password: 'thidautoeic' },
    { username: 'ltrieuvy181104@gmail.com', password: 'thidautoeic' },
    { username: 'hoangphuctayninh1708@gmail.com', password: 'thidautoeic' },
    { username: 'V0932089072@gmail.com', password: 'thidautoeic' },
    { username: 'tavanquy.09102003@gmail.com', password: 'thidautoeic' },
    { username: 'chanhsp2003@gmail.com', password: 'thidautoeic' },
    { username: 'ntkimphuc.work@gmail.com', password: 'thidautoeic' },
    { username: 'phungquangduy2610@gmail.com', password: 'thidautoeic' },
    { username: 'thupham.241004@gmail.com', password: 'thidautoeic' },
    { username: 'luongthihongquy2240@gmail.com', password: 'thidautoeic' },
    { username: 'luongzattu800@gmail.com', password: 'thidautoeic' },
    { username: 'tranvi06042004@gmail.com', password: 'thidautoeic' },
    { username: 'phammynhu6104@gmail.com', password: 'thidautoeic' },
    { username: 'minhchungsuke121@gmail.com', password: 'thidautoeic' },
    { username: 'tamlan0703@gmail.com', password: 'thidautoeic' },
    { username: 'thanhtuyenbd2005@gmail.com', password: 'thidautoeic' },
    { username: 'cnk0710.cv@gmail.com', password: 'thidautoeic' },
    { username: 'hoa842006@gmail.com', password: 'thidautoeic' },
    { username: 'nttuephuong.2211@gmail.com', password: 'thidautoeic' },
    { username: 'tranquochai17753@gmail.com', password: 'thidautoeic' },
    { username: 'vothuyphuonguyen01@gmail.com', password: 'thidautoeic' },
    { username: 'minhtholeabc@gmail.com', password: 'thidautoeic' },
    { username: 'hav8756@gmail.com', password: 'thidautoeic' },
    { username: 'lequocthach91@gmail.com', password: 'thidautoeic' },
    { username: 'vodieu937@gmail.com', password: 'thidautoeic' },
    { username: 'buingocanh2046@gmail.com', password: 'thidautoeic' },
    { username: 'kieuanhnguyen322@gmail.com', password: 'thidautoeic' },
    { username: 'luongthaonguyen2002@gmail.com', password: 'thidautoeic' },
    { username: 'pebanh0505@gmail.com', password: 'thidautoeic' },
    { username: 'nguyenkimkhanh278@gmail.com', password: 'thidautoeic' },
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.PracticeHub);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  
  // Grammar State
  const [selectedGrammarTopic, setSelectedGrammarTopic] = useState<string | null>(null);

  // Dictation State
  const [selectedDictationTestId, setSelectedDictationTestId] = useState<number | null>(null);
  const [selectedDictationTestData, setSelectedDictationTestData] = useState<{ id: number; title: string; exercises: LibraryDictationExercise[] } | null>(null);
  
  // Reading State
  const [selectedReadingTestId, setSelectedReadingTestId] = useState<number | null>(null);
  const [selectedReadingTestData, setSelectedReadingTestData] = useState<ReadingTestData | null>(null);
  const [selectedReadingTimeLimit, setSelectedReadingTimeLimit] = useState<number | null>(null);


  // Vocabulary State
  const [selectedVocabularyPart, setSelectedVocabularyPart] = useState<VocabularyPart | null>(null);
  const [selectedVocabularyTest, setSelectedVocabularyTest] = useState<VocabularyTest | null>(null);
  
  // Listening & Translation State
  const [selectedListeningTranslationTestId, setSelectedListeningTranslationTestId] = useState<number | null>(null);
  const [selectedListeningTranslationTime, setSelectedListeningTranslationTime] = useState<number | null>(null);
  const [selectedListeningTranslationSentenceCount, setSelectedListeningTranslationSentenceCount] = useState<number | null>(null);

  // Speaking State
  const [selectedSpeakingPart, setSelectedSpeakingPart] = useState<number | null>(null);
  
  // Writing State
  const [selectedWritingPart, setSelectedWritingPart] = useState<number | null>(null);

  // Unified Test State
  const [currentTest, setCurrentTest] = useState<TestData | null>(null);
  const [currentUserAnswers, setCurrentUserAnswers] = useState<UserAnswers>({});
  
  // Admin State
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

 useEffect(() => {
    const initializeApp = async () => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                const user: User = JSON.parse(storedUser);
                const settings = await getSettings(user.username);
                setCurrentUser(user);
                setUserSettings(settings);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Failed to initialize app from storage", error);
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
        } finally {
            setIsLoading(false);
        }
    };
    initializeApp();
}, []);

  // FIX: This effect handles state redirection to prevent rendering loops.
  useEffect(() => {
    if (appState === AppState.StudentManagement && currentUser?.username !== 'admin') {
        // If a non-admin user is somehow in the student management state, redirect them to the practice hub.
        setAppState(AppState.PracticeHub);
    }
  }, [appState, currentUser]);

  const handleLoginSuccess = useCallback(async (user: User) => {
    setIsLoggingIn(true);
    try {
        const settings = await getSettings(user.username);
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', `dummy-token-for-${user.username}`);
        
        setUserSettings(settings);
        setCurrentUser(user);
        setIsAuthenticated(true);
        setAppState(AppState.PracticeHub);
    } catch (error) {
        console.error("Failed to fetch user data on login:", error);
    } finally {
        setIsLoggingIn(false);
    }
}, []);
  
  useEffect(() => {
    if (userSettings?.darkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [userSettings?.darkMode]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserSettings(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    setAppState(AppState.PracticeHub);
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedGrammarTopic(null);
    setSelectedReadingTestId(null);
    setSelectedReadingTestData(null);
    setSelectedReadingTimeLimit(null);
    setSelectedVocabularyPart(null);
    setSelectedVocabularyTest(null);
    setSelectedSpeakingPart(null);
    setSelectedWritingPart(null);
    setCurrentTest(null);
    setCurrentUserAnswers({});
    setSelectedStudent(null);
    setSelectedDictationTestId(null);
    setSelectedDictationTestData(null);
    setSelectedListeningTranslationTestId(null);
    setSelectedListeningTranslationTime(null);
    setSelectedListeningTranslationSentenceCount(null);
    setAppState(AppState.PracticeHub);
  }, []);
  
  const handleStartRandomGrammarTest = useCallback((testData: TestData) => {
    setCurrentTest(testData);
    setCurrentUserAnswers({});
    setAppState(AppState.MiniTest);
  }, []);
  
  const handleStartGrammarQuiz = useCallback((topic: string, level: string) => {
    const quizQuestions = getGrammarQuizQuestions(topic, level);
    const testData: TestData = {
        testTitle: `${topic} - ${level}`,
        duration: 0, // 0 for untimed
        questions: quizQuestions.map(q => ({...q, part: 5})),
        category: 'grammar'
    };
    setCurrentTest(testData);
    setCurrentUserAnswers({});
    setAppState(AppState.MiniTest);
  }, []);

  const handleSubmitTest = useCallback(async (answers: UserAnswers) => {
      if (currentTest && currentUser) {
          const score = currentTest.questions.reduce((acc, q) => {
              return answers[q.id] === q.correctAnswer ? acc + 1 : acc;
          }, 0);
          await addTestResult(currentUser.username, currentTest.category, {
              id: `${currentTest.category}-${Date.now()}`,
              title: currentTest.testTitle,
              score,
              total: currentTest.questions.length,
              date: Date.now()
          });
      }
      setCurrentUserAnswers(answers);
      setAppState(AppState.MiniTestResults);
  }, [currentTest, currentUser]);

  const handleNavigateToGrammarTopic = useCallback((topic: string) => {
    setSelectedGrammarTopic(topic);
    setAppState(AppState.GrammarTopic);
  }, []);

  const handleBackToGrammarHome = useCallback(() => {
    setSelectedGrammarTopic(null);
    setAppState(AppState.GrammarHome);
  }, []);

  // Dictation Navigation Handlers
  const handleSelectDictationTestSet = useCallback((testId: number) => {
    setSelectedDictationTestId(testId);
    setAppState(AppState.DictationPracticeSetup);
  }, []);

  const handleStartDictationPractice = useCallback((parts: number[]) => {
    if (!selectedDictationTestId || parts.length === 0) {
        handleGoHome();
        return;
    }

    const testSet = allDictationTests.find(t => t.id === selectedDictationTestId);
    if (!testSet) {
        handleGoHome();
        return;
    }

    const combinedExercises = getDictationExercisesForParts(selectedDictationTestId, parts);
    const combinedTitle = `${testSet.title} - ${parts.map(p => `Part ${p}`).join(' & ')}`;
    
    const newTestData = { 
        id: selectedDictationTestId, 
        title: combinedTitle, 
        exercises: combinedExercises
    };

    setSelectedDictationTestData(newTestData);
    setAppState(AppState.DictationTest);
  }, [selectedDictationTestId, handleGoHome]);

  const handleBackToDictationPracticeHome = useCallback(() => {
    setSelectedDictationTestId(null);
    setAppState(AppState.DictationPracticeHome);
  }, []);
  
  const handleBackToDictationSetup = useCallback(() => {
      setSelectedDictationTestData(null);
      setAppState(AppState.DictationPracticeSetup);
  }, []);
  
  // Reading Navigation Handlers
  const handleSelectReadingTestSet = useCallback((testId: number) => {
    setSelectedReadingTestId(testId);
    setAppState(AppState.ReadingPracticeSetup);
  }, []);

  const handleStartReadingPractice = useCallback((parts: number[], timeLimit: number | null) => {
      if (!selectedReadingTestId || parts.length === 0) {
          handleGoHome();
          return;
      }
  
      const allTests = [...allReadingTests, ...allReading700Tests, ...allReading2023Tests];
      const testSet = allTests.find(t => t.id === selectedReadingTestId);
      if (!testSet) {
          handleGoHome();
          return;
      }
  
      const combinedPassages = parts.flatMap(partNum => {
          const partData = getReadingTest(selectedReadingTestId, partNum);
          return partData ? partData.passages : [];
      });
  
      const combinedTitle = `${testSet.title} - ${parts.map(p => `Part ${p}`).join(' & ')}`;
      
      const newTestData: ReadingTestData = { 
          id: selectedReadingTestId, 
          title: combinedTitle, 
          part: 0, // 0 signifies a custom mix
          passages: combinedPassages 
      };
  
      setSelectedReadingTestData(newTestData);
      setSelectedReadingTimeLimit(timeLimit);
      setAppState(AppState.ReadingTest);
  }, [selectedReadingTestId, handleGoHome]);


  const handleBackToReadingPracticeHome = useCallback(() => {
    setSelectedReadingTestId(null);
    setAppState(AppState.ReadingPracticeHome);
  }, []);

  const handleBackToReadingSetup = useCallback(() => {
      setSelectedReadingTestData(null);
      setSelectedReadingTimeLimit(null);
      setAppState(AppState.ReadingPracticeSetup);
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

  const handleStartSpokenTranslationPractice = useCallback((test: VocabularyTest) => {
    setSelectedVocabularyTest(test);
    setAppState(AppState.SPOKEN_TRANSLATION_PRACTICE);
  }, []);

  const handleBackToVocabularyTest = useCallback(() => {
    setAppState(AppState.VocabularyTest);
  }, []);
  
    // Listening and Translation Navigation Handlers
    const handleNavigateToListeningTranslation = useCallback(() => setAppState(AppState.LISTENING_TRANSLATION_HOME), []);

    const handleNavigateToListeningTranslationSetup = useCallback((testId: number) => {
        setSelectedListeningTranslationTestId(testId);
        setAppState(AppState.LISTENING_TRANSLATION_SETUP);
    }, []);

    const handleStartListeningTranslationPractice = useCallback((sentenceCount: number, timeLimit: number) => {
        setSelectedListeningTranslationSentenceCount(sentenceCount);
        setSelectedListeningTranslationTime(timeLimit);
        setAppState(AppState.LISTENING_TRANSLATION_PRACTICE);
    }, []);
    
    const handleBackToListeningTranslationHome = useCallback(() => {
        setSelectedListeningTranslationTestId(null);
        setAppState(AppState.LISTENING_TRANSLATION_HOME);
    }, []);

    const handleBackToListeningTranslationSetup = useCallback(() => {
        setSelectedListeningTranslationTime(null);
        setSelectedListeningTranslationSentenceCount(null);
        setAppState(AppState.LISTENING_TRANSLATION_SETUP);
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
    
    // Pronunciation Navigation Handlers
    const handleNavigateToPronunciation = useCallback(() => setAppState(AppState.PronunciationHome), []);
    const handleStartSingleWordPractice = useCallback(() => setAppState(AppState.SingleWordPractice), []);


    const handleNavigateToDictation = useCallback(() => setAppState(AppState.DictationPracticeHome), []);
    const handleNavigateToReadingPractice = useCallback(() => setAppState(AppState.ReadingPracticeHome), []);
    const handleNavigateToGrammar = useCallback(() => setAppState(AppState.GrammarHome), []);
    const handleNavigateToVocabulary = useCallback(() => setAppState(AppState.VocabularyHome), []);
    const handleNavigateToSpeaking = useCallback(() => setAppState(AppState.SpeakingHome), []);
    
    const toggleNewsPopup = () => setShowNewsPopup(prev => !prev);

    const renderContent = () => {
        if (!currentUser) return null;
        
        // FIX: Removed redundant `if` block and corrected PracticeHub props usage in the switch statement.
        // The `onNavigateToPracticeTest` prop is obsolete and was causing errors. All navigation props
        // are now correctly passed via the `practiceHubProps` object. This also resolves a
        // potential TypeScript control-flow analysis issue.

        const practiceHubProps = {
            onNavigateToDictation: handleNavigateToDictation,
            onNavigateToReadingPractice: handleNavigateToReadingPractice,
            onNavigateToGrammar: handleNavigateToGrammar,
            onNavigateToVocabulary: handleNavigateToVocabulary,
            onNavigateToSpeaking: handleNavigateToSpeaking,
            onNavigateToWritingPractice: handleNavigateToWritingPractice,
            onNavigateToPronunciation: handleNavigateToPronunciation,
            onNavigateToListeningTranslation: handleNavigateToListeningTranslation,
        };

        switch (appState) {
            // FIX: Removed invalid 'onNavigateToPracticeTest' prop.
            case AppState.PracticeHub:
                return <PracticeHub {...practiceHubProps} />;
            case AppState.MiniTest:
                // FIX: Removed invalid 'onNavigateToPracticeTest' prop.
                if (!currentTest) return <PracticeHub {...practiceHubProps} />;
                return <TestScreen testData={currentTest} userAnswers={currentUserAnswers} onSubmit={handleSubmitTest} />;
            case AppState.MiniTestResults:
                // FIX: Removed invalid 'onNavigateToPracticeTest' prop.
                if (!currentTest) return <PracticeHub {...practiceHubProps} />;
                return <ResultsScreen testData={currentTest} userAnswers={currentUserAnswers} onGoHome={handleGoHome} />;
            case AppState.DictationPracticeHome:
                return <DictationScreen currentUser={currentUser} onSelectTestSet={handleSelectDictationTestSet} />;
            case AppState.DictationPracticeSetup:
                if (selectedDictationTestId === null) return null;
                return <DictationPracticeSetupScreen testId={selectedDictationTestId} onStartPractice={handleStartDictationPractice} onBack={handleBackToDictationPracticeHome} />;
            case AppState.DictationTest:
                if (!selectedDictationTestData) return null;
                return <DictationTestScreen testData={selectedDictationTestData} currentUser={currentUser} onBack={handleBackToDictationSetup} />;
            case AppState.ReadingPracticeHome:
                return <ReadingPracticeScreen onSelectTestSet={handleSelectReadingTestSet} />;
            case AppState.ReadingPracticeSetup:
                if (selectedReadingTestId === null) return null;
                return <ReadingPracticeSetupScreen testId={selectedReadingTestId} onStartPractice={handleStartReadingPractice} onBack={handleBackToReadingPracticeHome} />;
            case AppState.ReadingTest:
                if (!selectedReadingTestData) return null;
                return <ReadingTestScreen testData={selectedReadingTestData} onBack={handleBackToReadingSetup} currentUser={currentUser} durationInSeconds={selectedReadingTimeLimit} />;
            case AppState.GrammarHome:
                return <GrammarScreen onSelectTopic={handleNavigateToGrammarTopic} onStartRandomTest={handleStartRandomGrammarTest} />;
            case AppState.GrammarTopic:
                if (!selectedGrammarTopic) return null;
                return <GrammarTopicScreen 
                    topic={selectedGrammarTopic} 
                    onBack={handleBackToGrammarHome} 
                    currentUser={currentUser}
                    onSelectTopic={handleNavigateToGrammarTopic}
                    onStartQuiz={handleStartGrammarQuiz}
                />;
            case AppState.VocabularyHome:
                return <VocabularyScreen onSelectPart={handleSelectVocabularyPart} />;
            case AppState.VocabularyPartHome:
                if (!selectedVocabularyPart) return null;
                return <VocabularyPartScreen partData={selectedVocabularyPart} onSelectTest={handleSelectVocabularyTest} onBack={handleBackToVocabularyHome} />;
            case AppState.VocabularyTest:
                if (!selectedVocabularyTest) return null;
                return <VocabularyTestScreen 
                    testData={selectedVocabularyTest} 
                    onBack={handleBackToVocabularyPartHome} 
                    currentUser={currentUser} 
                    onStartSpokenTranslationPractice={handleStartSpokenTranslationPractice}
                />;
            case AppState.SPOKEN_TRANSLATION_PRACTICE:
                if (!selectedVocabularyTest) return null;
                return <SpokenTranslationScreen
                    currentVocabularyList={selectedVocabularyTest.words}
                    onBack={handleBackToVocabularyTest}
                />;
            case AppState.LISTENING_TRANSLATION_HOME:
                 return <ListeningTranslationHomeScreen onSelectTest={handleNavigateToListeningTranslationSetup} />;
            case AppState.LISTENING_TRANSLATION_SETUP:
                if (selectedListeningTranslationTestId === null) return null;
                return <ListeningTranslationSetupScreen testId={selectedListeningTranslationTestId} onStartPractice={handleStartListeningTranslationPractice} onBack={handleBackToListeningTranslationHome} />;
            case AppState.LISTENING_TRANSLATION_PRACTICE:
                if (selectedListeningTranslationTime === null || selectedListeningTranslationTestId === null || selectedListeningTranslationSentenceCount === null) {
                    return <ListeningTranslationSetupScreen testId={selectedListeningTranslationTestId!} onStartPractice={handleStartListeningTranslationPractice} onBack={handleBackToListeningTranslationHome} />;
                }
                return <ListeningTranslationScreen 
                            onBack={handleBackToListeningTranslationSetup} 
                            timeLimit={selectedListeningTranslationTime} 
                            testId={selectedListeningTranslationTestId} 
                            sentenceCount={selectedListeningTranslationSentenceCount}
                            currentUser={currentUser}
                        />;
            case AppState.SpeakingHome:
                return <SpeakingScreen onSelectPart={handleSelectSpeakingPart} />;
            case AppState.SpeakingPart1:
                return <SpeakingPart1Screen onBack={handleBackToSpeakingHome} currentUser={currentUser} />;
            case AppState.SpeakingPart2:
                return <SpeakingPart2Screen onBack={handleBackToSpeakingHome} currentUser={currentUser} />;
            case AppState.SpeakingPart3:
                return <SpeakingPart3Screen onBack={handleBackToSpeakingHome} currentUser={currentUser} />;
            case AppState.SpeakingPart4:
                return <SpeakingPart4Screen onBack={handleBackToSpeakingHome} currentUser={currentUser} />;
            case AppState.SpeakingPart5:
                return <SpeakingPart5Screen onBack={handleBackToSpeakingHome} currentUser={currentUser} />;
            case AppState.WritingPracticeHome:
                return <WritingPracticeScreen onSelectPart={handleSelectWritingPart} />;
            case AppState.WritingPart1:
                return <WritingPart1Screen onBack={handleBackToWritingHome} currentUser={currentUser} />;
            case AppState.WritingPart2:
                return <WritingPart2Screen onBack={handleBackToWritingHome} currentUser={currentUser} />;
            case AppState.WritingPart3:
                return <WritingPart3Screen onBack={handleBackToWritingHome} currentUser={currentUser} />;
            case AppState.PronunciationHome:
                return <PronunciationHomeScreen onStartSingleWordPractice={handleStartSingleWordPractice} />;
            case AppState.SingleWordPractice:
                return <PronunciationPracticeScreen onBack={() => setAppState(AppState.PronunciationHome)} currentUser={currentUser} />;
            case AppState.MyProgress:
                if (selectedStudent) {
                    return <MyProgressScreen 
                        viewingUser={selectedStudent} 
                        onBack={() => {
                            setSelectedStudent(null);
                            setAppState(AppState.StudentManagement);
                        }} 
                        isOwnProgress={false} 
                    />;
                }
                return <MyProgressScreen viewingUser={currentUser} onBack={handleGoHome} isOwnProgress={true} />;
            case AppState.StudentManagement:
                // The check for admin is now in a useEffect hook to prevent render loops.
                return <StudentManagementScreen users={users} onViewStudentProgress={(user) => { setSelectedStudent(user); setAppState(AppState.MyProgress) }} />;
            case AppState.Settings:
                if (!userSettings) return null;
                return <SettingsScreen
                    currentUser={currentUser}
                    userSettings={userSettings}
                    onSettingsChange={async (newSettings) => {
                        const updatedSettings = { ...userSettings, ...newSettings };
                        setUserSettings(updatedSettings);
                        await saveSettings(currentUser.username, updatedSettings);
                    }}
                    onPasswordChanged={async (newPassword) => {
                        const updatedUser = { ...currentUser, password: newPassword };
                        const updatedUsers = users.map(u => u.username === currentUser.username ? updatedUser : u);
                        setUsers(updatedUsers);
                        setCurrentUser(updatedUser);
                        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); 
                    }}
                    onBack={handleGoHome}
                />;
            default:
                // FIX: Removed invalid 'onNavigateToPracticeTest' prop.
                return <PracticeHub {...practiceHubProps} />;
        }
    };

    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen bg-slate-100 dark:bg-slate-900">
            <LoadingIcon className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        );
    }
    
    if (!isAuthenticated) {
        return <LoginScreen onLoginSuccess={handleLoginSuccess} users={users} isLoggingIn={isLoggingIn} />;
    }
    
    const lightPattern = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3e%3cpath d='M30 50c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20zm0-38c-9.94 0-18 8.06-18 18s8.06 18 18 18 18-8.06 18-18-8.06-18-18-18zm-3-5h6v6h-6z' fill-opacity='.1' fill='%2393c5fd'/%3e%3cpath d='M5 10 C 10 0, 20 0, 25 10 L 15 15 Z' fill-opacity='.07' fill='%231f2937'/%3e%3c/svg%3e";
    const darkPattern = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3e%3cpath d='M30 50c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20zm0-38c-9.94 0-18 8.06-18 18s8.06 18 18 18 18-8.06 18-18-8.06-18-18-18zm-3-5h6v6h-6z' fill-opacity='.1' fill='%233b82f6'/%3e%3cpath d='M5 10 C 10 0, 20 0, 25 10 L 15 15 Z' fill-opacity='.08' fill='%23d1d5db'/%3e%3c/svg%3e";


    return (
        <div className="relative min-h-screen font-sans text-slate-900 dark:text-slate-200">
            <div className={`absolute inset-0 bg-slate-100 dark:bg-slate-900 bg-repeat bg-[length:60px_60px] bg-[url('${lightPattern}')] dark:bg-[url('${darkPattern}')]`}></div>
            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="bg-blue-50/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md border-b border-blue-200 dark:border-slate-800 sticky top-0 z-40">
                    <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleGoHome}>
                            {/* Removed LogoIcon as requested */}
                            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">TOEIC Pavex</span>
                            
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <NavButton onClick={handleGoHome} isActive={appState === AppState.PracticeHub || appState.startsWith('MINI_TEST')}>Practice Hub</NavButton>
                            <NavButton onClick={() => setAppState(AppState.MyProgress)} isActive={appState === AppState.MyProgress}>My Progress</NavButton>
                            {currentUser?.username === 'admin' && (
                                <>
                                    <NavButton onClick={() => setAppState(AppState.StudentManagement)} isActive={appState === AppState.StudentManagement}>Students</NavButton>
                                    
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={toggleNewsPopup} 
                                className="relative p-2 rounded-full bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                                aria-label="Show news updates"
                            >
                                <HeadphoneIcon className="h-5 w-5 text-red-600 dark:text-red-300" />
                                {showNewsPopup && (
                                    <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"></span>
                                )}
                            </button>
                            <span className="hidden sm:inline text-sm font-medium text-slate-600 dark:text-slate-300">Welcome, {currentUser?.username}</span>
                            <NavButton onClick={() => setAppState(AppState.Settings)} isActive={appState === AppState.Settings}>Settings</NavButton>
                            <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors">
                                Logout
                            </button>
                        </div>
                    </nav>
                </header>
        
                <main className="py-8 flex-grow">
                    {renderContent()}
                </main>
                
                <StatsFooter />

                {showNewsPopup && <NewsPopup onClose={toggleNewsPopup} />}
            </div>
        </div>
    );
};

export default App;
