import { Link } from 'react-router-dom'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Ventas() {

    const [Ventas, setVentas] = useState([])
    const [Fecha_Venta, setFecha_Venta] = useState('')
    const [Referencia, setReferencia] = useState('')
    const [Vendedor, setVendedor] = useState('')
    const [Producto, setProducto] = useState([])
    const [ProductoSelect, setProductoSelect] = useState([])
    const [Cantidad, setCantidad] = useState('')
    const [Total, setTotal] = useState('')
    const [Precio_unitario, setPrecio_unitario] = useState('')
    const [Estado_venta, setEstado_venta] = useState([])
    const [EstadoSelect, setEstadoSelect] = useState('Entregada')


    useEffect(() => {
        obtenerVentas()

        setEstado_venta(["Entregada", "En proceso", "Cancelada"])
        obtenerProductos()
        setProductoSelect("")

    }, [])
    const obtenerProductos = async () => {
        const id = sessionStorage.getItem('idProducto')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('https://vendigmachine.herokuapp.com/producto/listarproductos',
            {
                headers: { 'autorizacion': token }
            }).catch(function (error) { console.log(error) })
        setProducto(respuesta.data.map(item => item.titulo))
    }
    const obtenerVentas = async () => {

        const id = sessionStorage.getItem('idventas')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('https://vendigmachine.herokuapp.com/ventas/listarventas',
            {
                headers: { 'autorizacion': token }
            }).catch(function (error) { console.log(error) })
        setVentas(respuesta.data);
        console.log(respuesta.data);

    }

    const eliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('https://vendigmachine.herokuapp.com/ventas/delete/' + id, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            tittle: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

        obtenerVentas()

    }




    const guardar = async (e) => {
        e.preventDefault()
        const Ventas = {
            Fecha_Venta,
            Referencia,
            Vendedor,
            Producto: ProductoSelect,
            Cantidad,
            Total,
            Precio_unitario,
            Estado_venta: EstadoSelect

        }
        const token = sessionStorage.getItem("token")
        const respuesta = await Axios.post("https://vendigmachine.herokuapp.com/ventas/crear", Ventas,
            { headers: { 'autorizacion': token } })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: "success",
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => { window.location.href = "/ventas" }, 1500)
    }
    const buscar = async (e) => {

        if (e.target.value === "") { return obtenerVentas() }
        const buscar = e.target.value
        const token = sessionStorage.getItem("token")
        const respuesta = await Axios.get("https://vendigmachine.herokuapp.com/ventas/buscar/" + buscar, {
            headers: { 'autorizacion': token }
        })
        console.log(respuesta.data)
        setVentas(respuesta.data)
    }






    return (
        <div>
            <header className='py-2 bg-primary text-white '>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className='fas fa-pencil-alt'> </i>Ventas</h1>

                        </div>
                    </div>
                </div>
            </header>
            <nav className='navbar py-4'>
                <div className="container">
                    <div className="col-md-3">
                        <Link to='#' className="btn-primary btn-block" data-toggle='modal' data-target='#addVentas'>
                            <i className='fas fa-plus'>Add venta</i>
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

            {/*mostrar ventas*/}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Ventas</h4>
                                </div>
                                <table className='table table-responsive-lg table-striped'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th>#</th>
                                            <th>Fecha</th>
                                            <th>Referencia</th>
                                            <th>Vendedor</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                            <th>Precio Unitario</th>
                                            <th>Estado venta</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Ventas.map((ventas, i) => (
                                                <tr key={ventas._id}>

                                                    <td>{i + 1}</td>
                                                    <td>{ventas.Fecha_Venta}</td>
                                                    <td>{ventas.Referencia}</td>
                                                    <td>{ventas.Vendedor}</td>
                                                    <td>{ventas.Producto}</td>
                                                    <td>{ventas.Cantidad}</td>
                                                    <td>{ventas.Total}</td>
                                                    <td>{ventas.Precio_unitario}</td>
                                                    <td>{ventas.Estado_venta}</td>


                                                    <td>
                                                        <button className='btn btn-danger mr-1' onClick={() => eliminar(ventas._id)}>
                                                            eliminar
                                                        </button>
                                                        <Link className='btn btn-primary mr-1' to={'/Actualizarventa/' + ventas._id}>
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
            <div className="modal fade" id='addVentas'>
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
                                        Fecha
                                    </label>
                                    <input type='date' className='form-control' required
                                        onChange={(e) => setFecha_Venta(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Referencia
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setReferencia(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Vendedor
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setVendedor(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Producto
                                    </label>
                                    <select className='form-control' onChange={(e) => setProductoSelect(e.target.value)}>
                                        {
                                            Producto.map(Producto => (
                                                <option key={Producto}>
                                                    {Producto}

                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Cantidad
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setCantidad(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Total
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setTotal(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Precio Unitario
                                    </label>
                                    <input type='text' className='form-control' required
                                        onChange={(e) => setPrecio_unitario(e.target.value)} />
                                </div>
                                <label>
                                    Estado venta
                                </label>
                                <select className='form-control' onChange={(e) => setEstadoSelect(e.target.value)}>
                                    {
                                        Estado_venta.map(Estado_venta => (
                                            <option key={Estado_venta}>
                                                {Estado_venta}

                                            </option>
                                        ))
                                    }
                                </select>
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