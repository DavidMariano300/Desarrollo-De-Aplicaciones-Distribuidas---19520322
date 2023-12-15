package calculadora;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;


@Stateless
@Path("/webresources")
public class Calculadora 
{
    
    @Context
    private HttpServletRequest request;
    
    @GET
    @Path("suma")
    public double Suma(@QueryParam("num1")double num1,@QueryParam("num2") double num2,@QueryParam("tcliente") String cliente){
        double resultado = num1 + num2;
        System.out.println("Resultado de la suma: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(num1, num2, resultado, "suma", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("resta")
    public double resta(@QueryParam("numeroUno")double numeroUno,@QueryParam("numeroDos") double numeroDos,@QueryParam("tcliente") String cliente)      
    {
        double resultado = numeroUno - numeroDos;
        System.out.println("Resultado de la resta: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(numeroUno, numeroDos, resultado, "resta", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("factorial")
    public double factorial(@QueryParam("base")double base,@QueryParam("tcliente") String cliente) {
        double resultado = 1;
        if (base >= 1) {
            for (int i = 1; i <= base; i++) {
                resultado *= i;
            }
        }
        System.out.println("Resultado del factorial: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(base, 0, resultado, "factorial", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("multiplicacion")
    public double multiplicacion(@QueryParam("numeroUno")double numeroUno,@QueryParam("numeroDos") double numeroDos,@QueryParam("tcliente") String cliente)
    {
        double resultado = numeroUno * numeroDos;
        System.out.println("Resultado de la multiplicación: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(numeroUno, numeroDos, resultado, "multiplicacion", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("division")
    public double division(@QueryParam("numero_1")double numero_1,@QueryParam("numero_2")double numero_2,@QueryParam("tcliente") String cliente)
    {
        double resultado = numero_1 / numero_2;
        System.out.println("Resultado de la división: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(numero_1, numero_2, resultado, "division", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("potencia")
    public double potencia(@QueryParam("num1")double num1,@QueryParam("num2")double num2,@QueryParam("tcliente") String cliente)
    {
        double resultado = Math.pow(num1, num2);
        System.out.println("Resultado de la potencia: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(num1, num2, resultado, "potencia", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("modulo")
    public double modulo(@QueryParam("num1") double num1,@QueryParam("num2") double num2,@QueryParam("tcliente") String cliente)
    {
        double resultado = num1 % num2;
        System.out.println("Resultado del módulo: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(num1, num2, resultado, "modulo", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("raizCuadrada")
    public double raizCuadrada(@QueryParam("raiz") double raiz,@QueryParam("tcliente") String cliente)        
    {
        double resultado = Math.sqrt(raiz);
        System.out.println("Resultado de la raíz cuadrada: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(raiz, 0, resultado, "raiz", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("logaritmo")
    public double logaritmo(@QueryParam("log") double log ,@QueryParam("tcliente") String cliente)
    {
        double resultado = Math.log(log);
        System.out.println("Resultado del logaritmo: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(log, 0, resultado, "logaritmo", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("sin")
    public double sen(@QueryParam("seno") double seno,@QueryParam("tcliente") String cliente){
        double resultado = Math.sin(seno);
        System.out.println("Resultado del seno: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(seno, 0, resultado, "sin", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("cos")
    public double cos(@QueryParam("cos") double cos,@QueryParam("tcliente") String cliente){
        double resultado = Math.cos(cos);
        System.out.println("Resultado del coseno: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(cos, 0, resultado, "cos", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("tan")
    public double tan(@QueryParam("tan") double tan,@QueryParam("tcliente") String cliente){
        double resultado = Math.tan(tan);
        System.out.println("Resultado de la tangente: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(tan, 0, resultado, "tan", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("e")
    public double e(@QueryParam("e") double e,@QueryParam("tcliente") String cliente){
        double resultado = Math.exp(e);
        System.out.println("Resultado de e elevado a la potencia: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(e, 0, resultado, "e", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("sinh")
    public double senh(@QueryParam("senoh") double senoh,@QueryParam("tcliente") String cliente){
        double resultado = Math.sinh(senoh);
        System.out.println("Resultado del seno hiperbólico: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(senoh, 0, resultado, "sinh", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("cosh")
    public double cosh(@QueryParam("cosh") double cosh,@QueryParam("tcliente") String cliente){
        double resultado = Math.cosh(cosh);
        System.out.println("Resultado del coseno hiperbólico: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(cosh, 0, resultado, "cosh", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    @GET
    @Path("tanh")
    public double tanh(@QueryParam("tanh") double tanh,@QueryParam("tcliente") String cliente){
        double resultado = Math.tanh(tanh);
        System.out.println("Resultado de la tangente hiperbólica: " + resultado);
        String ip = request.getRemoteAddr();
        System.out.println("Operación realizada por IP: " + ip);
        DatabaseUtil.insertarRegistro(tanh, 0, resultado, "tanh", ip, cliente);
        System.out.println("Operación realizada por IP: " + cliente);
        return resultado;
    }
    
    
    
}


