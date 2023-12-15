/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.annotation.Resource;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.handler.MessageContext;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author mcsmo
 */
@WebService(serviceName = "Calculadora_service")
public class Calculadora_service {
    
    @Resource
    private WebServiceContext context;
    
    /**
     * Web service operation
     */
    @WebMethod(operationName = "suma")
    public double suma(@WebParam(name = "a") double a, @WebParam(name = "b") double b) {
        String ipAddress = getIpAddress();
        Date horaActual = new Date();
        System.out.println("Operación de suma realizada por la IP: " + ipAddress);
        double resultado = a+b;
        System.out.println("Operación de suma realizada: " + a + " + " + b + " = " + resultado+ " a las "+horaActual);
        insertarRegistro(a, b, resultado,"suma",ipAddress);
        return a+b;
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "resta")
    public double resta(@WebParam(name = "c") double c, @WebParam(name = "d") double d) {
        String ipAddressR = getIpAddress();
        Date horaActualR = new Date();
        double resultadoR = c-d;
        System.out.println("Operación de resta realizada por la IP: " + ipAddressR);
        System.out.println("Operación de resta realizada: " + c + " - " + d + " = " + resultadoR+ " a las "+horaActualR);
        insertarRegistro(c, d, resultadoR,"resta",ipAddressR);
        return c-d;
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "multiplicacion")
    public double multiplicacion(@WebParam(name = "e") double e, @WebParam(name = "f") double f) {
        String ipAddressM = getIpAddress();
        Date horaActualM = new Date();
        double resultadoM = e*f;
        System.out.println("Operación de multiplicacion realizada por la IP: " + ipAddressM);
        System.out.println("Operación de multiplicacion realizada: " + e + " * " + f + " = " + resultadoM+ " a las "+horaActualM);
        insertarRegistro(e, f, resultadoM,"multiplicaicion",ipAddressM);
        return e*f;
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "division")
    public double division(@WebParam(name = "g") double g, @WebParam(name = "h") double h) {
        String ipAddressD = getIpAddress();
        Date horaActualD = new Date();
        double resultadoD = g/h;
        System.out.println("Operación de division realizada por la IP: " + ipAddressD);
        System.out.println("Operación de division realizada: " + g + " * " + h + " = " + resultadoD+ " a las "+horaActualD);
        double resultado = 0;
        try
        {
            resultado = g / h;
        } catch (Exception e)
        {

        }
        insertarRegistro(g, h, resultadoD,"division",ipAddressD);
        return resultado;
    }
    /**
     * Web service operation
     */
    @WebMethod(operationName = "potencia")
    public double potencia(@WebParam(name = "i") double i, @WebParam(name = "j") double j) {
        String ipAddressP = getIpAddress();
        Date horaActualP = new Date();
        double resultadoP = Math.pow(i, j);
        System.out.println("Operación de potencia realizada por la IP: " + ipAddressP);
        System.out.println("Operación de potencia realizada: " + i + " ∧ " + j + " = " + resultadoP+ " a las "+horaActualP);
        insertarRegistro(i, j, resultadoP,"potencia",ipAddressP);
        return Math.pow(i, j);
    }
    /**
     * Web service operation
     */
    @WebMethod(operationName = "raiz")
    public double raiz(@WebParam(name = "k") double k) {
        String ipAddressRa = getIpAddress();
        Date horaActualRa = new Date();
        double resultadoRa = Math.sqrt(k);
        System.out.println("Operación de suma realizada por la IP: " + ipAddressRa);
        System.out.println("Operación de potencia realizada: √ " + k + " = " + resultadoRa+ " a las "+horaActualRa);
        insertarRegistro(k, 0, resultadoRa,"raiz",ipAddressRa);
        return Math.sqrt(k);
    }
    
    private String getIpAddress() {
        HttpServletRequest request = (HttpServletRequest) context.getMessageContext().get(MessageContext.SERVLET_REQUEST);
        return request.getRemoteAddr();
    }
    
    private void insertarRegistro(double a, double b, double resultado,String operacion,String laip) {
        Connection conn = null;
        PreparedStatement stmt = null;
        
        try {
            // Establece la conexión a la base de datos MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/calculadora", "root", "");

            // Prepara la consulta SQL para insertar un nuevo registro
            String sql = "INSERT INTO operacion (valorA,valorB,resultado,operacio,fecha,ip) VALUES (?, ?, ?, ?, ?, ?)";
            stmt = conn.prepareStatement(sql);

            // Establece los valores de los parámetros en la consulta SQL
            stmt.setDouble(1, a);
            stmt.setDouble(2, b);
            stmt.setDouble(3, resultado);
            stmt.setString(4, operacion);
            stmt.setTimestamp(5, new java.sql.Timestamp(new Date().getTime())); // Usa la hora actual del servidor
            stmt.setString(6, laip);

            // Ejecuta la consulta
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(); // Maneja cualquier error de SQL
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Calculadora_service.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            // Cierra las conexiones y los recursos
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
