from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from lib.exceptions import exceptions
from .models import User_Game
from leaderboards.models import Leaderboard
from user_challenges.models import User_Challenge
from challenge_difficulties.models import Challenge_Difficulty
from challenge_themes.models import Challenge_Theme
from .serializers.common import UserGameSerializer
from .serializers.populated import PopulatedUserGameSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist


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

class ActiveGameView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request):
        try:
            user_game = User_Game.objects.get(user=request.user, is_completed=False)
        except ObjectDoesNotExist:
            return Response({'message': 'No active game'}, status=status.HTTP_200_OK)

        serialized_user_game = PopulatedUserGameSerializer(user_game)
        return Response(serialized_user_game.data)
    
class ActiveGameChallengesView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request):
        try:
            user_game = User_Game.objects.get(user=request.user, is_completed=False)
        except ObjectDoesNotExist:
            return Response({'message': 'No active game'}, status=status.HTTP_200_OK)

        difficulties = Challenge_Difficulty.objects.all()
        themes = Challenge_Theme.objects.all()

        user_challenges = User_Challenge.objects.filter(game=user_game, is_completed=True)
        completed_challenges_difficulty_theme = user_challenges.values_list('challenge__difficulty', 'challenge__theme')

        challenge_sections = [
            {
                'difficulty': difficulty.difficulty_name,
                'themes': [
                    {
                        'id': theme.id,
                        'name': theme.theme_name,
                        'is_completed': (difficulty.id, theme.id) in completed_challenges_difficulty_theme,
                    }
                    for theme in themes
                ]
            }
            for difficulty in difficulties
        ]
        return Response(challenge_sections)


    
class UpdateUserGameView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    @exceptions
    def put(self, request, game_id):
        user_game = get_object_or_404(User_Game, user=request.user, id=game_id)
        serialized_user_game = UserGameSerializer(user_game, request.data, partial=True)
        serialized_user_game.is_valid(raise_exception=True)
        serialized_user_game.save()
        return Response(serialized_user_game.data)