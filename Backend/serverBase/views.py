from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import AddToCard
from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist


# User Info API
class userNameView(APIView): 
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({'userName' : request.user.username},status=201)


# Add to Cart API
class CardView(APIView): 
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get(self, request):
        try:
            obj = AddToCard.objects.filter(user=request.user)
            if not obj.exists():
                return Response({"message": "No items found in your cart."}, status=status.HTTP_404_NOT_FOUND)

            serializer = AddToCardSerializer(obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        data = request.data
        required_fields = ['content_type', 'object_id', 'quantity']

        # Validate required fields
        for field in required_fields:
            if field not in data:
                return Response({"error": f"Missing field: {field}"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the model dynamically
            try:
                model = ContentType.objects.get(model=data['content_type']).model_class()
            except ContentType.DoesNotExist:
                return Response({"error": "Invalid content type"}, status=status.HTTP_400_BAD_REQUEST)

            # Get the product instance
            try:
                product_instance = model.objects.get(id=data['object_id'])
            except ObjectDoesNotExist:
                return Response({"error": "Object not found for the given object_id"}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure the product has a price field
            if not hasattr(product_instance, 'price'):
                return Response({"error": "Product model does not have 'price' field"}, status=status.HTTP_400_BAD_REQUEST)

            # Validate quantity
            quantity = data['quantity']
            if not isinstance(quantity, int) or quantity <= 0:
                return Response({"error": "'quantity' must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)

            total = product_instance.price * quantity

            # Create cart item
            collection = AddToCard.objects.create(
                user=request.user,
                content_type=ContentType.objects.get_for_model(model),
                object_id=product_instance.id,
                quantity=quantity,
                total=total
            )
            collection.save()

            return Response({"message": "Item added to cart successfully!"}, status=status.HTTP_201_CREATED)

        except KeyError as e:
            return Response({"error": f"Missing field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrderItemsView(APIView):

    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            obj = OrderItems.objects.filter(user=request.user)
            if not obj.exists():
                return Response({"message": "No items found in your cart."}, status=status.HTTP_201_CREATED)

            serializer = AddToCardSerializer(obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        data = request.data
        required_fields = ['content_type', 'object_id', 'quantity']
        
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return Response(
                {"error": f"Missing Fields: {', '.join(missing_fields)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            try:
                content_type_obj = ContentType.objects.get(model=data['content_type'])
                model = content_type_obj.model_class()
            except ContentType.DoesNotExist:
                return Response({"error": "Invalid content type"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                product_instance = model.objects.get(id=data['object_id'])
            except ObjectDoesNotExist:
                return Response({"error": "Object not found for the given object_id"}, status=status.HTTP_400_BAD_REQUEST)

            if not hasattr(product_instance, 'price'):
                return Response({"error": "Product model does not have 'price' field"}, status=status.HTTP_400_BAD_REQUEST)

            quantity = data['quantity']
            if not isinstance(quantity, int) or quantity <= 0:
                return Response({"error": "'quantity' must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)

            amount = product_instance.price * quantity

            order_details = OrderItems.objects.create(
                user=request.user,  
                content_type=content_type_obj,
                object_id=product_instance.id,
                quantity=quantity,
                total=amount
            )

            return Response({"message": "Order added successfully!"}, status=status.HTTP_201_CREATED)

        except KeyError as e:
            return Response({"error": f"Missing field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
