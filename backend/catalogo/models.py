from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=80, unique=True)

    class Meta:
        ordering = ['nombre']
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=120)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    imagen = models.URLField(blank=True)
    cantidad_disponible = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name='productos')
    descuento_porcentaje = models.PositiveIntegerField(default=0)
    es_destacado = models.BooleanField(default=False)

    class Meta:
        ordering = ['categoria__nombre', 'nombre']
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.nombre

    @property
    def precio_final(self):
        if self.descuento_porcentaje > 0:
            return (self.precio * (100 - self.descuento_porcentaje)) / 100
        return self.precio

    @property
    def en_promocion(self):
        return self.descuento_porcentaje > 0
