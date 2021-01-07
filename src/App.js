import React, { useState } from 'react';
import Axios from 'axios';
import { Segment } from 'semantic-ui-react';

import { Search, Results, Popup, Modal } from './Components/index';
import { NomineeProvier } from './Utilities/NomineeContext';

function App() {
  // State Variables
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState({});

  const apiurl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
  const search = async (e) => {
    if (e.key === 'Enter') {
      try {
        const { data } = await Axios(apiurl + '&s=' + query);
        if (data.Response === 'True') {
          // Results Found
          let results = data.Search;
          setResults(results);
        } else {
          // No Results Found
          setResults(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openPopup = async (id) => {
    try {
      const { data } = await Axios(apiurl + '&i=' + id);
      let result = data;
      setSelected(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <NomineeProvier>
        <header>
          <h1 onClick={() => window.location.reload()}>The Shoppies</h1>
          <Modal />
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
      </NomineeProvier>
      <Segment raised padded textAlign="center" size="large">
        <a
          href="https://www.linkedin.com/in/vaasu-dhand-520747191/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vaasu Dhand's 
        </a> {' '}
        Entry for Shopify Front End Dev Challenge
      </Segment>
    </div>
  );
}

export default App;
