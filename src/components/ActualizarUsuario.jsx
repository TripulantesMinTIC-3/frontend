import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'


export default function Actualizar(props) {


    
    
    
    const [nombres, setnombres] = useState("")
    const [apellidos, setapellidos] = useState("")
    const [documento, setdocumento] = useState("")
    const [rol, setRol] = useState([])
    const [rolSeleccionado, setRolSeleccionado] = useState("")
    const [correo, setCorreo] = useState("")
    const [activo, setActivo] = useState("")
    const [activoSeleccionado, setActivoSeleccionado] = useState("")
    
 
   

    useEffect(() => {
        obtenerUsuario()
        setActivo(["Pendiente", "Autorizado", "No Autorizado"])
        setRol(["Administrador", "Vendedor","Usuario"])
       
    },[])

    const obtenerUsuario = async () => {
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/usuario/listar/' + id, {
            headers: { 'autorizacion': token }
        })
        setnombres(respuesta.data.nombres)
        setRolSeleccionado(respuesta.data.rol)
        setCorreo(respuesta.data.correo)
        setActivoSeleccionado(respuesta.data.activo)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const usuario = {
            nombres,
            rol: rolSeleccionado,
            correo,
            activo: activoSeleccionado
        }
        const respuesta = await Axios.put('http://localhost:4000/usuarios/actualizarUsuario/' + id, usuario, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/usuarios'
        }, 1500)
    }

    return (
        <div className="container col-md-6 mt-4">
            <div className="card">
                <div className="card-header">
                    <h3>Editar</h3>
                    <div className="card-body">
                        <form onSubmit={actualizar}>
                            <div className="mb-3">
                                <label className="form-label">Nombres</label>
                                <input type="text" className="form-control" required onChange={e => setnombres(e.target.value)} value={nombres} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellidos</label>
                                <input type="text" className="form-control" required onChange={e => setapellidos(e.target.value)} value={apellidos} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Documento</label>
                                <input type="text" className="form-control" required onChange={e => setdocumento(e.target.value)} value={documento} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Rol</label>
                                <select className="form-control" onChange={(e) => setRolSeleccionado(e.target.value)} value={rolSeleccionado}>
                                    {
                                        rol.map(rol =>
                                            <option key={rol}>
                                                {rol}
                                            </option>)
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Correo</label>
                                <input type="email" className="form-control" required onChange={e => setCorreo(e.target.value)} value={correo} />
                            </div>
                           
                            <div className="mb-3">
                                <button className="btn btn-warning" type="submit">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}