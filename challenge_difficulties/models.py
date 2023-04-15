from django.db import models

# Create your models here.
class Challenge_Difficulty(models.Model):
    difficulty_name = models.CharField(max_length=100)

    def __str__(self):
        return self.difficulty_name