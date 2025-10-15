# 🚀 Configuración de AWS Amplify Gen 2

Esta guía te ayudará a desplegar tu API GraphQL en AWS Amplify usando funciones Lambda.

## 📋 Prerequisitos

- Cuenta de AWS
- Repositorio en GitHub
- Node.js 18+

---

## 🔧 Paso 1: Crear Aplicación en AWS Amplify

### 1.1 Accede a la consola de Amplify

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click en **"Create new app"**

### 1.2 Conectar repositorio

1. Selecciona **"GitHub"** como source
2. Autoriza AWS Amplify a acceder a tu GitHub
3. Selecciona tu repositorio: `Davidtch-py/APICI-CD`
4. Selecciona la rama: `main`
5. Click en **"Next"**

### 1.3 Configurar build settings

Amplify detectará automáticamente el archivo `amplify.yml`. 

**Verifica que la configuración sea:**
- Build command: `npm ci`
- Output directory: `/`

Click en **"Next"** y luego **"Save and deploy"**

---

## 🔑 Paso 2: Configurar Secrets en GitHub

Ve a tu repositorio en GitHub:

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Agrega estos secrets:

| Secret Name | Descripción | Ejemplo |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | Access Key de tu usuario IAM | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | Secret Key de tu usuario IAM | `wJalr...` |
| `AWS_REGION` | Región donde creaste la app | `us-east-1` |
| `AMPLIFY_APP_ID` | ID de tu app en Amplify | `d1234567890abc` |

### 📍 Cómo encontrar el AMPLIFY_APP_ID:

1. En Amplify Console, selecciona tu app
2. El App ID aparece en la URL: `https://console.aws.amazon.com/amplify/home?region=us-east-1#/d1234567890abc`
3. También en **App settings** → **General** → **App ARN**

---

## 🎯 Paso 3: Configurar Permisos IAM

Tu usuario IAM necesita estos permisos:

### Política recomendada:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "amplify:*",
        "lambda:*",
        "apigateway:*",
        "cloudformation:*",
        "s3:*",
        "iam:PassRole",
        "iam:CreateRole",
        "iam:AttachRolePolicy"
      ],
      "Resource": "*"
    }
  ]
}
```

O usa la política administrada: `AdministratorAccess-Amplify`

---

## 📦 Paso 4: Instalar dependencias localmente

```bash
npm install
```

Esto instalará:
- AWS Amplify Backend SDK
- Apollo Server con integración Lambda
- AWS CDK

---

## 🚀 Paso 5: Hacer Deploy

```bash
git add .
git commit -m "feat: configurar Amplify Gen 2 con Lambda"
git push origin main
```

Amplify detectará el push automáticamente y:
1. ✅ Instalará dependencias
2. ✅ Desplegará la función Lambda con tu API GraphQL
3. ✅ Configurará API Gateway
4. ✅ Generará la URL de tu API

---

## 🌐 Paso 6: Acceder a tu API

Una vez completado el deployment:

1. Ve a **Amplify Console** → Tu app → **Backend** tab
2. Encontrarás la URL de tu función Lambda
3. Tu API GraphQL estará disponible en: `https://[tu-api-id].execute-api.[region].amazonaws.com/graphql`

### Endpoints disponibles:

- **GraphQL API:** `https://[url]/graphql`
- **GraphQL Playground:** Accede desde el navegador a la URL de GraphQL

---

## 🔍 Estructura del Proyecto

```
.
├── amplify/
│   ├── backend.ts                    # Configuración del backend
│   └── functions/
│       └── graphql/
│           ├── resource.ts           # Definición de la función Lambda
│           └── handler.js            # Handler de Lambda para GraphQL
├── data.js                           # Datos de la API
├── schema.js                         # Schema GraphQL
├── resolvers.js                      # Resolvers GraphQL
├── index.js                          # Servidor local (desarrollo)
├── amplify.yml                       # Configuración de build Amplify
├── package.json                      # Dependencias
└── tsconfig.json                     # Configuración TypeScript
```

---

## 🛠️ Desarrollo Local

Para probar localmente (sin Lambda):

```bash
npm start
```

Esto iniciará el servidor Apollo en `http://localhost:4000`

---

## 📊 Monitoreo

### Ver logs de Lambda:

1. Ve a **AWS Lambda Console**
2. Busca la función `graphql-api`
3. Click en **"Monitor"** → **"View logs in CloudWatch"**

### Métricas en Amplify:

- **Amplify Console** → Tu app → **Monitoring**
- Verás invocaciones, errores y latencia

---

## 💰 Costos Estimados

### AWS Lambda (Free Tier):
- ✅ 1 millón de requests gratis/mes
- ✅ 400,000 GB-segundos de compute gratis/mes
- Después: ~$0.20 por millón de requests

### API Gateway (Free Tier):
- ✅ 1 millón de llamadas gratis/mes (primeros 12 meses)
- Después: ~$3.50 por millón de llamadas

### Amplify Hosting:
- ✅ Gratis para builds
- Almacenamiento y transferencia según uso

**Total estimado:** $0-5/mes para proyectos pequeños

---

## ❓ Troubleshooting

### Error: "Cannot find module '@aws-amplify/backend'"
```bash
npm install
```

### Error: "Handler not found"
- Verifica que `handler.js` esté en `amplify/functions/graphql/`
- Asegúrate que el export sea: `export const handler`

### La API no responde:
- Revisa los logs en CloudWatch
- Verifica que la función Lambda tenga permisos correctos
- Asegúrate que API Gateway esté configurado

### Error de CORS:
Agrega configuración de CORS en el handler si es necesario.

---

## 📚 Recursos

- [Amplify Gen 2 Docs](https://docs.amplify.aws/react/build-a-backend/)
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/)
- [Apollo Server Lambda](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)

---

## ✅ Checklist

- [ ] App creada en Amplify Console
- [ ] Repositorio conectado a Amplify
- [ ] Secrets configurados en GitHub
- [ ] Permisos IAM configurados
- [ ] Dependencias instaladas
- [ ] Push a main realizado
- [ ] Deployment completado
- [ ] API GraphQL accesible

---

**¡Tu API GraphQL está desplegada como función Lambda en AWS Amplify!** 🎉
