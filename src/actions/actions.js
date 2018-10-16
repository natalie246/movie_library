//
// export function search(query) {
//     return function (dispatch, getState) {
//         return fetch(conf.API + 'search/shows?q=:' + query + '/')
//             .then(res => res.json())
//             .then(shows => {
//                 dispatch({type: 'SEARCH_MOVIES', search: shows});
//             })
//             .catch(error => {
//                 throw(error);
//             });
//     };
// }


export const updateMovieList = (movies) => {
    console.log("updateMovieList movies:");

    return {
        type: 'updateMovieList',
        payload: movies
    }
};

export const updateCurrentMovie = (movie) => {
    console.log("updateCurrentMovie movie:");

    return {
        type: 'updateCurrentMovie',
        payload: movie
    }
};


export const updateMovie = (movie) => {
    console.log("updateMovie movie:");
    console.log(movie);

    return {
        type: 'updateMovie',
        payload: movie
    }
};



export const removeMovie = (id) => {
    console.log("removeMovie movie:"+id);
    console.log(id);

    return {
        type: 'removeMovie',
        payload: id
    }
};


export const addMovie = (movie) => {
    console.log("add movie:");
    console.log(movie);

    return {
        type: 'addMovie',
        payload: movie
    }
};