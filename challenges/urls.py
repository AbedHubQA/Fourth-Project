from django.urls import path
from .views import GetChallengeSections, GetChallenge, SubmitChallenge

# Any request hitting this urlpatterns list is: /api/sightings/
urlpatterns = [
    path('sections/', GetChallengeSections.as_view()),
    path('challenge/', GetChallenge.as_view()),
    path('submit/', SubmitChallenge.as_view())
]