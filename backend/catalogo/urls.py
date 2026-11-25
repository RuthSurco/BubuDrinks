from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AreaPrivadaView, CategoriaViewSet, ProductoViewSet

router = DefaultRouter()
router.register('categorias', CategoriaViewSet, basename='categoria')
router.register('productos', ProductoViewSet, basename='producto')

urlpatterns = router.urls + [
    path('area-privada/', AreaPrivadaView.as_view(), name='area-privada'),
]
