import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { ProjectFormPage } from "./pages/ProjectFormPage";
import { EditarProjectPage } from "./pages/EditProjectPage";
import { TareasPage } from "./pages/TareasPage";
import { TareasFormPage } from "./pages/TareasFormPage";
import { EditTareaProject } from "./pages/EditTareaProject";







function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-project" element={<ProjectFormPage />} />
                <Route path="/editar-proyecto/:id" element={<EditarProjectPage />} />
                <Route path="/abrir-tareas/:id" element={<TareasPage />} />
                <Route path="/add-tarea/:id" element={<TareasFormPage />} />
                <Route path="/editar-tareas/:id" element={<EditTareaProject />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
