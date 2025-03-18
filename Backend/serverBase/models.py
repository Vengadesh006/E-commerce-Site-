from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

# Create your models here.

class AddToCard(models.Model) : 
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    content_type = models.ForeignKey(ContentType,on_delete=models.SET_NULL,null=True)
    object_id = models.PositiveIntegerField()
    product = GenericForeignKey('content_type', 'object_id')
    quantity = models.IntegerField(default=1)
    total = models.IntegerField(null=True)

    def __str__(self) : 
        return str( self.product)

class OrderItems(models.Model) : 
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE,null=True)
    object_id = models.PositiveIntegerField()
    product = GenericForeignKey('content_type','object_id')
    quantity = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10,decimal_places=2)
    current_date = models.DateField(auto_now=True)

    def __str__(self) : 
        return str( self.product)


