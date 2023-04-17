from rest_framework.serializers import ModelSerializer
from ..models import User_Game

class UserGameSerializer(ModelSerializer):
    class Meta:
        model = User_Game
        fields = '__all__'