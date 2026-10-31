# Desarrollo de Aplicaciones Distribuidas

Prácticas de la materia Desarrollo de Aplicaciones Distribuidas (Instituto Tecnológico de Chilpancingo, TecNM, 2023). Cada carpeta implementa el mismo problema de fondo, un cliente que consume un servicio remoto, con un mecanismo de comunicación distinto.

| Carpeta | Qué hace | Tecnologías |
|---|---|---|
| `RMI-JDBC/` | Control escolar: alta, edición, baja y consulta de alumnos mediante objetos remotos | Java RMI, JDBC, MySQL |
| `REST-JDBC/` | Calculadora expuesta como servicio REST que registra cada operación en la base | Java JAX-RS, GlassFish, MySQL |
| `SOAP-JDBC/` | Calculadora como servicio SOAP y un cliente web que la consume | Java JAX-WS, ASP.NET Web Forms (C#), MySQL |
| `GraphQL/` | CRUD de personas con un servidor GraphQL y un cliente React | Node.js, Apollo Server, Express, MongoDB, React |
| `Proyecto Final/` | TaskZen: gestor de proyectos y tareas con registro e inicio de sesión | React (Vite), Node.js, Express, MongoDB, JWT, Zod |
| `Notebooks/` | Tutorial de Gemini File Search (RAG gestionado por Google) | Python, Google Gen AI SDK, Colab |

## Cómo ejecutar

Cada práctica es independiente. Requisitos generales: Java 17 y NetBeans con GlassFish para las prácticas Java, Visual Studio para el cliente C#, Node.js 18 o superior y MongoDB (o Docker) para las de JavaScript.

**GraphQL**

```bash
cd GraphQL/SGraphQL
npm install
MONGODB_URI="mongodb://localhost:27017/" node index.js
# GraphQL endpoint: http://localhost:4000/graphql
```

```graphql
mutation {
  createPost(post: { nombre: "Ana", apellidos: "López", edad: "21", pais: "México" }) { id nombre }
}
query { mostrar { id nombre apellidos pais } }
```

**Proyecto Final (TaskZen)**

```bash
cd "Proyecto Final/ProyectoDistribuidas"
cp .env.template .env        # define MONGODB_URI y TOKEN_SECRET
docker compose up -d         # MongoDB local
npm install && npm run dev   # API en http://localhost:4000

cd client
npm install && npm run dev   # interfaz en http://localhost:5173
```

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@example.com","password":"demo123"}'
```

La autenticación y las tareas usan la API de Node. Las vistas de proyectos y tareas por proyecto consumen además un servicio REST en Java (`localhost:8080/AppDistRest`) que no forma parte de este repositorio.

**RMI**

```bash
cd RMI-JDBC/rmijdbc/src
export MYSQL_PASSWORD=...    # contraseña de tu MySQL local
javac *.java
java ControlEscolarServer    # en una terminal
java ControlEscolarClient    # en otra
```

El cliente busca el servidor en una IP de la red del laboratorio. Para probar en una sola máquina, cambia esa dirección por `localhost` en `ControlEscolarClient.java`.

## Créditos

La base de autenticación y tareas del Proyecto Final parte del tutorial *MERN Tasks Auth* de FaztWeb; sobre ella el equipo agregó proyectos, tareas por proyecto y la integración con el servicio REST. Proyecto en equipo de tres integrantes.
