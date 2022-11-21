/* eslint-disable array-callback-return */
import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getTypes, postPokemon } from "../../actions";
import "./CreatedPokemon.css"




const validate = (input) =>{            //recibe el estado input con los cambios detectados por los handlers
    let errors = {};                                 //objeto que guarda todos los errores
    if(!input.name){                                //si no hay un nombre... etc
        errors.name = 'a name is required';      //al obj errors le agrego una prop name: 'se requiere un nombre'
    }else if(!/^[A-z]+$/.test(input.name)){          //expresion regular solo acepta letras
        errors.name = 'only letters are allowed'
    }else if(!input.img){
        errors.img = 'an image is required';   // requiero que haya una imagen 
    }else if(!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(input.img)){ 
        errors.img = 'only URL directions allowed'    // solo se permiten direcciones url 
    }else if(input.health < 1 || input.health > 200){
        errors.health = 'the value must be between 1 and 200'   // solo se permite un valor del 1 al 200
    }else if(!/^[0-9]+$/.test(input.health)){ 
        errors.health = 'only numbers are allowed'     // solo se permiten numeros 
    }else if(input.attack < 1 || input.attack > 200){
        errors.attack = 'the value must be between 1 and 200'  // solo permito un valor del 1 al 200
    }else if(!/^[0-9]+$/.test(input.attack)){ 
        errors.attack = 'only numbers are allowed'    // solo numeros
    }else if(input.defense < 1 || input.defense > 200){
        errors.defense = 'the value must be between 1 and 200' // solo valor del 1 al 200
    }else if(!/^[0-9]+$/.test(input.defense)){ 
        errors.defense = 'only numbers are allowed'   // solo numeros 
    }else if(input.speed < 1 || input.speed > 200){
        errors.speed = 'the value must be between 1 and 200'  // solo valor del 1 al 200
    }else if(!/^[0-9]+$/.test(input.speed)){ 
        errors.speed = 'only numbers are allowed'  // solo numeros 
    }else if(input.height < 1 || input.height > 200){
        errors.height = 'the value must be between 1 and 200' // solo valor del 1 al 200
    }else if(!/^[0-9]+$/.test(input.height)){ 
        errors.height = 'only numbers are allowed'   // solo numeros 
    }else if(input.weight < 1 || input.weight > 200){
        errors.weight = 'the value must be between 1 and 200' // solo valor del 1 al 200
    }else if(!/^[0-9]+$/.test(input.weight)){ 
        errors.weight = 'only numbers are allowed'     // solo numeros 
    }else if(input.type.length < 1){
        errors.type = 'select at least 1 type'  // seleccione por lo menos un tipo
    }
        return errors;      //se retorna el obj errors con la prop y el string correspondiente. let errors = {name: 'se requiere un nombre'}
}


