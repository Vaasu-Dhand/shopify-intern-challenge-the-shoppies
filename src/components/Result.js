import React, { useState, useEffect, useContext } from 'react';

import { Button } from 'semantic-ui-react';
import { NomineeContext } from '../Utilities/NomineeContext';
import useFadeUp from '../Utilities/useFadeUp';

const Result = ({ result, openPopup, nominees }) => {
  const [nominated, setNominated] = useState(false);

  const { addNominee, removeNominee } = useContext(NomineeContext);

  // * Check's if the current title is nominated and updates the state accordingly
  useEffect(() => {
    if (nominees === null) {
      // If there no Nominess
      setNominated(false);
    } else {
      // If there are Nominess, search through them
      result.imdbID in nominees ? setNominated(true) : setNominated(false);
    }
  }, [nominees, result]);

  const handleClick = (title) => {
    // New Title Nominated -> Add it to Local Storage
    if (!nominated) {
      setNominated(true);
      addNominee(title);
    } else {
      // Already Nominated Title -> Remove from Local Storage
      setNominated(false);
      removeNominee(title.imdbID);
    }
  };

  // FadeUp Animation Hook
  useFadeUp();

  return (
    <div className="result fadeup section">
      <div onClick={() => openPopup(result.imdbID)}>
        <img src={result.Poster} alt="" />
        <h3>{result.Title}</h3>
      </div>
      <Button
        color={nominated ? 'blue' : 'black'}
        content={nominated ? 'Nominated' : 'Nominate'}
        icon="heart"
        onClick={() => handleClick(result)}
      />
    </div>
  );
};

export default Result;
