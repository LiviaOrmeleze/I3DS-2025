import { useEffect, useState } from 'react';
import './App.css'
import Footer from './components/footer/Footer';
import MovieCard from './components/movieCard/MovieCard';
import logo from "./assets/devflix.png"
import lupa from "./assets/search.svg"

const App = () => {

  const [search,setSearch] = useState("");
  const [movies,setMovies] = useState([]);

  //Utilizando chave de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`
  
  //Alimentando com dados para não ficar nulo com useEffect
  useEffect(()=> {
    searchMovies("Barbie")
}, [])

//criando a conexão com a API e trazendo informações
const searchMovies= async (title)=> {
const response = await fetch(`${apiUrl}&s=${title}&`)
const data = await response.json()

  //Alimentando o movies
  setMovies(data.Search)

}

//e = evento| ao clicar ou digitar acontece algo
const handleKeyPress= (e) => {
  e.key === "Enter" && searchMovies(search)
}

  return (
    <div id='app'>

      <img className='logo' src={logo} alt="" />

      <div className='search'>
      <input 
      onKeyDown={handleKeyPress} 
      onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Pesquise por filmes' />
      <img onClick={() => searchMovies(search)} src={lupa} alt="" />
      </div>


    {movies?.length > 0 ? (
      <div className="container">
    {movies.map((movie, index) => (
      <MovieCard key={index} apiUrl={apiUrl} {...movie} />
    
    ))}
   </div> 
    ) : ( 
      <h2 className='empty'>😒 Filme nã encontrado 😒</h2>
    )}

      <Footer
      devName={'LiviaOrmeleze'}
      devLink={"https://github.com/LiviaOrmeleze"}
      />
    </div>
  )
}

export default App;

