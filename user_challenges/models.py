from django.db import models

# Create your models here.
class User_Challenge(models.Model):
    game = models.ForeignKey(
        'user_games.User_Game',
        on_delete=models.CASCADE,
        related_name='user_challenges'
    )
    challenge = models.ForeignKey(
        'challenges.Challenge',
        on_delete=models.CASCADE,
        related_name='user_challenges'
    )
    points_scored = models.IntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    # revealed_squares = models.CharField(max_length=255, default="")
    # total_available_points = models.IntegerField(default=1200)

    class Meta:
        unique_together = ('game', 'challenge')

    def __str__(self):
        return f'{self.challenge} - {self.game}'