from django.urls import path
from .views import StartGameView

# Any request hitting this urlpatterns list is: /api/sightings/
urlpatterns = [
    path('', StartGameView.as_view())
]