export default function CreatedPokemon(){
    const dispatch = useDispatch();
    const history = useHistory()
    const types = useSelector((state) => state.types)  // me traigo los types
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getTypes());       //cuando se muestra el componente me trae todos los tipos
    }, [dispatch]);

    const[input, setInput] = useState({       // el estado de input es como va a venir el formulario
        name: "",
        img: "",
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: []
    })


    // botones
    const handleChange = (e)=>{  // recibe el evento que es el cambio del input 
        setInput({        // setInput es la funcion que modifica el estado del input
            ...input,
            [e.target.name] : e.target.value // se le asigna el valor que pongo en el input a la propiedad que coincida con el name(name, attack,speed, etc)
        })
        setErrors(validate({  // 
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelect = (e) =>{                       //recibe el tipo que se seleccionó en el selector
        if(!input.type.includes(e.target.value)){   //evita que se repitan los tipos
            setInput({
                ...input,
                type: [...input.type, e.target.value],  //al array de la prop type le añade el nuevo tipo que se seleccionó
            })
        }
        
    }

    const handleSubmit = (e) =>{      // recibe toda la info del formulario
        e.preventDefault();
        dispatch(postPokemon(input)) // me crea el pokemon con la informacion que fue guardando en el input
        alert("Pokemon successfully created!!")
        setInput({        // reseteo el estado del input a su estado original 
            name: "",
            img: "",
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            type: []
        })

        history.push('/home');
    }

    const handleDelete = (el) =>{      //recibe un evento, que es el click en la X de un tipo
        setInput({
            ...input,
            type: input.type.filter(t => t !== el)   //se filtra el array de la prop type, dejando pasar solo aquellos tipos que no coinciden con el clickeado 
        })
        
    }


    return (
        <div className="back">
            <h1 className="title">Create Your Pokemon!!</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="formulario">
                    <label>Name: </label>
                    <input type="text" value={input.name} name="name" placeholder="Name..." maxLength="10" onChange={(e) =>handleChange(e) } />
                    {errors.name && <p className="error">{errors.name}</p>}   {/* si mi estado errors.name existe, se renderiza un p con el error  */}
                </div>
                <div className="formulario">
                    <label>Image (url): </label>
                    <input type="text" value={input.img} name="img" placeholder="Image..." onChange={(e) =>handleChange(e) } />
                    {errors.img && <p className="error">{errors.img}</p>}
                </div>
                <div className="formulario">
                    <label>Hp :</label>
                    <input type="number" value={input.health} name="health" onChange={(e) =>handleChange(e) } />
                    {errors.health && <p className="error">{errors.health}</p>}
                </div>
                <div className="formulario">
                    <label>Attack: </label>
                    <input type="number" value={input.attack} name="attack" onChange={(e) =>handleChange(e) } />
                    {errors.attack && <p className="error">{errors.attack}</p>}
                </div>
                <div className="formulario">
                    <label>Defense: </label>
                    <input type="number" value={input.defense} name="defense" onChange={(e) =>handleChange(e) } />
                    {errors.defense && <p className="error">{errors.defense}</p>}
                </div>
                <div className="formulario">
                    <label>Speed: </label>
                    <input type="number" value={input.speed} name="speed" onChange={(e) =>handleChange(e) } />
                    {errors.speed && <p className="error">{errors.speed}</p>}
                </div>
                <div className="formulario">
                    <label>Height: </label>
                    <input type="number" value={input.height} name="height" onChange={(e) =>handleChange(e) } />
                    {errors.height && <p className="error">{errors.height}</p>}
                </div>
                <div className="formulario">
                    <label>Weight: </label>
                    <input type="number" value={input.weight} name="weight" onChange={(e) =>handleChange(e) } />
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </div>
                <div  className="formulario">
                    { input.type.length < 2 ?     
                        <select value='default' onChange={(e) =>handleSelect(e) } >     {/*Cuando se selecciona una opcion se ejecuta handleSelect con esa selección*/}
                            <option value='default' disabled hidden>Types: </option>
                            {types.map((t) => (                         //RECORRO EL ARRAY types PARA RENDERIZARLO
                            <option value={t.name} >{t.name}</option>    //renderizo los nombres de tipos en el selector
                            ))} 
                        </select> 
                        : <p>Max 2 Types</p>}
                </div>
                {errors.type && <p className="error">{errors.type}</p>} 
                <div className="type">
                    {input.type.map(el =>           //Recorro el array de la prop type del input 
                        <div className="type-content">      {/*renderizo el tipo que ya fue seleccionado mas un boton X*/}
                            <p>{el}</p> 
                            <button className="delete_type" type='button' onClick={() => handleDelete(el)}>x</button>   {/* borrar el elemento */}
                        </div>
                    )}
                </div>
                <div >
                    {Object.keys(errors).length || !input.type.length ? 
                        <button  type='submit' disabled>please complete the form</button> : 
                        <button  type='submit'>Create Pokemon</button> }               {/*cuando clickeo el boton (que es tipo submit), se 'envia' el formulario L125  */}
                </div>
            </form>
            <Link to="/home" ><button className="backhome">Back Home</button></Link>
        </div>
    )
}






