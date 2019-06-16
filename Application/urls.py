from django.urls import path

from . import views

app_name = "Application"
urlpatterns = [
    path('', views.apply, name='apply', ),
    path('submitted/', views.submitted, name='submitted'),
    path("view/", views.view_application, name='view'),
    path('result/', views.result, name='result')
]
