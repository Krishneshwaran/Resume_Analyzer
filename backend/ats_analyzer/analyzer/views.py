# resume_analyzer/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ResumeAnalysisForm
from .utils import parse_pdf_resume, analyze_resume
from .models import ResumeAnalysis  # Add this import

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@csrf_exempt
def analyze_resume_view(request):
    if request.method == 'POST':
        form = ResumeAnalysisForm(request.POST, request.FILES)
        if form.is_valid():
            analysis = form.save(commit=False)
            try:
                # Parse resume
                resume_text = parse_pdf_resume(request.FILES['resume_file'])
                
                # Get analysis
                api_key = 'AIzaSyC4o0xOcajPZf6Tl-13RSEAEBQiLT-QkE8'
                analysis_result = analyze_resume(
                    resume_text,
                    form.cleaned_data['job_description'],
                    api_key
                )
                
                analysis.analysis_result = analysis_result
                analysis.save()
                
                return JsonResponse({'success': True, 'data': analysis_result}, status=200)
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=400)
        else:
            return JsonResponse({'success': False, 'error': 'Invalid form data.'}, status=400)
    return JsonResponse({'success': False, 'error': 'Invalid request method.'}, status=405)
