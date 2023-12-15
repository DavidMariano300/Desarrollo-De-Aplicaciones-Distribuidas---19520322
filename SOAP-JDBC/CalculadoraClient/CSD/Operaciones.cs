using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CalculadoraClient.CSD
{
    public class Operaciones
    {
        public double Suma(double a, double b)
        {
            double respuesta;
            ServiceReference1.Calculadora_serviceClient client = new ServiceReference1.Calculadora_serviceClient();

            respuesta = client.suma(a, b);

            return respuesta;

        }
        public double Resta(double a, double b)
        {
            double respuesta;
            ServiceReference1.Calculadora_serviceClient client = new ServiceReference1.Calculadora_serviceClient();

            respuesta = client.resta(a, b);

            return respuesta;

        }
        public double Multiplicacion(double a, double b)
        {
            double respuesta;
            ServiceReference1.Calculadora_serviceClient client = new ServiceReference1.Calculadora_serviceClient();

            respuesta = client.multiplicacion(a, b);

            return respuesta;

        }
        public double Division(double a, double b)
        {
            double respuesta;
            ServiceReference1.Calculadora_serviceClient client = new ServiceReference1.Calculadora_serviceClient();

            respuesta = client.division(a, b);

            return respuesta;

        }
        public double Potencia(double a, double b)
        {
            double respuesta;
            ServiceReference1.Calculadora_serviceClient client = new ServiceReference1.Calculadora_serviceClient();

            respuesta = client.potencia(a, b);

            return respuesta;

        }
        public double Raiz(double a)
        {
            double respuesta;
            ServiceReference1.Calculadora_serviceClient client = new ServiceReference1.Calculadora_serviceClient();

            respuesta = client.raiz(a);

            return respuesta;

        }
    }
}