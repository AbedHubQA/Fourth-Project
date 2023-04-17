from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from lib.exceptions import exceptions
from .models import User_Game
from .serializers.common import UserGameSerializer
from .serializers.populated import PopulatedUserGameSerializer

# Create your views here.
class StartGame(APIView):
    @exceptions
    def post(self, request):
        user_game = User_Game(user=request.user)
        user_game.save()
        serialized_user_game = PopulatedUserGameSerializer(user_game)
        return Response(serialized_user_game.data, status.HTTP_201_CREATED)
