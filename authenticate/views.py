from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from .models import User
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from django.http import QueryDict


# Check the authentication

@api_view(['GET', 'POST'])
def AuthData(request):

    context = {}
    if request.user.is_authenticated:
        context = {'data': request.user.is_authenticated}
    else:
        context = {'data': request.user.is_authenticated}
    return Response(context, status=status.HTTP_200_OK)
 
# Create your views here.

# Curotmized the Refresh Token Accesss
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Set the token in the QueryDict data

        query_dict = QueryDict(mutable=True)
        query_dict.update({
            'csrfmiddlewaretoken': request.COOKIES.get('csrftoken'), 
            'refresh': request.COOKIES.get('refresh_token')
        })

        serializer = self.get_serializer(data=query_dict)
        response = Response(status=status.HTTP_200_OK)
        try:
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                response.set_cookie('refresh_token', serializer.validated_data['refresh'], httponly=True)
                response.set_cookie('access_token', serializer.validated_data['access'], httponly=True)
        except TokenError as e:
            print(f'tokenization error: {e}')
            return redirect('authenticate:login_page')
        
        return response

# Registration Views
def RegisterPage(request):
    return render(request, 'register.html')

@api_view(['POST'])
def RegisterNewUser(request):
    if User.objects.filter(email=request.data['email']):
        return Response(status=status.HTTP_200_OK, data=
                        {'data': 'data return the the response function', 
                         'dataone': 'second data of the response'})

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

# Login views

def LoginPage(request):
    response = render(request, 'login.html')

    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')

    return response

@api_view(['POST'])
def LoginUser(request):
    email = request.data['email']
    password = request.data['password']

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(status=status.HTTP_200_OK, data={'user_not_exist': 'Password and User combination are wrong 1'})
    if user is None:
        return Response(status=status.HTTP_200_OK, data={'user_not_exist': 'Password and User combination are wrong 2'})
    if not user.check_password(password):
        return Response(status=status.HTTP_200_OK, data={'user_not_exist': 'Password and User combination are wrong 3'})
    
    accessToken = AccessToken.for_user(user)
    refreshToken = RefreshToken.for_user(user)

    response = Response(status=status.HTTP_200_OK, )
    response.set_cookie('access_token', accessToken, httponly=True)
    response.set_cookie('refresh_token', refreshToken, httponly=True)
    return response

# Logout View

@api_view(['POST'])
def LogOutUser(request):
    try:
        refresh_token = request.COOKIES.get('refresh_token')
        
        response = Response(status=status.HTTP_200_OK)

        if refresh_token:
            response.delete_cookie('refresh_token')
            response.delete_cookie('access_token')

            token = RefreshToken(refresh_token)
            token.blacklist()
            return response
    except:
        print('error occured in the logout view in the authentication app')
        return Response(status=status.HTTP_401_UNAUTHORIZED)