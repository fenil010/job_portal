import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select } from '../ui';
import { HeatmapCell } from './ChartComponents';

// Mock skill demand data
const SKILL_CATEGORIES = {
    'Programming Languages': ['JavaScript', 'Python', 'Java', 'TypeScript', 'Go', 'Rust', 'C++'],
    'Frontend': ['React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'Tailwind'],
    'Backend': ['Node.js', 'Django', 'Spring Boot', 'Express', 'FastAPI', 'GraphQL'],
    'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'Azure', 'GCP', 'CI/CD'],
    'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Spark'],
    'Soft Skills': ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Agile'],
};

const MOCK_SKILL_DEMAND = {
    'JavaScript': { demand: 95, growth: 12, avgSalary: 125000 },
    'Python': { demand: 92, growth: 18, avgSalary: 130000 },
    'React': { demand: 88, growth: 15, avgSalary: 128000 },
    'TypeScript': { demand: 85, growth: 25, avgSalary: 132000 },
    'AWS': { demand: 82, growth: 20, avgSalary: 140000 },
    'Node.js': { demand: 80, growth: 10, avgSalary: 122000 },
    'Docker': { demand: 78, growth: 22, avgSalary: 135000 },
    'SQL': { demand: 75, growth: 5, avgSalary: 115000 },
    'Java': { demand: 72, growth: -3, avgSalary: 128000 },
    'Kubernetes': { demand: 70, growth: 30, avgSalary: 145000 },
    'Vue': { demand: 65, growth: 8, avgSalary: 120000 },
    'Go': { demand: 62, growth: 35, avgSalary: 142000 },
    'MongoDB': { demand: 60, growth: 12, avgSalary: 118000 },
    'Angular': { demand: 58, growth: -5, avgSalary: 118000 },
    'Next.js': { demand: 55, growth: 45, avgSalary: 130000 },
    'GraphQL': { demand: 52, growth: 28, avgSalary: 128000 },
    'Rust': { demand: 45, growth: 50, avgSalary: 150000 },
    'Communication': { demand: 90, growth: 8, avgSalary: 0 },
    'Leadership': { demand: 85, growth: 10, avgSalary: 0 },
    'Problem Solving': { demand: 88, growth: 12, avgSalary: 0 },
};

const INDUSTRIES = [
    { value: 'all', label: 'All Industries' },
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'ecommerce', label: 'E-Commerce' },
];

