from django.db import models

# Create your models here.
class Leaderboard(models.Model):
    user = models.ForeignKey(
        'users.User', 
        on_delete=models.CASCADE, 
        related_name='leaderboard_entries'
    )
    game = models.ForeignKey(
        'user_games.User_Game', 
        on_delete=models.CASCADE, 
        related_name='leaderboard_entries'
    )
    total_points = models.IntegerField()
    rank = models.IntegerField()

    def __str__(self):
        return f'{self.user.username} - {self.game.id} - Rank: {self.rank}'