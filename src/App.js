import React, { useState } from 'react';
import Axios from 'axios';

import Search from './Components/Search';
import Results from './Components/Results';
import Popup from './Components/Popup';

function App() {
  // State Variables
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState({});

  const apiurl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
  const search = async (e) => {
    if (e.key === 'Enter') {
      try {
        const { data } = await Axios(apiurl + '&s=' + query);
        console.log(data);
        let results = data.Search;
        setResults(results);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openPopup = async (id) => {
    try {
      const { data } = await Axios(apiurl + '&i=' + id);
      let result = data;
      console.log(data);
      setSelected(result);  
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="App">
      <header>
        <h1>The Shoppies</h1>
      </header>
      <main>
        <Search onInput={(e) => setQuery(e.target.value)} search={search} />
        <Results results={results} openPopup={openPopup} />

        {typeof selected.Title != 'undefined' ? (
          <Popup selected={selected} closePopup={() => setSelected({})} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
