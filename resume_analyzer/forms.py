from django import forms
from .models import ResumeAnalysis  # Add this import

class ResumeAnalysisForm(forms.ModelForm):
    api_key = forms.CharField(widget=forms.PasswordInput())
    
    class Meta:
        model = ResumeAnalysis
        fields = ['resume_file', 'job_description']