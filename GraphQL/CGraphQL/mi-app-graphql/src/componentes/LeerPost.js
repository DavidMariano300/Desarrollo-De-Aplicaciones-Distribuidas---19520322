import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import ActualizarPost from './ActualizarPost';
import ComponenteInsertar from './ComponenteInsertar';

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

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

function LeerPosts() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: 'no-cache',
  });
  const [deletePost] = useMutation(DELETE_POST);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleDelete = async (postId) => {
    try {
      await deletePost({ variables: { id: postId } });
      refetch();
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowUpdateForm(true);
  };

  const handleUpdateComplete = () => {
    setShowUpdateForm(false);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <h2 style={{ width: '100%', textAlign: 'center' }}>Lista de Posts</h2>
      <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {showUpdateForm && selectedPost && (
          <ActualizarPost post={selectedPost} refetchPosts={refetch} onUpdateComplete={handleUpdateComplete} />
        )}
        {!showUpdateForm && <ComponenteInsertar isUpdateEnabled={showUpdateForm} />}
      </div>
      {data.mostrar.map(post => (
        <div key={post.id} style={{ flex: '1 0 18%', margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9', boxSizing: 'border-box', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p><strong>ID:</strong> {post.id}</p>
          <p><strong>Nombre:</strong> {post.nombre} {post.apellidos}</p>
          <p><strong>Edad:</strong> {post.edad}</p>
          <p><strong>País:</strong> {post.pais}</p>
          <button onClick={() => handleDelete(post.id)} style={{ margin: '5px', padding: '10px', backgroundColor: '#FF0000', color: 'white', border: 'none', borderRadius: '5px' }}>Eliminar</button>
          <button onClick={() => handleEdit(post)} style={{ margin: '5px', padding: '10px', backgroundColor: '#0000FF', color: 'white', border: 'none', borderRadius: '5px' }}>Editar</button>
        </div>
      ))}
    </div>
  );
}

export default LeerPosts;
