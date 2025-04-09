import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min"
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/header/Header'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import NaoEncontrada from './pages/NaoEncontrada'
import Home from './pages/Home'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre /> } />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
