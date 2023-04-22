from django.urls import path
from .views import StartGameView, ActiveGameView, UpdateUserGameView

urlpatterns = [
    path('', StartGameView.as_view()),
    path('active/', ActiveGameView.as_view()),
    path('<int:game_id>/', UpdateUserGameView.as_view()),
]