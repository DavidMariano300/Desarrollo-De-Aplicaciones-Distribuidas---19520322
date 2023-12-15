import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ControlEscolarServer extends UnicastRemoteObject implements IControlEscolar {
    private Connection connection;

    public ControlEscolarServer() throws RemoteException {
        super();
        // Configurar la conexión a la base de datos
        String url = "jdbc:mysql://localhost:3306/ControlEscolar";
        String user = "root";
        String password = "!Infestissumam300";

        try {
            // Cargar el controlador JDBC de MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establecer la conexión
            connection = DriverManager.getConnection(url, user, password);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void agregarAlumno(Alumno alumno) throws RemoteException {
        try {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO Alumnos (nombre, semestre, genero) VALUES (?, ?, ?)");
            statement.setString(1, alumno.getNombre());
            statement.setInt(2, alumno.getSemestre());
            statement.setString(3, alumno.getGenero());
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void actualizarAlumno(Alumno alumno) throws RemoteException {
        try {
            PreparedStatement statement = connection.prepareStatement("UPDATE Alumnos SET nombre=?, semestre=?, genero=? WHERE id=?");
            statement.setString(1, alumno.getNombre());
            statement.setInt(2, alumno.getSemestre());
            statement.setString(3, alumno.getGenero());
            statement.setInt(4, alumno.getId());
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void eliminarAlumno(int id) throws RemoteException {
        try {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM Alumnos WHERE id=?");
            statement.setInt(1, id);
            statement.executeUpdate();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Alumno> obtenerTodosLosAlumnos() throws RemoteException {
        List<Alumno> alumnos = new ArrayList<>();

        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM Alumnos");

            while (resultSet.next()) {
                Alumno alumno = new Alumno();
                alumno.setId(resultSet.getInt("id"));
                alumno.setNombre(resultSet.getString("nombre"));
                alumno.setSemestre(resultSet.getInt("semestre"));
                alumno.setGenero(resultSet.getString("genero"));
                alumnos.add(alumno);
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return alumnos;
    }

    public static void main(String[] args) {
        try {
            // Iniciar el servidor RMI
            java.rmi.registry.LocateRegistry.createRegistry(1099);
            IControlEscolar controlEscolar = new ControlEscolarServer();
            java.rmi.Naming.rebind("ControlEscolarService", controlEscolar);
            System.out.println("Servidor RMI listo.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
