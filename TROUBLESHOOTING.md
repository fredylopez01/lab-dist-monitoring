# 🔧 Solución de Problemas Rápida

## ❌ Error: "Cannot connect to the Docker daemon"

### Problema
```
Cannot connect to the Docker daemon at unix:///Users/davidrodriguez/.docker/run/docker.sock. 
Is the docker daemon running?
```

### Solución

**1. Iniciar Docker Desktop**

En macOS:
- Abre **Docker Desktop** desde Applications o Spotlight (⌘ + Espacio)
- Espera a que el ícono de Docker en la barra de menú deje de parpadear
- Verifica que diga "Docker Desktop is running"

**2. Verificar que Docker está corriendo**

```bash
docker info
```

Si ves información del sistema Docker, está funcionando correctamente.

**3. Reiniciar Docker Desktop (si es necesario)**

- Click en el ícono de Docker en la barra de menú
- Selecciona "Restart"
- Espera 30-60 segundos

**4. Verificar instalación**

```bash
docker --version
docker-compose --version
```

Deberías ver las versiones instaladas.

## ✅ Una Vez Docker Esté Corriendo

```bash
# Verificar que Docker funciona
docker ps

# Iniciar el sistema
./scripts/start.sh

# O manualmente
docker-compose up -d

# Verificar servicios
docker-compose ps
```

## 🐛 Errores de Prometheus

### Error: "malformed HTTP response" desde MySQL

**Error completo**:
```
Error scraping target: Get "http://mysql:3306/metrics": 
net/http: HTTP/1.x transport connection broken: malformed HTTP response "J\x00\x00\x00"
```

**Causa**: Prometheus está intentando scrapear MySQL directamente en el puerto 3306 (puerto de base de datos), pero MySQL no expone métricas de Prometheus en ese puerto.

**Solución**: ✅ Ya corregido en `prometheus/prometheus.yml`
- Las métricas de MySQL se obtienen a través de `mysqld-exporter:9104`
- No se debe scrapear `mysql:3306` directamente

### Error: "no such host" para mysqld-exporter

**Error completo**:
```
Error scraping target: Get "http://mysqld-exporter:9104/metrics": 
dial tcp: lookup mysqld-exporter on 127.0.0.11:53: no such host
```

**Causa**: El mysqld-exporter está en estado "Restarting" porque no puede conectarse a MySQL.

**Solución**: ✅ Ya corregido en `docker-compose.yml`
- Usar versión estable: `prom/mysqld-exporter:v0.15.1`
- Formato correcto de DATA_SOURCE_NAME: `root:rootpassword@tcp(mysql:3306)/`
- Agregar comandos: `--mysqld.username` y `--mysqld.address`

### Error: "no user specified" en mysqld-exporter

**Error en logs**:
```
level=ERROR msg="failed to validate config" section=client err="no user specified in section or parent"
```

**Causa**: Formato incorrecto de la cadena de conexión a MySQL.

**Solución**: ✅ Ya corregido
- Usar `tcp(mysql:3306)` en lugar de `(mysql:3306)`
- Formato correcto: `root:rootpassword@tcp(mysql:3306)/`

### Verificar Targets en Prometheus

Después de cualquier cambio, verifica los targets:

1. Abre: http://localhost:9090/targets
2. Todos deben estar en estado **UP** (verde)
3. Si alguno está **DOWN** (rojo), revisa los logs:
   ```bash
   docker-compose logs <servicio>
   ```

## 🐛 Otros Problemas Comunes

### Puerto Ocupado

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solución**:
```bash
# Ver qué proceso usa el puerto
lsof -i :3000

# Matar el proceso
kill -9 <PID>

# O cambiar el puerto en docker-compose.yml
```

### Servicios No Inician

**Solución**:
```bash
# Ver logs
docker-compose logs

# Reiniciar todo
docker-compose down -v
docker-compose up -d
```

### MySQL No Conecta

**Solución**:
```bash
# Ver logs de MySQL
docker-compose logs mysql

# Reiniciar MySQL
docker-compose restart mysql

# Esperar 10 segundos
sleep 10

# Probar conexión
./scripts/test-mysql.sh
```

### Prometheus No Recolecta Métricas

**Solución**:
- Ir a http://localhost:9090/targets
- Verificar que todos estén "UP"
- Si alguno está "DOWN", revisar logs:
  ```bash
  docker-compose logs <servicio>
  ```

## 📞 Comandos Útiles

```bash
# Ver estado de Docker
docker info

# Ver contenedores corriendo
docker ps

# Ver todos los contenedores
docker ps -a

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar un servicio
docker-compose restart <servicio>

# Detener todo
docker-compose stop

# Eliminar todo (incluyendo volúmenes)
docker-compose down -v

# Limpiar sistema Docker
docker system prune -a
```

## 🚀 Inicio Limpio

Si nada funciona, hacer un inicio limpio:

```bash
# 1. Detener y eliminar todo
docker-compose down -v

# 2. Limpiar Docker
docker system prune -a

# 3. Reiniciar Docker Desktop

# 4. Verificar
docker info

# 5. Iniciar de nuevo
./scripts/start.sh
```

---

**¿Sigue sin funcionar?** Verifica que Docker Desktop tenga suficientes recursos:
- Docker Desktop → Settings → Resources
- RAM: Mínimo 4GB, recomendado 8GB
- CPUs: Mínimo 2, recomendado 4
