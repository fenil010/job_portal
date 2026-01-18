import { Button, Badge } from '../ui';

export default function JobCard({ job, onApply, onSave, isSaved = false, onViewDetails }) {
    const { id, title, company, location, jobType, salaryMin, salaryMax, postedAt, skills = [], isRemote, experienceLevel } = job;

    const jobTypeBadgeVariant = { 'Full-time': 'primary', 'Part-time': 'info', 'Contract': 'warning', 'Internship': 'success', 'Freelance': 'default' };

    const formatSalary = (min, max) => {
        const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        return `${fmt.format(min)} - ${fmt.format(max)}`;
    };

    return (
        <article
            className="group bg-white rounded-2xl border-2 border-[#e8e0dc] p-6 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[#1e2a32]/10 hover:-translate-y-1 hover:border-[#789A99]/30"
            aria-labelledby={`job-title-${id}`}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFD2C2] to-[#f5b8a3] flex items-center justify-center text-[#789A99] font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        {company?.charAt(0) || 'C'}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 id={`job-title-${id}`} className="text-lg font-semibold text-[#1e2a32] group-hover:text-[#789A99] transition-colors duration-300">
                                <button onClick={() => onViewDetails?.(job)} className="hover:underline focus:outline-none text-left">{title}</button>
                            </h3>
                            <p className="text-sm text-[#5a6b75]">{company}</p>
                        </div>
                        <button
                            onClick={() => onSave?.(job)}
                            className={`p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#789A99] hover:scale-110 ${isSaved ? 'text-[#789A99] bg-[#789A99]/10' : 'text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#FFD2C2]/30'
                                }`}
                            aria-label={isSaved ? 'Remove from saved' : 'Save job'}
                        >
                            {isSaved ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-[#5a6b75]">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {location}
                        </span>
                        {isRemote && <Badge variant="success" size="sm">Remote</Badge>}
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {formatSalary(salaryMin, salaryMax)}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge variant={jobTypeBadgeVariant[jobType] || 'default'} size="sm">{jobType}</Badge>
                        {experienceLevel && <Badge variant="outline" size="sm">{experienceLevel}</Badge>}
                        {skills.slice(0, 3).map((skill) => <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>)}
                        {skills.length > 3 && <span className="text-xs text-[#8a9aa4]">+{skills.length - 3} more</span>}
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-5 border-t-2 border-[#e8e0dc]">
                        <span className="text-xs text-[#8a9aa4]">Posted {postedAt}</span>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => onViewDetails?.(job)}>View Details</Button>
                            <Button variant="primary" size="sm" onClick={() => onApply?.(job)}>Apply Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
