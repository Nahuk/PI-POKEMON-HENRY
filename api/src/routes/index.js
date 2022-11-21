const { Router } = require('express');
const axios = require("axios")
const { Pokemon, Type } = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// funciones controladoras 

const getApiInfo = async () => {                                                    //funcion asincrona
    const pokeUrl = []; 
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151'); //obtengo el array results: [{name + url de los primeros 40}] 
    
    apiUrl.data.results.forEach(el => {                             
        pokeUrl.push(axios.get(el.url).then(resp => resp.data));    //pusheo el contenido de la url de c/pokemon(obj {name, id, img, etc})
    });

    const apiInfo = Promise.all(pokeUrl)    //Promise.all espera que todas las promesas se cumplan y si se da...
    .then(res => res.map(p => {             //toma la respuesta y mapea por cada pokemon la info necesaria
        const info = {
            id: p.id,
            name: p.name,
            img: p.sprites.other.dream_world.front_default,
            type: p.types.map(el => el.type.name),
            health: p.stats[0].base_stat,
            attack: p.stats[1].base_stat,
            defense: p.stats[2].base_stat,
            speed: p.stats[5].base_stat,
            height: p.height,
            weight: p.weight,
        }
        return info;                        //devuelve toda la info
    }))
    return await apiInfo;                   //espera a que apiInfo reciba toda la info y cuando termina getApiInfo() devuelve esa const si la ejecutamos
}



const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
};


const getAllPokemon = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const totalInfo = apiInfo.concat(dbInfo)
    return totalInfo
}



// rutas 

router.get("/pokemons", async (req, res) => {
    const name = req.query.name                    // el name me llega por query
    let totalPokemons = await getAllPokemon()        // me traigo todos los pokemon 
    if(name) {
        let pokemonName = await totalPokemons.filter( el => el.name.toLowerCase().includes(name.toLowerCase())) // filtro el pokemon cuyo name coincida con el que me pasaron por query
        pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send("No esta el Pokemon")
    } else {
        res.status(200).send(totalPokemons)  // si no hay por query devuelvo todos los pokemon 
    }
})

router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params   // recibo el id por params 
    const pokemonsTotal = await getAllPokemon() // me traigo todos los pokemon 
    if(id){
        let pokemonId = await pokemonsTotal.filter(el => el.id == id)
        pokemonId.length ? res.status(200).json(pokemonId) : res.status(404).send("No se encontro el pokemon") 
    }
})

router.get('/types', async(req, res) => {
    const apiTypes = await axios.get('https://pokeapi.co/api/v2/type') //accedo al endpoint de type que me da la Api
    const types = apiTypes.data.results.map(el => el.name)             //me guardo el nombre de de c/tipo en el array types
    types.forEach(t => {                                  //recorro el array y por c/elm creo una entrada en la db Tipo
        Type.findOrCreate({         //.findOrCreate() si encuentra el tipo, lo muestra en la db y si no, lo crea en la db. Si uso .create() cada vez que haga una peticion me creará los 20 tipos.Metodos de sequelize
            where: {
                name: t,
            }
        })
    });

    const allTypes = await Type.findAll();  //guardo todo lo que haya en la db Tipo (nombre + id de c/tipo).
    res.status(200).send(allTypes);  //devuelvo solo la info de la db. Con esto me evito recorrer la api en cada peticion
})



router.post("/pokemons", async (req,res) =>{
    const { name, img, health, attack, defense, speed, height, weight, type, createdInDb } = req.body; // los datos vienen por el body cuando el usuario llena el formulario
    
    try{
        let pokemonCreated = await Pokemon.create({      //.create() crea una nueva instancia del modelo (un nuevo pokemon)
            name,
            img,
            health,
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDb
        })
        let typeDb = await Type.findAll({ //dentro del modelo Tipo encontra todos los tipos...
            where: { name: type }            //cuyo name coincida con el de type que recibo por body. Clausula where
        })
        pokemonCreated.addType(typeDb)  // al pokemon creado le agrego el tipo que traje de la db
        res.status(200).send("Pokemon creado exitosamente")
    } catch(error) {
        res.status(400).send("No se pudo crear el pokemon")
    }
})



module.exports = router;
