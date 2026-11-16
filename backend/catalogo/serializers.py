from rest_framework import serializers
from .models import Categoria, Producto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']


class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    precio_final = serializers.SerializerMethodField()
    en_promocion = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'precio', 'precio_final', 'descuento_porcentaje',
            'en_promocion', 'es_destacado', 'imagen', 'cantidad_disponible', 'categoria', 'categoria_nombre',
        ]
        read_only_fields = ['id', 'categoria_nombre', 'precio_final', 'en_promocion']

    def get_precio_final(self, obj):
        return obj.precio_final

    def get_en_promocion(self, obj):
        return obj.en_promocion
