from rest_framework import serializers
from .models import Application
from resumes.models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ('file', 'uploaded_at')

class EmployerApplicationSerializer(serializers.ModelSerializer):
    resume = ResumeSerializer(read_only=True)
    applicant_username = serializers.CharField(
        source='applicant.username',
        read_only=True
    )

    class Meta:
        model = Application
        fields = (
            'id',
            'applicant_username',
            'status',
            'applied_at',
            'resume',
        )
