import React, { useState } from 'react';
import Axios from 'axios';

import Search from './components/Search';
import Results from './components/Results'
import Popup from './components/Popup';

function App() {
  // handleInput = handleInput.bind(this);  //Writing this or not dosen't change anything
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  })
  const apiurl = 'http://www.omdbapi.com/?apikey=ad5bdfd0';
  const search = (e) => {
    if (e.key === 'Enter') {
      Axios(apiurl + '&s=' + state.s)
      .then(({ data }) => {
        console.log(data)
        let results = data.Search;
        setState(prevState => {
          return { ...prevState, results }
        })
      })
      .catch(e => {
        console.log(e)
      })
      
    }
  }

  function handleInput(e) {  //Works even without arrow function declaration
    let s = e.target.value; //User's search value
    setState(prevState => {
      return {...prevState, s}
    });
  }

  const openPopup = id => {
    Axios(apiurl + '&i=' + id)
    .then(({data}) => {
      let result = data;
      console.log(data);
      setState(prevState => {
        return {...prevState, selected: result}
      })
    })
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected: {}}
    })
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search onInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />
      
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
