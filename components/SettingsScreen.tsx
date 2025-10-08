import React, { useState } from 'react';
import { User, UserSettings } from '../types';
import { ArrowLeftIcon, SunIcon, MoonIcon } from './icons';

interface SettingsScreenProps {
    currentUser: User;
    userSettings: UserSettings;
    onSettingsChange: (newSettings: Partial<UserSettings>) => void;
    onPasswordChanged: (newPassword: string) => void;
    onBack: () => void;
}

const SettingsSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-3">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const InputRow: React.FC<{ label: string, id: string, children: React.ReactNode }> = ({ label, id, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 md:gap-4">
        <label htmlFor={id} className="font-semibold text-slate-600 dark:text-slate-300">{label}</label>
        <div className="md:col-span-2">
            {children}
        </div>
    </div>
);

const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentUser, userSettings, onSettingsChange, onPasswordChanged, onBack }) => {
    const [personalInfo, setPersonalInfo] = useState({
        name: userSettings.name || '',
        email: userSettings.email || currentUser.username,
        scoreTarget: userSettings.scoreTarget || '',
        examDate: userSettings.examDate || ''
    });
    const [infoSaveStatus, setInfoSaveStatus] = useState<'idle' | 'saved'>('idle');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
        setInfoSaveStatus('idle');
    };

    const handleSavePersonalInfo = (e: React.FormEvent) => {
        e.preventDefault();
        onSettingsChange(personalInfo);
        setInfoSaveStatus('saved');
        setTimeout(() => setInfoSaveStatus('idle'), 2000);
    };
    
    const handlePasswordChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);

        if (currentPassword !== currentUser.password) {
            setPasswordError('Current password is incorrect.');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }
        onPasswordChanged(newPassword);
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleDarkModeToggle = () => {
        onSettingsChange({ darkMode: !userSettings.darkMode });
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Home
                </button>
                <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white mb-8">Settings</h2>
                <div className="space-y-8">
                    <SettingsSection title="Personal Information">
                        <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                            <InputRow label="Name" id="name">
                                <input type="text" id="name" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} className="w-full form-input" placeholder="Your Name"/>
                            </InputRow>
                             <InputRow label="Email" id="email">
                                <input type="email" id="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} className="w-full form-input" placeholder="your@email.com"/>
                            </InputRow>
                             <InputRow label="Score Target" id="scoreTarget">
                                <input type="number" id="scoreTarget" name="scoreTarget" value={personalInfo.scoreTarget} onChange={handlePersonalInfoChange} className="w-full form-input" placeholder="e.g., 900"/>
                            </InputRow>
                             <InputRow label="Expected Exam Date" id="examDate">
                                <input type="date" id="examDate" name="examDate" value={personalInfo.examDate} onChange={handlePersonalInfoChange} className="w-full form-input"/>
                            </InputRow>
                            <div className="flex justify-end items-center pt-2">
                               {infoSaveStatus === 'saved' && <p className="text-sm text-green-600 mr-4">Saved!</p>}
                               <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                    Save Changes
                               </button>
                            </div>
                        </form>
                    </SettingsSection>

                    <SettingsSection title="Appearance">
                        <InputRow label="Theme" id="theme-toggle">
                            <button onClick={handleDarkModeToggle} className="w-full flex items-center justify-between p-3 border border-slate-300 dark:border-slate-600 rounded-lg">
                                <span>{userSettings.darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                                {userSettings.darkMode ? <MoonIcon className="h-6 w-6 text-yellow-400"/> : <SunIcon className="h-6 w-6 text-orange-500"/>}
                            </button>
                        </InputRow>
                    </SettingsSection>
                    
                    <SettingsSection title="Security">
                         <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                            <InputRow label="Current Password" id="current-password">
                                <input type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="w-full form-input" autoComplete="current-password"/>
                            </InputRow>
                            <InputRow label="New Password" id="new-password">
                                <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full form-input" autoComplete="new-password"/>
                            </InputRow>
                            <InputRow label="Confirm New Password" id="confirm-password">
                                <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full form-input" autoComplete="new-password"/>
                            </InputRow>
                            {passwordError && <p className="text-sm text-red-600 text-center md:col-span-3">{passwordError}</p>}
                            {passwordSuccess && <p className="text-sm text-green-600 text-center md:col-span-3">{passwordSuccess}</p>}
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </SettingsSection>

                    <SettingsSection title="Preferences">
                        <InputRow label="Language" id="language">
                            <select id="language" className="w-full form-input" disabled>
                                <option>English</option>
                            </select>
                        </InputRow>
                         <InputRow label="Notifications" id="notifications">
                             <div className="flex items-center justify-between p-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-400 dark:text-slate-500">
                                <span>Email Notifications</span>
                                <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full p-1 flex items-center">
                                    <div className="w-4 h-4 bg-white dark:bg-slate-500 rounded-full"></div>
                                </div>
                            </div>
                        </InputRow>
                    </SettingsSection>
                </div>
            </div>
            <style>{`
                .form-input {
                    padding: 0.75rem 1rem;
                    border-width: 1px;
                    border-color: rgb(203 213 225 / 1);
                    border-radius: 0.5rem;
                    background-color: white;
                    color: rgb(15 23 42 / 1);
                }
                .dark .form-input {
                    border-color: rgb(71 85 105 / 1);
                    background-color: rgb(30 41 59 / 1);
                    color: white;
                }
                .form-input:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                    --tw-ring-color: rgb(59 130 246 / 1);
                }
            `}</style>
        </div>
    );
};
export default SettingsScreen;
