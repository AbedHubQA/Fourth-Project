from rest_framework import serializers
from ..models import Challenge

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ('id', 'image_url', 'hint')

class GetChallengeSerializer(serializers.Serializer):
    game_id = serializers.IntegerField()
    difficulty_id = serializers.IntegerField()
    theme_id = serializers.IntegerField()

class SubmitChallengeSerializer(serializers.Serializer):
    game_id = serializers.IntegerField()
    challenge_id = serializers.IntegerField()
    user_answer = serializers.CharField()
    points_scored = serializers.IntegerField()
