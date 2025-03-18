from rest_framework import serializers 
from .models import *


class AddToCardSerializer(serializers.ModelSerializer) : 
    product = serializers.SerializerMethodField()
    
    class Meta:
        model = AddToCard
        fields = ['id', 'content_type', 'object_id', 'product', 'quantity', 'total']

    def get_product(self, obj) : 
        if obj.product :
             return {
                "id": obj.product.id,
                "name": getattr(obj.product, "name", ""),
                "description": getattr(obj.product, "desc", ""),
                "image":obj.product.image.url if obj.product.image else "", 
                "price": getattr(obj.product, "price", 0)
            }
        return None


class OrderItemsSerializer(serializers.ModelSerializer) : 
    product = serializers.SerializerMethodField()

    class Meta : 
        model = OrderItems
        fields = ['id', 'content_type','object_id','product','quantity', 'total']

    def get_product(self,obj) : 
        if obj.product : 
            return {
                 "id": obj.product.id,
                "name": getattr(obj.product, "name", ""),
                "description": getattr(obj.product, "desc", ""),
                "image":obj.product.image.url if obj.product.image else "", 
                "price": getattr(obj.product, "price", 0)
            }

