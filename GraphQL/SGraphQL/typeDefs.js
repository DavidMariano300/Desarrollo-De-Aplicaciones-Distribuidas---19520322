const { gql } = require("apollo-server-express");

// Definición de los tipos y las operaciones GraphQL
const typeDefs = gql`
  # Tipo para Post
  type Post {
    id: ID
    nombre: String
    apellidos: String
    edad: String
    pais: String 
  }

  # Tipo para las consultas
  type Query {
    # Consulta para mostrar todos los Posts
    mostrar: [Post]
  }

  # Input para crear o actualizar Posts
  input PostInput {
    nombre: String
    apellidos: String
    edad:String 
    pais:String
  }

  # Tipo para las mutaciones
  type Mutation {
    # Mutación para crear un Post
    createPost(post: PostInput): Post

    # Mutación para actualizar un Post
    updatePost(id: ID!, post: PostInput): Post

    # Mutación para eliminar un Post
    deletePost(id: ID!): String
  }
`;

module.exports = typeDefs;
