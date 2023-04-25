from django.db import models
import datetime

# Create your models here.


class User_Game(models.Model):

    def get_default_end_time():
        return datetime.datetime.now() + datetime.timedelta(seconds=30)

    user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='user_games'
    )
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(default=get_default_end_time)
    seed = models.IntegerField(default=0)
    total_score = models.IntegerField(default=0)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} - Game {self.id}'
