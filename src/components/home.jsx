import React from 'react'
import tienda from './assets/img/tienda.jpg'


export default function Nav() {
    const salir =()=>{
        sessionStorage.clear(
        window.location.href=('/')
        )

    }
    return (
    <div align="center" >
        
        <img src={tienda} width="100%" alt=""/>
    

    </div>
    )
};
