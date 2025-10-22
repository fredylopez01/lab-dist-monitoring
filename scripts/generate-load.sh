#!/bin/bash

echo "Generando carga en el sistema..."
echo ""

echo "Enviando 100 peticiones al sistema..."
echo ""

SUCCESS=0
FAILED=0

for i in {1..100}; do
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)
    
    if [ "$RESPONSE" = "200" ]; then
        SUCCESS=$((SUCCESS + 1))
    else
        FAILED=$((FAILED + 1))
    fi
    
    sleep 0.1
done

echo ""
echo "Resultados:"
echo "Exitosas: $SUCCESS | Fallidas: $FAILED"