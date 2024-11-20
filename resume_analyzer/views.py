# resume_analyzer/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ResumeAnalysisForm
from .utils import parse_pdf_resume, analyze_resume
from .models import ResumeAnalysis  # Add this import

def analyze_resume_view(request):
    if request.method == 'POST':
        form = ResumeAnalysisForm(request.POST, request.FILES)
        if form.is_valid():
            analysis = form.save(commit=False)
            
            try:
                # Parse resume
                resume_text = parse_pdf_resume(request.FILES['resume_file'])
                
                # Get analysis
                api_key = request.POST.get('api_key')
                analysis_result = analyze_resume(
                    resume_text,
                    form.cleaned_data['job_description'],
                    api_key
                )
                
                analysis.analysis_result = analysis_result
                analysis.save()
                
                return render(request, 'resume_analyzer/results.html', {
                    'analysis': analysis_result
                })
                
            except Exception as e:
                messages.error(request, str(e))
                return render(request, 'resume_analyzer/analyze.html', {'form': form})
    else:
        form = ResumeAnalysisForm()
    
    return render(request, 'resume_analyzer/analyze.html', {'form': form})