const REGIONS = [
    { value: 'all', label: 'All Regions' },
    { value: 'us-west', label: 'US West Coast' },
    { value: 'us-east', label: 'US East Coast' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia Pacific' },
];

export default function SkillDemandHeatmap({ userSkills = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [industry, setIndustry] = useState('all');
    const [region, setRegion] = useState('all');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [sortBy, setSortBy] = useState('demand');

    const allSkills = useMemo(() => {
        const skills = [];
        Object.entries(SKILL_CATEGORIES).forEach(([category, categorySkills]) => {
            categorySkills.forEach(skill => {
                const data = MOCK_SKILL_DEMAND[skill] || { demand: Math.floor(Math.random() * 50 + 30), growth: Math.floor(Math.random() * 40 - 10), avgSalary: Math.floor(Math.random() * 50000 + 100000) };
                skills.push({ name: skill, category, ...data, hasSkill: userSkills.includes(skill) });
            });
        });
        return skills;
    }, [userSkills]);

    const filteredSkills = useMemo(() => {
        let result = [...allSkills];
        if (selectedCategory !== 'all') {
            result = result.filter(s => s.category === selectedCategory);
        }
        // Sort
        result.sort((a, b) => {
            if (sortBy === 'demand') return b.demand - a.demand;
            if (sortBy === 'growth') return b.growth - a.growth;
            if (sortBy === 'salary') return b.avgSalary - a.avgSalary;
            return 0;
        });
        return result;
    }, [allSkills, selectedCategory, sortBy]);

    const topSkills = useMemo(() => allSkills.sort((a, b) => b.demand - a.demand).slice(0, 10), [allSkills]);
    const trendingSkills = useMemo(() => allSkills.sort((a, b) => b.growth - a.growth).slice(0, 5), [allSkills]);
    const skillGaps = useMemo(() => allSkills.filter(s => !s.hasSkill && s.demand > 70).slice(0, 5), [allSkills]);

    const maxDemand = Math.max(...allSkills.map(s => s.demand));

    const getGrowthColor = (growth) => {
        if (growth > 20) return 'text-[#4ade80]';
        if (growth > 0) return 'text-[#789A99]';
        return 'text-[#f87171]';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e2a32]">Skill Demand Analysis</h2>
                    <p className="text-sm text-[#5a6b75]">Explore market demand for various skills</p>
                </div>
                <div className="flex gap-2">
                    <Select
                        options={INDUSTRIES}
                        value={industry}
                        onChange={setIndustry}
                        className="w-36"
                    />
                    <Select
                        options={REGIONS}
                        value={region}
                        onChange={setRegion}
                        className="w-36"
                    />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="default" padding="md">
                    <CardContent>
                        <p className="text-xs text-[#8a9aa4] uppercase tracking-wide">Most In-Demand</p>
                        <p className="text-xl font-bold text-[#1e2a32] mt-1">{topSkills[0]?.name}</p>
                        <p className="text-sm text-[#789A99]">{topSkills[0]?.demand}% demand</p>
                    </CardContent>
                </Card>
                <Card variant="default" padding="md">
                    <CardContent>
                        <p className="text-xs text-[#8a9aa4] uppercase tracking-wide">Fastest Growing</p>
                        <p className="text-xl font-bold text-[#1e2a32] mt-1">{trendingSkills[0]?.name}</p>
                        <p className="text-sm text-[#4ade80]">+{trendingSkills[0]?.growth}% growth</p>
                    </CardContent>
                </Card>
                <Card variant="default" padding="md">
                    <CardContent>
                        <p className="text-xs text-[#8a9aa4] uppercase tracking-wide">Highest Paying</p>
                        <p className="text-xl font-bold text-[#1e2a32] mt-1">Rust</p>
                        <p className="text-sm text-[#fbbf24]">$150k avg</p>
                    </CardContent>
                </Card>
                <Card variant="default" padding="md">
                    <CardContent>
                        <p className="text-xs text-[#8a9aa4] uppercase tracking-wide">Your Coverage</p>
                        <p className="text-xl font-bold text-[#1e2a32] mt-1">{userSkills.length}/{allSkills.length}</p>
                        <p className="text-sm text-[#5a6b75]">skills matched</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Heatmap */}
                <div className="lg:col-span-2">
                    <Card variant="default" padding="lg">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <CardTitle>Skill Demand Heatmap</CardTitle>
                                <div className="flex gap-2">
                                    {['all', ...Object.keys(SKILL_CATEGORIES)].slice(0, 5).map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${selectedCategory === cat
                                                    ? 'bg-[#789A99] text-white'
                                                    : 'bg-[#f5f3f1] text-[#5a6b75] hover:bg-[#e8e0dc]'
                                                }`}
                                        >
                                            {cat === 'all' ? 'All' : cat.split(' ')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Select
                                options={[
                                    { value: 'demand', label: 'Sort by Demand' },
                                    { value: 'growth', label: 'Sort by Growth' },
                                    { value: 'salary', label: 'Sort by Salary' },
                                ]}
                                value={sortBy}
                                onChange={setSortBy}
                                className="w-36"
                            />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {filteredSkills.map((skill) => {
                                    const intensity = skill.demand / 100;
                                    const bgColor = skill.hasSkill
                                        ? `rgba(74, 222, 128, ${0.2 + intensity * 0.6})`
                                        : `rgba(120, 154, 153, ${0.1 + intensity * 0.8})`;
                                    const textColor = intensity > 0.5 ? 'white' : '#1e2a32';

                                    return (
                                        <button
                                            key={skill.name}
                                            onClick={() => setSelectedSkill(skill)}
                                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${selectedSkill?.name === skill.name ? 'ring-2 ring-[#1e2a32] ring-offset-2' : ''
                                                }`}
                                            style={{ backgroundColor: bgColor, color: textColor }}
                                            title={`${skill.name}: ${skill.demand}% demand`}
                                        >
                                            {skill.name}
                                            {skill.hasSkill && <span className="ml-1">✓</span>}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#e8e0dc]">
                                <span className="text-xs text-[#8a9aa4]">Demand Level:</span>
                                <div className="flex items-center gap-1">
                                    {[20, 40, 60, 80, 100].map((level) => (
                                        <div
                                            key={level}
                                            className="w-6 h-4 rounded"
                                            style={{ backgroundColor: `rgba(120, 154, 153, ${level / 100})` }}
                                            title={`${level}%`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-[#8a9aa4] ml-4">Your Skills:</span>
                                <div className="w-6 h-4 rounded bg-[#4ade80]/60" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Skill Details */}
                <Card variant="default" padding="lg">
                    <CardHeader>
                        <CardTitle>Skill Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedSkill ? (
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-[#789A99]/10">
                                    <h3 className="text-xl font-bold text-[#1e2a32]">{selectedSkill.name}</h3>
                                    <p className="text-sm text-[#5a6b75]">{selectedSkill.category}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-[#8a9aa4]">Demand Score</p>
                                        <p className="text-2xl font-bold text-[#789A99]">{selectedSkill.demand}%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8a9aa4]">YoY Growth</p>
                                        <p className={`text-2xl font-bold ${getGrowthColor(selectedSkill.growth)}`}>
                                            {selectedSkill.growth > 0 ? '+' : ''}{selectedSkill.growth}%
                                        </p>
                                    </div>
                                </div>

                                {selectedSkill.avgSalary > 0 && (
                                    <div>
                                        <p className="text-xs text-[#8a9aa4]">Average Salary</p>
                                        <p className="text-xl font-bold text-[#1e2a32]">
                                            ${selectedSkill.avgSalary.toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-[#e8e0dc]">
                                    {selectedSkill.hasSkill ? (
                                        <Badge variant="success">You have this skill ✓</Badge>
                                    ) : (
                                        <div>
                                            <Badge variant="warning">Skill gap identified</Badge>
                                            <Button variant="outline" size="sm" className="mt-3 w-full">
                                                Find Learning Resources
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-[#8a9aa4]">
                                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="font-medium text-[#1e2a32]">Click a skill to view details</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Trending & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trending Skills */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>🚀 Trending Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#e8e0dc]">
                            {trendingSkills.map((skill, idx) => (
                                <div key={skill.name} className="p-4 flex items-center justify-between hover:bg-[#FFD2C2]/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-bold text-[#8a9aa4]">#{idx + 1}</span>
                                        <div>
                                            <p className="font-medium text-[#1e2a32]">{skill.name}</p>
                                            <p className="text-xs text-[#8a9aa4]">{skill.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${getGrowthColor(skill.growth)}`}>+{skill.growth}%</p>
                                        <p className="text-xs text-[#8a9aa4]">growth</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Skill Gaps */}
                <Card variant="default" padding="none">
                    <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                        <CardTitle>📈 Recommended to Learn</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-[#e8e0dc]">
                            {skillGaps.map((skill) => (
                                <div key={skill.name} className="p-4 flex items-center justify-between hover:bg-[#FFD2C2]/10 transition-colors">
                                    <div>
                                        <p className="font-medium text-[#1e2a32]">{skill.name}</p>
                                        <p className="text-xs text-[#8a9aa4]">{skill.demand}% demand • +{skill.growth}% growth</p>
                                    </div>
                                    <Button variant="outline" size="sm">Learn</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
