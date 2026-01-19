import { useState } from 'react';
import { Modal, Button, Badge } from '../ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui';
import ResumeScoreCard from './ResumeScoreCard';
import SkillsAnalysis from './SkillsAnalysis';
import ImprovementSuggestions from './ImprovementSuggestions';

export default function ResumeAnalysisModal({ isOpen, onClose, analysis, resumeName, jobTitle }) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!analysis) return null;

    const { overallScore, comparative, ats, experience, education, keywords } = analysis;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Resume Analysis" size="2xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FFD2C2]/30 to-[#789A99]/20 rounded-xl">
                    <div>
                        <h3 className="font-semibold text-[#1e2a32]">{resumeName || 'Resume'}</h3>
                        {jobTitle && (
                            <p className="text-sm text-[#5a6b75]">Analyzing for: <span className="font-medium">{jobTitle}</span></p>
                        )}
                    </div>
                    <div className="text-right">
                        {comparative && (
                            <div className="flex items-center gap-2">
                                <Badge variant={comparative.percentile >= 70 ? 'success' : comparative.percentile >= 50 ? 'warning' : 'danger'}>
                                    Top {100 - comparative.percentile}%
                                </Badge>
                                <span className="text-sm text-[#5a6b75]">of applicants</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
                        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ResumeScoreCard analysis={analysis} />

                            {/* Quick Stats */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-[#1e2a32]">Quick Summary</h4>

                                {/* ATS Compatibility */}
                                <div className="p-4 bg-white rounded-xl border-2 border-[#e8e0dc]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-[#5a6b75]">ATS Compatibility</span>
                                        <Badge variant={ats?.score >= 80 ? 'success' : ats?.score >= 60 ? 'warning' : 'danger'}>
                                            {ats?.score || 0}%
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-[#8a9aa4]">
                                        {ats?.passedChecks || 0} of {ats?.totalChecks || 0} checks passed
                                    </p>
                                </div>

                                {/* Experience Match */}
                                <div className="p-4 bg-white rounded-xl border-2 border-[#e8e0dc]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-[#5a6b75]">Experience Level</span>
                                        <Badge variant={experience?.matchLevel === 'match' ? 'success' : experience?.matchLevel === 'above' ? 'info' : 'warning'}>
                                            {experience?.matchLevel === 'match' ? 'Good Match' : experience?.matchLevel === 'above' ? 'Overqualified' : 'Under-experienced'}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-[#8a9aa4]">
                                        ~{experience?.estimatedYears || 0} years • Required: {experience?.requiredLevel || 'N/A'}
                                    </p>
                                </div>

                                {/* Keywords */}
                                <div className="p-4 bg-white rounded-xl border-2 border-[#e8e0dc]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-[#5a6b75]">Keyword Match</span>
                                        <Badge variant={keywords?.score >= 70 ? 'success' : keywords?.score >= 50 ? 'warning' : 'danger'}>
                                            {keywords?.score || 0}%
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-[#8a9aa4]">
                                        {keywords?.matchedKeywords || 0} of {keywords?.totalKeywords || 0} keywords found
                                    </p>
                                </div>

                                {/* Comparative Ranking */}
                                {comparative && (
                                    <div className="p-4 bg-gradient-to-r from-[#789A99]/10 to-[#789A99]/5 rounded-xl border-2 border-[#789A99]/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-[#5a6b75]">Applicant Ranking</span>
                                            <span className="font-bold text-[#789A99]">#{comparative.rank}</span>
                                        </div>
                                        <p className="text-xs text-[#8a9aa4]">
                                            Out of {comparative.totalApplicants} applicants • {comparative.rating}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="skills">
                        <SkillsAnalysis analysis={analysis} />
                    </TabsContent>

                    <TabsContent value="suggestions">
                        <ImprovementSuggestions
                            suggestions={analysis.suggestions}
                            strengths={analysis.strengths}
                            weaknesses={analysis.weaknesses}
                        />
                    </TabsContent>

                    <TabsContent value="details">
                        <div className="space-y-4">
                            {/* ATS Checks Detail */}
                            <div>
                                <h4 className="font-semibold text-[#1e2a32] mb-3">ATS Compatibility Checks</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {ats?.checks?.map((check, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-2 p-3 rounded-lg ${check.passed ? 'bg-[#4ade80]/10' : 'bg-[#f87171]/10'}`}
                                        >
                                            {check.passed ? (
                                                <svg className="w-5 h-5 text-[#16a34a]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-[#dc2626]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            <span className={`text-sm ${check.passed ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                                                {check.item}
                                            </span>
                                            {check.impact === 'high' && !check.passed && (
                                                <Badge variant="danger" size="sm">Critical</Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Education Details */}
                            <div>
                                <h4 className="font-semibold text-[#1e2a32] mb-3">Education Assessment</h4>
                                <div className="p-4 bg-white rounded-xl border-2 border-[#e8e0dc]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-[#1e2a32]">Education Score</p>
                                            <p className="text-sm text-[#5a6b75]">
                                                {education?.hasEducationSection ? '✓ Education section found' : '✗ No education section'}
                                                {education?.hasCertifications && ' • ✓ Certifications listed'}
                                            </p>
                                        </div>
                                        <div className="text-2xl font-bold text-[#789A99]">{education?.score || 0}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t-2 border-[#e8e0dc]">
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                    <Button variant="primary">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Report
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
