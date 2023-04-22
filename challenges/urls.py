from django.urls import path
from .views import GetChallengeSectionsView, GetChallengeView, SubmitChallengeView

urlpatterns = [
    path('sections/', GetChallengeSectionsView.as_view()),
    path('challenge/', GetChallengeView.as_view()),
    path('submit/', SubmitChallengeView.as_view())
]