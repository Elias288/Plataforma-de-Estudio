import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import Registration from '@/pages/Registration';
import CreateUser from '@/pages/CreateUser/CreateUser';
import CursosPage from '@/pages/Cursos/Cursos.page';
import InfoCurso from '@/pages/Cursos/InfoCurso.page';
import TareaPage from '@/pages/Tareas/Tarea.page';
import BarsLayout from '@/layouts/BarsLayout';
import AgregarTarea from '@/pages/Tareas/AgregarTarea.page';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<BarsLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cursos">
              <Route index element={<CursosPage option="listar" />} />
              <Route path=":cursoId">
                <Route index element={<InfoCurso />} />
                <Route path="agregarTarea" element={<AgregarTarea />} />
              </Route>
            </Route>
          </Route>

          {/* Solo para administradores y profesores */}
          <Route path="/createUser" element={<CreateUser />} />
          {/* Solo para administradores y profesores */}
          <Route path="/crearCurso" element={<CursosPage option="crear" />} />

          <Route path="/cursos/:cursoId/:tareaId" element={<TareaPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
