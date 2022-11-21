import React from "react";
import { Link } from "react-router-dom";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from "../../actions/index";
import { useEffect } from "react";
import "./DetailsPokemon.css"





export default function DetailsPokemon(){

    const dispatch = useDispatch();
    const myPokemon = useSelector ((state) => state.detail) //guardo en myPokemon el estado detail:[] del reducer
    const params = useParams();

    useEffect(() => {
        dispatch(getDetail(params.id)); //al montarse el componente despacho la accion getDetail con el id que capturo del URL dinamico
    }, [dispatch])


    return (
        <div className="background-detail">
        <div>
            {
                myPokemon.length > 0 ?
                <div className="details">
                    <h1 className="name">{myPokemon[0].name}</h1>
                    <img src={myPokemon[0].img? myPokemon[0].img : myPokemon[0].image} alt="img not found" width="250px" height="250px" />
                    <div className="states">
                        <h2>Type: {myPokemon[0].createdInDb? myPokemon[0].types.map(p => p.name + " ") : myPokemon[0].type + " "}</h2>
                        <h2>Hp: {myPokemon[0].health}</h2>
                        <h2>Attack: {myPokemon[0].attack}</h2>
                        <h2>Defense: {myPokemon[0].defense}</h2>
                        <h2>Speed: {myPokemon[0].speed}</h2>
                        <h2>Height: {myPokemon[0].height}</h2>
                        <h2>weight: {myPokemon[0].weight}</h2>
                        <h2>Id: {myPokemon[0].id}</h2>
                    </div> 
                </div> : <p>Loading...</p>
            }
        </div>
            <Link to={"/home"}>
                <button className="botonn">Go back</button>
            </Link>
        </div>
    )

}