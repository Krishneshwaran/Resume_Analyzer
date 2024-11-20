from django import forms
from .models import ResumeAnalysis  # Add this import

class ResumeAnalysisForm(forms.ModelForm):
    api_key = "AIzaSyC4o0xOcajPZf6Tl-13RSEAEBQiLT-QkE8"
    
    class Meta:
        model = ResumeAnalysis
        fields = ['resume_file', 'job_description']