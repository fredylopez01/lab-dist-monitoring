#!/bin/bash

echo "⚡ Generando carga en el sistema..."
echo ""

# Verificar si curl está instalado
if ! command -v curl &> /dev/null; then
    echo "❌ Error: curl no está instalado"
    exit 1
fi

echo "Enviando 100 peticiones al sistema..."
echo ""

SUCCESS=0
FAILED=0

for i in {1..100}; do
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)
    
    if [ "$RESPONSE" = "200" ]; then
        SUCCESS=$((SUCCESS + 1))
        echo -ne "✅ Exitosas: $SUCCESS | ❌ Fallidas: $FAILED\r"
    else
        FAILED=$((FAILED + 1))
        echo -ne "✅ Exitosas: $SUCCESS | ❌ Fallidas: $FAILED\r"
    fi
    
    sleep 0.1
done

echo ""
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Resultados:"
echo "   ✅ Peticiones exitosas: $SUCCESS"
echo "   ❌ Peticiones fallidas: $FAILED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Revisa las métricas en:"
echo "  📈 Prometheus: http://localhost:9090"
echo "  📊 Grafana: http://localhost:3000"
