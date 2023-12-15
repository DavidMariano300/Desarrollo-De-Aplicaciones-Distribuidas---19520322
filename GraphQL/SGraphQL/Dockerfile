# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Copia el resto de la aplicación
COPY . .

# Instala las dependencias
RUN npm install

# Expón el puerto en el que tu aplicación se ejecuta (ajústalo según tu aplicación)
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
