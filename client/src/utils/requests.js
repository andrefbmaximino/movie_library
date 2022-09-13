import axios from 'axios';


export function getDataFromIMDB(searchString){

    const api_key = '&apikey=45fdbed3&type=movie';

    let url = 'https://www.omdbapi.com/?s=';

    let fullURL = url + searchString.replace(" ", "+") + api_key;

    return axios({
        method: 'get',
        url: fullURL,
    });

}

export function getMovieFromIMDB(id){

    const api_key = '&apikey=45fdbed3';

    let url = 'http://www.omdbapi.com/?i=';

    let fullURL = url + id + api_key;

    return axios({
        method: 'get',
        url: fullURL,
    });

}

export function saveMovieDatabase(movie){
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let url = '/api/movies';

    
    axios.post(url, movie, config)
    .then((result) => {
        console.log(result);
        return result;
    })
    .catch((err) => {
        return "tem erro";
    })

}



