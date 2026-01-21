import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge, useToast, Modal, ModalFooter } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '+1 (555) 123-4567',
        location: user?.location || 'San Francisco, CA',
        title: user?.title || 'Software Developer',
        bio: user?.bio || 'Passionate developer with 5+ years of experience building web applications. Looking for new opportunities to grow and contribute to innovative projects.',
        website: user?.website || 'https://portfolio.example.com',
        linkedin: user?.linkedin || 'linkedin.com/in/johndoe',
        github: user?.github || 'github.com/johndoe',
    });

    const [skills, setSkills] = useState(user?.skills || [
        'React', 'TypeScript', 'Node.js', 'Python', 'GraphQL', 'AWS', 'Docker', 'PostgreSQL'
    ]);
    const [newSkill, setNewSkill] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateUser({ ...formData, skills });
        setIsEditing(false);
        toast.success('Profile updated successfully!');
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const profileCompletion = 85;

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between animate-fade-in-down">
                    <div>
                        <h1 className="text-2xl font-bold text-[#3E2723]">My Profile</h1>
                        <p className="text-[#4A3C35] mt-1">Manage your personal information and preferences</p>
                    </div>
                    <div className="flex gap-3">
                        {isEditing ? (
                            <>
                                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button onClick={handleSave}>Save Changes</Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                {/* Profile Completion */}
                <Card variant="default" padding="md" className="animate-fade-in-up">
                    <CardContent>
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-[#3E2723]">Profile Completion</span>
                            <span className="text-sm font-semibold text-[#90353D]">{profileCompletion}%</span>
                        </div>
                        <div className="w-full bg-[#90353D]/10 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-[#90353D] to-[#6B2830] h-2.5 rounded-full transition-all duration-500" style={{ width: `${profileCompletion}%` }} />
                        </div>
                        <p className="text-sm text-[#4A3C35] mt-2">Complete your profile to increase visibility to employers</p>
                    </CardContent>
                </Card>

                {/* Profile Card */}
                <Card variant="elevated" padding="lg" className="animate-fade-in-up">
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-[#90353D] to-[#6B2830] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                        {formData.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    {isEditing && (
                                        <button
                                            onClick={() => setShowAvatarModal(true)}
                                            className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#90353D] hover:bg-[#FAF6F0] transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1 space-y-4">
                                {isEditing ? (
                                    <>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                                            <Input label="Job Title" name="title" value={formData.title} onChange={handleChange} />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                                            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                                        </div>
                                        <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <h2 className="text-2xl font-bold text-[#3E2723]">{formData.name}</h2>
                                            <p className="text-[#90353D] font-medium">{formData.title}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-[#4A3C35]">
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {formData.email}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                {formData.phone}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {formData.location}
                                            </span>
                                        </div>
                                        <Badge variant="success" size="md">Open to Work</Badge>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bio */}
                <Card variant="default" padding="lg" className="animate-fade-in-up stagger-1">
                    <CardHeader>
                        <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#90353D]/20 bg-white text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:shadow-[0_0_0_3px_rgba(144,53,61,0.15)] transition-all duration-300 resize-none"
                            />
                        ) : (
                            <p className="text-[#4A3C35] leading-relaxed">{formData.bio}</p>
                        )}
                    </CardContent>
                </Card>

                {/* Skills */}
                <Card variant="default" padding="lg" className="animate-fade-in-up stagger-2">
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {skills.map(skill => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    size="lg"
                                    className={isEditing ? 'pr-1' : ''}
                                >
                                    {skill}
                                    {isEditing && (
                                        <button
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="ml-2 w-5 h-5 rounded-full bg-[#90353D]/20 hover:bg-[#90353D]/40 flex items-center justify-center transition-colors"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </Badge>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a skill..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                />
                                <Button variant="outline" onClick={handleAddSkill}>Add</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card variant="default" padding="lg" className="animate-fade-in-up stagger-3">
                    <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <div className="space-y-4">
                                <Input
                                    label="Website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                                />
                                <Input
                                    label="LinkedIn"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    leftIcon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}
                                />
                                <Input
                                    label="GitHub"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    leftIcon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
                                />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {[
                                    { icon: '🌐', label: 'Website', value: formData.website },
                                    { icon: '💼', label: 'LinkedIn', value: formData.linkedin },
                                    { icon: '💻', label: 'GitHub', value: formData.github },
                                ].map(link => (
                                    <a
                                        key={link.label}
                                        href={link.value.startsWith('http') ? link.value : `https://${link.value}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#90353D]/5 transition-colors group"
                                    >
                                        <span className="text-xl">{link.icon}</span>
                                        <div>
                                            <div className="text-sm text-[#9B8B7E]">{link.label}</div>
                                            <div className="text-[#3E2723] group-hover:text-[#90353D] transition-colors">{link.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card variant="default" padding="lg" className="border-red-200 animate-fade-in-up stagger-4">
                    <CardHeader>
                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-[#3E2723]">Delete Account</p>
                                <p className="text-sm text-[#9B8B7E]">Permanently delete your account and all data</p>
                            </div>
                            <Button variant="ghost" className="text-red-600 hover:bg-red-50">
                                Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Avatar Upload Modal */}
            <Modal isOpen={showAvatarModal} onClose={() => setShowAvatarModal(false)} title="Change Profile Photo">
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-[#90353D]/20 rounded-xl p-8 text-center hover:border-[#90353D]/40 transition-colors">
                        <svg className="w-12 h-12 text-[#9B8B7E] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-[#4A3C35]">Drag and drop your photo here, or</p>
                        <label className="cursor-pointer text-[#90353D] font-medium hover:underline">
                            browse files
                            <input type="file" className="hidden" accept="image/*" />
                        </label>
                    </div>
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setShowAvatarModal(false)}>Cancel</Button>
                    <Button>Upload Photo</Button>
                </ModalFooter>
            </Modal>
        </DashboardLayout>
    );
}
