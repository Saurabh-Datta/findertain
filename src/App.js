import { useEffect, useState } from "react";

import './App.css';
import SearchIcon from './search.svg';

import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=d97f87f7";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data.Search);
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies();
    }, []);

    return (
        <div className="app">
            <h1>Findertain</h1>

            <div className="search">
                <input
                    placeholder="Search for movies or series"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value); searchMovies(e.target.value)}}
                    onKeyDown={(e) => {if(e.key === "Enter"){searchMovies(searchTerm)}}}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length >0 && searchTerm.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ): (
                    searchTerm.length>0 ? 
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                    :
                    <div className="empty">
                        <h2>Search for a movie or series</h2>
                    </div>
                )
            }
            
            
        </div>
    );
}

export default App;