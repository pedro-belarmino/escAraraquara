import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AboutUs from './views/AboutUs';
import Contact from './views/Contact';
import DeveloperDashboard from './views/DeveloperDashboard';
import DirectorDashboard from './views/DirectorDashboard';
import Home from './views/Home';
import HowToParticipate from './views/HowToParticipate';
import AdultVolunteerApplication from './views/AdultVolunteerApplication';
import LeaderDashboard from './views/LeaderDashboard';
import Login from './views/Login';
import Scouting from './views/Scouting';
import Template from './views/Template';
import YouthApplication from './views/YouthApplication';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Home />} />
        <Route path="/sobre-nos" element={<AboutUs />} />
        <Route path="/como-participar" element={<HowToParticipate />} />
        <Route path="/escotismo" element={<Scouting />} />
        <Route path="/contato" element={<Contact />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/youth-application" element={<YouthApplication />} />

      <Route
        path="/adult-volunteer-application"
        element={
          <ProtectedRoute allowedRoles={['DESENVOLVEDOR', 'DIRETOR']}>
            <AdultVolunteerApplication />
          </ProtectedRoute>
        }
      />

      <Route
        path="/developer"
        element={
          <ProtectedRoute allowedRoles={['DESENVOLVEDOR']}>
            <DeveloperDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/director"
        element={
          <ProtectedRoute allowedRoles={['DESENVOLVEDOR', 'DIRETOR']}>
            <DirectorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leader"
        element={
          <ProtectedRoute allowedRoles={['DESENVOLVEDOR', 'DIRETOR', 'CHEFE']}>
            <LeaderDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<p className="bg-red-400 text-red-800 place-self-center text-5xl">PAGINA NÃO ENCONTRADA</p>} />
    </Routes>
  );
}

export default App;
