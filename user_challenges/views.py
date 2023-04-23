from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import User_Challenge
from .serializers.common import UserChallengeSerializer

# Create your views here.

class GetUserChallengeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_challenge_id):
        user_challenge = User_Challenge.objects.get(pk=user_challenge_id)
        serializer = UserChallengeSerializer(user_challenge)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateRevealedSquaresView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, user_challenge_id):
        user_challenge = User_Challenge.objects.get(pk=user_challenge_id)
        data = request.data
        serializer = UserChallengeSerializer(user_challenge, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)