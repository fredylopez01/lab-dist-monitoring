# 🚀 Inicio Rápido - Despliegue Automático con AWS Amplify

## Pasos para Desplegar con GitHub Actions

### 1️⃣ Subir a GitHub (si no lo has hecho)

```bash
git init
git add .
git commit -m "Setup deployment with GitHub Actions"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### 2️⃣ Crear App en AWS Amplify

1. Ve a: https://console.aws.amazon.com/amplify
2. Click en **"New app"** > **"Host web app"**
3. Selecciona **GitHub** como proveedor
4. Autoriza a AWS Amplify para acceder a tu GitHub
5. Selecciona tu repositorio y la rama **main**
6. Amplify detectará automáticamente que es una app Node.js
7. **IMPORTANTE:** Copia el **App ID** (lo verás en la URL o en la configuración de la app)
   - Ejemplo: `d1a2b3c4d5e6f7`

### 3️⃣ Obtener Credenciales de AWS

1. Ve a: https://console.aws.amazon.com/iam
2. Click en **"Users"** > **"Create user"**
3. Nombre de usuario: `github-actions-amplify`
4. Selecciona **"Attach policies directly"**
5. Busca y selecciona: **`AdministratorAccess-Amplify`**
6. Click **"Next"** y **"Create user"**
7. Selecciona el usuario creado
8. Click en **"Security credentials"** > **"Create access key"**
9. Selecciona **"Application running outside AWS"**
10. Guarda el **Access Key ID** y **Secret Access Key**

### 4️⃣ Agregar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. **Settings** > **Secrets and variables** > **Actions**
3. Click en **"New repository secret"**
4. Agrega estos 4 secrets:

| Name | Value |
|------|-------|
| `AWS_ACCESS_KEY_ID` | Tu Access Key ID de AWS |
| `AWS_SECRET_ACCESS_KEY` | Tu Secret Access Key de AWS |
| `AWS_REGION` | `us-east-1` (o tu región preferida) |
| `AMPLIFY_APP_ID` | El App ID que copiaste de Amplify |

### 5️⃣ Verificar el Workflow

El archivo `.github/workflows/deploy-aws.yml` ya está configurado.
No necesitas modificar nada si usas la región `us-east-1`.

Si quieres cambiar la región, edita el secret `AWS_REGION` en GitHub.

### 6️⃣ Desplegar

```bash
git add .
git commit -m "Configure deployment"
git push origin main
```

✅ Ve a la pestaña **Actions** en GitHub para ver el progreso.

### 7️⃣ Verificar

1. Ve a la pestaña **Actions** en GitHub para ver el progreso del despliegue
2. Una vez completado, ve a la consola de AWS Amplify
3. Verás la URL de tu app, algo como:
   - `https://main.d1a2b3c4d5e6f7.amplifyapp.com`
4. Accede a la URL para ver tu API GraphQL funcionando
5. Añade `/graphql` al final para acceder al playground

---

## 🔄 Despliegues Futuros

Cada vez que hagas push a `main`, se desplegará automáticamente:

```bash
# Haz cambios en tu código
git add .
git commit -m "Nueva funcionalidad"
git push origin main

# GitHub Actions se encarga del resto ✨
```

---

## 🆘 Problemas Comunes

### Error: "Secrets not found"
- Verifica que los 4 secrets estén configurados en GitHub
- Los nombres deben coincidir exactamente (mayúsculas/minúsculas)

### Error: "App ID not found"
- Verifica que el `AMPLIFY_APP_ID` sea correcto
- Puedes encontrarlo en la URL de Amplify o en App settings > General

### La app no responde
- Verifica que el puerto esté configurado correctamente (ya está en `index.js`)
- Revisa los logs en la consola de AWS Amplify > Hosting > Build logs

---

## 📚 Documentación Completa

Para más detalles, consulta `DEPLOYMENT.md`

---

## ✅ Checklist

- [ ] Código subido a GitHub
- [ ] App creada en AWS Amplify
- [ ] App ID copiado
- [ ] Usuario IAM creado con permisos de Amplify
- [ ] Credenciales de AWS obtenidas
- [ ] 4 secrets configurados en GitHub (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AMPLIFY_APP_ID)
- [ ] Push a main realizado
- [ ] Verificado en Actions que el despliegue fue exitoso
- [ ] URL de Amplify funciona y muestra la API GraphQL
