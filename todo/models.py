from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=1000, null=True, blank=True, default='')
    description = models.CharField(max_length=20056, null=True, blank=True, default='')
    completed = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return str(f'{self.id}- {self.title} - {self.completed}')