import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

function EliminarPost() {
  const [id, setId] = useState('');
  const [deletePost] = useMutation(DELETE_POST);

  const handleSubmit = (e) => {
    e.preventDefault();
    deletePost({ variables: { id } });
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={id}
        onChange={e => setId(e.target.value)}
        type="text"
        placeholder="ID del Post a eliminar"
        style={{ margin: '5px', padding: '10px' }}
      />
      <button type="submit" style={{ margin: '5px', padding: '10px', backgroundColor: '#FF0000', color: 'white', border: 'none', borderRadius: '5px' }}>Eliminar Post</button>
    </form>
  );
}

export default EliminarPost;
