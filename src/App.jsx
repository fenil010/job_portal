import { useState, useCallback, useEffect } from 'react';
import { ToastProvider, useToast } from './components/ui';
import {
  LoginPage,
  RegisterPage,
  JobSeekerDashboard,
  EmployerDashboard,
  AdminDashboard,
  JobListingsPage,
  JobDetailsPage,
} from './pages';
import { mockJobs, mockApplications } from './data/mockData';

function AppContent() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState('Login');
  const [selectedJob, setSelectedJob] = useState(null);
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState(() => JSON.parse(localStorage.getItem('jp_savedJobs') || '[]'));
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem('jp_applications') || 'null') ?? mockApplications);
  const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem('jp_jobs') || 'null') ?? mockJobs);

  const handleNavigate = useCallback((page, data) => {
    if (page === 'JobDetails' && data) {
      setSelectedJob(data);
    }
    setCurrentPage(page);
  }, []);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('jp_user', JSON.stringify(userData));
    // Route based on role
    if (userData.role === 'employer') {
      setCurrentPage('EmployerDashboard');
      toast.success('Welcome back!', { title: 'Logged in as Employer' });
    } else if (userData.role === 'admin') {
      setCurrentPage('AdminDashboard');
      toast.success('Welcome back!', { title: 'Logged in as Admin' });
    } else {
      setCurrentPage('Dashboard');
      toast.success('Welcome back!', { title: 'Logged in as Job Seeker' });
    }
  }, [toast]);

  const handleRegister = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('jp_user', JSON.stringify(userData));
    if (userData.role === 'employer') {
      setCurrentPage('EmployerDashboard');
      toast.success('Account created successfully!', { title: 'Welcome Employer!' });
    } else {
      setCurrentPage('Dashboard');
      toast.success('Account created successfully!', { title: 'Welcome to JobPortal!' });
    }
  }, [toast]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCurrentPage('Login');
    toast.info('You have been logged out');
    localStorage.removeItem('jp_user');
  }, [toast]);

  const handleSaveJob = useCallback((job) => {
    setSavedJobs((prev) => {
      const isSaved = prev.some((j) => j.id === job.id);
      if (isSaved) {
        toast.info('Job removed from saved');
        const next = prev.filter((j) => j.id !== job.id);
        localStorage.setItem('jp_savedJobs', JSON.stringify(next));
        return next;
      } else {
        toast.success('Job saved successfully!');
        const next = [...prev, job];
        localStorage.setItem('jp_savedJobs', JSON.stringify(next));
        return next;
      }
    });
  }, [toast]);

  const handleApplyJob = useCallback((job) => {
    const alreadyApplied = applications.some((a) => a.jobId === job.id);
    if (alreadyApplied) {
      toast.warning('You have already applied for this job');
      return;
    }

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Submitted',
      statusColor: 'primary',
    };

    setApplications((prev) => {
      const next = [...prev, newApplication];
      localStorage.setItem('jp_applications', JSON.stringify(next));
      return next;
    });
    // increment applicants count on job if present
    setJobs((prevJobs) => {
      const nextJobs = prevJobs.map((j) => (j.id === job.id ? { ...j, applicants: (j.applicants || 0) + 1 } : j));
      localStorage.setItem('jp_jobs', JSON.stringify(nextJobs));
      return nextJobs;
    });
    toast.success(`Applied to ${job.title} at ${job.company || 'company'}!`, { title: 'Application Submitted' });
  }, [applications, toast]);

  const isJobSaved = useCallback((jobId) => {
    return savedJobs.some((j) => j.id === jobId);
  }, [savedJobs]);

  // Add new job (used by EmployerDashboard)
  const handlePostJob = useCallback((jobData) => {
    const job = { id: Date.now(), ...jobData };
    setJobs((prev) => {
      const next = [job, ...prev];
      localStorage.setItem('jp_jobs', JSON.stringify(next));
      return next;
    });
    toast.success('Job posted successfully', { title: 'Posted' });
    return job;
  }, [toast]);

  useEffect(() => {
    // load user from localStorage if present
    try {
      const storedUser = JSON.parse(localStorage.getItem('jp_user') || 'null');
      if (storedUser) setUser(storedUser);
    } catch (e) {
      // ignore
    }
  }, []);

  const renderPage = () => {
    const commonProps = {
      onNavigate: handleNavigate,
      user,
      onLogout: handleLogout,
    };

    switch (currentPage) {
      case 'Login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'Register':
        return <RegisterPage onNavigate={handleNavigate} onRegister={handleRegister} />;
      case 'Dashboard':
        return (
          <JobSeekerDashboard
            {...commonProps}
            savedJobs={savedJobs}
            applications={applications}
          />
        );
      case 'EmployerDashboard':
        return <EmployerDashboard {...commonProps} jobs={jobs} onPostJob={handlePostJob} applications={applications} />;
      case 'AdminDashboard':
        return <AdminDashboard {...commonProps} />;
      case 'Jobs':
        return (
          <JobListingsPage
            {...commonProps}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
            isJobSaved={isJobSaved}
            jobs={jobs}
          />
        );
      case 'JobDetails':
        return (
          <JobDetailsPage
            {...commonProps}
            job={selectedJob}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
            isSaved={selectedJob ? isJobSaved(selectedJob.id) : false}
            hasApplied={selectedJob ? applications.some((a) => a.jobId === selectedJob.id) : false}
          />
        );
      case 'Applications':
        return (
          <JobSeekerDashboard
            {...commonProps}
            savedJobs={savedJobs}
            applications={applications}
            activeTab="applications"
          />
        );
      case 'Saved':
        return (
          <JobListingsPage
            {...commonProps}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
            isJobSaved={isJobSaved}
            savedOnly
            savedJobs={savedJobs}
            jobs={jobs}
          />
        );
      case 'Profile':
      case 'Settings':
      case 'Messages':
        return (
          <JobSeekerDashboard
            {...commonProps}
            savedJobs={savedJobs}
            applications={applications}
          />
        );
      default:
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
    }
  };

  return renderPage();
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
