from django.urls import path
from .views import UpdateRevealedSquaresView, GetUserChallengeView

urlpatterns = [
    path('update-revealed-squares/<int:user_challenge_id>/', UpdateRevealedSquaresView.as_view()),
    path("<int:user_challenge_id>/", GetUserChallengeView.as_view()),
]