from rest_framework import serializers
from ..models import User_Challenge

class UserChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Challenge
        fields = '__all__'