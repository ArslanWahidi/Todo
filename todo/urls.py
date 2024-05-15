from django.urls import path
from . import views

# Create your Urls here

urlpatterns = [
    path('', views.Home, name='home'),
    path('completed', views.Completed, name='completed'),
    path('csrf_token/', views.CSRFToken, name='csrf_token'),
    path('api_view/', views.ApiOverview, name='api_view'),
    path('task_list/', views.TaskList, name='task_list'),
    path('task_details/<str:pk>/', views.TaskDetails, name='task_details'),
    path('task_create/', views.TaskCreate, name='task_create'),
    path('task_update/<str:pk>/', views.TaskUpdate, name='task_update'),
    path('status_task_update/<str:pk>/', views.StatusTaskUpdate, name='status_task_update'),
    path('task_delete/<str:pk>/', views.TaskDelete, name='task_delete'),
]