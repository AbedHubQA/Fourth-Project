from rest_framework import serializers
from ..models import Leaderboard
from users.serializers.common import UserSerializer

class PopulatedLeaderboardSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Leaderboard
        fields = '__all__'