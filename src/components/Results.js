import React from 'react';
import Result from './Result';
import NoData from '../notFound';

const Results = ({ results, openPopup }) => {
  console.log(results);

  let nominatedTitles = JSON.parse(localStorage.getItem('nominations'));
  return (
    <section className="results">
      {results ? (
        results.map((result) => (
          <Result
            result={result}
            key={result.imdbID}
            openPopup={openPopup}
            nominatedTitles={nominatedTitles}
          />
        ))
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default Results;
