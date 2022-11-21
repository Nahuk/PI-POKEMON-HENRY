
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getPokemons, filterCreated, orderByName, orderByAttack, filterType, getTypes, } from "../../actions";
import { Link } from 'react-router-dom';
import Card from "../Card/Card.jsx"
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Home.css"







export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector ((state) => state.pokemons);
    const types = useSelector((state) => state.types); 
   



    // paginado
    const [currentPage, setCurrentPage] = useState(1)       // el home abre en la pag 1
    const [pokemonPerPage, setPokemonPerPage] = useState(12)      // para que se muestren 12 pokes por pag
    const indexOfLastPokemon = currentPage * pokemonPerPage     // 12  // indice del ultimo pokemon que tengo en la pag
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage  // 0 // indice del primer pokemon
    const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)  // devuelve un arreglo con los pokes desde el indice 0 hasta el 12
    const [orden, setOrden] = useState("");

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)            // setea la pagina actual con el numero de pag que le paso 
    }
    
    
    useEffect (() =>{                       //Manejo de ciclos de vida
        if(!allPokemons[0]){             //mantengo los filtros cuando monto el componente
            dispatch(getPokemons());        //cuando se monta el componente, me traigo todos los pokemons
            dispatch(getTypes());           //cuando se monta el componente, me traigo todos los types    
         }
    }, [dispatch]);


        // clicks
    const handleClick = (e) => {         // refresh
        e.preventDefault();              // para que no se rompa cuando carga
        dispatch(getPokemons());        // boton para hacer refresh a los pokemon 
    };

    const handleFilterCreated = (e) =>{
        dispatch(filterCreated(e.target.value))
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);                // empiezo desde la pag 1 
        setOrden(`Ordenado ${e.target.value}`);    // realiza la modificacion en el render  
    }

    const handleSortAttack = (e) => {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    const handleFilterType = (e) => {
        dispatch(filterType(e.target.value))
    }

    
    return (
        <div className="contenedor">
            <div >
            <div className="home">
            <h1 className="text" >PokeWeb</h1>
            </div>
            <div >
            <Link to= "/pokemon"><button className="crear">Created Your Pokemon</button></Link>
            </div>
            <button className="refresh" onClick={e => {handleClick(e)}} >Refresh</button>
            <div>
                <SearchBar/>
            </div>
            <div className="filtros">
                <select className="filter" defaultValue="Select order" onChange={e => handleSort(e)}>
                <option value="default">Select order</option>
                <option value="asc">A - Z</option>
                <option value="desc" >Z - A</option>
                </select>
                <select className="filter" onChange={e => handleSortAttack(e)}>
                <option value='default'>Attack</option>
                <option value="max">Attack ++</option>
                <option value="min">Attack --</option>
                </select>
                <select className="filter" onChange={e => handleFilterCreated(e)}>
                <option value='default' >Everybody</option>
                <option value="All">All</option>
                <option value="created">Created</option>
                <option value="api">Api</option>
                </select>
                <select className="filter" value='default' onChange={e => handleFilterType(e)}>             {/* cuando seleccino un tipo, se ejecuta el handle */}
                    <option value='default' >Types</option>
                    {types.map((t) => (                                 //recorro el estado types y por cada tipo ...
                            <option value={t.name} key={t.name}>{t.name}</option>   //renderizo un option con el nombre de cada uno en el select
                        ))}
                </select>
            </div>
            </div>
            <div>
                <Paginado pokemonPerPage={pokemonPerPage} allPokemons={allPokemons.length} paginado={paginado} />
            </div>

            <div className="orden">
                { 
                    currentPokemon?.map((c) => {
                        return (
                            <fragment>
                                <Link to={"/home/" + c.id } className="link">
                                    <Card 
                                    name={c.name} 
                                    image={c.img ? c.img : c.image} 
                                    types={c.createdInDb ? c.types.map(p => p.name + " ") : c.type.map(p => p + " " )} 
                                    key={c.id} 
                                    />
                                </Link>
                            </fragment>
                        )
                    })
                }
            </div>
            
        </div>
    )
}


