import React from 'react'
import chicos from './assets/img/chicos.jpg'
import cocacola from './assets/img/cocacola.jpg'
import vending from './assets/img/vending.jpg'


export default function Nav() {
    const salir =()=>{
        sessionStorage.clear(
        window.location.href=('/')
        )

    }
    return (
    <div align="center" >
        
        <img src={chicos} width="100%" alt=""/>
        <img src={cocacola} width="50%" alt=""/>
        <img src={vending} width="50%" alt=""/>
        
    

    </div>
    )
};
