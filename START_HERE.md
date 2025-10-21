# 🚀 EMPIEZA AQUÍ

## ⚠️ ANTES DE HACER CUALQUIER COSA

### 1️⃣ Inicia Docker Desktop

**El error más común es que Docker no está corriendo.**

```
❌ Cannot connect to the Docker daemon at unix:///.../.docker/run/docker.sock
```

**Solución**:
1. Abre **Docker Desktop** desde Applications (⌘ + Espacio → "Docker")
2. Espera a que el ícono de Docker en la barra de menú deje de parpadear
3. Debe decir "Docker Desktop is running"

### 2️⃣ Verifica que Docker funciona

```bash
docker info
```

✅ Si ves información del sistema → Docker está corriendo  
❌ Si ves un error → Docker no está corriendo (vuelve al paso 1)

---

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
./scripts/start.sh
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

---

## 📚 Documentación

- **README.md** - Documentación completa
- **TROUBLESHOOTING.md** - Solución de problemas
- **ARCHITECTURE_DIAGRAM.txt** - Diagrama del sistema

---

## 🆘 ¿Problemas?

1. **Docker no funciona** → Lee `TROUBLESHOOTING.md`
2. **Servicios no inician** → `docker-compose logs`
3. **Puerto ocupado** → `lsof -i :3000` y `kill -9 <PID>`

---

**¡Ahora sí, a trabajar!** 🚀
