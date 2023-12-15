import React, { useState } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';

const ADD_POST = gql`
  mutation AddPost($post: PostInput!) {
    createPost(post: $post) {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;

const GET_POSTS = gql`
  query GetPosts {
    mostrar {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;

function ComponenteInsertar({ isUpdateEnabled, refetchPosts }) {
  const [post, setPost] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    pais: ''
  });

  const { refetch } = useQuery(GET_POSTS, { fetchPolicy: 'no-cache' });
  const [addPost] = useMutation(ADD_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost({ variables: { post } });
    setPost({ nombre: '', apellidos: '', edad: '', pais: '' });
    refetch(); // Llamamos a refetch después de añadir un nuevo post
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={post.nombre}
        onChange={handleChange}
        type="text"
        placeholder="Nombre"
        style={{ margin: '5px', padding: '10px' }}
        disabled={isUpdateEnabled}
      />
      <input
        name="apellidos"
        value={post.apellidos}
        onChange={handleChange}
        type="text"
        placeholder="Apellidos"
        style={{ margin: '5px', padding: '10px' }}
        disabled={isUpdateEnabled}
      />
      <input
        name="edad"
        value={post.edad}
        onChange={handleChange}
        type="text"
        placeholder="Edad"
        style={{ margin: '5px', padding: '10px' }}
        disabled={isUpdateEnabled}
      />
      <input
        name="pais"
        value={post.pais}
        onChange={handleChange}
        type="text"
        placeholder="País"
        style={{ margin: '5px', padding: '10px' }}
        disabled={isUpdateEnabled}
      />
      <button type="submit" style={{ margin: '5px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }} disabled={isUpdateEnabled}>
        Añadir Post
      </button>
    </form>
  );
}

export default ComponenteInsertar;
