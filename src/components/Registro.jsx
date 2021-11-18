
import Axios from 'axios'
import React from 'react'
import { useState } from 'react/cjs/react.development'
import Swal from 'sweetalert2'


export default function Registro() {

    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")

    const Registrar = async (e) => {
        e.preventDefault()
        const usuario = { nombre, correo, contrasena }
        const respuesta = await Axios.post("http://localhost:4000/usuarios/Registrar", usuario)
        const mensaje = respuesta.data.mensaje
        console.log(respuesta)
        if (mensaje !== "Bienvenido") {
            Swal.fire({
                icon: "error",
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            const token = respuesta.data.token
            const nombres = respuesta.data.nombres
            const idusuario = respuesta.data.id
            const rol = respuesta.data.rol
            sessionStorage.setItem("token", token)
            sessionStorage.setItem("nombre", nombres)
            sessionStorage.setItem("idusuario", idusuario)
            sessionStorage.setItem("rol", rol)

            window.location.href="/index"

            Swal.fire({
                icon: "success",
                title: mensaje,
                showConfirmButton: false,
                timer: 2500
            })
        }

    }




    return (
        <div className="container col-md-3 mt-4">
            <div className="row">
                <div className="col-md-6 mx-auto"></div>
                <div className="card" >
                    <div className="container text-center fa-5x"><i className="fas fa-user-plus"></i></div>
                    <div className="card-header text-center"><h4>Registrar usuario</h4></div>
                    <div className="card-body">
                        <form onSubmit={Registrar}>
                            <div className="mb-3">
                                <label className="form-label"> Nombre </label>
                                <input type="text" className="form-control" autoFocus required onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> Correo </label>
                                <input type="email" className="form-control" autoFocus required onChange={(e) => setCorreo(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"> Contraseña </label>
                                <input type="password" className="form-control" required onChange={(e) => setContrasena(e.target.value)} />
                            </div>
                            <input type="submit" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
