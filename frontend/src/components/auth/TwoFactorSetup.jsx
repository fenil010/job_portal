import { useState } from 'react';
import { Modal, Button, Badge } from '../ui';

export default function TwoFactorSetup({
    isOpen,
    onClose,
    onSetup,
    onEnable,
    onDisable,
    isEnabled = false
}) {
    const [step, setStep] = useState(isEnabled ? 'manage' : 'intro');
    const [setupData, setSetupData] = useState(null);
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [qrFailed, setQrFailed] = useState(false);

    const handleStartSetup = async () => {
        setIsLoading(true);
        setQrFailed(false);
        try {
            const result = await onSetup?.();
            if (result?.success) {
                setSetupData(result);
                setStep('scan');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        if (code.length !== 6) return;
        setIsLoading(true);
        setMessage('');
        try {
            const result = await onEnable?.(code);
            if (result?.success) {
                setStep('success');
            } else {
                setMessage(result?.message || 'Invalid code');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisable = async () => {
        setIsLoading(true);
        try {
            await onDisable?.();
            setStep('disabled');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setStep(isEnabled ? 'manage' : 'intro');
        setCode('');
        setMessage('');
        onClose?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Two-Factor Authentication" size="md">
            <div className="space-y-6">
                {/* Intro Step */}
                {step === 'intro' && (
                    <>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#789A99]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-[#1e2a32] mb-2">Secure Your Account</h3>
                            <p className="text-sm text-[#5a6b75]">
                                Add an extra layer of security to your account with two-factor authentication.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-[#789A99]/5 rounded-xl">
                                <span className="text-lg">📱</span>
                                <div>
                                    <p className="font-medium text-[#1e2a32] text-sm">Authenticator App</p>
                                    <p className="text-xs text-[#5a6b75]">Use Google Authenticator, Authy, or similar apps</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-[#789A99]/5 rounded-xl">
                                <span className="text-lg">🔐</span>
                                <div>
                                    <p className="font-medium text-[#1e2a32] text-sm">Backup Codes</p>
                                    <p className="text-xs text-[#5a6b75]">Get recovery codes in case you lose access</p>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full" onClick={handleStartSetup} loading={isLoading}>
                            Set Up 2FA
                        </Button>
                    </>
                )}

                {/* QR Scan Step */}
                {step === 'scan' && setupData && (
                    <>
                        <div className="text-center">
                            <p className="text-sm text-[#5a6b75] mb-4">
                                Scan this QR code with your authenticator app
                            </p>
                            <div className="w-48 h-48 bg-[#1e2a32] rounded-xl mx-auto mb-4 flex items-center justify-center">
                                {qrFailed ? (
                                    <span className="text-white text-xs">QR Code</span>
                                ) : (
                                    <img
                                        src={setupData.qrCodeUrl}
                                        alt="2FA QR Code"
                                        className="w-40 h-40"
                                        onError={() => setQrFailed(true)}
                                    />
                                )}
                            </div>
                            <p className="text-xs text-[#8a9aa4] mb-2">Or enter this code manually:</p>
                            <code className="px-3 py-1 bg-[#e8e0dc] rounded text-sm font-mono">
                                {setupData.secret}
                            </code>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5a6b75] mb-2">
                                Enter 6-digit code from app
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none"
                            />
                            {message && (
                                <p className="text-sm text-[#f87171] mt-2">{message}</p>
                            )}
                        </div>

                        <Button
                            className="w-full"
                            onClick={handleVerify}
                            loading={isLoading}
                            disabled={code.length !== 6}
                        >
                            Verify & Enable
                        </Button>
                    </>
                )}

                {/* Success Step */}
                {step === 'success' && (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-[#4ade80]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[#1e2a32] mb-2">2FA Enabled!</h3>
                        <p className="text-sm text-[#5a6b75] mb-4">
                            Your account is now protected with two-factor authentication.
                        </p>

                        {setupData?.backupCodes && (
                            <div className="bg-[#fbbf24]/10 rounded-xl p-4 text-left mb-4">
                                <p className="text-sm font-semibold text-[#92400e] mb-2">Save your backup codes:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {setupData.backupCodes.map((backupCode, i) => (
                                        <code key={i} className="text-xs text-[#5a6b75] font-mono">{backupCode}</code>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button className="w-full" onClick={handleClose}>Done</Button>
                    </div>
                )}

                {/* Manage Step (when already enabled) */}
                {step === 'manage' && (
                    <>
                        <div className="flex items-center justify-between p-4 bg-[#4ade80]/10 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#4ade80] rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-[#16a34a]">2FA is enabled</p>
                                    <p className="text-xs text-[#5a6b75]">Your account is secure</p>
                                </div>
                            </div>
                            <Badge variant="success">Active</Badge>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full text-[#f87171] border-[#f87171]/30 hover:bg-[#f87171]/5"
                            onClick={handleDisable}
                            loading={isLoading}
                        >
                            Disable 2FA
                        </Button>
                    </>
                )}

                {/* Disabled Confirmation */}
                {step === 'disabled' && (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-[#fbbf24]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[#1e2a32] mb-2">2FA Disabled</h3>
                        <p className="text-sm text-[#5a6b75] mb-4">
                            Two-factor authentication has been disabled. Your account is less secure.
                        </p>
                        <Button className="w-full" onClick={handleClose}>Close</Button>
                    </div>
                )}
            </div>
        </Modal>
    );
}
