using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CalculadoraClient.CSD;

namespace CalculadoraClient.CSU
{
    public partial class Calculadora : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSumar_Click(object sender, EventArgs e)
        {
            Operaciones operaciones = new Operaciones();

            double a = double.Parse(textBoxInput.Value);
            double b = double.Parse(textBoxInput2.Value);

            result.InnerText = (operaciones.Suma(a, b)).ToString();
        }

        protected void btnRestar_Click(object sender, EventArgs e)
        {
            Operaciones operaciones = new Operaciones();

            double a = double.Parse(textBoxInput.Value);
            double b = double.Parse(textBoxInput2.Value);

            result.InnerText = (operaciones.Resta(a, b)).ToString();
        }

        protected void btnMultiplicar_Click(object sender, EventArgs e)
        {
            Operaciones operaciones = new Operaciones();

            double a = double.Parse(textBoxInput.Value);
            double b = double.Parse(textBoxInput2.Value);

            result.InnerText = (operaciones.Multiplicacion(a, b)).ToString();
        }

        protected void btnDividir_Click(object sender, EventArgs e)
        {
            Operaciones operaciones = new Operaciones();

            double a = double.Parse(textBoxInput.Value);
            double b = double.Parse(textBoxInput2.Value);

            result.InnerText = (operaciones.Division(a, b)).ToString();
        }

        protected void btnPotencia_Click(object sender, EventArgs e)
        {
            Operaciones operaciones = new Operaciones();

            double a = double.Parse(textBoxInput.Value);
            double b = double.Parse(textBoxInput2.Value);

            result.InnerText = (operaciones.Potencia(a, b)).ToString();
        }

        protected void btnRaiz_Click(object sender, EventArgs e)
        {
            Operaciones operaciones = new Operaciones();

            double a = double.Parse(textBoxInput.Value);

            result.InnerText = (operaciones.Raiz(a)).ToString();
        }

        protected void btnLimpiar_Click(object sender, EventArgs e)
        {
            result.InnerText = "";
            textBoxInput.Value = "";
            textBoxInput2.Value = "";
        }
    }
}