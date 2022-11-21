const initialState = {
    pokemons: [],
    allPokemons: [],        // estado donde siempre tengo todos los pokemon 
    types: [],
    detail: []
}


const rootReducer = (state= initialState, action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case "GET_POKEMONS":
            return{
                ...state,                               //copia de initialState
                pokemons: action.payload,               //piso la info que contenia pokemons:[] con un nuevo render de todos los pokemons
                allPokemons: action.payload             //Estado para traer info original siempre. 
            }
        case "GET_TYPES":
            return{
                ...state,
                types: action.payload
            }
            case "FILTER_CREATED":
                const pokemonsAll = state.allPokemons
                const createdFilter = action.payload === "created" ? 
                    pokemonsAll.filter(el => el.createdInDb) :               // me guarda en pokemonsAll los que tengan la propiedad createdInDb
                    pokemonsAll.filter(el => !el.createdInDb)                // sino guarda todos menos los creados en la db 
                return{
                    ...state,
                    pokemons: action.payload === "All" ?          
                    state.allPokemons :                                // si se selecciona all me guarda todos los pokemon 
                    createdFilter                                   // sino me guarda los que hayan en  createdFilter
                }
                case "ORDER_BY_NAME":
                    let sortedArr = action.payload === 'asc' ?
                        state.pokemons.sort(function(a, b){                               // compara los valores del name y los va poniendo a la derecha o izquierda segun corresponda
                            if(a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1;
                            }
                            if(b.name.toLowerCase() > a.name.toLowerCase()) {
                                return -1;
                            }
                            return 0;                                                   // si son iguales los deja como estan 
                        }) :
                        state.pokemons.sort(function(a, b){
                            if(a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1;
                            }
                            if(b.name.toLowerCase() > a.name.toLowerCase()) {
                                return 1;
                            }
                            return 0;
                        })
                        return {
                            ...state,
                            pokemons: sortedArr
                        }
                        case "ORDER_BY_ATTACK":
                            let sortedAttack = action.payload === 'max' ?
                                state.pokemons.sort(function(a, b){
                                    if(a.attack < b.attack) {
                                        return 1;
                                    }
                                    if(b.attack < a.attack) {
                                        return -1;
                                    }
                                    return 0;
                                }) :
                                state.pokemons.sort(function(a, b){
                                    if(a.attack < b.attack) {
                                        return -1;
                                    }
                                    if(b.attack < a.attack) {
                                        return 1;
                                    }
                                    return 0;
                                })
                                return {
                                    ...state,
                                    pokemons: sortedAttack
                                }
                            case "FILTER_TYPE":
                                    let pokemonAll2 = state.allPokemons
                                    let resultApi = pokemonAll2.filter(p => p.type && p.type.includes(action.payload))
                                    let resultDb = pokemonAll2.filter(p => p.types && p.types.map(t => t.name).includes(action.payload))
                                    let result = resultApi.concat(resultDb)
                                    return {
                                        ...state,
                                        pokemons: result
                                    }
                            case "GET_NAME_POKEMONS":
                                return{
                                    ...state,
                                    pokemons: action.payload
                                    }
                            case "POST_POKEMON":
                                return{
                                        ...state
                                    }
                            case "GET_DETAILS":
                                return{
                                    ...state,
                                    detail: action.payload
                                }
            default: 
                    return state
    }

}



export default rootReducer