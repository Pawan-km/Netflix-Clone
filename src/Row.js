import React, {useState, useEffect} from 'react'
import axios from './axios'
import './Row.css'
import YouTube  from 'react-youtube'; //e:/WORKSPACE FOR WD/REACT/NETFLIX/netflix-clone/node_modules/movie-trailer/index
import movieTrailer from 'movie-trailer';

function Row({title, fetchUrl, isLargeRow}) { 
    let base_url = "https://image.tmdb.org/t/p/original";
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")    
    useEffect(() => {
        async function fetchData(){
            const requests = await axios.get(fetchUrl)
            setMovies(requests.data.results)
            return requests;
        }
        fetchData(); 

    }, [fetchUrl])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    }
    const handleClick = (movie) => {
        console.log('clicked on thumbnail')
        if(trailerUrl){
            setTrailerUrl("")
        }else{
            movieTrailer(movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"))
                })
                .catch((error) => console.log(error))
        }
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img key={movie.id} onClick={() => handleClick(movie)} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
