from django.db import models
from django.conf import settings
from jobs.models import Job

User = settings.AUTH_USER_MODEL

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=(
            ('applied', 'Applied'),
            ('reviewed', 'Reviewed'),
            ('rejected', 'Rejected'),
            ('accepted', 'Accepted'),
        ),
        default='applied'
    )

    class Meta:
        unique_together = ('job', 'applicant')  # 🚫 prevent duplicate apply

    def __str__(self):
        return f"{self.applicant} → {self.job}"
