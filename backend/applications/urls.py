from django.urls import path
from .views import ApplyJobView, MyApplicationsView, JobApplicantsView

urlpatterns = [
    path('apply/<int:job_id>/', ApplyJobView.as_view(), name='apply-job'),
    path('my/', MyApplicationsView.as_view(), name='my-applications'),
    path('job/<int:job_id>/', JobApplicantsView.as_view(), name='job-applicants'),
]
