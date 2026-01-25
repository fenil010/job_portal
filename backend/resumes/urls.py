from django.urls import path
from .views import ResumeUploadView

urlpatterns = [
    path('upload/<int:application_id>/', ResumeUploadView.as_view(), name='resume-upload'),
]
