import React, {useEffect, useState} from 'react';
import axios from './axios';
import requests from './request';
import "./Banner.css";


function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData(){
        
            const request = await axios.get(requests.fetchNeflixOriginals);
        
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
        }
        fetchData();
    }, [])
    console.table(movie)
    function truncate(str, n){
        return ( str?.length > n ? str.substr(0, n-1) + '...' : str)
    }
    return (
        <header className="banner" 
        style={{
            backgroundSize: "cover",
            background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path})`,
            backgroundPosition: "center center"
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name }</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__discription">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner--fadeBottom"/>
        </header>
    )
}

export default Banner
