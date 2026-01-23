import { useState, useMemo, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge, Modal, ModalFooter } from '../ui';

const DEFAULT_TEMPLATES = [
    { id: 1, name: 'Interview Invitation', category: 'interview', subject: 'Interview Invitation - {{position}}', body: 'Dear {{candidate_name}},\n\nThank you for applying for the {{position}} position. We would like to invite you for an interview.\n\nBest regards,\n{{recruiter_name}}', usageCount: 45 },
    { id: 2, name: 'Application Received', category: 'confirmation', subject: 'Application Received - {{position}}', body: 'Dear {{candidate_name}},\n\nThank you for your interest in the {{position}} role. We have received your application.\n\nBest regards,\nThe Team', usageCount: 89 },
    { id: 3, name: 'Rejection After Interview', category: 'rejection', subject: 'Update on Your Application', body: 'Dear {{candidate_name}},\n\nThank you for interviewing with us. After careful consideration, we have decided to move forward with another candidate.\n\nBest of luck,\n{{recruiter_name}}', usageCount: 23 },
    { id: 4, name: 'Offer Letter', category: 'offer', subject: 'Job Offer - {{position}}', body: 'Dear {{candidate_name}},\n\nCongratulations! We are pleased to offer you the position of {{position}}.\n\nPlease review the attached offer details.\n\nBest regards,\n{{recruiter_name}}', usageCount: 12 },
];

const VARIABLES = [
    { key: '{{candidate_name}}', label: 'Candidate Name', sample: 'John Doe' },
    { key: '{{position}}', label: 'Position', sample: 'Senior Developer' },
    { key: '{{company}}', label: 'Company', sample: 'TechCorp' },
    { key: '{{recruiter_name}}', label: 'Recruiter Name', sample: 'Jane Smith' },
    { key: '{{interview_date}}', label: 'Interview Date', sample: 'January 25, 2026' },
    { key: '{{interview_time}}', label: 'Interview Time', sample: '2:00 PM' },
];

