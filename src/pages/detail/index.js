import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import API from "../../api";

const Detail = () => {
    let { id } = useParams();
    const [movie,setMovie]=useState('')
    const [credits,setCredits]=useState('')
    useEffect(() => {
        const getMovie = API.get(`/movie/${id}`)
        const getCredits = API.get(`/movie/${id}/credits`)

        Promise.all([getMovie, getCredits]).then((values) => {
            setMovie(values[0].data)
            setCredits(values[1].data)
        });
    }, [id])
    return (
        <div>
            <div className='bg-grey rounded-md pt-27 pb-25 pl-81 pr-62 flex items-center mb-119' >
                <Link to='/' className='w-92 bg-blue text-white'>Back</Link>
                <div className='ml-64'>
                    <h3>{movie.title}</h3>
                    <p>{movie.tagline}</p>
                </div>

            </div>
            <div className='flex'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                <div className='w-full'>
                    <div className='flex w-full'>
                        <p className='mr-auto'>Budget</p>
                        <p>{movie.budget}</p>
                    </div>
                    <div className='flex w-full'>
                        <p className='mr-auto'>Revenue</p>
                        <p>{movie.revenue}</p>
                    </div>
                    <div className='flex w-full'>
                        <p className='mr-auto'>Release Date</p>
                        <p>{movie.release_date}</p>
                    </div>
                    <div className='flex w-full'>
                        <p className='mr-auto'>Runtime</p>
                        <p>{movie.runtime}</p>
                    </div>
                    <div className='flex w-full'>
                        <p className='mr-auto'>Score</p>
                        <p>{movie.vote_average}{` (${movie.vote_count} votes)`}</p>
                    </div>
                    <div className='flex w-full'>
                        <p className='mr-auto'>Generes</p>
                        {movie?.genres?.map(item=>(
                            <span>{` ${item.name}, `}</span>
                        ))}
                    </div>
                    <div className='flex w-full'>
                        <p className='mr-auto'>IMDB Link</p>
                        <a href={`https://imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer">Link</a>
                    </div>
                    <div className='flex w-full'>
                        <p className='mr-auto'>Homepages Link</p>
                        <a href={movie.homepage} target="_blank" rel="noreferrer">Link</a>
                    </div>
                </div>
            </div>
            <p>{movie.overview}</p>
            <p>Credits</p>
            {credits?.cast?.slice(0, 10)?.map((item,i)=>(
                <span key={i}>{` ${item?.original_name}, `}</span>
            ))}
            <span>{credits?.cast?.length>=10 && `and ${credits?.cast?.length-10} more`}</span>
        </div>
    );
};

export default Detail;