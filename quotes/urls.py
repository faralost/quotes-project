from django.urls import path

from quotes.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index')
]