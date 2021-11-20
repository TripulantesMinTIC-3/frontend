import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
import Home from './components/home';
import Inicio from './components/Inicio';
const estaAutenticado =()=>{
  const token = sessionStorage.getItem('token')
  if(token){
    return true
  }else{
    return false
  }
}
const MyRoute=(props)=>{
  return estaAutenticado()?<Route {...props}/>: <Redirect to='/login'/>

}
const PublicRoute=(props)=>{
  return estaAutenticado()?<Redirect to="/index"/>: <Route {...props}/>;

};

function App() {
  return (
  <div>
  <BrowserRouter>
  <Nav/>
  <Switch>
    
    <PublicRoute path='/login' component={Login}/>
    <MyRoute path='/productos' component= {Index}/>
    <MyRoute path='/actualizar/:id' component={Actualizar}/>
    <MyRoute path='/ventas' component={IndexVentas}/>
    <MyRoute path='/Usuarios' component={Usuarios}/>
    <Route path='/registrar' component={Registro}/>
    <MyRoute path='/Actualizarventa/:id' component={Actualizarventa}/>
    <MyRoute path='/Indexventa' component={IndexVentas}/>
    <MyRoute path='/Actualizarusuario/:id' component={ActualizarUsuario}/>
    <MyRoute path='/Inicio' component={Inicio}/> 
    <Route path='/' component={Home}/>
    
    
// 

  </Switch>

  </BrowserRouter>
   
  </div>

  );
}

export default App;
