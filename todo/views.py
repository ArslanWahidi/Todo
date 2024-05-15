from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Task
from .serializer import TaskSerializer, UserSerializer
from django.middleware.csrf import get_token
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

# Create your views here.

    
def Home(request):
    return render(request, 'home_page.html', {})

def Completed(request):
    return render(request, 'completed.html', {})

def CSRFToken(request):
    return JsonResponse({'csrfToken': get_token(request)})

@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'List': '/task-list/',
        'Detail Views': '/task-detail/<str:pk>/',
        'create': '/task-create/',
        'update': '/task-update/<str:pk>/',
        'delete': '/task-delete/<str:pk>/'
    }
    return Response(api_urls)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def TaskList(request):
    tasks = Task.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def TaskDetails(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TaskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TaskUpdate(request, pk):
    task = Task.objects.get(id=pk)

    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def StatusTaskUpdate(request, pk):
    task = Task.objects.get(id=pk)

    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TaskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

