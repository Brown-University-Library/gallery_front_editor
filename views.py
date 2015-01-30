from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class ApplicationView(TemplateView):
    template_name="gallery_front/app.html"

class PresentationList(TemplateView):
    template_name="gallery_front/presentationList.html"
