import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Modal, ModalFooter } from '../ui';

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
        <div>
            <p className="font-medium text-[#1e2a32]">{label}</p>
            {description && <p className="text-sm text-[#8a9aa4]">{description}</p>}
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-[#789A99]' : 'bg-[#e8e0dc]'}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    </div>
);

const FrequencySelector = ({ value, onChange, options }) => (
    <div className="flex flex-wrap gap-2">
        {options.map(option => (
            <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${value === option.value
                        ? 'bg-[#789A99] text-white'
                        : 'bg-[#f5f3f1] text-[#5a6b75] hover:bg-[#e8e0dc]'
                    }`}
            >
                {option.label}
            </button>
        ))}
    </div>
);

export default function NotificationPreferences({
    preferences = {},
    onSave,
    onCancel,
}) {
    const [settings, setSettings] = useState({
        // Email settings
        emailEnabled: preferences.emailEnabled ?? true,
        emailApplicationUpdates: preferences.emailApplicationUpdates ?? true,
        emailNewOpportunities: preferences.emailNewOpportunities ?? true,
        emailInterviewReminders: preferences.emailInterviewReminders ?? true,
        emailWeeklyDigest: preferences.emailWeeklyDigest ?? false,
        emailFrequency: preferences.emailFrequency ?? 'immediate',

        // SMS settings
        smsEnabled: preferences.smsEnabled ?? false,
        smsInterviewReminders: preferences.smsInterviewReminders ?? true,
        smsCriticalUpdates: preferences.smsCriticalUpdates ?? true,
        smsOfferNotifications: preferences.smsOfferNotifications ?? true,

        // In-app settings
        inAppEnabled: preferences.inAppEnabled ?? true,
        inAppSound: preferences.inAppSound ?? true,
        inAppDesktopNotifications: preferences.inAppDesktopNotifications ?? false,

        // Quiet hours
        quietHoursEnabled: preferences.quietHoursEnabled ?? false,
        quietHoursStart: preferences.quietHoursStart ?? '22:00',
        quietHoursEnd: preferences.quietHoursEnd ?? '08:00',
    });

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onSave?.(settings);
    };

    const frequencyOptions = [
        { value: 'immediate', label: 'Immediate' },
        { value: 'hourly', label: 'Hourly' },
        { value: 'daily', label: 'Daily Digest' },
        { value: 'weekly', label: 'Weekly Digest' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Notification Preferences</h2>
                    <p className="text-sm text-[#5a6b75]">Manage how you receive notifications</p>
                </div>
            </div>

            {/* Email Notifications */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#789A99]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <CardTitle>Email Notifications</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-1 divide-y divide-[#e8e0dc]">
                    <ToggleSwitch
                        enabled={settings.emailEnabled}
                        onChange={(v) => updateSetting('emailEnabled', v)}
                        label="Enable email notifications"
                        description="Receive updates via email"
                    />

                    {settings.emailEnabled && (
                        <>
                            <ToggleSwitch
                                enabled={settings.emailApplicationUpdates}
                                onChange={(v) => updateSetting('emailApplicationUpdates', v)}
                                label="Application updates"
                                description="Status changes, employer views, and feedback"
                            />
                            <ToggleSwitch
                                enabled={settings.emailNewOpportunities}
                                onChange={(v) => updateSetting('emailNewOpportunities', v)}
                                label="New opportunities"
                                description="Jobs matching your profile and saved searches"
                            />
                            <ToggleSwitch
                                enabled={settings.emailInterviewReminders}
                                onChange={(v) => updateSetting('emailInterviewReminders', v)}
                                label="Interview reminders"
                                description="Reminders before scheduled interviews"
                            />
                            <div className="py-4">
                                <p className="font-medium text-[#1e2a32] mb-3">Email frequency</p>
                                <FrequencySelector
                                    value={settings.emailFrequency}
                                    onChange={(v) => updateSetting('emailFrequency', v)}
                                    options={frequencyOptions}
                                />
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* SMS Notifications */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#a78bfa]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#a78bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <CardTitle>SMS Alerts</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-1 divide-y divide-[#e8e0dc]">
                    <ToggleSwitch
                        enabled={settings.smsEnabled}
                        onChange={(v) => updateSetting('smsEnabled', v)}
                        label="Enable SMS alerts"
                        description="Receive critical updates via text message"
                    />

                    {settings.smsEnabled && (
                        <>
                            <ToggleSwitch
                                enabled={settings.smsInterviewReminders}
                                onChange={(v) => updateSetting('smsInterviewReminders', v)}
                                label="Interview reminders"
                                description="30 minutes before your interview"
                            />
                            <ToggleSwitch
                                enabled={settings.smsCriticalUpdates}
                                onChange={(v) => updateSetting('smsCriticalUpdates', v)}
                                label="Critical updates"
                                description="Urgent messages from employers"
                            />
                            <ToggleSwitch
                                enabled={settings.smsOfferNotifications}
                                onChange={(v) => updateSetting('smsOfferNotifications', v)}
                                label="Offer notifications"
                                description="When you receive a job offer"
                            />
                        </>
                    )}
                </CardContent>
            </Card>

            {/* In-App Notifications */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#60a5fa]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#60a5fa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <CardTitle>In-App Notifications</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-1 divide-y divide-[#e8e0dc]">
                    <ToggleSwitch
                        enabled={settings.inAppEnabled}
                        onChange={(v) => updateSetting('inAppEnabled', v)}
                        label="Enable in-app notifications"
                        description="Show notifications within the application"
                    />

                    {settings.inAppEnabled && (
                        <>
                            <ToggleSwitch
                                enabled={settings.inAppSound}
                                onChange={(v) => updateSetting('inAppSound', v)}
                                label="Notification sounds"
                                description="Play a sound for new notifications"
                            />
                            <ToggleSwitch
                                enabled={settings.inAppDesktopNotifications}
                                onChange={(v) => updateSetting('inAppDesktopNotifications', v)}
                                label="Desktop notifications"
                                description="Show browser push notifications"
                            />
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Quiet Hours */}
            <Card variant="default" padding="lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#fbbf24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                        <CardTitle>Quiet Hours</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ToggleSwitch
                        enabled={settings.quietHoursEnabled}
                        onChange={(v) => updateSetting('quietHoursEnabled', v)}
                        label="Enable quiet hours"
                        description="Pause notifications during set times"
                    />

                    {settings.quietHoursEnabled && (
                        <div className="flex items-center gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#5a6b75] mb-1">Start</label>
                                <input
                                    type="time"
                                    value={settings.quietHoursStart}
                                    onChange={(e) => updateSetting('quietHoursStart', e.target.value)}
                                    className="px-3 py-2 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] focus:border-[#789A99] focus:outline-none"
                                />
                            </div>
                            <span className="text-[#8a9aa4] mt-6">to</span>
                            <div>
                                <label className="block text-sm font-medium text-[#5a6b75] mb-1">End</label>
                                <input
                                    type="time"
                                    value={settings.quietHoursEnd}
                                    onChange={(e) => updateSetting('quietHoursEnd', e.target.value)}
                                    className="px-3 py-2 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] focus:border-[#789A99] focus:outline-none"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                {onCancel && (
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                )}
                <Button variant="primary" onClick={handleSave}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Preferences
                </Button>
            </div>
        </div>
    );
}
