import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Modal, ModalFooter, Badge } from '../ui';

export default function SMSSettings({
    phoneNumber = '',
    isVerified = false,
    preferences = {},
    onSavePhone,
    onVerify,
    onSavePreferences,
    onSendTestSMS,
}) {
    const [phone, setPhone] = useState(phoneNumber);
    const [countryCode, setCountryCode] = useState('+1');
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [settings, setSettings] = useState({
        interviewReminders: preferences.interviewReminders ?? true,
        criticalUpdates: preferences.criticalUpdates ?? true,
        offerNotifications: preferences.offerNotifications ?? true,
        applicationStatus: preferences.applicationStatus ?? false,
    });

    const countryCodes = [
        { code: '+1', country: 'US/CA', flag: '🇺🇸' },
        { code: '+44', country: 'UK', flag: '🇬🇧' },
        { code: '+91', country: 'IN', flag: '🇮🇳' },
        { code: '+61', country: 'AU', flag: '🇦🇺' },
        { code: '+49', country: 'DE', flag: '🇩🇪' },
        { code: '+33', country: 'FR', flag: '🇫🇷' },
    ];

    const handleSavePhone = () => {
        onSavePhone?.({ countryCode, phone: phone.replace(/\D/g, '') });
        setShowVerifyModal(true);
    };

    const handleVerify = async () => {
        setIsVerifying(true);
        await onVerify?.(verificationCode);
        setIsVerifying(false);
        setShowVerifyModal(false);
    };

    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    };

    const updateSetting = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        onSavePreferences?.(newSettings);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#1e2a32]">SMS Settings</h2>
                <p className="text-sm text-[#5a6b75]">Configure SMS alerts for important updates</p>
            </div>

            {/* Phone Number */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#a78bfa]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#a78bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <CardTitle>Phone Number</CardTitle>
                            <p className="text-sm text-[#8a9aa4]">Add your phone number to receive SMS alerts</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-full sm:w-32 px-3 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] focus:border-[#789A99] focus:outline-none transition-colors bg-white"
                        >
                            {countryCodes.map(cc => (
                                <option key={cc.code} value={cc.code}>
                                    {cc.flag} {cc.code}
                                </option>
                            ))}
                        </select>
                        <div className="flex-1 relative">
                            <input
                                type="tel"
                                value={formatPhone(phone)}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                placeholder="(555) 123-4567"
                                className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors"
                            />
                            {isVerified && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Badge variant="success" size="sm">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Verified
                                    </Badge>
                                </div>
                            )}
                        </div>
                        <Button
                            variant={isVerified ? 'outline' : 'primary'}
                            onClick={handleSavePhone}
                            disabled={phone.length < 10}
                        >
                            {isVerified ? 'Update' : 'Verify'}
                        </Button>
                    </div>

                    {!isVerified && phone.length >= 10 && (
                        <p className="mt-3 text-sm text-[#fbbf24] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Phone number not verified. Click verify to receive a code.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* SMS Preferences */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <CardTitle>SMS Alert Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 divide-y divide-[#e8e0dc]">
                    {[
                        {
                            key: 'interviewReminders',
                            label: 'Interview Reminders',
                            description: 'Receive a reminder 30 minutes before scheduled interviews',
                            icon: '📅',
                        },
                        {
                            key: 'criticalUpdates',
                            label: 'Critical Updates',
                            description: 'Urgent messages from employers that need immediate attention',
                            icon: '🚨',
                        },
                        {
                            key: 'offerNotifications',
                            label: 'Offer Notifications',
                            description: 'Get notified immediately when you receive a job offer',
                            icon: '🎉',
                        },
                        {
                            key: 'applicationStatus',
                            label: 'Application Status Changes',
                            description: 'Updates when your application moves to a new stage',
                            icon: '📋',
                        },
                    ].map(item => (
                        <div key={item.key} className="flex items-center justify-between py-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <p className="font-medium text-[#1e2a32]">{item.label}</p>
                                    <p className="text-sm text-[#8a9aa4]">{item.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => updateSetting(item.key, !settings[item.key])}
                                disabled={!isVerified}
                                className={`relative w-12 h-6 rounded-full transition-colors ${!isVerified ? 'opacity-50 cursor-not-allowed' : ''
                                    } ${settings[item.key] ? 'bg-[#789A99]' : 'bg-[#e8e0dc]'}`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Test SMS */}
            {isVerified && (
                <Card variant="gradient" padding="lg" className="bg-gradient-to-br from-[#a78bfa]/10 to-[#789A99]/10">
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-[#1e2a32]">Send Test SMS</h4>
                            <p className="text-sm text-[#5a6b75]">Verify your SMS settings are working correctly</p>
                        </div>
                        <Button variant="outline" onClick={onSendTestSMS}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Test
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Verification Modal */}
            <Modal
                isOpen={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
                title="Verify Phone Number"
                size="sm"
            >
                <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#a78bfa]/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#a78bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-[#5a6b75] mb-6">
                        We've sent a 6-digit verification code to<br />
                        <span className="font-semibold text-[#1e2a32]">{countryCode} {formatPhone(phone)}</span>
                    </p>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter code"
                        maxLength={6}
                        className="w-full px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:outline-none transition-colors"
                    />
                    <p className="mt-3 text-sm text-[#8a9aa4]">
                        Didn't receive the code?{' '}
                        <button className="text-[#789A99] font-medium hover:underline">Resend</button>
                    </p>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowVerifyModal(false)}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handleVerify}
                        disabled={verificationCode.length < 6 || isVerifying}
                    >
                        {isVerifying ? 'Verifying...' : 'Verify'}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
