import { useState } from 'react';
import { Badge, Button, Input, Modal } from '../ui';

export default function JobAlerts({
    alerts = [],
    onCreateAlert,
    onDeleteAlert,
    onToggleAlert
}) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlert, setNewAlert] = useState({
        keywords: '',
        location: '',
        jobType: '',
        minSalary: '',
        frequency: 'daily',
    });

    const handleCreate = () => {
        const alertData = {
            ...newAlert,
            keywords: newAlert.keywords.split(',').map(k => k.trim()).filter(Boolean),
            minSalary: newAlert.minSalary ? parseInt(newAlert.minSalary) : null,
        };
        onCreateAlert?.(alertData);
        setShowCreateModal(false);
        setNewAlert({ keywords: '', location: '', jobType: '', minSalary: '', frequency: 'daily' });
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-[#1e2a32]">Job Alerts</h4>
                <Button size="sm" variant="primary" onClick={() => setShowCreateModal(true)}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Alert
                </Button>
            </div>

            {/* Alerts List */}
            {alerts.length === 0 ? (
                <div className="text-center py-8 px-4 bg-[#f8f6f5] rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#789A99]/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#789A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <p className="text-[#5a6b75]">No alerts set up</p>
                    <p className="text-sm text-[#8a9aa4]">Get notified when matching jobs are posted</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`p-4 rounded-xl border-2 transition-all ${alert.active
                                    ? 'border-[#789A99] bg-[#789A99]/5'
                                    : 'border-[#e8e0dc] bg-[#f8f6f5] opacity-60'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-[#1e2a32]">
                                            {alert.keywords?.join(', ') || 'All Jobs'}
                                        </span>
                                        <Badge variant={alert.active ? 'success' : 'secondary'} size="sm">
                                            {alert.active ? 'Active' : 'Paused'}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs text-[#5a6b75]">
                                        {alert.location && <span>📍 {alert.location}</span>}
                                        {alert.jobType && <span>💼 {alert.jobType}</span>}
                                        {alert.minSalary && <span>💰 ${alert.minSalary.toLocaleString()}+</span>}
                                        <span>🔔 {alert.frequency}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => onToggleAlert?.(alert.id)}
                                        className={`p-2 rounded-lg transition-colors ${alert.active
                                                ? 'text-[#789A99] hover:bg-[#789A99]/10'
                                                : 'text-[#8a9aa4] hover:bg-[#e8e0dc]'
                                            }`}
                                        title={alert.active ? 'Pause' : 'Resume'}
                                    >
                                        {alert.active ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => onDeleteAlert?.(alert.id)}
                                        className="p-2 text-[#8a9aa4] hover:text-[#f87171] hover:bg-[#f87171]/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Alert Modal */}
            <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Job Alert" size="md">
                <div className="space-y-4">
                    <Input
                        label="Keywords"
                        placeholder="React, Frontend, Developer (comma separated)"
                        value={newAlert.keywords}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, keywords: e.target.value }))}
                        helperText="Enter job titles, skills, or companies"
                    />
                    <Input
                        label="Location"
                        placeholder="e.g., San Francisco, Remote"
                        value={newAlert.location}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, location: e.target.value }))}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#5a6b75] mb-1">Job Type</label>
                            <select
                                value={newAlert.jobType}
                                onChange={(e) => setNewAlert(prev => ({ ...prev, jobType: e.target.value }))}
                                className="w-full px-3 py-2 border-2 border-[#e8e0dc] rounded-lg focus:border-[#789A99] focus:outline-none"
                            >
                                <option value="">Any</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="remote">Remote</option>
                            </select>
                        </div>
                        <Input
                            label="Min Salary"
                            type="number"
                            placeholder="e.g., 80000"
                            value={newAlert.minSalary}
                            onChange={(e) => setNewAlert(prev => ({ ...prev, minSalary: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#5a6b75] mb-1">Notification Frequency</label>
                        <div className="flex gap-2">
                            {['instant', 'daily', 'weekly'].map(freq => (
                                <button
                                    key={freq}
                                    type="button"
                                    onClick={() => setNewAlert(prev => ({ ...prev, frequency: freq }))}
                                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${newAlert.frequency === freq
                                            ? 'bg-[#789A99] text-white'
                                            : 'bg-[#e8e0dc] text-[#5a6b75] hover:bg-[#FFD2C2]/30'
                                        }`}
                                >
                                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleCreate}>Create Alert</Button>
                </div>
            </Modal>
        </div>
    );
}
