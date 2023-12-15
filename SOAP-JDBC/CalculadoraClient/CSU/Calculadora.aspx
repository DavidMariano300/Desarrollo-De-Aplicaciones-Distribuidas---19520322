<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Calculadora.aspx.cs" Inherits="CalculadoraClient.CSU.Calculadora" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Calculadora SOAP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
        }

        .calculator {
            width: 300px;
            margin: 0 auto;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0px 0px 10px #ccc;
            padding: 20px;
        }

        h1 {
            font-size: 24px;
            color: #333;
        }

        input[type="text"] {
            width: 100%;
            height: 30px;
            margin-bottom: 10px;
            padding: 5px;
        }

        .btn {
            width: 70px;
            height: 40px;
            margin: 5px;
            font-size: 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
        }

        .btn.clear {
            background-color: #ff3300;
        }

        #result {
            margin-top: 10px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="calculator">
            <h1>Calculadora SOAP</h1>
            <input type="text" id="textBoxInput" placeholder="Valor 1" runat="server" />
            <input type="text" id="textBoxInput2" placeholder="Valor 2" runat="server" />
            <br />
            <asp:Button ID="btnSumar" CssClass="btn" Text="Sumar" runat="server" OnClick="btnSumar_Click" />
            <asp:Button ID="btnRestar" CssClass="btn" Text="Restar" runat="server" OnClick="btnRestar_Click" />
            <asp:Button ID="btnMultiplicar" CssClass="btn" Text="Multiplicar" runat="server" OnClick="btnMultiplicar_Click" />
            <asp:Button ID="btnDividir" CssClass="btn" Text="Dividir" runat="server" OnClick="btnDividir_Click" />
            <asp:Button ID="btnPotencia" CssClass="btn" Text="Potencia" runat="server" OnClick="btnPotencia_Click" />
            <asp:Button ID="btnRaiz" CssClass="btn" Text="Raiz" runat="server" OnClick="btnRaiz_Click" />
            <asp:Button ID="btnLimpiar" CssClass="btn clear" Text="Limpiar" runat="server" OnClick="btnLimpiar_Click" />
            <div id="result" runat="server"></div>
        </div>
    </form>
</body>
</html>
