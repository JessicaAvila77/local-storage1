import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Proveedor from './components/Proveedor'

//formulamos las rutas y el componente que quiero ver
function App() {

  //puede ser en directorio raiz '/'
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='listaproveedor' element={<Proveedor/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
