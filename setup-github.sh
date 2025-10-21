#!/bin/bash

echo "🚀 Configurando Git para nuevo repositorio de GitHub..."
echo ""

# Configurar usuario de Git (si no está configurado)
if ! git config --global user.name > /dev/null; then
    echo "📝 Configurando usuario de Git..."
    read -p "Ingresa tu nombre de usuario de GitHub: " git_username
    git config --global user.name "$git_username"
fi

if ! git config --global user.email > /dev/null; then
    echo "📧 Configurando email de Git..."
    read -p "Ingresa tu email de GitHub: " git_email
    git config --global user.email "$git_email"
fi

# Crear .gitignore si no existe
if [ ! -f .gitignore ]; then
    echo "📄 Creando .gitignore..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Environment
.env
.env.local

# Logs
*.log

# OS
.DS_Store

# IDE
.vscode/
.idea/

# Docker volumes
mysql_data/
prometheus_data/
grafana_data/
EOF
fi

# Agregar todos los archivos
echo "📦 Agregando archivos al repositorio..."
git add .

# Hacer commit inicial
echo "💾 Creando commit inicial..."
git commit -m "🎯 Laboratorio de Monitoreo y Observabilidad - Sistema Distribuido

Sistema completo de monitoreo para aplicación distribuida con:
- 2 instancias de aplicación GraphQL (Node.js)
- Base de datos MySQL con persistencia
- Balanceador de carga Nginx (round-robin)
- Stack de monitoreo: Prometheus + Grafana + Alertmanager
- 13+ métricas clave en dashboard personalizado
- 18 reglas de alerta configuradas
- Notificaciones por email

Características:
✅ Aplicación integrada con MySQL
✅ Métricas de host, MySQL, aplicación y Nginx
✅ Sistema de alertas proactivas
✅ Scripts de automatización
✅ Documentación completa"

echo ""
echo "✅ Repositorio local configurado!"
echo ""
echo "🔗 Próximos pasos para subir a GitHub:"
echo ""
echo "1️⃣ Crea un nuevo repositorio en GitHub:"
echo "   • Ve a https://github.com/new"
echo "   • Nombre sugerido: 'monitor-laboratorio' o 'sistema-monitoreo-distribuido'"
echo "   • Descripción: 'Laboratorio de monitoreo y observabilidad - Sistemas Distribuidos'"
echo "   • ✅ Hazlo público"
echo "   • ❌ NO inicialices con README (ya tenemos código)"
echo ""
echo "2️⃣ Después de crear el repo, copia la URL y ejecuta:"
echo ""
echo "   git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "📝 Ejemplo:"
echo "   git remote add origin https://github.com/johndoe/monitor-laboratorio.git"
echo "   git push -u origin main"
echo ""
echo "🎉 ¡Tu proyecto estará en GitHub!"

# Mostrar información actual del repo
echo ""
echo "📊 Estado actual del repositorio:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git log --oneline -5
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Archivos incluidos:"
git ls-files | wc -l | xargs echo "   •" archivos rastreados
echo ""
echo "💡 Consejo: Usa 'git status' para ver cambios pendientes"
