#!/bin/bash

echo "🧪 Probando conexión a MySQL..."
echo ""

# Verificar que MySQL está corriendo
if ! docker-compose ps mysql | grep -q "Up"; then
    echo "❌ MySQL no está corriendo. Iniciando..."
    docker-compose up -d mysql
    echo "⏳ Esperando que MySQL esté listo..."
    sleep 10
fi

echo "✅ MySQL está corriendo"
echo ""

# Probar conexión desde el host
echo "📊 Probando conexión desde el host..."
docker-compose exec -T mysql mysql -uroot -prootpassword -e "SELECT 'Conexión exitosa' as status;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Conexión exitosa desde el host"
else
    echo "❌ Error al conectar desde el host"
    exit 1
fi

echo ""
echo "📋 Verificando base de datos y tablas..."
docker-compose exec -T mysql mysql -uroot -prootpassword football_db -e "SHOW TABLES;" 2>/dev/null

echo ""
echo "👥 Contando registros..."
echo ""

PLAYERS=$(docker-compose exec -T mysql mysql -uroot -prootpassword football_db -se "SELECT COUNT(*) FROM players;" 2>/dev/null)
STADIUMS=$(docker-compose exec -T mysql mysql -uroot -prootpassword football_db -se "SELECT COUNT(*) FROM stadiums;" 2>/dev/null)
MATCHES=$(docker-compose exec -T mysql mysql -uroot -prootpassword football_db -se "SELECT COUNT(*) FROM matches;" 2>/dev/null)

echo "  • Players: $PLAYERS"
echo "  • Stadiums: $STADIUMS"
echo "  • Matches: $MATCHES"

echo ""
echo "✅ Prueba de MySQL completada"
