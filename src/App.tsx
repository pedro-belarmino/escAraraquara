import { Route, Routes } from 'react-router-dom';
import AboutUs from "./views/AboutUs";
import Home from "./views/Home";
import HowToParticipate from "./views/HowToParticipate";
import Template from "./views/Template";
import Scouting from "./views/Scouting";
import Contact from "./views/Contact";
import LoginPage from './views/Login';
import DashboardPage from './views/Dashboard/DashboardPage';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { Role } from './types';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Template />}>
        <Route index element={<Home />} />
        <Route path="sobre-nos" element={<AboutUs />} />
        <Route path="como-participar" element={<HowToParticipate />} />
        <Route path="escotismo" element={<Scouting />} />
        <Route path="contato" element={<Contact />} />
      </Route>

      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={[Role.DESENVOLVEDOR, Role.DIRETOR, Role.CHEFE]} />
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<p className="bg-red-400 text-red-800 place-self-center text-5xl">PÁGINA NÃO ENCONTRADA</p>} />
    </Routes>
  );
}

export default App;
