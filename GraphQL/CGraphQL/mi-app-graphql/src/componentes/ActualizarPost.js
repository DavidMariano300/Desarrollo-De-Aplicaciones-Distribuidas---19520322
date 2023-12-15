import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $post: PostInput!) {
    updatePost(id: $id, post: $post) {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;

function ActualizarPost({ post, refetchPosts, onUpdateComplete }) {
  const [id, setId] = useState(post?.id || '');
  const [postInfo, setPostInfo] = useState({
    nombre: post?.nombre || '',
    apellidos: post?.apellidos || '',
    edad: post?.edad || '',
    pais: post?.pais || '',
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost({ variables: { id, post: postInfo } });
    setId('');
    setPostInfo({ nombre: '', apellidos: '', edad: '', pais: '' });
    refetchPosts();
    onUpdateComplete(); // Llamamos a esta función para indicar que la actualización está completa
  };

  const handleChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={id}
        onChange={e => setId(e.target.value)}
        type="text"
        placeholder="ID del Post"
        style={{ margin: '5px', padding: '10px' }}
      />
      <input
        name="nombre"
        value={postInfo.nombre}
        onChange={handleChange}
        type="text"
        placeholder="Nombre"
        style={{ margin: '5px', padding: '10px' }}
      />
      <input
        name="apellidos"
        value={postInfo.apellidos}
        onChange={handleChange}
        type="text"
        placeholder="Apellidos"
        style={{ margin: '5px', padding: '10px' }}
      />
      <input
        name="edad"
        value={postInfo.edad}
        onChange={handleChange}
        type="text"
        placeholder="Edad"
        style={{ margin: '5px', padding: '10px' }}
      />
      <input
        name="pais"
        value={postInfo.pais}
        onChange={handleChange}
        type="text"
        placeholder="País"
        style={{ margin: '5px', padding: '10px' }}
      />
      <button type="submit" style={{ margin: '5px', padding: '10px', backgroundColor: '#0000FF', color: 'white', border: 'none', borderRadius: '5px' }}>
        {id ? 'Actualizar Post' : 'Añadir Post'}
      </button>
    </form>
  );
}

export default ActualizarPost;
