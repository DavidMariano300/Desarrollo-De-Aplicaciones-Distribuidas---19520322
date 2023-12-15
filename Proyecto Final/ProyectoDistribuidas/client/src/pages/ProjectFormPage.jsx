import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label, ButtonLink } from "../components/ui"; // Cambiado para reflejar operaciones de proyecto
import serverUrl from "../configRest.js";
import { useAuth } from "../context/authContext";



export function ProjectFormPage() {// Cambiado para reflejar operaciones de proyecto
  const { isAuthenticated, logout, user } = useAuth();
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`${serverUrl}/insertarPro?iduser=${user.id}&desc=${projectName}`);
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
      
      <form  onSubmit={handleSave}>
        <Label htmlFor="title">Nombre del Proyecto</Label>
        <Input
          type="text"
          name="title"
          placeholder="Nombre del Proyecto"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <Button type="submit">
          Guardar
        </Button>

      </form>
    </>

  );
}
