import { Button } from '../ui';

export default function BulkActionsBar({
    selectedCount = 0,
    onApprove,
    onReject,
    onSchedule,
    onMessage,
    onClearSelection,
    onSelectAll,
    totalCount = 0,
}) {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-fade-in-up">
            <div className="flex items-center gap-3 px-6 py-4 bg-[#1e2a32] rounded-2xl shadow-2xl shadow-[#1e2a32]/20">
                {/* Selection count */}
                <div className="flex items-center gap-3 pr-4 border-r border-white/20">
                    <div className="w-10 h-10 rounded-xl bg-[#789A99] flex items-center justify-center text-white font-bold">
                        {selectedCount}
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-medium">Selected</p>
                        <p className="text-xs text-white/60">of {totalCount} candidates</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {onSelectAll && selectedCount < totalCount && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onSelectAll}
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            Select All
                        </Button>
                    )}

                    {onApprove && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onApprove}
                            className="text-[#4ade80] hover:bg-[#4ade80]/20"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Shortlist
                        </Button>
                    )}

                    {onSchedule && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onSchedule}
                            className="text-[#60a5fa] hover:bg-[#60a5fa]/20"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Schedule
                        </Button>
                    )}

                    {onMessage && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onMessage}
                            className="text-[#fbbf24] hover:bg-[#fbbf24]/20"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Message
                        </Button>
                    )}

                    {onReject && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onReject}
                            className="text-[#f87171] hover:bg-[#f87171]/20"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Reject
                        </Button>
                    )}
                </div>

                {/* Clear */}
                <button
                    onClick={onClearSelection}
                    className="ml-2 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    title="Clear selection"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
