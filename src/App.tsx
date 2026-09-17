import AboutUs from "./views/AboutUs"
import Home from "./views/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from "./views/Test"
import HowToParticipate from "./views/HowToParticipate"
import Template from "./views/Template"
import Scouting from "./views/Scouting"
import Contact from "./views/Contact"
import FlorDeLisForm from "./views/FlorDeLisForm"
import FlorDeLisDashboard from "./views/FlorDeLisDashboard"
import PreInscricaoForm from "./views/PreInscricaoForm"
import PreInscricaoDashboard from "./views/PreInscricaoDashboard"
import Login from "./views/Login"
import PrivateWrapper from "./components/routes/PrivateWrapper"
import { AuthProvider } from "./context/AuthContext"

function App() {


  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path="/" element={<Template />} >
              <Route path="/" element={<Home />} />
              <Route path="/sobre-nos" element={<AboutUs />} />
              <Route path="/como-participar" element={<HowToParticipate />} />
              <Route path="/escotismo" element={<Scouting />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/flor-de-lis" element={<FlorDeLisForm />} />
              <Route path="/flor-de-lis/dashboard" element={<FlorDeLisDashboard />} />
              <Route path="/pre-inscricao" element={<PreInscricaoForm />} />
              <Route element={<PrivateWrapper />}>
                <Route path="/pre-inscricao/dashboard" element={<PreInscricaoDashboard />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/teste" element={<Test />} />

            <Route path="*" element={<><p>404</p></>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
