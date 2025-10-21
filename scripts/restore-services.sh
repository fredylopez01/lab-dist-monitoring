#!/bin/bash

echo "🔄 Restaurando todos los servicios..."
echo ""

docker-compose start

if [ $? -eq 0 ]; then
    echo "✅ Servicios restaurados correctamente"
    echo ""
    echo "⏳ Esperando que los servicios estén listos..."
    sleep 5
    echo ""
    echo "📊 Estado de los servicios:"
    docker-compose ps
else
    echo "❌ Error al restaurar los servicios"
    exit 1
fi
