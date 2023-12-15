import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label, ButtonLink } from "../components/ui"; // Cambiado para reflejar operaciones de proyecto
import serverUrl from "../configRest.js";
import { useAuth } from "../context/authContext";


export function EditarProjectPage() {// Cambiado para reflejar operaciones de proyecto
    const { isAuthenticated, logout, user } = useAuth();
    const [projectName, setProjectName] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [tareas, setProyectos] = useState([]);

    useEffect(() => {
        const obtenerDatosDelServicio = async () => {
            try {
                const respuesta = await fetch(`${serverUrl}/ObtenerProUnic?iduser=${user.id}&idpro=${id}`);
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


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch(`${serverUrl}/actualizarPro?iduser=${user.id}&idpro=${id}&desc=${projectName}`);
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

            <div >

            </div>

            <form onSubmit={handleSave}>
                {tareas.map((proyecto) => (
                    <div key={proyecto.idproy}>
                        <Label htmlFor="title">Nombre del Proyecto</Label>
                        <Input
                            type="text"
                            name="title"
                            placeholder={proyecto.descripcion}
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                ))}

                <Button type="submit">
                    Guardar
                </Button>
                <ButtonLink to="/tasks">Cancelar</ButtonLink>

            </form>
        </>

    );
}
