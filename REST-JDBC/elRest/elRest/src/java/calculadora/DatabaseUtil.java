package calculadora;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

public class DatabaseUtil {

    public static void insertarRegistro(double a, double b, double resultado, String operacion, String laip, String cliente) {
        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/lachida", "root", "");

            String sql = "INSERT INTO registro (valorA,valorB,resultado,operacio,fecha,ip,cliente) VALUES (?, ?, ?, ?, ?, ?, ?)";
            stmt = conn.prepareStatement(sql);

            stmt.setDouble(1, a);
            stmt.setDouble(2, b);
            stmt.setDouble(3, resultado);
            stmt.setString(4, operacion);
            stmt.setTimestamp(5, new java.sql.Timestamp(new Date().getTime()));
            stmt.setString(6, laip);
            stmt.setString(7, cliente);

            stmt.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
}