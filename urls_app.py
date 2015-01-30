from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    url('^$', views.ApplicationView.as_view(),  name="home"),
    url('^editor$', views.PresentationList.as_view(), name='presentation-list'),
)

