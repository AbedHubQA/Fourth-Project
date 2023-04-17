from django.urls import path
from .views import GetChallengeSectionsView, GetChallengeView, SubmitChallengeView

# Any request hitting this urlpatterns list is: /api/sightings/
urlpatterns = [
    path('sections/', GetChallengeSectionsView.as_view()),
    path('challenge/', GetChallengeView.as_view()),
    path('submit/', SubmitChallengeView.as_view())
]