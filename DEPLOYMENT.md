# 📘 Guía Completa de Despliegue con AWS Amplify

Este proyecto usa **GitHub Actions** para desplegar automáticamente tu API GraphQL en **AWS Amplify** cada vez que haces push a la rama `main`.

---

## 🎯 Resumen del Proceso

1. Subes tu código a GitHub
2. Creas una app en AWS Amplify
3. Configuras credenciales de AWS
4. Agregas secrets en GitHub
5. Haces push a `main` y el despliegue ocurre automáticamente

---

## 📋 Requisitos Previos

- Cuenta de AWS (capa gratuita disponible)
- Cuenta de GitHub
- Git instalado localmente
- Node.js 18+ instalado

---

## 🚀 Paso a Paso Detallado

### Paso 1: Preparar el Repositorio en GitHub

#### 1.1 Inicializar Git (si no lo has hecho)

```bash
cd /ruta/a/tu/proyecto
git init
git add .
git commit -m "Initial commit: GraphQL API"
git branch -M main
```

#### 1.2 Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `graphql-api` (o el que prefieras)
3. Visibilidad: Público o Privado
4. **NO** inicialices con README, .gitignore o licencia
5. Click en **"Create repository"**

#### 1.3 Conectar y Subir

```bash
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

---

### Paso 2: Crear Aplicación en AWS Amplify

#### 2.1 Acceder a AWS Amplify

1. Inicia sesión en AWS: https://console.aws.amazon.com
2. Ve a AWS Amplify: https://console.aws.amazon.com/amplify
3. Click en **"New app"** > **"Host web app"**

#### 2.2 Conectar con GitHub

1. Selecciona **GitHub** como proveedor de código
2. Click en **"Continue"**
3. Autoriza a AWS Amplify para acceder a tu cuenta de GitHub
4. Selecciona tu repositorio de la lista
5. Selecciona la rama **main**
6. Click en **"Next"**

#### 2.3 Configurar Build Settings

Amplify detectará automáticamente que es una aplicación Node.js.

**Configuración sugerida:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - echo "Building GraphQL API..."
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
```

Click en **"Next"** y luego **"Save and deploy"**

#### 2.4 Obtener el App ID

Una vez creada la app:
1. Ve a **App settings** > **General**
2. Copia el **App ID** (algo como `d1a2b3c4d5e6f7`)
3. O cópialo de la URL: `https://console.aws.amazon.com/amplify/home?region=us-east-1#/d1a2b3c4d5e6f7`

**Guarda este App ID**, lo necesitarás más adelante.

---

### Paso 3: Configurar Credenciales de AWS (IAM)

Para que GitHub Actions pueda desplegar en Amplify, necesitas crear un usuario IAM con permisos.

#### 3.1 Acceder a IAM

1. Ve a AWS IAM: https://console.aws.amazon.com/iam
2. En el menú lateral, click en **"Users"**
3. Click en **"Create user"**

#### 3.2 Crear Usuario

1. **User name:** `github-actions-amplify`
2. **NO** marques "Provide user access to the AWS Management Console"
3. Click en **"Next"**

#### 3.3 Asignar Permisos

1. Selecciona **"Attach policies directly"**
2. Busca y marca estas políticas:
   - **`AdministratorAccess-Amplify`** (recomendado)
   - O si prefieres permisos más específicos:
     - `AWSAmplifyFullAccess`
     - `CloudWatchLogsFullAccess`
3. Click en **"Next"**
4. Click en **"Create user"**

#### 3.4 Crear Access Keys

1. Click en el usuario recién creado (`github-actions-amplify`)
2. Ve a la pestaña **"Security credentials"**
3. Scroll hasta **"Access keys"**
4. Click en **"Create access key"**
5. Selecciona **"Application running outside AWS"**
6. Click en **"Next"**
7. (Opcional) Agrega una descripción: "GitHub Actions deployment"
8. Click en **"Create access key"**

#### 3.5 Guardar Credenciales

**⚠️ IMPORTANTE:** Esta es la única vez que verás el Secret Access Key.

Copia y guarda en un lugar seguro:
- **Access Key ID:** `AKIA...` (ejemplo)
- **Secret Access Key:** `wJalrXUtnFEMI/K7MDENG/...` (ejemplo)

Click en **"Done"**

---

### Paso 4: Configurar Secrets en GitHub

Ahora vamos a agregar las credenciales de AWS como secrets en GitHub para que el workflow pueda usarlas.

#### 4.1 Acceder a Settings

1. Ve a tu repositorio en GitHub
2. Click en **"Settings"** (pestaña superior)
3. En el menú lateral, click en **"Secrets and variables"** > **"Actions"**

