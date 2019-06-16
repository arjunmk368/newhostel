from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

from .models import Applications
from .forms import ApplicationForm
from login.models import VerifiedUser


@login_required(redirect_field_name='/auth/')
def apply(request):
    context = {
        "form": ApplicationForm()
    }
    return render(request, 'Application/index.html', context)


@login_required(redirect_field_name='/auth/')
def submitted(request):
    user = request.user
    print(user)

    applicationform = ApplicationForm(request.POST, request.FILES, instance=user.applications)
    print(applicationform.errors)
    if applicationform.is_valid():
        applicationform.save()
        return HttpResponseRedirect("/apply/view")
    else:
        applicationform.show_error = True
        context = {
            "invalid": "The application is invalid please try again",
            "form": applicationform
        }
        return render(request, 'Application/index.html', context)


@login_required(redirect_field_name='/auth/')
def view_application(request):
    user = request.user

    return render(request, "Application/view.html", {})


@login_required(redirect_field_name='/auth/')
def result(request):
    user = request.user
    admitted = user.applications
    print(request.user)
    print(user.applications.admitted)
    return render(request, 'Application/result.html', {'context': admitted})
