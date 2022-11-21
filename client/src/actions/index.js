import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/pokemons");  // conexion entre el back y el front 
        return dispatch({
            type: "GET_POKEMONS",
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: "GET_TYPES",
            payload: info.data
        })
    }
}


export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",          // despacha la action
        payload                          // el payload es lo que se selecciona en el filtro 
    }
}



export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}


export function orderByAttack(payload){
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }
}

export function filterType(payload){
    return {
        type: "FILTER_TYPE",
        payload
    }
}

export function getNamePokemons(name){
    return async function(dispatch){
        try{
            let json = await axios.get("http://localhost:3001/pokemons?name=" + name)
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: json.data
            })
        }
        catch(error) {
            return alert('Pokemon not found');
        }
    }
}


export function postPokemon(payload){
    return async function(dispatch){
        const response = axios.post("http://localhost:3001/pokemons", payload)
        return response
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/pokemons/' + id);
            return dispatch({ 
                type: "GET_DETAILS", 
                payload: json.data 
            })
        }catch(error){
            console.log(error)
        }
    }
}