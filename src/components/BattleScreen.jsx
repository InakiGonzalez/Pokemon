import './battleScreen.css';

const BattleScreen = ({myPokemonSelection, computerRandomSelection, myHealth, enemyHealth}) => {
    console.log({myPokemonSelection});
    console.log({computerRandomSelection});

   // if (!myPokemonSelection || !computerRandomSelection || myPokemonSelection.length === 0 || computerRandomSelection.length === 0) {
    ///    return <div>Loading...</div>; // or any other loading indicator
   // }

    return(
        <div className = "battleContainer">
            <div className = "enemy-container"> 
            <div className = "health-container">
                <p>Health: {enemyHealth}</p>
                <div className = "health-bar" style = {{width: `${enemyHealth}%`}}></div>
                <h1>{computerRandomSelection[0].name}</h1>
            </div>
                <img src = {computerRandomSelection[0].sprites.front_default} alt ='enemySelection'></img>
            </div>
            <div className = "my-container">
                <img src = {myPokemonSelection[0].sprites.back_default} alt ='mySelection'></img>
                <div className = "health-container">
                <p>Health: {myHealth}</p>
                <div className = "health-bar" style = {{width: `${myHealth}%`}}></div>
                <h1>{myPokemonSelection[0].name}</h1>
            </div>

        </div>
    </div>
    );
};

export default BattleScreen;