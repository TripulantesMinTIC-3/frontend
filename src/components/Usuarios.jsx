import Axios from 'axios'
import React, { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Usuarios() {

    const [usuario, setUsuario] = useState([])
 

    useEffect(() => {
        obtenerUsuarios()


    }, [])

    const obtenerUsuarios = async () => {

        const token = sessionStorage.getItem("token")
        const respuesta = await Axios.get("https://vendigmachine.herokuapp.com/usuarios/listar",
            { headers: { 'autorizacion': token } })

        setUsuario(respuesta.data)
    }




    const eliminar = async (id) => {
        const token = sessionStorage.getItem("token")
        const respuesta = await Axios.delete("https://vendigmachine.herokuapp.com/usuarios/delete/" + id, { headers: { 'autorizacion': token } })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: "success",
            title: mensaje,
            showConfirmButton: false
        })
        obtenerUsuarios()

    }
    const buscar = async (e) => {

        if (e.target.value === "") { return obtenerUsuarios() }
        const buscar = e.target.value
        const token = sessionStorage.getItem("token")
        const respuesta = await Axios.get("https://vendigmachine.herokuapp.com/usuarios/buscar/" + buscar, {
            headers: { 'autorizacion': token }
        })
        console.log(respuesta.data)
        setUsuario(respuesta.data)
    }




    return (
        <div>
            <nav className="navbar py-4">
                <div className="container">
                    <div className="col-md-3">
                    <Link  className="btn btn-primary" to="/Registro" > Registrar </Link>
                    </div>
                    <div className="col-md-6 ml-auto">
                        <input type="search" className="form-control mr-sm-2" placeholder="Buscar...." aria-label="Search" onChange={(e) => buscar(e)} />
                    </div>
                </div>
            </nav>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4> Usuarios</h4>
                                </div>
                                <div className="table-responsive-lg">
                                    <table className="table table-striped card-text">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Rol</th>
                                                <th>Correo</th>
                                                <th>Estado</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuario.map((usuario, i) => (
                                                <tr key={usuario._id}>
                                                    <td>{i + 1}</td>
                                                    <td>{usuario.nombres}</td>
                                                    <td>{usuario.rol}</td>
                                                    <td>{usuario.correo}</td>
                                                    <td>{usuario.activo}</td>

                                                    <td>
                                                        <button className="btn btn-warning m-2" onClick={() => eliminar(usuario._id)}> Eliminar </button>
                                                        <Link className="btn btn-danger m-2" to={"/ActualizarUsuario/" + usuario._id} > Editar </Link>
                                                    </td>
                                                </tr>
                                            ))

                                            }
                                        </tbody>
                                    </table>
                                </div>



                            </div>

                        </div>

                    </div>

                </div>
            </section >




        </div >








    )
}