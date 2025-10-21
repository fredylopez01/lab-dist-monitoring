#!/bin/bash

echo "🛑 Deteniendo Sistema de Monitoreo Distribuido..."
echo ""

docker-compose stop

if [ $? -eq 0 ]; then
    echo "✅ Sistema detenido correctamente"
else
    echo "❌ Error al detener el sistema"
    exit 1
fi
