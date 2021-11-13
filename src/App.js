import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Actualizar from './components/Actualizar';
import Index from './components/Index';
import Login from './components/Login';
import Nav from './components/Nav';  
//import login from 'components/Registro';
//import Registro from './components/Registro';

function App() {
  return (
  <div>
  <BrowserRouter>
  <Nav/>
  <Switch>
    
    <Route path='/' component={Index}/>
    <Route path='/editar/:id' component={Actualizar}/>

  </Switch>

  </BrowserRouter>
   
  </div>

  );
}

export default App;
