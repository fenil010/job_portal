from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Resume
from .serializers import ResumeSerializer
from applications.models import Application


class ResumeUploadView(generics.CreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        application = Application.objects.get(id=self.kwargs['application_id'])
        serializer.save(application=application)
