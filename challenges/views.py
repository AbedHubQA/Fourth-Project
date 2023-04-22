from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from lib.exceptions import exceptions
from .models import Challenge
from user_challenges.models import User_Challenge
from user_games.models import User_Game
from leaderboards.models import Leaderboard
from challenge_difficulties.models import Challenge_Difficulty
from challenge_themes.models import Challenge_Theme
from .serializers.common import ChallengeSerializer, GetChallengeSerializer, SubmitChallengeSerializer
import random
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.


class GetChallengeSectionsView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def get(self, request):
        difficulties = Challenge_Difficulty.objects.all()
        themes = Challenge_Theme.objects.all()
        challenge_sections = [
            {
                'difficulty': difficulty.difficulty_name,
                'themes': [
                    {
                        'id': theme.id,
                        'name': theme.theme_name
                    }
                    for theme in themes
                ]
            }
            for difficulty in difficulties
        ]
        return Response(challenge_sections)


class GetChallengeView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def post(self, request):
        get_challenge_serializer = GetChallengeSerializer(data=request.data)
        get_challenge_serializer.is_valid(raise_exception=True)

        game_id = get_challenge_serializer.validated_data['game_id']
        difficulty_id = get_challenge_serializer.validated_data['difficulty_id']
        theme_id = get_challenge_serializer.validated_data['theme_id']
        seed = get_challenge_serializer.validated_data['seed']

        challenges = Challenge.objects.filter(
            difficulty=difficulty_id, theme=theme_id)

        random.seed(seed)

        challenge = random.choice(challenges)
        challenge_serializer = ChallengeSerializer(challenge)

        user_challenge = User_Challenge.objects.filter(game_id=game_id, challenge_id=challenge.id).first()
        is_completed = user_challenge.is_completed if user_challenge else False

        response_data = {
            'game_id': game_id,
            **challenge_serializer.data,
            'is_completed': is_completed
        }

        return Response(response_data)


class SubmitChallengeView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def post(self, request):

        submit_challenge_serializer = SubmitChallengeSerializer(
            data=request.data)
        submit_challenge_serializer.is_valid(raise_exception=True)

        game_id = request.data["game_id"]
        challenge_id = request.data["challenge_id"]
        user_answer = request.data["user_answer"]
        points_scored = request.data["points_scored"]

        challenge = Challenge.objects.get(id=challenge_id)
        user_game = User_Game.objects.get(id=game_id)
        leaderboard_entry = Leaderboard.objects.get(game_id=game_id)

        is_correct = user_answer.lower() == challenge.solution.lower()

        if is_correct:
            points_scored = points_scored
            is_completed = True
        else:
            points_scored = 0
            is_completed = False

        user_challenge, created = User_Challenge.objects.get_or_create(
            game_id=game_id, challenge_id=challenge_id,
            defaults={'points_scored': points_scored,
                      'is_completed': is_completed}
        )

        if not created:
            user_challenge.points_scored = points_scored
            user_challenge.is_completed = is_completed
            user_challenge.save()

        user_game.total_score += points_scored
        user_game.is_completed = request.data.get('is_last_challenge', False)
        user_game.save()

        leaderboard_entry.total_points = user_game.total_score
        leaderboard_entry.save()

        response_data = {
            'is_correct': is_correct,
            'points_scored': points_scored,
            'total_score': user_game.total_score,
            'is_completed': user_challenge.is_completed
        }

        return Response(response_data)
