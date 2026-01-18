import { DashboardLayout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui';
import { mockAdminStats, mockUsers } from '../../data/mockData';

export default function AdminDashboard({ onNavigate }) {
    const roleColors = { 'Job Seeker': 'primary', Employer: 'info' };
    const statusColors = { Active: 'success', Suspended: 'danger', Pending: 'warning' };

    const stats = [
        { label: 'Total Users', value: mockAdminStats.totalUsers.toLocaleString(), change: '+127 this week', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, color: 'bg-[#789A99]' },
        { label: 'Employers', value: mockAdminStats.totalEmployers, change: '+23 this week', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, color: 'bg-[#60a5fa]' },
        { label: 'Total Jobs', value: mockAdminStats.totalJobs.toLocaleString(), change: '+156 this week', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, color: 'bg-[#4ade80]' },
        { label: 'Pending', value: mockAdminStats.pendingApprovals, change: 'Needs attention', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'bg-[#fbbf24]' },
    ];

    const pendingEmployers = [
        { company: 'TechStartup Inc.', email: 'admin@techstartup.com', applied: 'Jan 17, 2026' },
        { company: 'Design Agency Co.', email: 'hr@designagency.com', applied: 'Jan 16, 2026' },
    ];

    const flaggedJobs = [
        { title: 'Remote Developer', company: 'Unknown LLC', reason: 'Flagged for review' },
        { title: 'Marketing Manager', company: 'Startup XYZ', reason: 'Suspicious content' },
    ];

    return (
        <DashboardLayout activeItem="Dashboard" onNavigate={onNavigate}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 animate-fade-in-down">
                    <h1 className="text-2xl font-bold text-[#1e2a32]">Admin Dashboard</h1>
                    <p className="mt-1 text-[#5a6b75]">Platform overview and management</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={stat.label} variant="default" padding="md" hover className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-[#5a6b75]">{stat.label}</p>
                                        <p className="mt-1 text-3xl font-bold text-[#1e2a32]">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg`}>{stat.icon}</div>
                                </div>
                                <p className={`mt-2 text-xs font-medium ${stat.label === 'Pending' ? 'text-[#fbbf24]' : 'text-[#789A99]'}`}>{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue="users" className="space-y-6 animate-fade-in-up stagger-2">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="users">User Management</TabsTrigger>
                        <TabsTrigger value="employers">Employer Approvals</TabsTrigger>
                        <TabsTrigger value="jobs">Job Moderation</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users">
                        <Card variant="default" padding="none">
                            <CardHeader className="p-5 border-b-2 border-[#e8e0dc]">
                                <CardTitle>All Users</CardTitle>
                                <Button variant="outline" size="sm">Export</Button>
                            </CardHeader>
                            <Table>
                                <TableHeader>
                                    <TableRow hoverable={false}>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockUsers.map((user, index) => (
                                        <TableRow key={user.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-gradient-to-br from-[#FFD2C2] to-[#f5b8a3] rounded-xl flex items-center justify-center text-[#789A99] text-xs font-semibold shadow">
                                                        {user.name.split(' ').map((n) => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[#1e2a32]">{user.name}</p>
                                                        <p className="text-xs text-[#8a9aa4]">{user.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell><Badge variant={roleColors[user.role]} size="sm">{user.role}</Badge></TableCell>
                                            <TableCell><Badge variant={statusColors[user.status]} size="sm">{user.status}</Badge></TableCell>
                                            <TableCell>{user.joinedAt}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <button className="p-2 text-[#8a9aa4] hover:text-[#789A99] hover:bg-[#FFD2C2]/20 rounded-lg transition-all duration-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                                    <button className="p-2 text-[#8a9aa4] hover:text-[#f87171] hover:bg-[#f87171]/10 rounded-lg transition-all duration-300"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    <TabsContent value="employers">
                        <Card variant="default" padding="lg">
                            <CardHeader><CardTitle>Pending Employer Approvals</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pendingEmployers.map((employer, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-5 bg-[#FFD2C2]/10 rounded-2xl border-2 border-[#FFD2C2]/30 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-[#FFD2C2] to-[#f5b8a3] rounded-xl flex items-center justify-center text-[#789A99] font-bold text-xl shadow">{employer.company.charAt(0)}</div>
                                                <div>
                                                    <p className="font-medium text-[#1e2a32]">{employer.company}</p>
                                                    <p className="text-sm text-[#5a6b75]">{employer.email}</p>
                                                    <p className="text-xs text-[#8a9aa4]">Applied: {employer.applied}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="success" size="sm">Approve</Button>
                                                <Button variant="danger" size="sm">Reject</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="jobs">
                        <Card variant="default" padding="lg">
                            <CardHeader><CardTitle>Jobs Requiring Moderation</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {flaggedJobs.map((job, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-5 bg-[#fbbf24]/10 border-2 border-[#fbbf24]/30 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                            <div>
                                                <p className="font-medium text-[#1e2a32]">{job.title}</p>
                                                <p className="text-sm text-[#5a6b75]">{job.company}</p>
                                                <Badge variant="warning" size="sm" className="mt-2">{job.reason}</Badge>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">Review</Button>
                                                <Button variant="success" size="sm">Approve</Button>
                                                <Button variant="danger" size="sm">Remove</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
