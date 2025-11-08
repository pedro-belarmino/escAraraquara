import AboutUs from "./views/AboutUs"
import Home from "./views/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from "./views/Test"
import HowToParticipate from "./views/HowToParticipate"
import Template from "./views/Template"
import Scouting from "./views/Scouting"
import Contact from "./views/Contact"
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
            </Route>
            <Route element={<PrivateWrapper />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/teste" element={<Test />} />

            <Route path="*" element={<><p>404</p></>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