#### 4.2 Agregar Secrets

Click en **"New repository secret"** para cada uno de estos:

##### Secret 1: AWS_ACCESS_KEY_ID
- **Name:** `AWS_ACCESS_KEY_ID`
- **Secret:** (pega tu Access Key ID de AWS)
- Click en **"Add secret"**

##### Secret 2: AWS_SECRET_ACCESS_KEY
- **Name:** `AWS_SECRET_ACCESS_KEY`
- **Secret:** (pega tu Secret Access Key de AWS)
- Click en **"Add secret"**

##### Secret 3: AWS_REGION
- **Name:** `AWS_REGION`
- **Secret:** `us-east-1` (o la región donde creaste tu app de Amplify)
- Click en **"Add secret"**

##### Secret 4: AMPLIFY_APP_ID
- **Name:** `AMPLIFY_APP_ID`
- **Secret:** (pega el App ID que copiaste de Amplify)
- Click en **"Add secret"**

#### 4.3 Verificar

Deberías ver 4 secrets en la lista:
- ✅ AWS_ACCESS_KEY_ID
- ✅ AWS_SECRET_ACCESS_KEY
- ✅ AWS_REGION
- ✅ AMPLIFY_APP_ID

---

### Paso 5: Verificar el Workflow

El archivo `.github/workflows/deploy-aws.yml` ya está configurado y listo para usar.

**No necesitas modificar nada** si:
- Usas la región `us-east-1`
- Configuraste los 4 secrets correctamente

#### Contenido del Workflow

El workflow hace lo siguiente:
1. Se activa automáticamente en push a `main`
2. Instala Node.js 18
3. Instala las dependencias con `npm ci`
4. Ejecuta tests (si existen)
5. Configura credenciales de AWS
6. Despliega en AWS Amplify

---

### Paso 6: Desplegar

¡Ahora estás listo para desplegar!

```bash
git add .
git commit -m "Configure AWS Amplify deployment"
git push origin main
```

#### 6.1 Monitorear el Despliegue

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **"Actions"**
3. Verás un workflow en ejecución: **"Deploy to AWS Amplify"**
4. Click en él para ver los logs en tiempo real

#### 6.2 Verificar en AWS

1. Ve a la consola de AWS Amplify
2. Verás el build en progreso
3. Una vez completado, verás un checkmark verde ✅

---

### Paso 7: Acceder a tu API

#### 7.1 Obtener la URL

En la consola de AWS Amplify:
1. Click en tu app
2. Verás la URL en la parte superior, algo como:
   - `https://main.d1a2b3c4d5e6f7.amplifyapp.com`

#### 7.2 Probar la API

Accede a tu API GraphQL:
```
https://main.d1a2b3c4d5e6f7.amplifyapp.com/graphql
```

Deberías ver el **GraphQL Playground** donde puedes ejecutar queries.

#### 7.3 Ejemplo de Query

```graphql
query {
  players {
    id
    name
    position
    team
    nationality
  }
}
```

---

## 🔄 Despliegues Futuros

Una vez configurado, cada vez que hagas push a `main`, el despliegue ocurre automáticamente:

```bash
# 1. Haz cambios en tu código
# (edita archivos, agrega features, etc.)

# 2. Commit y push
git add .
git commit -m "Add new feature"
git push origin main

# 3. GitHub Actions despliega automáticamente ✨
# Ve a la pestaña Actions para monitorear
```

**No necesitas hacer nada más.** El workflow se encarga de todo.

---

## 🛠️ Configuración Avanzada

### Variables de Entorno

Si tu app necesita variables de entorno (como API keys):

1. Ve a AWS Amplify Console
2. Click en tu app
3. **App settings** > **Environment variables**
4. Click en **"Manage variables"**
5. Agrega tus variables (ej: `API_KEY`, `DATABASE_URL`)

### Cambiar el Puerto

El archivo `index.js` ya está configurado para usar `process.env.PORT`:

```javascript
const PORT = process.env.PORT || 4000;
```

AWS Amplify asignará automáticamente el puerto correcto.

### Agregar Tests

Si quieres agregar tests antes del despliegue:

1. Instala un framework de testing (ej: Jest)
   ```bash
   npm install --save-dev jest
   ```

2. Agrega un script en `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

3. El workflow ya ejecuta `npm test --if-present` automáticamente

---

## 🆘 Solución de Problemas

### Error: "Secrets not found"

**Causa:** Los secrets no están configurados o tienen nombres incorrectos.

**Solución:**
1. Ve a Settings > Secrets and variables > Actions
2. Verifica que los 4 secrets existan
3. Los nombres deben ser exactamente:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AMPLIFY_APP_ID`

