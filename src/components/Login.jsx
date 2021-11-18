import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Axios from "axios"

export default function Login() {
    const [correo,setCorreo]=useState('')
    const [contrasena,setContrasena]=useState('')

    
    const Login = async(e)=>{
        e.preventDefault()
        const usuario={correo,contrasena}
        const respuesta=await Axios.post('http://localhost:4000/Usuarios/login',usuario)
        const mensaje= respuesta.data.mensaje
        if(mensaje!=='Bienvenido'){
            Swal.fire({
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 2500
              })
        }else{
            const token = respuesta.data.token
            const nombres = respuesta.data.token
            const idusuario = respuesta.data.id
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('nombre',nombres)
            sessionStorage.setItem('idusuario',idusuario)
            window.location.href='/index'
            Swal.fire({
                icon: "success",
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })    
        }

    }
    
    return (
        <div className="container mt-4">
            <div className="row">
                <div cñassName="col-md-6 mx-auto">
                    <div className="card">
                        <div className = "container text-center fa-4x">
                            <i className = "fas fa-users"></i>
                        </div>
                        <div clasName = "card-header text-center">
                            <h4> Inicio de sesión </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={Login}>
                                <div className="form-group">
                                    <label> Correo </label>
                                    <input type="email" className="form-control" autoFocus
                                    required onChange={(e)=>setCorreo(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label> Contraseña </label>
                                    <input type="password" className="form-control" 
                                    required onChange={(e)=>setContrasena(e.target.value)}/>
                                </div>
                                <input type="submit" className='btn btn-primary btn-block'/>
                            </form>

                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}
