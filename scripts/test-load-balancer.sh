#!/bin/bash

echo "🔄 Probando Balanceador de Carga..."
echo ""
echo "Realizando 20 peticiones al endpoint /info"
echo "Deberías ver alternancia entre app1 y app2:"
echo ""

for i in {1..20}; do
    INSTANCE=$(curl -s http://localhost/info | grep -o '"instance":"[^"]*"' | cut -d'"' -f4)
    echo "Petición $i: $INSTANCE"
    sleep 0.2
done

echo ""
echo "✅ Prueba completada"
echo ""
echo "Si ves alternancia entre app1 y app2, el balanceo está funcionando correctamente."
