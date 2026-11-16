from django.contrib import admin
from .models import Categoria, Producto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    search_fields = ['nombre']
    list_display = ['nombre']


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'precio', 'descuento_porcentaje', 'cantidad_disponible', 'es_destacado']
    list_filter = ['categoria', 'es_destacado']
    list_editable = ['precio', 'descuento_porcentaje', 'cantidad_disponible', 'es_destacado']
    search_fields = ['nombre', 'descripcion']
