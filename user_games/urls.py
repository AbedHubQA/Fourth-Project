from django.urls import path
from .views import StartGame

# Any request hitting this urlpatterns list is: /api/sightings/
urlpatterns = [
    path('', StartGame.as_view())
]