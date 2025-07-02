from django.db import models

class Proyectos(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio_images/')
    tecnologias_fk = models.ManyToManyField('Tecnologia', related_name='tecnologias_fk', help_text="Tecnologías utilizadas en el proyecto")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    url = models.TextField(blank=True, null=True, help_text="URL del proyecto si está disponible")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Proyectos"
        ordering = ['-created_at'] 
    
class Tecnologia(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Tecnologías"
        ordering = ['nombre'] 

class Proyectos_Tecnologias(models.Model):
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE, related_name='proyectos_asociados')
    tecnologia = models.ForeignKey(Tecnologia, on_delete=models.CASCADE, related_name='tecnologias_usadas')

    class Meta:
        unique_together = ('proyecto', 'tecnologia')
        verbose_name_plural = "Proyectos Tecnologías"
        ordering = ['proyecto', 'tecnologia']

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    mensaje = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"""
        Nombre: {self.nombre}
        Email: {self.email}
        Mensaje: {self.mensaje}
        Creado el: {self.created_at}
"""

    class Meta:
        verbose_name_plural = "Contactos"
        ordering = ['-created_at']

class Categorias(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Categorías"
        ordering = ['nombre']

class Post(models.Model):
    titulo = models.CharField(max_length=100)
    contenido = models.TextField()
    imagen = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    categoria = models.ForeignKey(Categorias, on_delete=models.CASCADE, related_name='posts')
    fecha_publicacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name_plural = "Posts"
        ordering = ['-fecha_publicacion']