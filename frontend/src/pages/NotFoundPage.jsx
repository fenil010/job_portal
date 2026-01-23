import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4EDE3] p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#90353D]/20 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#6B2830]/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative text-center max-w-md animate-fade-in-up">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        <span className="text-[180px] font-bold text-[#90353D]/10 leading-none select-none">
                            404
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-3xl flex items-center justify-center shadow-xl shadow-[#90353D]/30 animate-float">
                                <svg className="w-12 h-12 text-[#F4EDE3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-3xl font-bold text-[#3E2723] mb-3">
                    Page Not Found
                </h1>
                <p className="text-[#4A3C35] mb-8 max-w-sm mx-auto">
                    Oops! The page you're looking for seems to have wandered off.
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/">
                        <Button size="lg" className="w-full sm:w-auto">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Home
                        </Button>
                    </Link>
                    <Link to="/jobs">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Browse Jobs
                        </Button>
                    </Link>
                </div>

                {/* Helpful links */}
                <div className="mt-12 pt-8 border-t-2 border-[#90353D]/15">
                    <p className="text-sm text-[#9B8B7E] mb-4">Or try these helpful links:</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link to="/login" className="text-[#90353D] hover:text-[#6B2830] transition-colors">
                            Sign In
                        </Link>
                        <span className="text-[#90353D]/30">•</span>
                        <Link to="/register" className="text-[#90353D] hover:text-[#6B2830] transition-colors">
                            Create Account
                        </Link>
                        <span className="text-[#90353D]/30">•</span>
                        <Link to="/dashboard" className="text-[#90353D] hover:text-[#6B2830] transition-colors">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
