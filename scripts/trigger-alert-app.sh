#!/bin/bash

echo "🚨 Provocando alerta: Deteniendo App1..."
echo ""

docker-compose stop app1

if [ $? -eq 0 ]; then
    echo "✅ App1 detenido correctamente"
    echo ""
    echo "🔄 Verificando que el tráfico se redirige solo a App2..."
    echo ""
    
    for i in {1..10}; do
        INSTANCE=$(curl -s http://localhost/info | grep -o '"instance":"[^"]*"' | cut -d'"' -f4)
        echo "Petición $i: $INSTANCE"
        sleep 0.3
    done
    
    echo ""
    echo "⏳ Esperando que se active la alerta (aproximadamente 1-2 minutos)..."
    echo ""
    echo "Puedes verificar el estado en:"
    echo "  📈 Prometheus Alerts: http://localhost:9090/alerts"
    echo "  🚨 Alertmanager: http://localhost:9093"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Para restaurar App1, ejecuta:"
    echo "  docker-compose start app1"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo "❌ Error al detener App1"
    exit 1
fi
