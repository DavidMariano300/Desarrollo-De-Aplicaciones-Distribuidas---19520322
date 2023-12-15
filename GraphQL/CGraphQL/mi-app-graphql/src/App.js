import logo from './logo.svg';
import './App.css';
import CrearPost from './componentes/ComponenteInsertar';
import LeerPosts from './componentes/LeerPost';
import EliminarPost from './componentes/eliminarPost';
import ActualizarPost from './componentes/ActualizarPost';

function App() {
  return (
    <div className="App">
      <LeerPosts></LeerPosts>
    </div>
  );
}

export default App;
