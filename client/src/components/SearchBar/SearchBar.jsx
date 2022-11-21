import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import {getNamePokemons} from "../../actions"
import "./SearchBar.css"


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")


    const handleInputChange = (e) =>{
        e.preventDefault(); 
        setName(e.target.value)               // guardo en name lo que el usuario escribe en el input a traves setName()
    }   


    const handleSubmit = (e) =>{
        e.preventDefault(); 
        dispatch(getNamePokemons(name))    //cuando el usuario busque le paso al back la acción getNamePokemons() con name como arg
    }

    return (
        <div className="search-div">
            <input className="input-buscar" type="text" placeholder="Search..." onChange={(e) => {handleInputChange(e)}} />
            <button className="buscar" type="submit" onClick={(e) => {handleSubmit(e)}} >Search</button>
        </div>
    )


}