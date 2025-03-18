from django.db import models


class Home(models.Model) : 
    name = models.CharField(max_length=100,blank=True,null=True)
    desc = models.CharField(max_length=100,blank=True,null= True)
    price = models.IntegerField()
    image = models.ImageField(upload_to='product/')

    def __str__(self) : 
        return self.name

class Product(models.Model) : 
    name = models.CharField(max_length=100,blank=True,null=True)
    desc = models.CharField(max_length=100,blank=True,null= True)
    price = models.IntegerField()
    image = models.ImageField(upload_to='product/')

    def __str__(self) : 
        return self.name


class Mobile(models.Model) : 
    name = models.CharField(max_length=100,blank=True,null=True)
    desc = models.CharField(max_length=100,blank=True,null=True)
    price = models.IntegerField()
    image = models.ImageField(upload_to = 'Mobile/')

    def __str__(self) : 
        return self.name


class Momen(models.Model) : 
    name = models.CharField(max_length=100,blank=True,null=True)
    desc = models.CharField(max_length=100,blank=True,null=True)
    price = models.IntegerField()
    image = models.ImageField(upload_to = 'Momen/')

    def __str__(self) : 
        return self.name

        
