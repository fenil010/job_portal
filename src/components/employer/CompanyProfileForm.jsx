import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select } from '../ui';

export default function CompanyProfileForm({ company = {}, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: company.name || '',
        logo: company.logo || '',
        industry: company.industry || '',
        size: company.size || '',
        location: company.location || '',
        website: company.website || '',
        about: company.about || '',
        culture: company.culture || '',
        benefits: company.benefits || '',
        linkedin: company.linkedin || '',
        twitter: company.twitter || '',
        ...company,
    });

    const [logoPreview, setLogoPreview] = useState(company.logo || null);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
                handleChange('logo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave?.(formData);
    };

    const industrySuggestions = [
        { value: 'technology', label: 'Technology' },
        { value: 'finance', label: 'Finance & Banking' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'education', label: 'Education' },
        { value: 'retail', label: 'Retail & E-commerce' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'media', label: 'Media & Entertainment' },
        { value: 'other', label: 'Other' },
    ];

    const companySizes = [
        { value: '1-10', label: '1-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-500', label: '201-500 employees' },
        { value: '501-1000', label: '501-1000 employees' },
        { value: '1001+', label: '1000+ employees' },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Card variant="default" padding="none">
                <CardHeader className="p-6 border-b-2 border-[#e8e0dc]">
                    <CardTitle>Company Profile</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {/* Logo Upload */}
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl bg-[#FFD2C2]/20 border-2 border-dashed border-[#e8e0dc] flex items-center justify-center overflow-hidden">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Company logo" className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-10 h-10 text-[#8a9aa4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-[#1e2a32]">Company Logo</p>
                            <p className="text-xs text-[#8a9aa4]">Upload a square image (recommended: 200x200px)</p>
                            <Button type="button" variant="outline" size="sm" className="mt-2">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload Logo
                            </Button>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                            label="Company Name"
                            placeholder="e.g. TechCorp Inc."
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                        />
                        <Input
                            label="Website"
                            placeholder="https://example.com"
                            value={formData.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                            type="url"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <Select
                            label="Industry"
                            options={industrySuggestions}
                            value={formData.industry}
                            onChange={(value) => handleChange('industry', value)}
                            placeholder="Select industry"
                        />
                        <Select
                            label="Company Size"
                            options={companySizes}
                            value={formData.size}
                            onChange={(value) => handleChange('size', value)}
                            placeholder="Select size"
                        />
                        <Input
                            label="Headquarters"
                            placeholder="e.g. San Francisco, CA"
                            value={formData.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                        />
                    </div>

                    {/* About Section */}
                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">About the Company</label>
                        <textarea
                            value={formData.about}
                            onChange={(e) => handleChange('about', e.target.value)}
                            placeholder="Tell candidates about your company, mission, and what makes you unique..."
                            rows={4}
                            className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:ring-2 focus:ring-[#789A99]/20 transition-all duration-200 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Company Culture</label>
                        <textarea
                            value={formData.culture}
                            onChange={(e) => handleChange('culture', e.target.value)}
                            placeholder="Describe your work culture, values, and team dynamics..."
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:ring-2 focus:ring-[#789A99]/20 transition-all duration-200 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1e2a32] mb-2">Benefits & Perks</label>
                        <textarea
                            value={formData.benefits}
                            onChange={(e) => handleChange('benefits', e.target.value)}
                            placeholder="List the benefits you offer (e.g., Health insurance, 401k, Remote work, etc.)"
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-[#e8e0dc] rounded-xl text-[#1e2a32] placeholder-[#8a9aa4] focus:border-[#789A99] focus:ring-2 focus:ring-[#789A99]/20 transition-all duration-200 resize-none"
                        />
                    </div>

                    {/* Social Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                            label="LinkedIn"
                            placeholder="https://linkedin.com/company/..."
                            value={formData.linkedin}
                            onChange={(e) => handleChange('linkedin', e.target.value)}
                            leftIcon={
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            }
                        />
                        <Input
                            label="Twitter/X"
                            placeholder="https://twitter.com/..."
                            value={formData.twitter}
                            onChange={(e) => handleChange('twitter', e.target.value)}
                            leftIcon={
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            }
                        />
                    </div>
                </CardContent>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 p-6 border-t-2 border-[#e8e0dc]">
                    {onCancel && (
                        <Button type="button" variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" variant="primary">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Profile
                    </Button>
                </div>
            </Card>
        </form>
    );
}
