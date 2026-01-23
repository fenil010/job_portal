import { Badge } from '../ui';

export default function ApplicationTracker({ applications = [] }) {
    const statusConfig = {
        'applied': { color: 'secondary', icon: '📤', label: 'Applied', gradient: 'from-slate-50 to-gray-50 border-slate-200' },
        'in review': { color: 'warning', icon: '👀', label: 'In Review', gradient: 'from-amber-50 to-yellow-50 border-amber-200' },
        'interview scheduled': { color: 'info', icon: '📅', label: 'Interview', gradient: 'from-blue-50 to-indigo-50 border-blue-200' },
        'offer received': { color: 'success', icon: '🎉', label: 'Offer', gradient: 'from-emerald-50 to-green-50 border-emerald-200' },
        'rejected': { color: 'danger', icon: '❌', label: 'Rejected', gradient: 'from-red-50 to-rose-50 border-red-200' },
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
            <div className="text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-2 border-dashed border-gray-200 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#789A99]/20 to-[#FFD2C2]/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="text-[#1e2a32] font-bold text-lg">No applications yet</p>
                <p className="text-sm text-[#8a9aa4] mt-1">Start applying to track your progress</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Status Summary */}
            <div className="grid grid-cols-5 gap-3 animate-fade-in-up">
                {statusOrder.map((status, idx) => {
                    const config = getStatusConfig(status);
                    const count = groupedByStatus[status]?.length || 0;
                    const isActive = count > 0;
                    return (
                        <div
                            key={status}
                            className={`text-center p-4 rounded-2xl border-2 transition-all duration-300 ${isActive ? `bg-gradient-to-br ${config.gradient} shadow-sm hover:shadow-md cursor-pointer` : 'bg-gray-50 border-gray-100'}`}
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <span className={`text-2xl block mb-2 ${isActive ? '' : 'opacity-40 grayscale'}`}>{config.icon}</span>
                            <p className={`text-2xl font-bold ${isActive ? 'text-[#1e2a32]' : 'text-gray-400'}`}>{count}</p>
                            <p className={`text-xs font-medium ${isActive ? 'text-[#5a6b75]' : 'text-gray-400'}`}>{config.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Application List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {applications.slice(0, 10).map((app, idx) => {
                    const config = getStatusConfig(app.status);
                    return (
                        <div
                            key={app.id || idx}
                            className={`flex items-center justify-between p-4 bg-gradient-to-r ${config.gradient} rounded-2xl border-2 hover:shadow-md transition-all duration-300 cursor-pointer group animate-fade-in-up`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    {config.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-[#1e2a32] group-hover:text-[#789A99] transition-colors">{app.jobTitle}</p>
                                    <p className="text-sm text-[#5a6b75] font-medium">{app.company}</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <Badge variant={config.color} size="sm" className="font-semibold capitalize">
                                    {app.status}
                                </Badge>
                                <p className="text-xs text-[#8a9aa4] font-medium bg-white/60 px-2 py-0.5 rounded-full">{app.appliedAt}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* View All Link */}
            {applications.length > 10 && (
                <div className="text-center pt-2">
                    <button className="text-sm font-semibold text-[#789A99] hover:text-[#5f7d7c] transition-colors">
                        View all {applications.length} applications →
                    </button>
                </div>
            )}
        </div>
    );
}
