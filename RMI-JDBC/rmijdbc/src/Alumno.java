import java.io.Serializable;

public class Alumno implements Serializable {
    private int id;
    private String nombre;
    private int semestre;
    private String genero;

    public Alumno() {}

    public Alumno(String nombre, int semestre, String genero) {
        this.nombre = nombre;
        this.semestre = semestre;
        this.genero = genero;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getSemestre() {
        return semestre;
    }

    public void setSemestre(int semestre) {
        this.semestre = semestre;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    @Override
    public String toString() {
        return "ID: " + id + ", Nombre: " + nombre + ", Semestre: " + semestre + ", Género: " + genero;
    }
}
