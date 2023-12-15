import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label, ButtonLink } from "../components/ui"; // Cambiado para reflejar operaciones de proyecto
import serverUrl from "../configRest.js";
import { useAuth } from "../context/authContext";


export function TareasFormPage() {// Cambiado para reflejar operaciones de proyecto
    const { isAuthenticated, logout, user } = useAuth();
    const [projectName, setProjectName] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [tareas, setProyectos] = useState([]);
    
    const [tareaName, settareaName] = useState("");
    const [tareaDesc, setTareaDesc] = useState("");
    const [tareaDet, setTareaDet] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch(`${serverUrl}/insertarTar?idpro=${id}&nom=${tareaName}&desc=${tareaDesc}&det=${tareaDet}`);
            const textoRespuesta = await respuesta.text();
            console.log(textoRespuesta);

            if (respuesta.ok) {
                navigate(`/abrir-tareas/${id}`);
            }

        } catch (error) {
            console.error("Error de red:", error);
        }

    };



    return (
        <>
            <form onSubmit={handleSave}>
                <div>
                    <Label htmlFor="nombre">Nombre de tarea</Label>
                    <Input type="text"
                        name="nombre"
                        placeholder="Nombre de tarea"
                        value={tareaName}
                        onChange={(e) => settareaName(e.target.value)}
                    />
                    <Label htmlFor="nombre">Descripcion de tarea</Label>
                    <Input type="text"
                        name="nombre"
                        placeholder="Descripcion-RealizarDatos"
                        value={tareaDesc}
                        onChange={(e) => setTareaDesc(e.target.value)}
                    />
                    <Label htmlFor="nombre">Detalles de tarea</Label>
                    <Input type="text"
                        name="nombre"
                        placeholder="Detalles-No codificar mas de dos horas"
                        value={tareaDet}
                        onChange={(e) => setTareaDet(e.target.value)}
                    />


                </div>

                


                <Button type="submit">
                    Guardar
                </Button>


                <ButtonLink to="/abrir-tareas/`${id}`">Cancelar</ButtonLink>

            </form>





        </>

    );
}
