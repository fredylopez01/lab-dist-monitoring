# 🎯 Laboratorio de Monitoreo y Observabilidad - Sistema Distribuido

Sistema completo de monitoreo para una aplicación distribuida con microservicios, base de datos MySQL, balanceador de carga y stack de observabilidad (Prometheus + Grafana + Alertmanager).

## 📋 Descripción

Este laboratorio implementa:

- 2 instancias de aplicación GraphQL (Node.js)
- Base de datos MySQL con persistencia
- Balanceador de carga Nginx (round-robin)
- Stack de monitoreo: Prometheus + Grafana + Alertmanager
- Exporters: node_exporter, mysqld_exporter, nginx_exporter
- Dashboard con 13+ métricas clave
- 18 reglas de alerta configuradas
- Notificaciones por email

## Inicio

### 1. Configurar Email para Alertas

Edita `alertmanager/alertmanager.yml`:

```yaml
global:
  smtp_smarthost: "smtp.gmail.com:587"
  smtp_from: "TU-EMAIL@gmail.com"
  smtp_auth_username: "TU-EMAIL@gmail.com"
  smtp_auth_password: "TU-APP-PASSWORD"
```

**Para Gmail**: Genera un "App Password" en https://myaccount.google.com/apppasswords

También actualiza el destinatario:

```yaml
receivers:
  - name: "email-notifications"
    email_configs:
      - to: "TU-EMAIL@example.com"
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Iniciar el Sistema

```bash
docker-compose build
docker-compose up -d
```

### 4. Verificar Servicios

```bash
docker-compose ps
./scripts/test-mysql.sh
```

## 🌐 Acceso a las Interfaces

| Servicio            | URL                           | Credenciales      |
| ------------------- | ----------------------------- | ----------------- |
| **Grafana**         | http://localhost:3000         | admin/admin       |
| **Prometheus**      | http://localhost:9090         | -                 |
| **Alertmanager**    | http://localhost:9093         | -                 |
| **Aplicación (LB)** | http://localhost              | -                 |
| **App1 (directo)**  | http://localhost:4001/graphql | -                 |
| **App2 (directo)**  | http://localhost:4002/graphql | -                 |
| **MySQL**           | localhost:3306                | root/rootpassword |

## Pruebas

```bash
# Probar conexión MySQL
./scripts/test-mysql.sh

# Probar balanceo de carga
./scripts/test-load-balancer.sh

# Generar carga en el sistema
./scripts/generate-load.sh

# Provocar alerta MySQL
docker-compose stop mysql
docker-compose start mysql

# Provocar alerta App
docker-compose stop app1
docker-compose start app1

# Restaurar (Iniciar) servicios
docker-compose start

# Detener sistema
docker-compose stop
```

## 📊 Dashboard de Grafana - 13 Métricas

### Host (6 métricas)

1. **CPU Usage (%)** - Porcentaje de uso de CPU del host
2. **Memory Usage (%)** - Porcentaje de RAM utilizada
3. **Disk Usage (%)** - Espacio en disco utilizado
4. **Network Traffic** - Bytes enviados/recibidos por segundo
5. **System Load Average** - Carga del sistema (1m, 5m, 15m)
6. **Memory Details** - Memoria total, disponible y usada

### MySQL (3 métricas)

7. **MySQL Status** - Estado UP/DOWN de la base de datos
8. **MySQL Connections** - Conexiones activas y threads
9. **MySQL Query Rate** - Queries por segundo (total y lentas)

### Aplicación (2 métricas)

10. **App Instance 1 Status** - Estado de la primera instancia
11. **App Instance 2 Status** - Estado de la segunda instancia

### Nginx (2 métricas)

12. **Nginx Connections** - Conexiones activas en el balanceador
13. **Nginx Request Rate** - Peticiones HTTP por segundo

## 🚨 Sistema de Alertas (18 Reglas)

### Host (6 alertas)

- HighCPUUsage (>80% por 2min)
- CriticalCPUUsage (>95% por 1min)
- HighMemoryUsage (>85% por 2min)
- CriticalMemoryUsage (>95% por 1min)
- HighDiskUsage (>80% por 5min)
- CriticalDiskUsage (>90% por 2min)

### MySQL (4 alertas)

- MySQLDown (no responde por 1min)
- HighMySQLConnections (>80% del máximo)
- MySQLSlowQueries (>5/sec)
- MySQLConnectionErrors (>1/sec)

### Aplicación (3 alertas)

- ApplicationInstanceDown
- HighApplicationResponseTime (P95 >1s)
- HighApplicationErrorRate (>5%)

### Nginx (3 alertas)

- NginxDown
- HighNginxConnections (>1000)
- HighNginxRequestRate (>1000/sec)

### Contenedores (2 alertas)

- ContainerRestarted (>2 veces en 5min)
- MultipleContainersDown

## 🗄️ Base de Datos MySQL

### Schema

**4 Tablas principales:**

- `players` - Jugadores de fútbol
- `stadiums` - Estadios
- `matches` - Partidos (FK a stadiums)
- `player_performances` - Actuaciones (FK a players y matches)

### Acceder a MySQL

```bash
# Desde el host
docker-compose exec mysql mysql -uroot -prootpassword football_db

