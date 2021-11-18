import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'



export default function Actualizarventa(props) {

    const [Fecha_Venta, setFecha_Venta] = useState('')
    const [Producto, setProducto] = useState([])
    const [Referencia, setReferencia] = useState('')
    const [Descripcion, setDescripcion] = useState('')
    const [Total, setTotal] = useState('')
    const [Vendedor, setVendedor] = useState('')
    const [Cantidad, setCantidad] = useState('')
    const [Estado_venta, setEstado_venta] = useState('')
    const [Precio_unitario, setPrecio_unitario] = useState('')
    const [Productoselect, setProductoselect] = useState('')


    useEffect(() => {
        obtenerVentas()
        obtenerProductos()

        // setProducto(['Coca-cola', 'Sprite', 'Cuatro'])
        // eslint-disable-next-line
    }, [])
    const obtenerProductos = async () => {
        const id = sessionStorage.getItem('idProducto')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/producto/listarproductos',
            {
                headers: { 'autorizacion': token }
            }).catch(function (error) { console.log(error) })
        setProducto(respuesta.data.map(item => item.titulo))
    }
    const obtenerVentas = async () => {
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/ventas/listar/' + id, {
            headers: { 'autorizacion': token }
        })
        setFecha_Venta(respuesta.data.Fecha_Venta)
        setProductoselect(respuesta.data.Producto)
        setReferencia(respuesta.data.Referencia)
        setDescripcion(respuesta.data.Descripcion)
        setTotal(respuesta.data.Total)
        setVendedor(respuesta.data.Vendedor)
        setCantidad(respuesta.data.Cantidad)
        setEstado_venta(respuesta.data.Estado_venta)
        setPrecio_unitario(respuesta.data.Precio_unitario)

    }

    const Actualizarventa = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const empleado = {
            Fecha_Venta,
            Producto: Productoselect,
            Referencia,
            Total,
            Vendedor,
            Cantidad,
            Estado_venta,
            Precio_unitario



        }
        const respuesta = await Axios.put('http://localhost:4000/ventas/actualizar/' + id, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/ventas'
        }, 1500)
    }

    return (
        <div className="container col-md-6 mt-4">
            <div className="card">
                <div className="card-header">
                    <h3>Editar</h3>
                    <div className="card-body">
                        <form onSubmit={Actualizarventa}>
                            <div className="form-group">
                                <label>Fecha Venta </label>
                                <input type="date" className="form-control" required onChange={e => setFecha_Venta(e.target.value)} value={Fecha_Venta} />
                            </div>
                            <div className="form-group">
                                <label>Producto </label>
                                <select className="form-control" onChange={(e) => setProducto(e.target.value)} value={setProductoselect}>
                                    {
                                        Producto.map(Producto =>
                                            <option key={Producto}>
                                                {Producto}
                                            </option>)
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Descripcion</label>
                                <input type="text" className="form-control" required onChange={e => setDescripcion(e.target.value)} value={Descripcion} />
                            </div>
                            <div className="form-group">
                                <label>Total</label>
                                <input type="text" className="form-control" required onChange={e => setTotal(e.target.value)} value={Total} />
                            </div>
                            <div className="form-group">
                                <label>Vendedor</label>
                                <input type="text" className="form-control" required onChange={e => setVendedor(e.target.value)} value={Vendedor} />
                            </div>
                            <div className="form-group">
                                <label>Cantidad</label>
                                <input type="text" className="form-control" required onChange={e => setCantidad(e.target.value)} value={Total} />
                            </div>
                            <div className="form-group">
                                <label>Estado_venta</label>
                                <input type="text" className="form-control" required onChange={e => setEstado_venta(e.target.value)} value={Estado_venta} />
                            </div>
                            <div className="form-group">
                                <label>Precio unitario</label>
                                <input type="text" className="form-control" required onChange={e => setPrecio_unitario(e.target.value)} value={Precio_unitario} />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-warning" type="submit">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
