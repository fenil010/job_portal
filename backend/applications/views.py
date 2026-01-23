from rest_framework import generics, permissions
from .models import Application
from .serializers import ApplicationSerializer
from .permissions import IsJobSeeker
from jobs.models import Job

# Jobseeker applies to job
class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsJobSeeker]

    def perform_create(self, serializer):
        job_id = self.kwargs['job_id']
        job = Job.objects.get(id=job_id)
        serializer.save(applicant=self.request.user, job=job)


# Jobseeker views own applications
class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(applicant=self.request.user)


# Employer views applicants for their job
class JobApplicantsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        return Application.objects.filter(job__id=job_id, job__created_by=self.request.user)
