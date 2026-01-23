import { useState } from 'react';
import { Button } from '../ui';

export default function EmailVerificationBanner({
    email,
    onResend,
    onVerify,
    onDismiss
}) {
    const [isResending, setIsResending] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [message, setMessage] = useState('');

    const handleResend = async () => {
        setIsResending(true);
        setMessage('');
        try {
            const result = await onResend?.(email);
            if (result?.success) {
                setMessage(`Verification code sent! (Demo code: ${result.code})`);
                setShowCodeInput(true);
            }
        } finally {
            setIsResending(false);
        }
    };

    const handleVerify = async () => {
        if (!code) return;
        setIsVerifying(true);
        try {
            const result = await onVerify?.(code);
            if (result?.success) {
                setMessage('Email verified successfully!');
            } else {
                setMessage(result?.message || 'Verification failed');
            }
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="bg-[#fbbf24]/10 border-l-4 border-[#fbbf24] rounded-r-xl p-4">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-[#fbbf24]/20 rounded-lg">
                    <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-[#92400e]">Verify your email</h4>
                    <p className="text-sm text-[#a16207] mb-3">
                        Please verify <span className="font-medium">{email}</span> to unlock all features.
                    </p>

                    {message && (
                        <p className="text-sm text-[#16a34a] mb-3 p-2 bg-[#4ade80]/10 rounded-lg">
                            {message}
                        </p>
                    )}

                    {showCodeInput ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                placeholder="Enter code"
                                maxLength={6}
                                className="px-3 py-2 text-sm border-2 border-[#e8e0dc] rounded-lg focus:border-[#789A99] focus:outline-none uppercase tracking-wider w-28"
                            />
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={handleVerify}
                                loading={isVerifying}
                                disabled={code.length < 6}
                            >
                                Verify
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleResend}
                                loading={isResending}
                            >
                                Send Verification Email
                            </Button>
                            {onDismiss && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={onDismiss}
                                >
                                    Later
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
