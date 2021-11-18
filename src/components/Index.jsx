import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
export default function Index() {

    const [productos, setProductos] = useState([])

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [disponible, setDisponible] = useState(['true', 'false'])
    const [disponibleSelect, setDisponibleselect] = useState('true')

    useEffect(() => {
        obtenerProductos()

    }, [])

    const obtenerProductos = async () => {
        const id = sessionStorage.getItem('idProducto')
        const token = sessionStorage.getItem('token')
        const respuesta = await axios.get('http://localhost:4000/producto/listarproductos',
            {
                headers: { 'autorizacion': token }
            }).catch(function (error) { console.log(error) })
        setProductos(respuesta.data)
        console.log(respuesta)
    }
    const eliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await axios.delete('http://localhost:4000/producto/eliminar/' + id, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            title: '¿Está seguro?',
            text: "Usted no podrá revertirla información!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado!',
                    'Su producto ha sido borrado.',
                    'Con éxito'
                )
            }
        })

        obtenerProductos()
    }


    const guardar = async (e) => {
        e.preventDefault()
        const product = {
            titulo,
            descripcion,
            precio,
            disponible: disponibleSelect
        }
        console.log(disponibleSelect)
        const token = sessionStorage.getItem('token')
        const respuesta = await axios.post('http://localhost:4000/producto/crear', product, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            tittle: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/index'
        }, 1500)
    }
    const buscar = async (e) => {

        if (e.target.value === "") { return obtenerProductos() }
        const buscar = e.target.value
        const token = sessionStorage.getItem("token")
        const respuesta = await axios.get("http://localhost:4000/producto/buscar/" + buscar, {
            headers: { 'autorizacion': token }
        })
        console.log(respuesta)
        setProductos(respuesta.data)
    }




    return (
        <div>
            <header className='py-2 bg-primary text-white '>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className='fas fa-pencil-alt'> </i>Productos</h1>

                        </div>
                    </div>
                </div>


            </header>



            <nav className='navbar py-4'>

                <div className="container">
                    <div className="col-md-3">
                        <Link to='#' className="btn-primary btn-block" data-toggle='modal' data-target='#addProducto'>
                            <i className='fas fa-plus'>Add Producto</i>

                        </Link>

                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="input-group">
                            <input type="search" className="form-control mr-sm-2" placeholder="Buscar...." aria-label="Search" onChange={(e) => buscar(e)} >

                            </input>
                        </div>
                    </div>

                </div>

            </nav>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Productos</h4>
                                </div>
                                <table className='table table-responsive-lg table-striped'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th>#</th>
                                            <th>Titulo</th>
                                            <th>Descripcion</th>
                                            <th>Precio</th>
                                            <th>Disponibe?</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productos.map((producto, i) => (

                                                <tr key={producto._id}>

                                                    <td>{i + 1}</td>
                                                    <td>{producto.titulo}</td>
                                                    <td>{producto.descripcion}</td>
                                                    <td>{producto.precio}</td>
                                                    <td>{producto.disponible}</td>
                                                    <td>
                                                        <button className='btn btn-danger mr-1' onClick={() => eliminar(producto._id)}>
                                                            eliminar
                                                        </button>
                                                        <Link className='btn btn-primary mr-1' to={'/actualizar/' + producto._id}>
                                                            editar
                                                        </Link>


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
            </section>
            <div className="modal fade" id='addProducto'>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primay text-white">
                            <h5 className='modal-title'>Add Producto</h5>
                            <button className='close' data-dismiss='modal'>
                                <span>
                                    &times;
                                </span>

                            </button>

                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardar}>
                                <div className="form-group">
                                    <label>
                                        Titulo
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setTitulo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Descripcion
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Precio
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setPrecio(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Disponible
                                    </label>
                                    <select className='form-control' onChange={(e) => setDisponibleselect(e.target.value)}>
                                        {
                                            disponible.map(disponible => (
                                                <option key={disponible}>
                                                    {disponible}

                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button className='btn btn-primary' type='submit'>
                                        Guardar

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
