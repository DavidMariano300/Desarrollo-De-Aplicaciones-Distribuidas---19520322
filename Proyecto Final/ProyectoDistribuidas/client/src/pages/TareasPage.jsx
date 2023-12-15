import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import serverUrl from "../configRest.js";
import { useAuth } from "../context/authContext";
import { Button } from "../components/ui";
import { useNavigate, useParams } from "react-router-dom";

export function TareasPage() {
  const { tasks, getTasks } = useTasks();
  const [tareas, setProyectos] = useState([]);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const obtenerDatosDelServicio = async () => {
      try {
        const respuesta = await fetch(`${serverUrl}/ObtenerTarUs?iduser=${user.id}&idpro=${id}`);
        const textoRespuesta = await respuesta.text();
        console.log({ textoRespuesta })
        console.log({id});

        // Dividir la cadena en líneas y luego en proyectos
        const proyectosArray = textoRespuesta.split('|').filter(Boolean).map((dato, index, array) => {
          if (index % 4 === 0) {
            return {
              idtarea: array[index],
              nombre: array[index + 1],
              descripcion: array[index + 2],
              detalles: array[index + 3],
              idpro: array[index + 4],
            };
          }
          return null;
        }).filter(Boolean);

        setProyectos(proyectosArray);
      } catch (error) {
        console.error("Error al obtener datos del servicio:", error);
      }
    };

    obtenerDatosDelServicio();
  }, []);

  const handleEdit = (idProyecto) => {
    // Lógica para abrir el proyecto con el ID especificado
    console.log(`Abrir proyecto con ID: ${idProyecto}`);
    navigate(`/editar-tareas/${idProyecto}`);// Redirección a la página de edición
  };

  const handleDelete = async (idProyecto) =>{
    // Lógica para eliminar el proyecto con el ID especificado
    console.log(`Eliminar proyecto con ID: ${idProyecto}`);
    try {
      const respuesta = await fetch(`${serverUrl}/borrarTar?idtar=${idProyecto}&idpro=${id}`);
      const textoRespuesta = await respuesta.text();
      console.log({ textoRespuesta })
      window.location.reload();

    } catch (error) {
      console.error("Error al obtener datos del servicio:", error);
    }
  };

  const handleAbrir = (idProyecto) => {
    console.log(`Abrir ${idProyecto}`);
    navigate(`/add-tarea/${idProyecto}`);
  }

  const handleAgregar = (idProyecto) => {
    console.log(`Abrir ${idProyecto}`);
    navigate(`/add-tarea/${idProyecto}`);
  }

  return (
    <>
      <div><h1>Tareas</h1></div>
      <div><Button onClick={() => handleAgregar(id)}>Agregar nueva tarea</Button></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tareas.map((proyecto) => (
          <div key={proyecto.idtarea} className="bg-white p-4 rounded shadow-md">
            <p className="text-gray-500">Nombre de Tarea: {proyecto.nombre}</p>
            <p className="text-gray-500">Descripcion: {proyecto.descripcion}</p>
            <p className="text-gray-500">Detalles: {proyecto.detalles}</p>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleEdit(proyecto.idtarea)}>Editar</Button>
              <Button onClick={() => handleDelete(proyecto.idtarea)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
