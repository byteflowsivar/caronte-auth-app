# Configurar un certificado SSL wildcard autofirmado en una aplicación Next.js desplegada en Docker

Pasos para generar un certificado wildcard autofirmado

1. Generar el certificado wildcard usando OpenSSL

Ejecuta el siguiente comando para generar un certificado autofirmado para \*.dev.byteflow.dev:

```shell
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes \
-keyout wildcard.dev.byteflow.dev.key \
-out wildcard.dev.byteflow.dev.crt \
-subj "/CN=_.dev.byteflow.dev" \
-addext "subjectAltName=DNS:_.dev.byteflow.dev,DNS:dev.byteflow.dev"
```

Explicación del comando  
• -x509: Genera un certificado X.509 (formato estándar de certificados SSL).  
• -newkey rsa:4096: Crea una nueva clave RSA de 4096 bits.  
• -sha256: Usa el algoritmo de hash SHA-256.  
• -days 365: El certificado será válido por 365 días.  
• -nodes: No cifra la clave privada con contraseña.  
• -keyout wildcard.dev.byteflow.dev.key: Guarda la clave privada en el archivo wildcard.dev.byteflow.dev.key.  
• -out wildcard.dev.byteflow.dev.crt: Guarda el certificado autofirmado en el archivo wildcard.dev.byteflow.dev.crt.  
• -subj "/CN=_.dev.byteflow.dev": Define el Common Name (CN) del certificado como _.dev.byteflow.dev para que sea válido para cualquier subdominio de dev.byteflow.dev.  
• -addext "subjectAltName=DNS:_.dev.byteflow.dev,DNS:dev.byteflow.dev": Añade el campo SAN (Subject Alternative Name), lo que permite que el certificado sea válido tanto para _.dev.byteflow.dev como para dev.byteflow.dev (sin subdominio).

Configurar el certificado wildcard en Docker

1. Modificar el Dockerfile

Modifica tu Dockerfile para copiar el certificado wildcard al contenedor y registrarlo como un certificado de confianza:

```dockerfile
FROM node:18-alpine

# Crear directorio para certificados personalizados
RUN mkdir -p /usr/local/share/ca-certificates/custom

# Copiar el certificado wildcard al contenedor
COPY wildcard.dev.byteflow.dev.crt /usr/local/share/ca-certificates/custom/

# Registrar el certificado como de confianza
RUN update-ca-certificates

# Instalar dependencias y construir la aplicación
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Exponer el puerto de la aplicación
EXPOSE 3000

CMD ["yarn", "start"]
```

2. Configurar Axios o Fetch para consumir los microservicios.

Cuando tu aplicación Next.js consuma los microservicios alojados bajo \*.dev.byteflow.dev, puedes usar un agente HTTPS que utilice el certificado wildcard cargado como de confianza.

Ejemplo con Axios

```js
import axios from 'axios';
import https from 'https';
import fs from 'fs';

// Cargar el certificado wildcard autofirmado
const httpsAgent = new https.Agent({
  ca: fs.readFileSync('/usr/local/share/ca-certificates/custom/wildcard.dev.byteflow.dev.crt'),
});

// Crear instancia de Axios con el agente HTTPS
const apiClient = axios.create({
  baseURL: 'https://service1.dev.byteflow.dev',
  httpsAgent,
});

export default apiClient;
```

3. Probar la configuración

- Construir la imagen de Docker:

```shell
docker build -t my-nextjs-app .
```

- Ejecutar el contenedor:

```shell
docker run -p 3000:3000 my-nextjs-app
```

- Verificar las solicitudes HTTPS:

Asegúrate de que tu aplicación Next.js pueda comunicarse correctamente con los microservicios bajo subdominios de dev.byteflow.dev, como:

- https://api.dev.byteflow.dev
- https://service1.dev.byteflow.dev
- https://auth.dev.byteflow.dev

Notas importantes

- **Entradas en el archivo /etc/hosts (para entornos locales):**
  Si estás probando la aplicación en un entorno local y no tienes un DNS configurado que resuelva \*.dev.byteflow.dev, puedes agregar las siguientes entradas en el archivo /etc/hosts de tu máquina:

```shell
127.0.0.1 dev.byteflow.dev
127.0.0.1 api.dev.byteflow.dev
127.0.0.1 service1.dev.byteflow.dev
127.0.0.1 auth.dev.byteflow.dev
```

Esto permitirá que tu máquina resuelva correctamente los subdominios hacia localhost.

- **Consideraciones de producción:**

  - Si piensas desplegar estos servicios en un entorno de producción, te recomiendo usar un certificado wildcard emitido por una Autoridad de Certificación (CA) reconocida, como Let’s Encrypt.
  - Puedes automatizar la obtención y renovación de certificados wildcard de Let’s Encrypt usando herramientas como Certbot con el plugin DNS.

- **Compatibilidad del wildcard con subdominios:**  
  Un certificado wildcard (\*.dev.byteflow.dev) será válido para cualquier subdominio directo, como:
  - api.dev.byteflow.dev
  - service1.dev.byteflow.dev

**Pero no será válido para sub-subdominios, como:**  
 - test.api.dev.byteflow.dev (esto requiere un wildcard de nivel superior \*.api.dev.byteflow.dev).

## Resumen final

1. Puedes generar un certificado wildcard autofirmado para \*.dev.byteflow.dev usando openssl.
2. Copia el certificado al contenedor Docker y configúralo como un certificado de confianza usando update-ca-certificates.
3. Configura tu aplicación Next.js para usar un agente HTTPS que reconozca el certificado.
4. En entornos locales, asegúrate de que los subdominios resuelvan correctamente usando el archivo /etc/hosts.

Este enfoque te permitirá consumir de manera segura múltiples microservicios bajo subdominios de dev.byteflow.dev en tu aplicación Next.js desplegada en Docker.
