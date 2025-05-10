import AboutUs from "./views/AboutUs"
import Home from "./views/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from "./views/Test"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nos" element={<AboutUs />} />
          <Route path="/teste" element={<Test />} />

          <Route path="*" element={<><p className="bg-red-400 text-red-800 text-9xl">PAGINA NÃO ENCONTRADA</p></>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