### Error: "Access Denied" o "UnauthorizedException"

**Causa:** El usuario IAM no tiene permisos suficientes.

**Solución:**
1. Ve a AWS IAM
2. Selecciona el usuario `github-actions-amplify`
3. Verifica que tenga la política `AdministratorAccess-Amplify`
4. Si no, agrégala en "Add permissions"

### Error: "App not found" o "Invalid App ID"

**Causa:** El `AMPLIFY_APP_ID` es incorrecto.

**Solución:**
1. Ve a AWS Amplify Console
2. Click en tu app
3. Ve a App settings > General
4. Copia el App ID correcto
5. Actualiza el secret en GitHub

### El Workflow Falla en "Deploy to AWS Amplify"

**Causa:** Puede ser un problema con el action de Amplify.

**Solución alternativa:** Usa Amplify CLI en el workflow:

Edita `.github/workflows/deploy-aws.yml` y reemplaza el step de deploy con:

```yaml
- name: Install Amplify CLI
  run: npm install -g @aws-amplify/cli

- name: Deploy to Amplify
  run: |
    amplify pull --appId ${{ secrets.AMPLIFY_APP_ID }} --envName production --yes
    amplify publish --yes
```

### La App no Responde o Muestra Error 502

**Causa:** El servidor no está escuchando en el puerto correcto.

**Solución:**
1. Verifica que `index.js` use `process.env.PORT`
2. Revisa los logs en AWS Amplify:
   - Hosting > Build logs
   - Monitoring > Logs

### Build Falla por Dependencias

**Causa:** `package-lock.json` desactualizado o corrupto.

**Solución:**
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push origin main
```

---

## 📊 Monitoreo y Logs

### Ver Logs de Build

1. AWS Amplify Console
2. Click en tu app
3. **Hosting** > **Build logs**
4. Selecciona el build que quieres revisar

### Ver Logs de Runtime

1. AWS Amplify Console
2. **Monitoring** > **Logs**
3. Aquí verás los logs de tu aplicación en ejecución

### Métricas

1. AWS Amplify Console
2. **Monitoring** > **Metrics**
3. Verás:
   - Requests
   - Data transferred
   - Errors

---

## 💰 Costos

### AWS Amplify Pricing

**Capa Gratuita (12 meses):**
- 1,000 build minutes/mes
- 15 GB de almacenamiento
- 15 GB de transferencia de datos

**Después de la capa gratuita:**
- Build: $0.01 por minuto
- Hosting: $0.15 por GB almacenado
- Data transfer: $0.15 por GB servido

Para una API pequeña, el costo mensual suele ser **< $5**.

---

## 🔒 Seguridad

### Mejores Prácticas

1. **Nunca** commits credenciales en el código
2. Usa siempre GitHub Secrets para información sensible
3. Revisa los permisos de IAM regularmente
4. Considera usar roles de IAM en lugar de access keys (más avanzado)
5. Habilita MFA en tu cuenta de AWS
6. Rota las access keys cada 90 días

### Rotar Access Keys

Si necesitas cambiar las credenciales:

1. Crea nuevas access keys en AWS IAM
2. Actualiza los secrets en GitHub
3. Elimina las access keys antiguas en AWS

---

## 🌐 Dominios Personalizados

Si quieres usar tu propio dominio (ej: `api.midominio.com`):

1. AWS Amplify Console > tu app
2. **App settings** > **Domain management**
3. Click en **"Add domain"**
4. Sigue las instrucciones para configurar DNS

---

## 📚 Recursos Adicionales

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Documentation](https://graphql.org/learn/)

---

## ✅ Checklist Final

Antes de considerar el despliegue completo, verifica:

- [ ] Código subido a GitHub en la rama `main`
- [ ] App creada en AWS Amplify
- [ ] App ID copiado y guardado
- [ ] Usuario IAM creado con permisos de Amplify
- [ ] Access keys creadas y guardadas
- [ ] 4 secrets configurados en GitHub
- [ ] Workflow verificado en `.github/workflows/deploy-aws.yml`
- [ ] Push a `main` realizado
- [ ] Workflow ejecutado exitosamente en Actions
- [ ] Build completado en AWS Amplify
- [ ] URL de la app accesible
- [ ] GraphQL Playground funcionando
- [ ] Queries de prueba ejecutadas correctamente

---

## 🎉 ¡Listo!

Tu API GraphQL ahora está desplegada en AWS Amplify con despliegue automático desde GitHub. Cada vez que hagas cambios y los subas a `main`, se desplegarán automáticamente.

**¿Preguntas o problemas?** Revisa la sección de Solución de Problemas o consulta la documentación oficial de AWS Amplify.
