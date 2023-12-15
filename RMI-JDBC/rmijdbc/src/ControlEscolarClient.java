import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.rmi.Naming;
import java.util.List;

public class ControlEscolarClient extends JFrame {
    private IControlEscolar controlEscolar;
    private DefaultListModel<Alumno> alumnoListModel;
    private JList<Alumno> alumnoList;
    private JTextField nombreField;
    private JTextField semestreField;
    private JTextField generoField;

    public ControlEscolarClient() {
        super("Control Escolar");

        // Inicializa la GUI
        alumnoListModel = new DefaultListModel<>();
        alumnoList = new JList<>(alumnoListModel);

        nombreField = new JTextField(20);
        semestreField = new JTextField(5);
        generoField = new JTextField(10);

        JButton agregarButton = new JButton("Agregar");
        JButton actualizarButton = new JButton("Actualizar");
        JButton eliminarButton = new JButton("Eliminar");

        // Agregar componentes a la GUI
        JPanel inputPanel = new JPanel(new GridLayout(3, 2));
        inputPanel.add(new JLabel("Nombre:"));
        inputPanel.add(nombreField);
        inputPanel.add(new JLabel("Semestre:"));
        inputPanel.add(semestreField);
        inputPanel.add(new JLabel("Género:"));
        inputPanel.add(generoField);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(agregarButton);
        buttonPanel.add(actualizarButton);
        buttonPanel.add(eliminarButton);

        setLayout(new BorderLayout());
        add(inputPanel, BorderLayout.NORTH);
        add(new JScrollPane(alumnoList), BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        // Configurar acciones de los botones
        agregarButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                agregarAlumno();
            }
        });

        actualizarButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                actualizarAlumno();
            }
        });

        eliminarButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                eliminarAlumno();
            }
        });

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 300);
        setLocationRelativeTo(null);
        setVisible(true);

        // Conectar con el servidor RMI
        try {
            //controlEscolar = (IControlEscolar) Naming.lookup("rmi://localhost/ControlEscolarService");
            controlEscolar = (IControlEscolar) Naming.lookup("rmi://192.168.228.79/ControlEscolarService");
            actualizarListaAlumnos();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void agregarAlumno() {
        String nombre = nombreField.getText();
        int semestre = Integer.parseInt(semestreField.getText());
        String genero = generoField.getText();
        Alumno alumno = new Alumno(nombre, semestre, genero);
        try {
            controlEscolar.agregarAlumno(alumno);
            actualizarListaAlumnos();
            limpiarCampos();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void actualizarAlumno() {
        Alumno seleccionado = alumnoList.getSelectedValue();
        if (seleccionado != null) {
            int id = seleccionado.getId();
            String nombre = nombreField.getText();
            int semestre = Integer.parseInt(semestreField.getText());
            String genero = generoField.getText();
            Alumno alumno = new Alumno(nombre, semestre, genero);
            alumno.setId(id);
            try {
                controlEscolar.actualizarAlumno(alumno);
                actualizarListaAlumnos();
                limpiarCampos();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void eliminarAlumno() {
        Alumno seleccionado = alumnoList.getSelectedValue();
        if (seleccionado != null) {
            int id = seleccionado.getId();
            try {
                controlEscolar.eliminarAlumno(id);
                actualizarListaAlumnos();
                limpiarCampos();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void actualizarListaAlumnos() {
        try {
            List<Alumno> alumnos = controlEscolar.obtenerTodosLosAlumnos();
            alumnoListModel.clear();
            for (Alumno alumno : alumnos) {
                alumnoListModel.addElement(alumno);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void limpiarCampos() {
        nombreField.setText("");
        semestreField.setText("");
        generoField.setText("");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new ControlEscolarClient();
        });
    }
}
