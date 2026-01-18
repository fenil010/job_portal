import { useState, useCallback } from 'react';
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

function AppContent() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState('Login');
  const [selectedJob, setSelectedJob] = useState(null);
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const handleNavigate = useCallback((page, data) => {
    if (page === 'JobDetails' && data) {
      setSelectedJob(data);
    }
    setCurrentPage(page);
  }, []);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
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
  }, [toast]);

  const handleSaveJob = useCallback((job) => {
    setSavedJobs((prev) => {
      const isSaved = prev.some((j) => j.id === job.id);
      if (isSaved) {
        toast.info('Job removed from saved');
        return prev.filter((j) => j.id !== job.id);
      } else {
        toast.success('Job saved successfully!');
        return [...prev, job];
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

    setApplications((prev) => [...prev, newApplication]);
    toast.success(`Applied to ${job.title} at ${job.company}!`, { title: 'Application Submitted' });
  }, [applications, toast]);

  const isJobSaved = useCallback((jobId) => {
    return savedJobs.some((j) => j.id === jobId);
  }, [savedJobs]);

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
        return <EmployerDashboard {...commonProps} />;
      case 'AdminDashboard':
        return <AdminDashboard {...commonProps} />;
      case 'Jobs':
        return (
          <JobListingsPage
            {...commonProps}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
            isJobSaved={isJobSaved}
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
