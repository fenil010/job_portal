import { Badge } from '../ui';

export default function ApplicationTracker({ applications = [] }) {
    const statusConfig = {
        'applied': { color: 'secondary', icon: '📤', label: 'Applied' },
        'in review': { color: 'warning', icon: '👀', label: 'In Review' },
        'interview scheduled': { color: 'info', icon: '📅', label: 'Interview' },
        'offer received': { color: 'success', icon: '🎉', label: 'Offer' },
        'rejected': { color: 'danger', icon: '❌', label: 'Rejected' },
    };

    const getStatusConfig = (status) => {
        const key = status?.toLowerCase() || 'applied';
        return statusConfig[key] || statusConfig['applied'];
    };

    const groupedByStatus = applications.reduce((acc, app) => {
        const statusKey = app.status?.toLowerCase() || 'applied';
        if (!acc[statusKey]) acc[statusKey] = [];
        acc[statusKey].push(app);
        return acc;
    }, {});

    const statusOrder = ['interview scheduled', 'offer received', 'in review', 'applied', 'rejected'];

    if (applications.length === 0) {
        return (
            <div className="text-center py-8 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#e8e0dc] flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="text-[#5a6b75]">No applications yet</p>
                <p className="text-sm text-[#8a9aa4]">Start applying to track your progress</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Status Summary */}
            <div className="grid grid-cols-5 gap-2">
                {statusOrder.map(status => {
                    const config = getStatusConfig(status);
                    const count = groupedByStatus[status]?.length || 0;
                    return (
                        <div key={status} className="text-center p-2 bg-[#f8f6f5] rounded-xl">
                            <span className="text-lg">{config.icon}</span>
                            <p className="text-xl font-bold text-[#1e2a32]">{count}</p>
                            <p className="text-xs text-[#8a9aa4]">{config.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Application List */}
            <div className="space-y-2 max-h-72 overflow-y-auto">
                {applications.slice(0, 10).map((app, idx) => {
                    const config = getStatusConfig(app.status);
                    return (
                        <div
                            key={app.id || idx}
                            className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#e8e0dc] hover:border-[#FFD2C2] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{config.icon}</span>
                                <div>
                                    <p className="font-medium text-[#1e2a32] text-sm">{app.jobTitle}</p>
                                    <p className="text-xs text-[#5a6b75]">{app.company}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant={config.color} size="sm">{app.status}</Badge>
                                <p className="text-xs text-[#8a9aa4] mt-1">{app.appliedAt}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
