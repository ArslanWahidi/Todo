from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User

# Create your Serializer here

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class StatusTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['completed']

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']