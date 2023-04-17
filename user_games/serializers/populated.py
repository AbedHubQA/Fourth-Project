from .common import UserGameSerializer
from users.serializers.common import UserSerializer

class PopulatedUserGameSerializer(UserGameSerializer):
    user = UserSerializer()