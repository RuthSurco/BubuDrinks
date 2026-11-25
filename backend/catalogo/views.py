from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.select_related('categoria').all()
    serializer_class = ProductoSerializer
    http_method_names = ['get', 'patch', 'head', 'options']

    @action(detail=True, methods=['patch'], url_path='inventario')
    def inventario(self, request, pk=None):
        producto = self.get_object()
        cantidad = request.data.get('cantidad_disponible', producto.cantidad_disponible)
        try:
            cantidad = int(cantidad)
        except (TypeError, ValueError):
            return Response({'detail': 'Cantidad inválida.'}, status=400)
        if cantidad < 0:
            return Response({'detail': 'La cantidad no puede ser negativa.'}, status=400)
        producto.cantidad_disponible = cantidad
        producto.save(update_fields=['cantidad_disponible'])
        return Response(self.get_serializer(producto).data)


class AreaPrivadaView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'mensaje': 'Acceso autorizado al área privada.',
            'usuario': request.user.username,
            'es_staff': request.user.is_staff,
        })
