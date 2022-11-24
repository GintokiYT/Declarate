import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GlobalStyle from './GlobalStyle'

// Pages
import Home from './pages/Home'
import Declaracion from './pages/Declaracion'

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/declaracion' element={<Declaracion />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
