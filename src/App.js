import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList , searchMovie } from './api/api';

const App = () => {

  const[popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  },[])

  const PopularMoviesList = ()  => {
    return popularMovies.map((movie, i) => {
      return (
          <div className="Movie-wrapper" key={i}>
            <div className="Movie-title">{movie.title}</div>
            <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} className="Movie-image" />
            <div className="Movie-date">{movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div>
      )
    })
  } 

    const search = async (q) => {
      if (q.length > 3 ){
      const query = await searchMovie(q)
      setPopularMovies(query.results)
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upan Movie</h1>

        <input type="text" placeholder='Mau Nonton Apa...?' 
        className="Movie-search" 
        onChange={({ target }) => search(target.value) }
        />

        <div className="Movie-container">
          <PopularMoviesList />
        </div>
      </header>
    </div>
  );
}

export default App;
