import React, { useContext } from 'react';

import Result from './Result';
import NoData from '../notFound';
import { NomineeContext } from '../NomineeContext'

const Results = ({ results, openPopup }) => {

  const { nominees } = useContext(NomineeContext)

  return (
    <section className="results">
      {results ? (
        results.map((result) => (
          <Result
            result={result}
            key={result.imdbID}
            openPopup={openPopup}
            nominees={nominees}
          />
        ))
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default Results;