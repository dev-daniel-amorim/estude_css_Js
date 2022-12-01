from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class HomePage(TemplateView):
    template_name = 'homepage.html'

class LoginPage(TemplateView):
    template_name = 'loginpage.html'

class ImcPage(TemplateView):
    template_name = 'imcpage.html'