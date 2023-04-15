from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator

# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=20, unique=True)
    profile_image = models.URLField(validators=[URLValidator()])
    is_admin = models.BooleanField(default=False)
    is_demo = models.BooleanField(default=False)

    def __str__(self):
        return self.username
