// const initState = {
//
// }

const initState={
    movies:[],
    currentMovie:{}
}

export default function searchReducer(state = initState, action) {

    let obj = Object.assign({},state);
    switch (action.type) {

        case 'updateMovieList':

            action.payload.map((item,index)=>{

                item.id=index
            })
            obj.movies =  (action.payload)
            return  obj//action.payload;
            break;

        case 'updateCurrentMovie':

            obj.currentMovie = (action.payload)

            return obj
            break;

        case 'addMovie':
            const movieToAdd = action.payload;

            obj.movies.push(movieToAdd);
            return obj;
        case 'removeMovie':
            const id = action.payload;
            obj.movies = obj.movies.filter(movie => movie.id !== id);
            return obj
        case 'updateMovie':

            const movie = action.payload;

            const filteredState = obj.movies.filter(_movie => _movie.id !== movie.id);

            obj.movies = [...filteredState, movie];


            return obj
        default:
            return obj;
    }
}