import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label, ButtonLink } from "../components/ui"; // Cambiado para reflejar operaciones de proyecto
import serverUrl from "../configRest.js";
import { useAuth } from "../context/authContext";


export function EditTareaProject() {// Cambiado para reflejar operaciones de proyecto
    const { isAuthenticated, logout, user } = useAuth();
    const [projectName, setProjectName] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [tareas, setProyectos] = useState([]);

    
    const [tareaNombre, setTareaNombre] = useState("");
    const [tareaDesc, setTareaDesc] = useState("");
    const [tareaDet, setTareaDet] = useState("");

    useEffect(() => {
        const obtenerDatosDelServicio = async () => {
            try {
                const respuesta = await fetch(`${serverUrl}/ObtenerTarUnic?idpro=${id}`);
                const textoRespuesta = await respuesta.text();
                console.log({ textoRespuesta })

                // Dividir la cadena en líneas y luego en proyectos
                const proyectosArray = textoRespuesta.split('|').filter(Boolean).map((dato, index, array) => {
                    if (index % 5 === 0) {
                        return {
                            idtar: array[index],
                            nombre: array[index + 1],
                            descripcion: array[index + 2],
                            detalles: array[index + 3],
                            id_proyecto: array[index + 4],
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


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch(`${serverUrl}/actualizarTar?idtar=${id}&idpro=8&nom=${tareaNombre}&desc=${tareaDesc}&det=${tareaDet}`);
            const textoRespuesta = await respuesta.text();
            console.log(textoRespuesta);

            if (respuesta.ok) {
                navigate("/tasks");
            }

        } catch (error) {
            console.error("Error de red:", error);
        }

    };



    return (
        <>

            <form onSubmit={handleSave}>
                {tareas.map((proyecto) => (
                    <div key={proyecto.idproy}>
                        <Label htmlFor="title">Nombre del tarea</Label>
                        <Input
                            type="text"
                            name="title"
                            placeholder={proyecto.nombre}
                            value={tareaNombre}
                            onChange={(e) => setTareaNombre(e.target.value)}
                        />
                        <Label htmlFor="title">Descripcion</Label>
                        <Input
                            type="text"
                            name="title"
                            placeholder={proyecto.descripcion}
                            value={tareaDesc}
                            onChange={(e) => setTareaDesc(e.target.value)}
                        />
                        <Label htmlFor="title">Detalles</Label>
                        <Input
                            type="text"
                            name="title"
                            placeholder={proyecto.detalles}
                            value={tareaDet}
                            onChange={(e) => setTareaDet(e.target.value)}
                        />
                        
                    </div>
                ))}

                <Button type="submit">
                    Actualizar Datos
                </Button>
                <ButtonLink to="/tasks">Cancelar</ButtonLink>

            </form>
        </>

    );
}
