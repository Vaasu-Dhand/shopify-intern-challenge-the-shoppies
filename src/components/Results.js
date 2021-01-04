import React from 'react';
import Result from './Result';

const Results = ({ results, openPopup }) => {

  let nominatedTitles = JSON.parse(localStorage.getItem('nominations'));
  return (
    <section className="results">
      {results.map((result) => (
        <Result result={result} key={result.imdbID} openPopup={openPopup} nominatedTitles={nominatedTitles} />
      ))}
    </section>
  );
};

export default Results;
