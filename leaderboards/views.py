from django.shortcuts import render
from .serializers.populated import PopulatedLeaderboardSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Leaderboard
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from lib.exceptions import exceptions

# Create your views here.

class LeaderboardListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def get(self, request):
        leaderboard_entries = Leaderboard.objects.all().order_by('-total_points')
        serialized_leaderboard = PopulatedLeaderboardSerializer(
            leaderboard_entries, many=True)

        for i, entry in enumerate(serialized_leaderboard.data, start=1):
            entry['user']['rank'] = i

        return Response(serialized_leaderboard.data)

class DeleteLeaderboardEntry(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    @exceptions
    def delete(self, request, pk):
        entry_to_delete = Leaderboard.objects.get(pk=pk)
        if request.user == entry_to_delete.user or request.user.is_staff:
            entry_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise PermissionDenied()
