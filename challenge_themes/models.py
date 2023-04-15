from django.db import models

# Create your models here.
class Challenge_Theme(models.Model):
    theme_name = models.CharField(max_length=100)

    def __str__(self):
        return self.theme_name