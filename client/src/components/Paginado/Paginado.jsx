import React from "react";
import "./Paginado.css"

export default function Paginado ({pokemonPerPage, allPokemons, paginado}) {
    const pageNumbers = []


    for(let i = 0; i <= Math.ceil(allPokemons/pokemonPerPage) - 1; i++) pageNumbers.push(i + 1)


    return (
        <nav>
            <ul >
            { pageNumbers &&              //si pageNumbers es true, los mapeo y renderizo una lista con los nºs de página
                    pageNumbers.map(number => (
                    <button className="number" onClick={() => paginado(number)}>{number}</button>
                ))}
            </ul>
        </nav>
    )
}