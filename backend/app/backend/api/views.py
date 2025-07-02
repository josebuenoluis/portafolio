from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from .serializers import *
from rest_framework.authentication import TokenAuthentication,SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .permissions import PostNoAthenticated
from .utils import enviarCorreo


class ProyectosViewSet(viewsets.ModelViewSet):
    queryset = Proyectos.objects.all()
    serializer_class = ProyectosSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

class TecnologiaViewSet(viewsets.ModelViewSet):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

class Proyectos_TecnologiasViewSet(viewsets.ModelViewSet):
    queryset = Proyectos_Tecnologias.objects.all()
    serializer_class = Proyectos_TecnologiasSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [PostNoAthenticated]

    def perform_create(self, serializer):
        contacto = serializer.save()

        print("Datos del contacto:", contacto.nombre, contacto.email)
        enviarCorreo(contacto.nombre,contacto.mensaje,contacto.email)