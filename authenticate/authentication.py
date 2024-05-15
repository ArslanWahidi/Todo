from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt import authentication

class CustomizedJWTAuthentication(authentication.JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('access_token')
        
        if token is None:
            return None
        
        try:
            validated_token = self.get_validated_token(token)
        except (InvalidToken, TokenError) as e:
            print('raised block run in the authentication.py')
            raise AuthenticationFailed(str(e))
        
        user = self.get_user(validated_token)
        return (user, validated_token)