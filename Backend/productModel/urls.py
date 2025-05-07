from django.urls import path
from .views import *
from serverBase.views import *


urlpatterns = [
    path('signup/',SignupView.as_view(), name='signup'),
    path('user/',userNameView.as_view(), name='userName'),
    path('login/', LoginView.as_view(),name='login' ), 
    path('logout/', Logout.as_view(), name='logout'),
    path('product/',ProductView.as_view(),name='product'),
    path('product/<int:id>/', ProductView.as_view(),name='product-id'),
    path('mobile/',MobileView.as_view(),name='mobile'),
    path('mobile/<int:id>/', MobileView.as_view(),name='mobile-id'),
    path('home/',HomeView.as_view(),name='home'),
    path('home/<int:id>/', HomeView.as_view(),name='home-id'),
    path('women/',MomenView.as_view(),name='momen'),
    path('women/<int:id>/', MomenView.as_view(),name='momen-id'),
    path('addtocard/', CardView.as_view(), name='addtocard'),
    path('order/', OrderItemsView.as_view(), name = 'orderList')
   
]
