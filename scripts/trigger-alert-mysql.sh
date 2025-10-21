#!/bin/bash

echo "🚨 Provocando alerta: Deteniendo MySQL..."
echo ""

docker-compose stop mysql

if [ $? -eq 0 ]; then
    echo "✅ MySQL detenido correctamente"
    echo ""
    echo "⏳ Esperando que se active la alerta (aproximadamente 1-2 minutos)..."
    echo ""
    echo "Puedes verificar el estado en:"
    echo "  📈 Prometheus Alerts: http://localhost:9090/alerts"
    echo "  🚨 Alertmanager: http://localhost:9093"
    echo ""
    echo "La alerta pasará por estos estados:"
    echo "  1. PENDING (esperando confirmación)"
    echo "  2. FIRING (alerta activa)"
    echo ""
    echo "Deberías recibir un email cuando la alerta esté en estado FIRING."
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Para restaurar MySQL, ejecuta:"
    echo "  docker-compose start mysql"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo "❌ Error al detener MySQL"
    exit 1
fi
