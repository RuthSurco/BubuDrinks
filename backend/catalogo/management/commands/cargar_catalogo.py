from decimal import Decimal

from django.core.management.base import BaseCommand

from catalogo.models import Categoria, Producto


CATALOG = [
    ('Bubu Latte', 'Espresso suave con leche vaporizada y un delicado toque de miel.', '12.50', 'Cafés calientes', 'photo-1495474472287-4d71bcdd2085', 18),
    ('Cappuccino Menta', 'Cappuccino clásico con espuma de leche y un ligero sabor a menta.', '11.00', 'Cafés calientes', 'photo-1517701604599-bb29b565090c', 12),
    ('Mocha Bubu', 'Espresso combinado con chocolate, leche cremosa y espuma de leche.', '13.00', 'Cafés calientes', 'photo-1509042239860-f550ce710b93', 9),
    ('Caramel Panda', 'Café latte con jarabe de caramelo y una espuma extra cremosa.', '13.50', 'Cafés calientes', 'photo-1498804103079-a6351b050096', 16),
    ('Chocolate Bubu', 'Chocolate caliente preparado con leche y chocolate cremoso.', '11.50', 'Cafés calientes', 'photo-1542990253-0d0f5be5f0ed', 14),
    ('Matcha Panda', 'Matcha premium con leche cremosa y un toque de azúcar glass.', '14.00', 'Tés y matcha', 'photo-1515823064-d6e0c04616a7', 10),
    ('Té Verde Bubu', 'Infusión de té verde con limón y hojas de menta fresca.', '9.00', 'Tés y matcha', 'photo-1544787219-7f47ccb76574', 20),
    ('Chai Panda', 'Té chai con leche, canela y especias aromáticas.', '12.50', 'Tés y matcha', 'photo-1571934811356-5cc061b6821f', 11),
    ('Matcha Vainilla', 'Matcha frío o caliente con leche y un suave sabor a vainilla.', '14.50', 'Tés y matcha', 'photo-1536256263959-770b48d82b0a', 8),
    ('Limón Verde Refrescante', 'Agua mineral con limón, menta fresca y mucho hielo.', '9.00', 'Bebidas frías', 'photo-1513558161293-cdaf765ed2fd', 24),
    ('Frutos Rojos Fresh', 'Infusión fría de frutos rojos con un toque suave de miel.', '10.50', 'Bebidas frías', 'photo-1497534446932-c925b458314e', 17),
    ('Limonada Bubu', 'Limonada natural con hierbabuena, limón y hielo triturado.', '9.50', 'Bebidas frías', 'photo-1523677011781-c91d1bbe2f9e', 22),
    ('Té Verde Tropical', 'Té verde frío con piña, limón y un toque de miel.', '11.00', 'Bebidas frías', 'photo-1544145945-f90425340c7e', 13),
    ('Frappé Menta Choco', 'Frappé de menta con chocolate, crema batida y chispas.', '16.00', 'Frappés', 'photo-1572490122747-3968b75cc699', 7),
    ('Frappé Verde Matcha', 'Matcha helado con leche, hielo molido y chispas verdes.', '17.00', 'Frappés', 'photo-1577805947697-89e18249d767', 6),
    ('Frappé Fresa Panda', 'Frappé de fresa con crema batida y decoración de Bubu.', '16.50', 'Frappés', 'photo-1551024709-8f23befc6f87', 9),
    ('Frappé Mocha Bubu', 'Café, chocolate, leche y hielo licuado con crema batida.', '16.00', 'Frappés', 'photo-1461023058943-07fcbe16d735', 10),
    ('Smoothie Kiwi Energizante', 'Kiwi, yogurt natural, miel y hielo para recargar el día.', '14.00', 'Smoothies', 'photo-1553530666-ba11a7da3888', 12),
    ('Smoothie Mango Tropical', 'Mango maduro, leche de coco y un toque refrescante de lima.', '14.00', 'Smoothies', 'photo-1502741224143-90386d7f8c82', 15),
    ('Smoothie Verde Bubu', 'Espinaca, piña, manzana verde y agua de coco.', '15.00', 'Smoothies', 'photo-1610970881699-44a5587cabec', 5),
    ('Smoothie Fresa Cremoso', 'Fresas, yogurt natural, leche y un toque de miel.', '14.50', 'Smoothies', 'photo-1551024709-8f23befc6f87', 11),
    ('Cupcake Menta', 'Bizcocho suave de menta con cobertura de queso crema.', '8.00', 'Postres', 'photo-1576618148400-f54bed99fcfd', 8),
    ('Cheesecake de Maracuyá', 'Rebanada de cheesecake con salsa natural de maracuyá.', '12.00', 'Postres', 'photo-1565958011703-44f9829ba187', 6),
    ('Dona Glaseada Verde', 'Dona suave con glaseado de menta y decoraciones.', '7.00', 'Postres', 'photo-1551024506-0bccd828d307', 13),
    ('Brownie Bubu', 'Brownie de chocolate con textura suave y trozos de chocolate.', '8.50', 'Postres', 'photo-1499636136210-6f4ee915583e', 9),
    ('Galleta Panda', 'Galleta de vainilla decorada con el rostro de Bubu.', '6.00', 'Postres', 'photo-1499636136210-6f4ee915583e', 18),
    ('Palomitas Caramelo Verde', 'Palomitas cubiertas con caramelo y un toque de menta.', '7.00', 'Snacks', 'photo-1585647347384-2593bc35786b', 14),
    ('Barra de Granola Panda', 'Avena, frutos secos y chispas de chocolate en un solo bocado.', '6.00', 'Snacks', 'photo-1606312619070-d48b4c652a52', 20),
    ('Trufas de Matcha', 'Trufas de chocolate blanco cubiertas con polvo de matcha.', '9.00', 'Snacks', 'photo-1565958011703-44f9829ba187', 7),
    ('Croissant Bubu', 'Croissant de mantequilla, horneado y ligeramente dorado.', '8.00', 'Snacks', 'photo-1555507036-ab1f4038808a', 10),
    ('Sándwich Verde', 'Pollo, lechuga, queso y salsa especial de la casa.', '12.00', 'Snacks', 'photo-1528735602780-2552fd46c7af', 8),
]


def image_url(photo_id):
    return f'https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=900&q=82'


class Command(BaseCommand):
    help = 'Crea las categorías y carga los 31 productos iniciales de Bubu Drinks.'

    def handle(self, *args, **options):
        category_names = sorted({item[3] for item in CATALOG})
        categories = {}
        for name in category_names:
            category, _ = Categoria.objects.get_or_create(nombre=name)
            categories[name] = category

        for name, description, price, category_name, photo_id, stock in CATALOG:
            Producto.objects.update_or_create(
                nombre=name,
                defaults={
                    'descripcion': description,
                    'precio': Decimal(price),
                    'imagen': image_url(photo_id),
                    'cantidad_disponible': stock,
                    'categoria': categories[category_name],
                },
            )

        self.stdout.write(self.style.SUCCESS(
            f'Catálogo cargado correctamente: {len(categories)} categorías y {len(CATALOG)} productos.'
        ))
