from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("analyzer.urls")),
    path('api/', include('accounts.urls')),   # Prefix for app routes
]
