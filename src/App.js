import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, { Component } from 'react';
import './App.css';
import {updateMovieList} from './actions/actions'
import {updateCurrentMovie} from './actions/actions'
import {updateMovie} from './actions/actions'
import {removeMovie} from './actions/actions'
import {addMovie} from './actions/actions'
import {Modal} from 'react-bootstrap';

const fetchCall = (url) => {
    return fetch(url)
        .then(res => res.json());
};

// todo: 1. after mount fetching the movies
// todo: 2. store the movies in the app state
// todo: 3. create movies list component
// todo: 4. pass 'movies' state from APP to Movies component
// todo: 5. Movies component renders list of movies each movie should also contain
// todo: a "remove" and "update" options: {movie_name .... remove / update}
// todo: 6. remove should dispatch "REMOVE_MOVIE" action with passing id as payload
// todo: 7. clickng "update" should open modal as edit form with "save" button
// todo: 8. clicking on save should resolve to dispatch "UPDATE MOVIE"


class App extends Component {

 constructor() {
  super()

     this.state={
         showModal: false,
         showDeleteModal: false,
         showAddModal:false,
         newMovie:{},
         currentTitle:'',
         currentYear:'',
         currentRuntime:'',
         currentDirector:'',
         currentGenre:'',
     }
  }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentMovie !== nextProps.currentMovie) {

            this.setState({currentMovie:nextProps.currentMovie})
        }
    }

    close=()=> {
        this.setState({ showModal: false });
    }

    open=(id)=> {
        this.setState({ showModal: true, id });
    }

    closeDelete=()=> {
        this.setState({ showModal: false });
    }

    openDelete=(id)=> {
        this.setState({ showModal: true, id });
    }

    closeAdd=()=> {
        this.setState({ showModal: false });
    }

    openAdd=(id)=> {
        this.setState({ showModal: true, id });
    }

 componentDidMount() {

     // let movies =  [
     //     {"Title":"Batman Begins",
     //         "Year":"2005","Rated":"PG-13",
     //         "Released":"15 Jun 2005",
     //         "Runtime":"140 min",
     //         "Genre":"Action, Adventure"
     //         ,"Director":"Christopher Nolan",
     //         "Writer":"Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
     //         "Actors":"Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
     //         "Plot":"After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
     //         "Language":"English, Urdu, Mandarin",
     //         "Country":"USA, UK",
     //         "Awards":"Nominated for 1 Oscar. Another 14 wins & 72 nominations.",
     //         "Poster":"https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
     //         "Ratings":[
     //             {"Source":"Internet Movie Database","Value":"8.3/10"},
     //             {"Source":"Rotten Tomatoes","Value":"84%"},
     //             {"Source":"Metacritic","Value":"70/100"}
     //         ],"Metascore":"70",
     //         "imdbRating":"8.3",
     //         "imdbVotes":"1,145,761",
     //         "imdbID":"tt0372784",
     //         "Type":"movie",
     //         "DVD":"18 Oct 2005",
     //         "BoxOffice":"$204,100,000",
     //         "Production":"Warner Bros. Pictures",
     //         "Website":"http://www.batmanbegins.com/",
     //         "Response":"True"},
     //     {"Title":"Batman v Superman: Dawn of Justice","Year":"2016","Rated":"PG-13","Released":"25 Mar 2016","Runtime":"151 min","Genre":"Action, Adventure, Fantasy","Director":"Zack Snyder","Writer":"Chris Terrio, David S. Goyer, Bob Kane (Batman created by), Bill Finger (Batman created by), Jerry Siegel (Superman created by), Joe Shuster (Superman created by), William Moulton Marston (character created by: Wonder Woman)","Actors":"Ben Affleck, Henry Cavill, Amy Adams, Jesse Eisenberg","Plot":"Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.","Language":"English","Country":"USA","Awards":"14 wins & 30 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.6/10"},{"Source":"Rotten Tomatoes","Value":"27%"},{"Source":"Metacritic","Value":"44/100"}],"Metascore":"44","imdbRating":"6.6","imdbVotes":"547,392","imdbID":"tt2975590","Type":"movie","DVD":"19 Jul 2016","BoxOffice":"$293,792,936","Production":"Warner Bros. Pictures","Website":"http://www.facebook.com/batmanvsuperman","Response":"True"},{"Title":"Batman","Year":"1989","Rated":"PG-13","Released":"23 Jun 1989","Runtime":"126 min","Genre":"Action, Adventure","Director":"Tim Burton","Writer":"Bob Kane (Batman characters), Sam Hamm (story), Sam Hamm (screenplay), Warren Skaaren (screenplay)","Actors":"Michael Keaton, Jack Nicholson, Kim Basinger, Robert Wuhl","Plot":"The Dark Knight of Gotham City begins his war on crime with his first major enemy being the clownishly homicidal Joker.","Language":"English, French, Spanish","Country":"USA, UK","Awards":"Won 1 Oscar. Another 8 wins & 26 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"72%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"7.6","imdbVotes":"302,842","imdbID":"tt0096895","Type":"movie","DVD":"25 Mar 1997","BoxOffice":"N/A","Production":"Warner Bros. Pictures","Website":"N/A","Response":"True"},{"Title":"Batman Returns","Year":"1992","Rated":"PG-13","Released":"19 Jun 1992","Runtime":"126 min","Genre":"Action, Crime, Fantasy","Director":"Tim Burton","Writer":"Bob Kane (Batman characters), Daniel Waters (story), Sam Hamm (story), Daniel Waters (screenplay)","Actors":"Michael Keaton, Danny DeVito, Michelle Pfeiffer, Christopher Walken","Plot":"When a corrupt businessman and the grotesque Penguin plot to take control of Gotham City, only Batman can stop them, while the Catwoman has her own agenda.","Language":"English","Country":"USA, UK","Awards":"Nominated for 2 Oscars. Another 2 wins & 27 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.0/10"},{"Source":"Rotten Tomatoes","Value":"79%"},{"Source":"Metacritic","Value":"68/100"}],"Metascore":"68","imdbRating":"7.0","imdbVotes":"243,674","imdbID":"tt0103776","Type":"movie","DVD":"29 Apr 1997","BoxOffice":"N/A","Production":"Warner Bros. Pictures","Website":"N/A","Response":"True"},{"Title":"Batman Forever","Year":"1995","Rated":"PG-13","Released":"16 Jun 1995","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"Joel Schumacher","Writer":"Bob Kane (characters), Lee Batchler (story), Janet Scott Batchler (story), Lee Batchler (screenplay), Janet Scott Batchler (screenplay), Akiva Goldsman (screenplay)","Actors":"Val Kilmer, Tommy Lee Jones, Jim Carrey, Nicole Kidman","Plot":"Batman must battle former district attorney Harvey Dent, who is now Two-Face and Edward Nygma, The Riddler with help from an amorous psychologist and a young circus acrobat who becomes his sidekick, Robin.","Language":"English","Country":"USA, UK","Awards":"Nominated for 3 Oscars. Another 10 wins & 22 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNWY3M2I0YzItNzA1ZS00MzE3LThlYTEtMTg2YjNiOTYzODQ1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.4/10"},{"Source":"Rotten Tomatoes","Value":"39%"},{"Source":"Metacritic","Value":"51/100"}],"Metascore":"51","imdbRating":"5.4","imdbVotes":"213,498","imdbID":"tt0112462","Type":"movie","DVD":"27 Aug 1997","BoxOffice":"N/A","Production":"Warner Bros. Pictures","Website":"N/A","Response":"True"},{"Title":"Batman & Robin","Year":"1997","Rated":"PG-13","Released":"20 Jun 1997","Runtime":"125 min","Genre":"Action, Sci-Fi","Director":"Joel Schumacher","Writer":"Bob Kane (Batman characters), Akiva Goldsman","Actors":"Arnold Schwarzenegger, George Clooney, Chris O'Donnell, Uma Thurman","Plot":"Batman and Robin try to keep their relationship together even as they must stop Mr. Freeze and Poison Ivy from freezing Gotham City.","Language":"English","Country":"USA, UK","Awards":"10 wins & 21 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"3.7/10"},{"Source":"Rotten Tomatoes","Value":"10%"},{"Source":"Metacritic","Value":"28/100"}],"Metascore":"28","imdbRating":"3.7","imdbVotes":"210,681","imdbID":"tt0118688","Type":"movie","DVD":"21 Oct 1997","BoxOffice":"N/A","Production":"Warner Home Video","Website":"N/A","Response":"True"},{"Title":"The Lego Batman Movie","Year":"2017","Rated":"PG","Released":"10 Feb 2017","Runtime":"104 min","Genre":"Animation, Action, Comedy","Director":"Chris McKay","Writer":"Seth Grahame-Smith (screenplay by), Chris McKenna (screenplay by), Erik Sommers (screenplay by), Jared Stern (screenplay by), John Whittington (screenplay by), Seth Grahame-Smith (story by), Bob Kane (Batman created by), Bill Finger (Batman created by), Jerry Siegel (Superman created by), Joe Shuster (Superman created by), William Moulton Marston (Wonder Woman created by), Ole Kirk Christiansen (based on LEGO Construction Toys created by), Godtfred Kirk Christiansen (based on LEGO Construction Toys created by), Jens Nygaard Knudsen (based on LEGO Construction Toys created by)","Actors":"Will Arnett, Michael Cera, Rosario Dawson, Ralph Fiennes","Plot":"A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.","Language":"English","Country":"USA, Denmark","Awards":"11 wins & 58 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"90%"},{"Source":"Metacritic","Value":"75/100"}],"Metascore":"75","imdbRating":"7.3","imdbVotes":"104,387","imdbID":"tt4116284","Type":"movie","DVD":"13 Jun 2017","BoxOffice":"$175,686,290","Production":"Warner Bros. Pictures","Website":"http://www.legobatman.com/","Response":"True"},{"Title":"Batman: The Animated Series","Year":"1992–1995","Rated":"TV-PG","Released":"05 Sep 1992","Runtime":"23 min","Genre":"Animation, Action, Adventure, Family, Sci-Fi","Director":"N/A","Writer":"Bill Finger, Bob Kane, Eric Radomski, Bruce Timm, Paul Dini","Actors":"Kevin Conroy, Efrem Zimbalist Jr., Robert Hastings","Plot":"The Dark Knight battles crime in Gotham City with occasional help from Robin and Batgirl.","Language":"English","Country":"USA","Awards":"Won 1 Primetime Emmy. Another 3 wins & 19 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNzI5OWU0MjYtMmMwZi00YTRiLTljMDAtODQ0ZGYxMDljN2E0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.9/10"}],"Metascore":"N/A","imdbRating":"8.9","imdbVotes":"69,445","imdbID":"tt0103359","Type":"series","totalSeasons":"4","Response":"True"},{"Title":"Batman: Under the Red Hood","Year":"2010","Rated":"PG-13","Released":"27 Jul 2010","Runtime":"75 min","Genre":"Animation, Action, Crime","Director":"Brandon Vietti","Writer":"Judd Winick, Bob Kane (Batman created by)","Actors":"Bruce Greenwood, Jensen Ackles, John DiMaggio, Neil Patrick Harris","Plot":"There's a mystery afoot in Gotham City, and Batman must go toe-to-toe with a mysterious vigilante, who goes by the name of Red Hood. Subsequently, old wounds reopen and old, once buried memories come into the light.","Language":"English","Country":"USA","Awards":"1 nomination.","Poster":"https://m.media-amazon.com/images/M/MV5BYTdlODI0YTYtNjk5ZS00YzZjLTllZjktYmYzNWM4NmI5MmMxXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"},{"Source":"Rotten Tomatoes","Value":"100%"}],"Metascore":"N/A","imdbRating":"8.1","imdbVotes":"46,567","imdbID":"tt1569923","Type":"movie","DVD":"27 Jul 2010","BoxOffice":"N/A","Production":"WARNER BROTHERS PICTURES","Website":"N/A","Response":"True"},{"Title":"Batman: The Dark Knight Returns, Part 1","Year":"2012","Rated":"PG-13","Released":"25 Sep 2012","Runtime":"76 min","Genre":"Animation, Action, Adventure","Director":"Jay Oliva","Writer":"Bob Kane (character created by: Batman), Frank Miller (comic book), Klaus Janson (comic book), Bob Goodman","Actors":"Peter Weller, Ariel Winter, David Selby, Wade Williams","Plot":"Batman has not been seen for ten years. A new breed of criminal ravages Gotham City, forcing 55-year-old Bruce Wayne back into the cape and cowl. But, does he still have what it takes to fight crime in a new era?","Language":"English","Country":"USA","Awards":"5 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"100%"}],"Metascore":"N/A","imdbRating":"8.0","imdbVotes":"44,837","imdbID":"tt2313197","Type":"movie","DVD":"25 Sep 2012","BoxOffice":"N/A","Production":"WARNER BROTHERS PICTURES","Website":"https://www.facebook.com/BatmanTheDarkKnightReturns","Response":"True"}];

     // JSON.parse('[{"Title":"Inception","Year":"2010","Rated":"PG-13","Released":"16 Jul 2010","Runtime":"148 min","Genre":"Action, Adventure, Sci-Fi","Director":"Christopher Nolan","Writer":"Christopher Nolan","Actors":"Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy","Plot":"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.","Language":"English, Japanese, French","Country":"USA, UK","Awards":"Won 4 Oscars. Another 152 wins & 204 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.8/10"},{"Source":"Rotten Tomatoes","Value":"86%"},{"Source":"Metacritic","Value":"74/100"}],"Metascore":"74","imdbRating":"8.8","imdbVotes":"1,745,967","imdbID":"tt1375666","Type":"movie","DVD":"07 Dec 2010","BoxOffice":"$292,568,851","Production":"Warner Bros. Pictures","Website":"http://inceptionmovie.warnerbros.com/","Response":"True"},{"Title":"Inception: The Cobol Job","Year":"2010","Rated":"N/A","Released":"07 Dec 2010","Runtime":"15 min","Genre":"Animation, Short, Sci-Fi","Director":"Ian Kirby","Writer":"Christopher Nolan (based on characters by)","Actors":"Leonardo DiCaprio, Joseph Gordon-Levitt, Lukas Haas","Plot":"This Inception prequel unfolds courtesy of a beautiful Motion Comic, and explains how Cobb, Arthur and Nash were enlisted by Cobol Engineering. Diehard fans of the film will be especially interested in this one.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BMjE0NGIwM2EtZjQxZi00ZTE5LWExN2MtNDBlMjY1ZmZkYjU3XkEyXkFqcGdeQXVyNjMwNzk3Mjk@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.8/10"}],"Metascore":"N/A","imdbRating":"7.8","imdbVotes":"1,138","imdbID":"tt5295894","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Inception: Motion Comics","Year":"2010–","Rated":"N/A","Released":"07 Dec 2010","Runtime":"14 min","Genre":"Action","Director":"N/A","Writer":"N/A","Actors":"N/A","Plot":"The prequel to \\"Inception\\" follows Cobb and Arthur as they are assigned and must work through an important extraction, The Cobol Job.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNGRkYzkzZmEtY2YwYi00ZTlmLTgyMTctODE0NTNhNTVkZGIxXkEyXkFqcGdeQXVyNjE4MDMwMjk@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"}],"Metascore":"N/A","imdbRating":"7.6","imdbVotes":"567","imdbID":"tt1790736","Type":"series","totalSeasons":"N/A","Response":"True"},{"Title":"Inception: 4Movie Premiere Special","Year":"2010","Rated":"N/A","Released":"16 Jul 2010","Runtime":"N/A","Genre":"Documentary","Director":"Steve Kemsley","Writer":"Steven Vinacour","Actors":"Rick Edwards","Plot":"N/A","Language":"English","Country":"UK","Awards":"N/A","Poster":"N/A","Ratings":[{"Source":"Internet Movie Database","Value":"7.2/10"}],"Metascore":"N/A","imdbRating":"7.2","imdbVotes":"21","imdbID":"tt1686778","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"WWA: The Inception","Year":"2001","Rated":"N/A","Released":"26 Oct 2001","Runtime":"N/A","Genre":"N/A","Director":"N/A","Writer":"Jeremy Borash","Actors":"Bret Hart, Jeff Jarrett, Brian James, David Heath","Plot":"N/A","Language":"English","Country":"Australia","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BNTEyNGJjMTMtZjZhZC00ODFkLWIyYzktN2JjMTcwMmY5MDJlXkEyXkFqcGdeQXVyNDkwMzY5NjQ@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.0/10"}],"Metascore":"N/A","imdbRating":"6.0","imdbVotes":"20","imdbID":"tt0311992","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Inception","Year":"2014","Rated":"N/A","Released":"01 Feb 2014","Runtime":"11 min","Genre":"Short, Drama, Mystery","Director":"Danial Hajibarat","Writer":"Danial Hajibarat","Actors":"Erfan Refahatnia","Plot":"Young man wants to do something important,It has a lot of risk for him But he must make a decision,Though everyone around them opposes doing so,The boy decides that...","Language":"Persian","Country":"Iran","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYWJmYWJmNWMtZTBmNy00M2MzLTg5ZWEtOGU5ZWRiYTE0ZjVmXkEyXkFqcGdeQXVyNzkyOTM2MjE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"10.0/10"}],"Metascore":"N/A","imdbRating":"10.0","imdbVotes":"14","imdbID":"tt7321322","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Inception: In 60 Seconds","Year":"2013","Rated":"N/A","Released":"22 Mar 2013","Runtime":"N/A","Genre":"Short, Comedy","Director":"Nadav Elovic, Ben Oringer","Writer":"Nadav Elovic (screenplay), Ben Oringer (screenplay)","Actors":"Nadav Elovic, Omer Goldberg, Ben Oringer","Plot":"N/A","Language":"English","Country":"Israel","Awards":"N/A","Poster":"N/A","Ratings":[{"Source":"Internet Movie Database","Value":"5.1/10"}],"Metascore":"N/A","imdbRating":"5.1","imdbVotes":"12","imdbID":"tt3262402","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"On Inception (TOI and MOI)","Year":"2011","Rated":"N/A","Released":"07 Feb 2011","Runtime":"9 min","Genre":"Short","Director":"Alex Pop","Writer":"Alex Pop","Actors":"Can Babatas, Liem Duong, Betrizha Pendo, Alex Pop","Plot":"The film features interviews on Christopher Nolan\'s \\"Inception\\" and its Academy nominations just a few days before the awards.","Language":"English","Country":"Canada","Awards":"N/A","Poster":"N/A","Ratings":[{"Source":"Internet Movie Database","Value":"8.9/10"}],"Metascore":"N/A","imdbRating":"8.9","imdbVotes":"7","imdbID":"tt4341988","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Needle Drop Inception","Year":"2016","Rated":"N/A","Released":"15 Apr 2016","Runtime":"N/A","Genre":"Short, Drama","Director":"Patrick Barbeau","Writer":"Christopher Nickerson, Cody Airth-Fisher, Patrick Barbeau, Christopher Nickerson (story by)","Actors":"Christopher Tyson, Paul Burke, Ksenia Thurgood, Satine Scarlett Montaz","Plot":"One night Scott Rydell falls for a beautiful young woman, who would introduce him to the powerful drug known as \\" THE DRAGON \\". Unbeknownst to Scott, this would unleash the beginning of his...","Language":"English","Country":"Canada","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BNzJkYmU4MzUtN2ZhOS00MWYzLWI4YTUtNTQ3MWJkZGQ4ZTliXkEyXkFqcGdeQXVyMTIxMzc3MDQ@._V1_SX300.jpg","Ratings":[],"Metascore":"N/A","imdbRating":"N/A","imdbVotes":"N/A","imdbID":"tt4650070","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"},{"Title":"Inception of a lost Art","Year":"2013","Rated":"N/A","Released":"01 Aug 2013","Runtime":"147 min","Genre":"Drama, Mystery, Thriller","Director":"Tushar Tyagi","Writer":"Tushar Tyagi (story), Tushar Tyagi","Actors":"Alexia Jordan, Philip Lombardo","Plot":"A mysterious man of a certain age, challenges a woman to his art. A world very much unseen, is only answered by the beginning of like-minded thoughts.","Language":"English","Country":"USA","Awards":"N/A","Poster":"N/A","Ratings":[],"Metascore":"N/A","imdbRating":"N/A","imdbVotes":"N/A","imdbID":"tt3563778","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}]')
     // console.log(movies)

     // this.props.updateMovieList(movies)

     // todo: use axsios
    fetch("http://www.omdbapi.com/?s=batman&apikey=ebfb52b7")
      .then(res => res.json())
      .then(
        (result) => {
            const { Search } = result;
            const calls = [];
            Search.forEach(item => {
                calls.push(fetchCall(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=ebfb52b7`));
            });
            Promise.all(calls)
                .then(movies => {
                // console.log(JSON.stringify(movies));
                    this.props.updateMovieList(movies)
                // data to save in state
            }).catch(err => console.log(err));
        }
      )
  }
    editMovie(movie,Title, Year, Runtime, Director, Genre){

        let currentMovie = {...this.state.currentMovie}

        if(Title!==''){
            currentMovie.Title=Title
        }
        if(Year!=='') {
            currentMovie.Year = Year
        }
        if(Runtime!=='') {
            currentMovie.Runtime = Runtime
        }
        if(Director!=='') {
            currentMovie.Director = Director
        }
        if(Genre!=='') {
            currentMovie.Genre = Genre
        }
        this.setState({currentMovie})

        this.props.updateMovie(currentMovie)
        this.setState({showModal:false})
    }

    DeleteMovie(id){

        this.props.removeMovie(id)
        this.setState({showDeleteModal:false})
    }

    addNewMovie(){

        console.log('movie')
        console.log(this.state.newMovie)
        // let newMovie={...this.state.newMovie}
        // console.log(newMovie)
        let movie = {"Title":"Batman v Superman: Dawn of Justice","Year":"2016","Rated":"PG-13","Released":"25 Mar 2016","Runtime":"151 min","Genre":"Action, Adventure, Fantasy","Director":"Zack Snyder","Writer":"Chris Terrio, David S. Goyer, Bob Kane (Batman created by), Bill Finger (Batman created by), Jerry Siegel (Superman created by), Joe Shuster (Superman created by), William Moulton Marston (character created by: Wonder Woman)","Actors":"Ben Affleck, Henry Cavill, Amy Adams, Jesse Eisenberg","Plot":"Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.","Language":"English","Country":"USA","Awards":"14 wins & 30 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.6/10"},{"Source":"Rotten Tomatoes","Value":"27%"},{"Source":"Metacritic","Value":"44/100"}],"Metascore":"44","imdbRating":"6.6","imdbVotes":"547,392","imdbID":"tt2975590","Type":"movie","DVD":"19 Jul 2016","BoxOffice":"$293,792,936","Production":"Warner Bros. Pictures","Website":"http://www.facebook.com/batmanvsuperman","Response":"True","id":1}
        this.props.addMovie(movie)
        this.setState({showAddModal:false})

    }

    renderList() {

        return this.props.movies.map((movie,i) => {

            return (
                <li style={{listStyle:'none'}}
                    key={'user'+i}>
                    <img width='20px'  src={movie.Poster} />
                    {movie.Title}
                    Year: {movie.Year}
                    Runtime: {movie.Runtime}
                    Director: {movie.Director}
                    Genre: {movie.Genre}
                    <button onClick={e=>{
                        this.setState({showModal:true})
                        this.props.updateCurrentMovie(movie)
                    }
                    }>Edit</button>

                    <button onClick={e=>{
                        this.setState({showDeleteModal:true})
                        this.props.updateCurrentMovie(movie)
                    }

                    }>Delete</button>
                </li>
            );
        });
    }

  render() {

      const modalStyle = {
          position: 'fixed',
          zIndex: 1040,
          top: 0, bottom: 0, left: 0, right: 0
      };

      const backdropStyle = {
          ...modalStyle,
          zIndex: 'auto',
          backgroundColor: '#000',
          opacity: 0.5
      };

      const dialogStyle = function() {

          let top = 50
          let left = 50

          return {
              position: 'absolute',
              width: 400,
              top: top + '%', left: left + '%',
              transform: `translate(-${top}%, -${left}%)`,
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
              boxShadow: '0 5px 15px rgba(0,0,0,.5)',
              padding: 20
          };
      };

    return (
      <div className="App">
        <h1>Movie Library</h1>

          <button onClick={e=>{
              e.preventDefault()
              this.setState({showAddModal:true})

          }}>Add Movie</button>

          <Modal
              aria-labelledby='modal-label'
              style={modalStyle}
              backdropStyle={backdropStyle}
              show={this.state.showAddModal}
              onHide={this.closeAdd}
          >
              <div style={dialogStyle()} >
                  <h4 id='modal-label'>Movie Details:</h4>

                  <form >

                      <div style={{marginBottom:'10px'}}>
                          <label>Title:</label>
                          <input required={true} type={'text'} defaultValue={this.props.currentMovie.Title}
                                 onBlur={(e)=>
                                 {this.setState({newMovie: {
                                         ...this.state.newMovie,
                                         Title: e.target.value}})}

                                 }></input>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                          <label>Year:</label>
                          <input required={true} type={'text'} defaultValue={this.props.currentMovie.Year}
                                 onBlur={(e)=> {this.setState({newMovie: {
                                         ...this.state.newMovie,
                                         Year: e.target.value}})}}
                          ></input>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                          <label>Runtime:</label>
                          <input required={true} type={'text'} defaultValue={this.props.currentMovie.Runtime}
                                 onBlur={(e)=> {this.setState({newMovie: {
                                         ...this.state.newMovie,
                                         Runtime: e.target.value}})}}
                          ></input>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                          <label>Director:</label>
                          <input required={true} type={'text'} defaultValue={this.props.currentMovie.Director}
                                 onBlur={(e)=> {this.setState({newMovie: {
                                         ...this.state.newMovie,
                                         Director: e.target.value}})}}
                          ></input>
                      </div>
                      <div>
                          <label>Genre:</label>
                          <input required={true} type={'text'} defaultValue={this.props.currentMovie.Genre}
                                 onBlur={(e)=> {this.setState({newMovie: {
                                         ...this.state.newMovie,
                                         Genre: e.target.value}})}}
                          ></input>
                          <button onClick={(e)=>{
                              e.preventDefault()
                              this.addNewMovie()
                          }}>Add Movie</button>
                      </div>
                  </form>

              </div>
          </Modal>
          {this.props.movies.length>0&&
          <ul>
              {this.renderList()}
          </ul>
          }

          <Modal
              aria-labelledby='modal-label'
              style={modalStyle}
              backdropStyle={backdropStyle}
              show={this.state.showModal}
              onHide={this.close}
          >
              <div style={dialogStyle()} >
                  <h4 id='modal-label'>Movie details:</h4>
                  {/*onSubmit={this.editMovie()}*/}
                  <form >

                      <div style={{marginBottom:'10px'}}>
                          <label>Title:</label>
                          <input type={'text'} defaultValue={this.props.currentMovie.Title}
                                 onBlur={(e)=>
                                 {this.setState({currentTitle:e.target.value})}}></input>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                          <label>Year:</label>
                          <input type={'text'} defaultValue={this.props.currentMovie.Year}
                                 onBlur={(e)=> {this.setState({currentYear:e.target.value})}}
                          ></input>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                          <label>Runtime:</label>
                          <input type={'text'} defaultValue={this.props.currentMovie.Runtime}
                                 onBlur={(e)=> {this.setState({currentRuntime:e.target.value})}}
                          ></input>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                          <label>Director:</label>
                          <input type={'text'} defaultValue={this.props.currentMovie.Director}
                                 onBlur={(e)=> {this.setState({currentDirector:e.target.value})}}
                          ></input>
                      </div>
                      <div>
                          <label>Genre:</label>
                          <input type={'text'} defaultValue={this.props.currentMovie.Genre}
                                 onBlur={(e)=> {this.setState({currentGenre:e.target.value})}}
                          ></input>
                          <button
                              onClick={e=>{
                                  e.preventDefault();
                                  this.editMovie(this.state.currentMovie,this.state.currentTitle,this.state.currentYear,this.state.currentRuntime,this.state.currentDirector,this.state.currentGenre)}}>Save</button>
                      </div>
                  </form>
              </div>
          </Modal>

          <Modal
              aria-labelledby='modal-label'
              style={modalStyle}
              backdropStyle={backdropStyle}
              show={this.state.showDeleteModal}
              onHide={this.closeDelete}
          >
              <div style={dialogStyle()} >
                  <h4 id='modal-label'>are you sure you want to delete this movie?</h4>

                  <button onClick={(e)=>{
                      e.preventDefault()
                      this.DeleteMovie(this.props.currentMovie.id)
                  }}>Delete</button>
                  <button onClick={(e)=>{
                      e.preventDefault()
                      this.setState({showDeleteModal:false}
                      )
                    }
                  }>Cancel</button>

              </div>
          </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
        movies: state.search.movies,
        currentMovie: state.search.currentMovie
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: {
        updateMovieList: bindActionCreators(updateMovieList, dispatch),
        updateCurrentMovie: bindActionCreators(updateCurrentMovie, dispatch),
        updateMovie: bindActionCreators(updateMovie, dispatch),
        removeMovie: bindActionCreators(removeMovie, dispatch),
        addMovie: bindActionCreators(addMovie, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


