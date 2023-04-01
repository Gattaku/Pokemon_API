import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Card from './components/Card/Card';

function App() {

  const initialURL ="https://pokeapi.co/api/v2/pokemon";

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemoData] = useState([]);

  

  const loadPokemon = async(data) => {
    // console.log(data);
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemoData(_pokemonData);
  }
  
  console.log(pokemonData);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //すべてのポケコンデータを取得
      let res = await getAllPokemon (initialURL);
      //各ポケモンの詳細を取得
      loadPokemon(res.results);

      setLoading(false);
    };
    fetchPokemonData();
  },[])

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・・</h1>
      ):(
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon,i)=>{
              return <Card key={i} pokemon={pokemon}/>;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
