from django import forms
from .models import Resume

class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['pdf_file', 'job_description']  # Adjust fields as needed

    # Optional: Add custom validation or fields if necessary
