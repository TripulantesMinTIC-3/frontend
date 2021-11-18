import React from 'react'
import { Link } from 'react-router-dom'
export default function Nav() {
    const salir =()=>{
        sessionStorage.clear(
            window.location.href=('/')
        )

    }
    return (
        <p>home page</p>
    )
}
