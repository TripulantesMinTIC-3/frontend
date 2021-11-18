import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Actualizar from './components/Actualizar';
import Index from './components/Index';
import Login from './components/Login';
import Nav from './components/Nav';  
import Usuarios from './components/Usuarios';
import IndexVentas from './components/IndexVentas';
//import login from 'components/Login';
import Registro from './components/Registro';
import Actualizarventa from './components/Actualizarventa';
import ActualizarUsuario from './components/ActualizarUsuario';

function App() {
  return (
  <div>
  <BrowserRouter>
  <Nav/>
  <Switch>
    
    <Route path='/login' component={Login}/>
    <Route path='/productos' component= {Index}/>
    <Route path='/actualizar/:id' component={Actualizar}/>
    <Route path='/ventas' component={IndexVentas}/>
    <Route path='/Usuarios' component={Usuarios}/>
    <Route path='/registro' component={Registro}/>
    <Route path='/Actualizarventa/:id' component={Actualizarventa}/>
    <Route path='Indexventa' component={IndexVentas}/>
    <Route path='/' component={ActualizarUsuario}/>
    
    
// 

  </Switch>

  </BrowserRouter>
   
  </div>

  );
}

export default App;
