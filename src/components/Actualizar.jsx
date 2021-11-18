import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import Swal from 'sweetalert2'



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
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta=await axios.get('http://localhost:4000/producto/listar/'+id,{
            headers: { 'autorizacion': token }
        })
        
        setTitulo(respuesta.data.titulo)
        setDescripcion(respuesta.data.descripcion)
        setPrecio(respuesta.data.precio)
        setDisponibleselect(respuesta.data.disponible)
        
    }
        const actualizar=async(e)=>{
            e.preventDefault()
            const id = props.match.params.id
            const token = sessionStorage.getItem('token')
            const producto={
                titulo,
                descripcion,
                precio,
                disponible:disponibleSelect

            }
            const respuesta=await axios.put('http://localhost:4000/producto/actualizar/'+id,producto,{
                headers:{
                    'autorizacion':token
                }
            })
            const mensaje=respuesta.data.mensaje
                Swal.fire({
                    icon:'success',
                    title: mensaje,
                    showConfirmButton:false
                })
                setTimeout(()=>{
                    window.location.href='/index'
                },1500)
        }

        return (
            <div className="container col-md-6 mt-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>Editar</h3>
                            <div className="card-body">
                                <form onSubmit={actualizar}>
                                    <div className="form-group">
                                        <label>Titulo</label>
                                        <input type="text" className="form-control" required onChange={e => setTitulo(e.target.value)} value={titulo}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Descripcion</label>
                                        <input type="text" className="form-control" required onChange={e => setDescripcion(e.target.value)} value={descripcion}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Precio</label>
                                        <input type="text" className="form-control" required onChange={e => setPrecio(e.target.value)} value={precio} />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Disponible</label>
                                        <select className="form-control" onChange={(e) => setDisponibleselect(e.target.value)} value={disponibleSelect}>
                                            {
                                                disponible.map(disponible =>
                                                    <option key={disponible}>
                                                        {disponible}
                                                    </option>)
                                            }
                                        </select>
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