from django.http import HttpResponse
from django.shortcuts import render


def homepage(request):
    return render(request, 'Homepage/homepage.html')


def details(request):
    return render(request, 'Homepage/details.html')


def instructions(request):
    return render(request, 'Homepage/instructions.html')