from django.urls import path

from quotes.views import IndexView

app_name = 'quotes'

urlpatterns = [
    path('', IndexView.as_view(), name='index')
]