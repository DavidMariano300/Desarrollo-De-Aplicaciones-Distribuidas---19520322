import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface IControlEscolar extends Remote {
    void agregarAlumno(Alumno alumno) throws RemoteException;
    void actualizarAlumno(Alumno alumno) throws RemoteException;
    void eliminarAlumno(int id) throws RemoteException;
    List<Alumno> obtenerTodosLosAlumnos() throws RemoteException;
}
