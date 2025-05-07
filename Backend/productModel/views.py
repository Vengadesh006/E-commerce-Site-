from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny , IsAuthenticated 
from .serializers import *
from django.contrib.auth import authenticate, login , logout
from .models import *
from django.contrib.auth.models import User
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

auth_user = None

class HomeView(APIView) : 

    permission_classes = [AllowAny]

    def get(self,req,id=None) :

        print(auth_user)
        
        try :   
            if id is not None :
                details = Home.objects.get(id=id)
                serializer = HomeSerializer(details)
                return Response(serializer.data)
            else:
                obj = Home.objects.all()
                serializer = HomeSerializer(obj,many=True)
                return Response(serializer.data)
        except Home.DoesNotExist: 
            return Response({'mes' : 'Home Not Found'}, status=400 )

    def post(self,req) : 
        serializer = HomeSerializer(data=req.data) 
        if serializer.is_valid() : 
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def patch(self,req,id) :
        data = req.data
        Home_id = Home.objects.get(id = id)
        serializer = HomeSerializer(Home_id,data = data , partial = True)
        if serializer.is_valid() : 
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self,req,id) :
        try : 
            obj = Home.objects.get(id = id)
            obj.delete()
            return Response({'mes' : 'Home delete from dataabse'}, status=200)
        except Home.DoesNotExist : 
            return Response({'message': 'Home not found'}, status=404)


# Men's Product
class ProductView(APIView) : 
    
    permission_classes = [AllowAny]

    def get(self, req, id=None) :
        print(auth_user)
        print(req.user)
        try :   
            if id is not None :
                details = Product.objects.get(id=id)
                serializer = ProductSerializer(details)
                return Response(serializer.data)
            else:
                obj = Product.objects.all()
                serializer = ProductSerializer(obj,many=True)
                return Response(serializer.data)
        except Product.DoesNotExist: 
            return Response({'mes' : 'Product Not Foun'}, status=400 )

    def post(self,req) : 
        serializer = ProductSerializer(data=req.data) 
        if serializer.is_valid() : 
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def patch(self,req,id) :
        data = req.data
        product_id = Product.objects.get(id = id)
        serializer = ProductSerializer(product_id,data = data , partial = True)
        if serializer.is_valid() : 
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self,req,id) :
        try : 
            obj = Product.objects.get(id = id)
            obj.delete()
            return Response({'mes' : 'Product delete from dataabse'}, status=200)
        except Product.DoesNotExist : 
            return Response({'message': 'Product not found'}, status=404)

# Mobils's Product

class MobileView(APIView) : 
    permission_classes = [AllowAny]

    def get(self,req,id=None) :
        try : 
            if id is not None : 
                mobile_id = Mobile.objects.get(id=id)
                serializer = MobileSerializer(mobile_id)
                return Response(serializer.data)
            else :
                obj = Mobile.objects.all()
                serializer = MobileSerializer(obj,many=True)
                return Response(serializer.data)
        except Mobile.DoesNotExist : 
            return Response({'mes' : 'Mobile Product Not Found' })
    def post(self,req) : 
        data = req.data
        serializer = MobileSerializer(data=data)
        if serializer.is_valid() : 
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def patch(self,req,id) :
        try : 
            data = req.data
            obj = Mobile.objects.get(id=id)
            serializer = MobileSerializer(obj, data = data, partial = True) 
            if serializer.is_valid() : 
                serializer.save()
                return Response(serializer.data)
        except Mobile.DoesNotExist : 
            return Response({'mes' : 'Mobile Product Does not Exit' })
    
    def delete(self,req,id) :
        try :  
            obj = Mobile.objects.get(id=id)
            obj.delete()
            return Response({'mes' : 'delete form The database'})
        except Mobile.DoesNotExist : 
            return Response({'mes' : 'mobile Product Not Found' })

# Momen's Product
class MomenView(APIView) : 
    permission_classes = [AllowAny]

    def get(self,req,id=None) :
        try : 
            if id is not None : 
                Momen_id = Momen.objects.get(id=id)
                serializer = MomenSerializer(Momen_id)
                return Response(serializer.data)
            else :
                obj = Momen.objects.all()
                serializer = MomenSerializer(obj,many=True)
                return Response(serializer.data)
        except Momen.DoesNotExist : 
            return Response({'mes' : 'Momen Product Not Found' })
    def post(self,req) : 
        data = req.data
        serializer = MomenSerializer(data=data)
        if serializer.is_valid() : 
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def patch(self,req,id) :
        try : 
            data = req.data
            obj = Momen.objects.get(id=id)
            serializer = MomenSerializer(obj, data = data, partial = True) 
            if serializer.is_valid() : 
                serializer.save()
                return Response(serializer.data)
        except Momen.DoesNotExist : 
            return Response({'mes' : 'Momen Product Does not Exit' })
    
    def delete(self,req,id) :
        try :  
            obj = Momen.objects.get(id=id)
            obj.delete()
            return Response({'mes' : 'delete form The database'})
        except Momen.DoesNotExist : 
            return Response({'mes' : 'Momen Product Not Found' })

# Signup

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = SignupSerializer(data=request.data)            
            if serializer.is_valid():
                user = serializer.save()  # Prevent premature save
                user.set_password(request.data['password'])  # Hash password
                user.save()  # Now save the user
                return Response({'message': 'User created successfully :)'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'An error occurred while creating the user.{e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            logger.warning("Username and/or password missing")
            return Response({'mes': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user:

            login(request, user)

            token, _ = Token.objects.get_or_create(user=user)
            
            return Response({
                "token": token.key,
                "message": "Authentication successful",
                "username" : auth_user
            }, status=status.HTTP_200_OK)

        return Response({'mes': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


#Logout page  
class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        if hasattr(user, 'auth_token') : 

            user.auth_token.delete()

            logout(request)

            return Response({"message": "Logged out successfully"}, status=200)




