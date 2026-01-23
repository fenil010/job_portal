import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, useToast, Modal, ModalFooter, Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

export default function SettingsPage() {
    const navigate = useNavigate();
    const { user, logout, updateUser } = useAuth();
    const { toast } = useToast();

    const [activeTab, setActiveTab] = useState('account');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Account settings
    const [accountData, setAccountData] = useState({
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Notification settings
    const [notifications, setNotifications] = useState({
        emailJobAlerts: true,
        emailApplications: true,
        emailMessages: true,
        emailNewsletter: false,
        pushJobAlerts: true,
        pushMessages: true,
        pushInterviews: true,
    });

    // Privacy settings
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        allowRecruiterContact: true,
        dataSharing: false,
    });

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePrivacyChange = (key, value) => {
        setPrivacy(prev => ({ ...prev, [key]: value ?? !prev[key] }));
    };

    const handleSaveNotifications = () => {
        toast.success('Notification preferences saved!');
    };

    const handleSavePrivacy = () => {
        toast.success('Privacy settings saved!');
    };

    const handleChangePassword = () => {
        if (accountData.newPassword !== accountData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (accountData.newPassword.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }
        toast.success('Password changed successfully!');
        setShowPasswordModal(false);
        setAccountData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    };

    const handleDeleteAccount = () => {
        toast.info('Account deletion initiated');
        setShowDeleteModal(false);
        logout();
        navigate('/');
    };

    const handleLogout = () => {
        logout();
        toast.info('You have been logged out');
        navigate('/login');
    };

    const ToggleSwitch = ({ enabled, onChange, label, description }) => (
        <div className="flex items-center justify-between py-3">
            <div>
                <p className="font-medium text-[#3E2723]">{label}</p>
                {description && <p className="text-sm text-[#9B8B7E]">{description}</p>}
            </div>
            <button
                type="button"
                onClick={onChange}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#90353D] ${enabled ? 'bg-[#90353D]' : 'bg-[#9B8B7E]/30'}`}
            >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in-down">
                    <h1 className="text-2xl font-bold text-[#3E2723]">Settings</h1>
                    <p className="text-[#4A3C35] mt-1">Manage your account preferences and settings</p>
                </div>

                <Tabs value={activeTab} onChange={setActiveTab} className="space-y-6">
                    <TabsList className="animate-fade-in">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                    </TabsList>

                    {/* Account Tab */}
                    <TabsContent value="account" className="space-y-6 animate-fade-in-up">
                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#4A3C35] mb-1">Email Address</label>
                                    <div className="flex gap-3">
                                        <Input value={accountData.email} disabled className="flex-1" />
                                        <Button variant="outline">Change</Button>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Change Password
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Connected Accounts</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { name: 'Google', icon: '🔷', connected: true },
                                    { name: 'LinkedIn', icon: '💼', connected: false },
                                    { name: 'GitHub', icon: '💻', connected: false },
                                ].map(account => (
                                    <div key={account.name} className="flex items-center justify-between py-3 border-b border-[#90353D]/10 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{account.icon}</span>
                                            <div>
                                                <p className="font-medium text-[#3E2723]">{account.name}</p>
                                                <p className="text-sm text-[#9B8B7E]">
                                                    {account.connected ? 'Connected' : 'Not connected'}
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant={account.connected ? 'ghost' : 'outline'} size="sm">
                                            {account.connected ? 'Disconnect' : 'Connect'}
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Session</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-[#3E2723]">Sign out of your account</p>
                                        <p className="text-sm text-[#9B8B7E]">You will need to sign in again to access your account</p>
                                    </div>
                                    <Button variant="outline" onClick={handleLogout}>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg" className="border-red-200">
                            <CardHeader>
                                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-[#3E2723]">Delete Account</p>
                                        <p className="text-sm text-[#9B8B7E]">Permanently delete your account and all associated data</p>
                                    </div>
                                    <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setShowDeleteModal(true)}>
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6 animate-fade-in-up">
                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Email Notifications</CardTitle>
                            </CardHeader>
                            <CardContent className="divide-y divide-[#90353D]/10">
                                <ToggleSwitch
                                    enabled={notifications.emailJobAlerts}
                                    onChange={() => handleNotificationChange('emailJobAlerts')}
                                    label="Job Alerts"
                                    description="Get notified when new jobs match your preferences"
                                />
                                <ToggleSwitch
                                    enabled={notifications.emailApplications}
                                    onChange={() => handleNotificationChange('emailApplications')}
                                    label="Application Updates"
                                    description="Updates on your job applications"
                                />
                                <ToggleSwitch
                                    enabled={notifications.emailMessages}
                                    onChange={() => handleNotificationChange('emailMessages')}
                                    label="Messages"
                                    description="New messages from employers"
                                />
                                <ToggleSwitch
                                    enabled={notifications.emailNewsletter}
                                    onChange={() => handleNotificationChange('emailNewsletter')}
                                    label="Newsletter"
                                    description="Career tips and platform updates"
                                />
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Push Notifications</CardTitle>
                            </CardHeader>
                            <CardContent className="divide-y divide-[#90353D]/10">
                                <ToggleSwitch
                                    enabled={notifications.pushJobAlerts}
                                    onChange={() => handleNotificationChange('pushJobAlerts')}
                                    label="Job Alerts"
                                    description="Instant notifications for matching jobs"
                                />
                                <ToggleSwitch
                                    enabled={notifications.pushMessages}
                                    onChange={() => handleNotificationChange('pushMessages')}
                                    label="Direct Messages"
                                    description="Real-time message notifications"
                                />
                                <ToggleSwitch
                                    enabled={notifications.pushInterviews}
                                    onChange={() => handleNotificationChange('pushInterviews')}
                                    label="Interview Reminders"
                                    description="Reminders before scheduled interviews"
                                />
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                        </div>
                    </TabsContent>

                    {/* Privacy Tab */}
                    <TabsContent value="privacy" className="space-y-6 animate-fade-in-up">
                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Profile Visibility</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {[
                                        { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
                                        { value: 'employers', label: 'Employers Only', description: 'Only verified employers can view' },
                                        { value: 'private', label: 'Private', description: 'Only you can view your profile' },
                                    ].map(option => (
                                        <label key={option.value} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#90353D]/5 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="visibility"
                                                checked={privacy.profileVisibility === option.value}
                                                onChange={() => handlePrivacyChange('profileVisibility', option.value)}
                                                className="w-4 h-4 text-[#90353D] focus:ring-[#90353D]"
                                            />
                                            <div>
                                                <p className="font-medium text-[#3E2723]">{option.label}</p>
                                                <p className="text-sm text-[#9B8B7E]">{option.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="divide-y divide-[#90353D]/10">
                                <ToggleSwitch
                                    enabled={privacy.showEmail}
                                    onChange={() => handlePrivacyChange('showEmail')}
                                    label="Show Email Address"
                                    description="Display your email on your public profile"
                                />
                                <ToggleSwitch
                                    enabled={privacy.showPhone}
                                    onChange={() => handlePrivacyChange('showPhone')}
                                    label="Show Phone Number"
                                    description="Display your phone on your public profile"
                                />
                                <ToggleSwitch
                                    enabled={privacy.allowRecruiterContact}
                                    onChange={() => handlePrivacyChange('allowRecruiterContact')}
                                    label="Allow Recruiter Contact"
                                    description="Let recruiters reach out to you directly"
                                />
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Data & Analytics</CardTitle>
                            </CardHeader>
                            <CardContent className="divide-y divide-[#90353D]/10">
                                <ToggleSwitch
                                    enabled={privacy.dataSharing}
                                    onChange={() => handlePrivacyChange('dataSharing')}
                                    label="Anonymous Analytics"
                                    description="Help improve JobPortal with anonymous usage data"
                                />
                                <div className="py-4">
                                    <Button variant="outline" size="sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download My Data
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button onClick={handleSavePrivacy}>Save Privacy Settings</Button>
                        </div>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="space-y-6 animate-fade-in-up">
                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Current Plan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 bg-[#90353D]/5 rounded-xl">
                                    <div>
                                        <p className="text-xl font-bold text-[#90353D]">Free Plan</p>
                                        <p className="text-sm text-[#4A3C35]">5 applications per month</p>
                                    </div>
                                    <Button>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                        Upgrade to Pro
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-[#9B8B7E]">
                                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <p className="font-medium">No payment method on file</p>
                                    <p className="text-sm mt-1">Add a payment method to upgrade your plan</p>
                                    <Button variant="outline" className="mt-4">Add Payment Method</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="default" padding="lg">
                            <CardHeader>
                                <CardTitle>Billing History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-[#9B8B7E]">
                                    <p>No billing history available</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Change Password Modal */}
            <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="Change Password">
                <div className="space-y-4">
                    <Input
                        label="Current Password"
                        type="password"
                        value={accountData.currentPassword}
                        onChange={(e) => setAccountData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Input
                        label="New Password"
                        type="password"
                        value={accountData.newPassword}
                        onChange={(e) => setAccountData(prev => ({ ...prev, newPassword: e.target.value }))}
                        helperText="At least 8 characters"
                    />
                    <Input
                        label="Confirm New Password"
                        type="password"
                        value={accountData.confirmPassword}
                        onChange={(e) => setAccountData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
                    <Button onClick={handleChangePassword}>Change Password</Button>
                </ModalFooter>
            </Modal>

            {/* Delete Account Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Account">
                <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="flex gap-3">
                            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <p className="font-medium text-red-800">This action cannot be undone</p>
                                <p className="text-sm text-red-600 mt-1">All your data, applications, and saved jobs will be permanently deleted.</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-[#4A3C35]">Are you sure you want to delete your account?</p>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={handleDeleteAccount}>
                        Yes, Delete My Account
                    </Button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
