from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from lib.exceptions import exceptions
from .models import User_Game
from leaderboards.models import Leaderboard
from .serializers.common import UserGameSerializer
from .serializers.populated import PopulatedUserGameSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class StartGameView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def post(self, request):
        user_game = User_Game(user=request.user)
        user_game.save()
        leaderboard_entry = Leaderboard(user=request.user, game=user_game, total_points=0)
        leaderboard_entry.save()
        serialized_user_game = PopulatedUserGameSerializer(user_game)
        return Response(serialized_user_game.data, status.HTTP_201_CREATED)