export default function TemplateManager({ templates: initialTemplates = DEFAULT_TEMPLATES, onSave, onDelete, onUseTemplate }) {
    const [templates, setTemplates] = useState(initialTemplates);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const textareaRef = useRef(null);

    const categories = [
        { value: 'all', label: 'All Templates' },
        { value: 'interview', label: 'Interview' },
        { value: 'confirmation', label: 'Confirmation' },
        { value: 'rejection', label: 'Rejection' },
        { value: 'offer', label: 'Offer' },
        { value: 'follow_up', label: 'Follow-up' },
        { value: 'custom', label: 'Custom' },
    ];

    const getCategoryColor = (cat) => ({
        interview: 'info', confirmation: 'success', rejection: 'danger', offer: 'primary', follow_up: 'warning', custom: 'default'
    }[cat] || 'default');

    const filteredTemplates = useMemo(() => {
        let result = [...templates];
        if (activeCategory !== 'all') result = result.filter(t => t.category === activeCategory);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(t => t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q));
        }
        return result;
    }, [templates, activeCategory, searchQuery]);

    const handleEdit = (template) => {
        setEditingTemplate(template ? { ...template } : { id: null, name: '', category: 'custom', subject: '', body: '' });
        setShowEditModal(true);
    };

    const handleSave = () => {
        if (editingTemplate.id) {
            setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? editingTemplate : t));
        } else {
            // Use crypto.randomUUID() for safer unique ID generation
            const newId = typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            setTemplates(prev => [...prev, { ...editingTemplate, id: newId, usageCount: 0 }]);
        }
        onSave?.(editingTemplate);
        setShowEditModal(false);
        setEditingTemplate(null);
    };

    const handleDelete = (id) => {
        setTemplates(prev => prev.filter(t => t.id !== id));
        onDelete?.(id);
    };

    const insertVariable = useCallback((variable) => {
        if (!editingTemplate) return;

        const textarea = textareaRef.current;
        const currentBody = editingTemplate.body || '';

        if (textarea && typeof textarea.selectionStart === 'number') {
            // Insert at cursor position
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newBody = currentBody.slice(0, start) + variable + currentBody.slice(end);
            setEditingTemplate(prev => ({ ...prev, body: newBody }));

            // Restore cursor position after variable insertion
            setTimeout(() => {
                if (textarea) {
                    textarea.focus();
                    const newPosition = start + variable.length;
                    textarea.setSelectionRange(newPosition, newPosition);
                }
            }, 0);
        } else {
            // Append at end if cursor position not available
            setEditingTemplate(prev => ({ ...prev, body: currentBody + variable }));
        }
    }, [editingTemplate]);

    const getPreviewContent = (template) => {
        let content = template?.body || '';
        VARIABLES.forEach(v => { content = content.replace(new RegExp(v.key.replace(/[{}]/g, '\\$&'), 'g'), v.sample); });
        return content;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Message Templates</h2>
                    <p className="text-sm text-[#5a6b75]">Create and manage reusable message templates</p>
                </div>
                <Button variant="primary" onClick={() => handleEdit(null)}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Template
                </Button>
            </div>

            <Card variant="default" padding="md">
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search templates..." className="w-full pl-10 pr-4 py-2 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${activeCategory === cat.value ? 'bg-[#789A99] text-white' : 'bg-[#f5f3f1] text-[#5a6b75] hover:bg-[#e8e0dc]'}`}>
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map(template => (
                    <Card key={template.id} variant="default" padding="none" hover className="group">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <Badge variant={getCategoryColor(template.category)} size="sm" className="mb-2">{template.category}</Badge>
                                    <h4 className="font-semibold text-[#1e2a32]">{template.name}</h4>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(template)} className="p-1.5 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#789A99]/10 rounded-lg">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button onClick={() => handleDelete(template.id)} className="p-1.5 text-[#8a9aa4] hover:text-[#f87171] hover:bg-[#f87171]/10 rounded-lg">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-[#8a9aa4] mb-1">Subject:</p>
                            <p className="text-sm text-[#5a6b75] mb-3 truncate">{template.subject}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-[#8a9aa4]">Used {template.usageCount || 0} times</span>
                                <Button variant="outline" size="sm" onClick={() => onUseTemplate?.(template)}>Use</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <button onClick={() => handleEdit(null)} className="p-8 rounded-2xl border-2 border-dashed border-[#e8e0dc] hover:border-[#789A99] hover:bg-[#789A99]/5 transition-all flex flex-col items-center justify-center text-[#8a9aa4] hover:text-[#789A99] min-h-[200px]">
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    <span className="font-medium">Create Template</span>
                </button>
            </div>

            <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); setEditingTemplate(null); }} title={editingTemplate?.id ? 'Edit Template' : 'Create Template'} size="lg">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1e2a32] mb-2">Template Name</label>
                            <input type="text" value={editingTemplate?.name || ''} onChange={(e) => setEditingTemplate(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. Interview Invitation" className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1e2a32] mb-2">Category</label>
                            <select value={editingTemplate?.category || 'custom'} onChange={(e) => setEditingTemplate(prev => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none bg-white">
                                {categories.filter(c => c.value !== 'all').map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Subject Line</label>
                        <input type="text" value={editingTemplate?.subject || ''} onChange={(e) => setEditingTemplate(prev => ({ ...prev, subject: e.target.value }))} placeholder="Email subject..." className="w-full px-4 py-2.5 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none" />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-[#1e2a32]">Template Body</label>
                            <button onClick={() => setShowPreview(!showPreview)} className="text-sm text-[#789A99] hover:underline">{showPreview ? 'Edit' : 'Preview'}</button>
                        </div>
                        {showPreview ? (
                            <div className="p-4 bg-[#f5f3f1] rounded-xl text-sm text-[#1e2a32] whitespace-pre-wrap min-h-[200px]">{getPreviewContent(editingTemplate)}</div>
                        ) : (
                            <textarea ref={textareaRef} id="template-body" value={editingTemplate?.body || ''} onChange={(e) => setEditingTemplate(prev => ({ ...prev, body: e.target.value }))} placeholder="Template content..." rows={8} className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl focus:border-[#789A99] focus:outline-none resize-none font-mono text-sm" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#1e2a32] mb-2">Insert Variables</p>
                        <div className="flex flex-wrap gap-2">
                            {VARIABLES.map(v => <button key={v.key} onClick={() => insertVariable(v.key)} className="px-2 py-1 text-xs bg-[#789A99]/10 text-[#789A99] rounded-lg hover:bg-[#789A99]/20">{v.label}</button>)}
                        </div>
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => { setShowEditModal(false); setEditingTemplate(null); }}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave} disabled={!editingTemplate?.name || !editingTemplate?.subject}>{editingTemplate?.id ? 'Save Changes' : 'Create Template'}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
