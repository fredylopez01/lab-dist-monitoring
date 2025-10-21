#!/bin/bash

echo "🚀 Iniciando Sistema de Monitoreo Distribuido..."
echo ""

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo. Por favor inicia Docker Desktop."
    exit 1
fi

# Verificar que docker-compose esté instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose no está instalado."
    exit 1
fi

echo "✅ Docker está corriendo"
echo ""

# Construir imágenes
echo "📦 Construyendo imágenes Docker..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ Error al construir las imágenes"
    exit 1
fi

echo ""
echo "🚀 Levantando servicios..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Error al levantar los servicios"
    exit 1
fi

echo ""
echo "⏳ Esperando que los servicios estén listos..."
sleep 10

echo ""
echo "✅ Sistema iniciado correctamente!"
echo ""
echo "📊 Acceso a las interfaces:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌐 Aplicación (Load Balanced):  http://localhost"
echo "  📈 Prometheus:                  http://localhost:9090"
echo "  📊 Grafana:                     http://localhost:3000"
echo "     └─ Usuario: admin / Contraseña: admin"
echo "  🚨 Alertmanager:                http://localhost:9093"
echo "  🔧 App1 (directo):              http://localhost:4001/graphql"
echo "  🔧 App2 (directo):              http://localhost:4002/graphql"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Para ver los logs: docker-compose logs -f"
echo "🛑 Para detener: docker-compose stop"
echo "🗑️  Para eliminar: docker-compose down"
echo ""
