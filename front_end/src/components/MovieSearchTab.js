import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const GET_MOVIE_BY_NAME = gql`
    query Getmovie($moviename:String!){
    movie(name:$moviename){
    name
    genre
    year
    }
    }
`



const MovieSearchTab = () => {
    const [movieSearchDAta,setMovieSearchDat]= useState('')
    const [message,setMessage] = useState()
    const [getMovie,{data,loading,error }]= useLazyQuery(GET_MOVIE_BY_NAME)
    const handleSubmitFun = ()=>{
        if(!movieSearchDAta.trim()){
            setMessage("Please Enter movie name!")
        }else{
            getMovie({ variables: { moviename: movieSearchDAta } });
        }

    }
    // if(data)console.log(data)
    // if(loading)console.log("loading...")

    if(error)console.log(error,"error")

  return (
    <div>
        <input type='text' placeholder='Enter movie name' onChange={(e)=>setMovieSearchDat(e.target.value)}/>
        <button onClick={handleSubmitFun}>Submit</button>
        <div>
            {loading && <div>Loading ...</div>}
            {data && (<div>
                <h2>Movie:{data.movie.name}</h2>
                <h3>Genre:{data.movie.genre}</h3>
                <h3>year:{data.movie.year}</h3>

                </div>)}
        </div>
        {message && <div>{message}</div>}
      
    </div>
  )
}

export default MovieSearchTab
