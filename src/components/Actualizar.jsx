import axios from 'axios'
import React,{ useEffect, useState } from 'react'



export default function Actualizar(props) {
    
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [disponible, setDisponible] = useState(['true','false'])
    const [disponibleSelect, setDisponibleselect] = useState('')

    useEffect(()=>{
        obtenerProducto()

    },[])

    const obtenerProducto = async () => {
        const id = props.match.params
        const token = sessionStorage.getItem('token')
        const respuesta=await axios.get('http://localhost:4000/producto/listarproductos/'+id,{
            headers: { 'autorizacion': token }
        })
        setTitulo(respuesta.data.titulo)
        setDescripcion(respuesta.data.descripcion)
        setPrecio(respuesta.data.precio)
        setDisponible(respuesta.data.disponible)
        
    }

    return (
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
                    <form >
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
                            <button  className='btn btn-primary' type='submit'>
                                Actualizar

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>

    )
}
