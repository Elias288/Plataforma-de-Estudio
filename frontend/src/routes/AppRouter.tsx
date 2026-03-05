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
import { ProtectedRoute } from '@/components/ProtectedRoute';
import PerfilPage from '@/pages/Perfil/Perfil.page';
import UsuariosPage from '@/pages/Usuarios/Usuarios.page';
import CrearCurso from '@/pages/Cursos/components/CrearCurso';
import UnauthorizedPage from '@/pages/Unauthorized.page';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route element={<BarsLayout />}>
              <Route path="/" element={<Home />} />

              {/* CURSOS */}
              <Route path="/cursos">
                <Route index element={<CursosPage />} />

                <Route path=":cursoId">
                  <Route index element={<InfoCurso />} />
                  <Route path="agregarTarea" element={<AgregarTarea />} />
                </Route>
              </Route>
            </Route>
            <Route path="/cursos/:cursoId/:tareaId" element={<TareaPage />} />

            <Route path="/perfil" element={<PerfilPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'PROFESOR']} />}>
          <Route element={<MainLayout />}>
            <Route element={<BarsLayout />}>
              <Route path="/users" element={<UsuariosPage />} />
            </Route>
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/crearCurso" element={<CrearCurso />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<MainLayout />}>
          <Route element={<BarsLayout />}>
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
