import {Component, useEffect, useState } from 'react';
import './App.css';
import BattleScreen from './components/BattleScreen';
import ScreenPokemones from './components/ScreenPokemones';

function App() {
  const [pokemones, setPokemones] = useState('');
  const[position,setPosition] = useState(0);
  const [myPokemonSelection, setMyPokemonSelection] = useState([]);
  const [computerRandomSelection,setComputerRandomSelection] = useState([]);
  const[myHealth, setMyHealth] = useState(100);
  const[enemyHealth, setEnemyHealth] = useState(100);

  const[startGame, setStartGame] = useState(false);

  const pokeUrl = 'https://pokeapi.co/api/v2/pokemon';

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const handleAttack = () =>{
    const myHealth = myHealth - computerRandomSelection[0].moves[0].attack;
    const enemyHealth = enemyHealth - myPokemonSelection[0].moves[0].attack;
  }
  const pokemonData = async (pokeUrl) => {
    const response = await fetchData(pokeUrl);
    console.log('Fetched response:', response);
    const dataPromises = response.results.map((poke) =>
      fetchData(pokeUrl + '/' + poke.name)
    );

    // console.log(dataPromises);
    const pokemonWithImages = await Promise.all(dataPromises);

    const addAttack = pokemonWithImages.map((pokemon) => {
      const attackValue = pokemon.moves.map((move) => ({
        ...move,
        attack: Math.floor(Math.random() * 50),
      }));

      return { ...pokemon, moves: attackValue };
    });

    console.log(addAttack);
    setPokemones(addAttack);
    // console.log(pokemonWithImages);
  };

  const filterSelection = () =>{

    const mySelection = pokemones.filter((value, idx) => position == idx);
    setMyPokemonSelection(mySelection);
    console.log(mySelection);
    getComputerSelection();
  };

  const getComputerSelection = () => {
    const computerPos = Math.floor(Math.random() * 20);
    const computerSelection = pokemones.filter((value, idx) => computerPos == idx);
    setComputerRandomSelection(computerSelection);
    console.log(computerPos);
  };


  const handleSelection=(forward) => {
    //console.log(forward);
    if(!forward && position <= 0) return;
    if(forward && position >= 20) return;
    if(!forward){
      setPosition(position-1);

    }else{
      setPosition(position+1);
    }

    //console.log(position);
  };

  const handleStart = () =>{
    setStartGame(true);
  }
  
  useEffect(() => {
    pokemonData(pokeUrl);
  }, []);

  return (
    <>
      <div className="main-container">
        <h1>Hola mundo</h1>
        {/* screen */}
        <div className="layout-game">
          <div className="container-screen">
            <div className="screen-layout">
              {
                startGame ?(
                <BattleScreen
                myPokemonSelection = {myPokemonSelection}
                computerRandomSelection={computerRandomSelection}
                myHealth = {myHealth}
                enemyHealth = {enemyHealth}
                />
                ) : (
                  pokemones && (<ScreenPokemones pokemones={pokemones} position={position}/>)
                )
             // pokemones && (<ScreenPokemones pokemones={pokemones} position={position}/>)
            }
            </div>
          </div>
          <div className="buttons-container">
            {/* buttons pad*/}
            <div className="container-pad">
              <button className="btn-right" onClick = {() => handleSelection(false)}></button>
              <div className="container-up-down">
                <button className="btn-up"></button>
                <button className="btn-down"></button>
              </div>
              <button className="btn-left" onClick = {() => handleSelection(true)}></button>
            </div>
            {/* buttons select */}
            <div className="container-select">
              <div className="container-select-btn">
                <button className="btn-select" onClick = {() => filterSelection()}></button>
                <div>select</div>
              </div>
              <div className="container-start">
                <button className="btn-start" onClick = {() => handleStart(true)}></button>
                <div>start</div>
              </div>
            </div>
            {/* buttons actions */}
            <div className="container-action">
              <div className="button-b-container">
                <button className="button-b" onClick = {() => handleAttack()}></button>
                <div>B</div>
              </div>
              <div className="button-a-container">
                <button className="button-a" onClick = {()=> filterSelection()}></button>
                <div>A</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
