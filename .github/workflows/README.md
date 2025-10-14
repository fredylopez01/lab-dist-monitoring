# GitHub Actions Workflows

Este directorio contiene los workflows de GitHub Actions para CI/CD.

## 📄 Workflows Disponibles

### `deploy-aws.yml` - Despliegue en AWS Amplify

**Trigger:** Push a la rama `main`

**Pasos:**
1. Checkout del código
2. Setup de Node.js 18
3. Instalación de dependencias (`npm ci`)
4. Ejecución de tests (opcional)
5. Configuración de credenciales de AWS
6. Despliegue en AWS Amplify

**Secrets Requeridos:**
- `AWS_ACCESS_KEY_ID` - Access Key de usuario IAM
- `AWS_SECRET_ACCESS_KEY` - Secret Key de usuario IAM
- `AWS_REGION` - Región de AWS (ej: `us-east-1`)
- `AMPLIFY_APP_ID` - ID de la app en Amplify

## 🔧 Configuración

Para configurar los secrets:

1. Ve a tu repositorio en GitHub
2. **Settings** > **Secrets and variables** > **Actions**
3. Click en **"New repository secret"**
4. Agrega cada uno de los secrets listados arriba

## 📊 Monitoreo

Para ver el estado de los workflows:

1. Ve a la pestaña **Actions** en GitHub
2. Selecciona el workflow que quieres revisar
3. Click en una ejecución específica para ver los logs

## 🛠️ Modificar el Workflow

Si necesitas personalizar el workflow:

1. Edita `.github/workflows/deploy-aws.yml`
2. Commit y push los cambios
3. El workflow actualizado se usará en el próximo despliegue

## 📚 Documentación

Para más información sobre el despliegue, consulta:
- [QUICKSTART.md](../../QUICKSTART.md) - Guía rápida
- [DEPLOYMENT.md](../../DEPLOYMENT.md) - Guía completa
