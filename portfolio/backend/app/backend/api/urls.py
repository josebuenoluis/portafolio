from django.urls import path,include
from .views import *
from rest_framework import routers
from rest_framework.authtoken import views
router = routers.DefaultRouter()
router.register(r'proyectos', ProyectosViewSet)
router.register(r'tecnologia', TecnologiaViewSet)
router.register(r'proyectos_tecnologias', Proyectos_TecnologiasViewSet)
router.register(r'post', PostViewSet)
router.register(r'contacto', ContactoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth', views.obtain_auth_token, name='api_token_auth'),
]