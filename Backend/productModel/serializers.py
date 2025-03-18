from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class HomeSerializer(serializers.ModelSerializer) : 
    class Meta :
        model = Home
        fields = '__all__' 

class SignupSerializer(serializers.ModelSerializer) : 
    class Meta : 
        model = User
        fields = ['id','username','password','email']
        extra_kwargs = {'password' : {'write_only' : True}}


class ProductSerializer(serializers.ModelSerializer) : 
    class Meta : 
        model = Product
        fields = ['id','name','desc','price','image'] 


class MobileSerializer(serializers.ModelSerializer) : 
    class Meta : 
        model = Mobile
        fields = ['id', 'name','desc','price','image']

        
class MomenSerializer(serializers.ModelSerializer) : 
    class Meta : 
        model = Momen
        fields = ['id', 'name','desc','price','image']