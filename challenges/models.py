from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Challenge(models.Model):
    difficulty = models.ForeignKey(
        'challenge_difficulties.Challenge_Difficulty',
        on_delete=models.CASCADE,
        related_name='challenges'
    )
    theme = models.ForeignKey(
        'challenge_themes.Challenge_Theme',
        on_delete=models.CASCADE,
        related_name='challenges'
    )
    solution = models.CharField(max_length=100)
    hint = models.CharField(max_length=100)
    image_url = models.URLField(validators=[URLValidator()])

    def __str__(self):
        return f'{self.difficulty} {self.theme}'
