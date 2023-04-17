from django.contrib import admin
from django.urls import path
from .views import LeaderboardListView, DeleteLeaderboardEntry

urlpatterns = [
    path('', LeaderboardListView.as_view()),
    path('<int:pk>/', DeleteLeaderboardEntry.as_view())
]