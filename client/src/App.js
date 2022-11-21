import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Landing from "./components/Landing/Landing.jsx"
import Home from "./components/Home/Home.jsx"
import CreatedPokemon from "./components/CreatedPokemon/CreatedPokemon.jsx"
import DetailsPokemon from "./components/DetailsPokemon/DetailsPokemon.jsx"




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/pokemon" component={CreatedPokemon} />
        <Route path="/home/:id" component={DetailsPokemon}/> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