# Ver tablas
SHOW TABLES;

# Ver jugadores
SELECT * FROM players;

# Salir
exit
```

### Queries GraphQL de Ejemplo

**Obtener jugadores:**

```graphql
query {
  players {
    id
    name
    position
    team
    goals
    assists
  }
}
```

**Crear jugador:**

```graphql
mutation {
  createPlayer(
    input: {
      name: "Nuevo Jugador"
      position: "Delantero"
      team: "FC Test"
      age: 25
      nationality: "España"
    }
  ) {
    id
    name
    team
  }
}
```

**Obtener partidos con estadio:**

```graphql
query {
  matches {
    id
    home_team
    away_team
    home_score
    away_score
    stadium {
      name
      city
      country
    }
  }
}
```

## 📈 Queries PromQL Útiles

```promql
# CPU Usage
100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory Usage
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# Disk Usage
(1 - (node_filesystem_avail_bytes / node_filesystem_size_bytes)) * 100

# MySQL Connections
mysql_global_status_threads_connected

# MySQL Query Rate
rate(mysql_global_status_queries[5m])

# Nginx Request Rate
rate(nginx_http_requests_total[5m])

# App Status
up{job=~"app1|app2"}
```

## 📁 Estructura del Proyecto

```
distribuidos/
├── docker-compose.yml          # Orquestación de 11 servicios
├── Dockerfile                  # Imagen de la aplicación
├── package.json                # Dependencias Node.js
│
├── index.js                    # Servidor GraphQL con MySQL
├── db.js                       # Conexión a MySQL
├── schema.js                   # Schema GraphQL
├── resolvers.js                # Resolvers con SQL
│
├── prometheus/
│   ├── prometheus.yml          # Config con 7 scrape jobs
│   └── alert_rules.yml         # 18 reglas de alerta
│
├── alertmanager/
│   └── alertmanager.yml        # Config de notificaciones
│
├── nginx/
│   ├── nginx.conf              # Load balancer round-robin
│   └── status.conf             # Endpoint de métricas
│
├── mysql/
│   └── init.sql                # Schema y datos iniciales
│
├── grafana/
│   ├── provisioning/
│   │   ├── datasources/        # Prometheus datasource
│   │   └── dashboards/         # Dashboard provisioning
│   └── dashboards/
│       └── system-monitoring.json  # Dashboard con 13 métricas
│
└── scripts/
    ├── start.sh                # Iniciar sistema
    ├── stop.sh                 # Detener sistema
    ├── test-mysql.sh           # Probar MySQL
    ├── test-load-balancer.sh   # Probar balanceo
    ├── generate-load.sh        # Generar carga
    ├── trigger-alert-mysql.sh  # Provocar alerta MySQL
    ├── trigger-alert-app.sh    # Provocar alerta App
    └── restore-services.sh     # Restaurar servicios
```

## 🐛 Troubleshooting

### Prometheus no recolecta métricas

- Verificar: http://localhost:9090/targets
- Todos deben estar en estado "UP"

## 🎓 Conceptos Aplicados

- **Orquestación de contenedores** - Docker Compose
- **Redes virtuales** - Red bridge para comunicación
- **Volúmenes persistentes** - Datos de MySQL, Prometheus, Grafana
- **Balanceo de carga** - Nginx round-robin
- **Service Discovery** - Prometheus descubre targets
- **Health Checks** - Verificación de salud de servicios
- **Observabilidad** - Métricas, alertas, visualización
- **Alerting** - Sistema proactivo de notificaciones
- **High Availability** - Múltiples instancias de aplicación
- **Monitoring as Code** - Configuración versionada

## 📦 Tecnologías

| Componente    | Tecnología               | Puerto   |
| ------------- | ------------------------ | -------- |
| Aplicación    | Node.js + Apollo GraphQL | 4000     |
| Base de Datos | MySQL 8.0                | 3307     |
| Load Balancer | Nginx                    | 80, 8080 |
| Monitoreo     | Prometheus               | 9090     |
| Visualización | Grafana                  | 3000     |
| Alertas       | Alertmanager             | 9093     |
| Host Metrics  | node_exporter            | 9100     |
| MySQL Metrics | mysqld_exporter          | 9104     |
| Nginx Metrics | nginx_exporter           | 9113     |

## ✅ Checklist de Evaluación

### Análisis del Código (50%)

- [x] docker-compose.yml con servicios, redes y volúmenes
- [x] prometheus.yml con scrape_configs para todos los targets
- [x] alert_rules.yml con reglas en PromQL
- [x] nginx.conf con balanceo round-robin
- [x] Dashboard con 13+ métricas relevantes
- [x] Exporters configurados (node, mysql, nginx)
- [x] Alertmanager configurado para email

### Sustentación (50%)

- [ ] Sistema levantado con docker-compose
- [ ] Demostración de balanceo de carga
- [ ] Dashboard en Grafana funcional
- [ ] Explicación de 10+ métricas
- [ ] Alerta provocada (MySQL o App down)
- [ ] Alerta en PENDING → FIRING en Prometheus
- [ ] Email recibido mostrado

## 📚 Recursos Adicionales

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [PromQL Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Docker Compose](https://docs.docker.com/compose/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
