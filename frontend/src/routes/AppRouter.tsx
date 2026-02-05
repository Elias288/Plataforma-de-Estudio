import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import Registration from '@/pages/Registration';
import CreateUser from '@/pages/CreateUser/CreateUser';
import CursosPage from '@/pages/Cursos/Cursos.page';
import InfoCurso from '@/pages/Cursos/InfoCurso';
import TareaPage from '@/pages/Tareas/Tarea.page';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* Solo para administradores y profesores */}
          <Route path="/createUser" element={<CreateUser />} />
          {/* Solo para administradores y profesores */}
          <Route path="/crearCurso" element={<CursosPage option="crear" />} />
          <Route path="/cursos">
            <Route index element={<CursosPage option="listar" />} />
            <Route path=":cursoId">
              <Route index element={<InfoCurso />} />
              <Route path=":tareaId" element={<TareaPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
