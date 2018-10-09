


import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {


 constructor() {
  super()

  }

  componentDidMount() {
    fetch("http://www.omdbapi.com/?s=inception&apikey=ebfb52b7")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="App">
      <h1>Hello world</h1>

      
        
      </div>
    );
  }
}

export default App;
