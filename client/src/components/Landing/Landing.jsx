import React from "react";
import {Link} from "react-router-dom"
import "./Landing.css"



export default function Landing(){
    return (
        <div className="container" >
            <h1 className="texto"> WELCOME TO  </h1>
            <h1 className="texto2"> POKEHENRYDEX</h1>
            <Link to="/home">
                <button className="boton">Ingresar</button>
            </Link>
        </div>
    )
}