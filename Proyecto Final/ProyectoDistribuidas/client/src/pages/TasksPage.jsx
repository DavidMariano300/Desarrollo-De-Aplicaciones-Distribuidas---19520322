import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";
import serverUrl from "../configRest.js";
import { useAuth } from "../context/authContext";
import { Button } from "../components/ui";
import { useNavigate } from "react-router-dom";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();
  const [tareas, setProyectos] = useState([]);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatosDelServicio = async () => {
      try {
        const respuesta = await fetch(`${serverUrl}/ObtenerProyUs?iduser=${user.id}`);
        const textoRespuesta = await respuesta.text();
        console.log({ textoRespuesta })

        // Dividir la cadena en líneas y luego en proyectos
        const proyectosArray = textoRespuesta.split('|').filter(Boolean).map((dato, index, array) => {
          if (index % 3 === 0) {
            return {
              idproy: array[index],
              iduser: array[index + 1],
              descripcion: array[index + 2],
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


  const handleAbrir = (idProyecto) => {
    console.log(`Abrir ${idProyecto}`);
    navigate(`/abrir-tareas/${idProyecto}`);
  }

  const handleEdit = (idProyecto) => {
    // Lógica para abrir el proyecto con el ID especificado
    console.log(`Abrir proyecto con ID: ${idProyecto}`);
    navigate(`/editar-proyecto/${idProyecto}`);// Redirección a la página de edición
  };

  const handleDelete = async (idProyecto) =>{
    // Lógica para eliminar el proyecto con el ID especificado
    console.log(`Eliminar proyecto con ID: ${idProyecto}`);
    try {
      const respuesta = await fetch(`${serverUrl}/borrarPro?iduser=${user.id}&idpro=${idProyecto}`);
      const textoRespuesta = await respuesta.text();
      console.log({ textoRespuesta })
      window.location.reload();

    } catch (error) {
      console.error("Error al obtener datos del servicio:", error);
    }
  };

  return (
    <>
      <div><h1>Proyectos</h1></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tareas.map((proyecto) => (
          <div key={proyecto.idproy} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{proyecto.descripcion}</h3>
            <p className="text-gray-500">ID Proyecto: {proyecto.idproy}</p>
            <p className="text-gray-500">Nombre de Proyecto: {proyecto.descripcion}</p>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleAbrir(proyecto.idproy)}>Abrir</Button>
              <Button onClick={() => handleEdit(proyecto.idproy)}>Editar</Button>
              <Button onClick={() => handleDelete(proyecto.idproy)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}
