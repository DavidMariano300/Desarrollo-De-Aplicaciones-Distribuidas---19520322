import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const obtenerDatosDelServicio = async () => {
      try {
        const respuesta = await fetch("http://localhost:8080/AppDistRest/webresources/generic/ProyectosG");
        const textoRespuesta = await respuesta.text();

        // Dividir la cadena en líneas y luego en proyectos
        const proyectosArray = textoRespuesta.split('|').filter(Boolean).map((dato, index, array) => {
          if (index % 3 === 0) {
            return {
              idProyecto: array[index],
              idUsuario: array[index + 1],
              nombreProyecto: array[index + 2],
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

  return (
    <section className="bg-black-500 flex justify-center items-center">
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold">Lista de Proyectos</h1>
        <ul>
          {proyectos.map((proyecto) => (
            <li key={proyecto.idProyecto}>
              {`ID Proyecto: ${proyecto.idProyecto}, ID Usuario: ${proyecto.idUsuario}, Nombre: ${proyecto.nombreProyecto}`}
            </li>
          ))}
        </ul>
        <p className="text-md text-slate-400">
          {/* ... Resto de tu contenido ... */}
        </p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Get Started
        </Link>
      </header>
    </section>
  );
}

export default HomePage;

