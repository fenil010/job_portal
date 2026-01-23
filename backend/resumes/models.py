from django.db import models
from applications.models import Application

class Resume(models.Model):
    application = models.OneToOneField(
        Application,
        on_delete=models.CASCADE,
        related_name='resume'
    )
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Resume for Application {self.application.id}"
