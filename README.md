# Distributed Application Development

Coursework for the Distributed Application Development class (Instituto Tecnológico de Chilpancingo, TecNM, 2023). Each folder implements the same underlying problem, a client consuming a remote service, with a different communication mechanism.

| Folder | What it does | Technologies |
|---|---|---|
| `RMI-JDBC/` | School records: create, edit, delete and look up students through remote objects | Java RMI, JDBC, MySQL |
| `REST-JDBC/` | Calculator exposed as a REST service that logs each operation in the database | Java JAX-RS, GlassFish, MySQL |
| `SOAP-JDBC/` | Calculator as a SOAP service and a web client that consumes it | Java JAX-WS, ASP.NET Web Forms (C#), MySQL |
| `GraphQL/` | CRUD for people with a GraphQL server and a React client | Node.js, Apollo Server, Express, MongoDB, React |
| `Proyecto Final/` | TaskZen: project and task manager with sign-up and login | React (Vite), Node.js, Express, MongoDB, JWT, Zod |
| `Notebooks/` | Tutorial on Gemini File Search (RAG managed by Google) | Python, Google Gen AI SDK, Colab |

## How to run

Each assignment is independent. General requirements: Java 17 and NetBeans with GlassFish for the Java assignments, Visual Studio for the C# client, and Node.js 18 or later plus MongoDB (or Docker) for the JavaScript ones.

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

**Final project (TaskZen)**

```bash
cd "Proyecto Final/ProyectoDistribuidas"
cp .env.template .env        # set MONGODB_URI and TOKEN_SECRET
docker compose up -d         # local MongoDB
npm install && npm run dev   # API at http://localhost:4000

cd client
npm install && npm run dev   # interface at http://localhost:5173
```

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@example.com","password":"demo123"}'
```

Authentication and tasks use the Node API. The project views and per-project tasks also consume a Java REST service (`localhost:8080/AppDistRest`) that isn't part of this repository.

**RMI**

```bash
cd RMI-JDBC/rmijdbc/src
export MYSQL_PASSWORD=...    # your local MySQL password
javac *.java
java ControlEscolarServer    # in one terminal
java ControlEscolarClient    # in another
```

The client looks for the server at an IP address on the lab network. To test on a single machine, change that address to `localhost` in `ControlEscolarClient.java`.

## Credits

The authentication and task base of the final project starts from FaztWeb's *MERN Tasks Auth* tutorial; on top of it, the team added projects, per-project tasks and the integration with the REST service. Team project with three members.
