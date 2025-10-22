# 🚀 EMPIEZA AQUÍ

## 🎯 Una Vez Docker Esté Listo

### Paso 1: Configurar Email

Edita `alertmanager/alertmanager.yml` y cambia:

- `smtp_from: 'TU-EMAIL@gmail.com'`
- `smtp_auth_username: 'TU-EMAIL@gmail.com'`
- `smtp_auth_password: 'TU-APP-PASSWORD'`
- `to: 'TU-EMAIL@example.com'`

**Para Gmail**: https://myaccount.google.com/apppasswords

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Iniciar el Sistema

```bash
docker-compose up --build -d
```

### Paso 4: Verificar

```bash
# Ver servicios
docker-compose ps

# Probar MySQL
./scripts/test-mysql.sh

# Probar balanceo
./scripts/test-load-balancer.sh
```

### Paso 5: Abrir Interfaces

- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Aplicación**: http://localhost
