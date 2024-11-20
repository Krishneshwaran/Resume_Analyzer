from django.urls import path
from . import views

urlpatterns = [
    path('', views.analyze_resume_view, name='analyze_resume'),
]