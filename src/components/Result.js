import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

const Result = ({ result, openPopup, nominatedTitles}) => {

  // ! Deleting Nomination from Modal does not change the Nominated Button in Result
  const [nominated, setNominated] = useState(false);

  // Synchronises The nominated state varibale with localStorage
  useEffect(() => {
    const titles = JSON.parse(localStorage.getItem('nominations'))
    console.log("Use Effect Triggered because Nominated List Updated");
    for (const title in titles) {
      (result.imdbID === title) ? setNominated(true) : setNominated(false)
    }
  }, [result.imdbID, nominatedTitles])

  const handleClick = (title) => {
    setNominated(!nominated);

    // * New Title Nominated -> Add it to Local Storage
    if (!nominated) {  
      console.log("I have just been nominated", title.imdbID);
      
      let nominatedTitles = JSON.parse(localStorage.getItem('nominations'));
      nominatedTitles = { ...nominatedTitles, [title.imdbID]: title };
      localStorage.setItem('nominations', JSON.stringify(nominatedTitles));
    } else {  // * Already Nominated Title -> Remove from Local Storage  
      console.log("I am No more nominated", title.imdbID);

      let nominatedTitles = JSON.parse(localStorage.getItem('nominations'));
      delete nominatedTitles[title.imdbID]
      localStorage.setItem('nominations', JSON.stringify(nominatedTitles));
    }
    
  };

  return (
    <div className="result">
      <div onClick={() => openPopup(result.imdbID)}>
        <img src={result.Poster} alt="" />
        <h3>{result.Title}</h3>
      </div>
      <Button
        color={nominated ? 'green' : 'red'}
        content={nominated ? 'NOMINATED' : 'Nominate'}
        icon="heart"
        onClick={() => handleClick(result)}
      />
    </div>
  );
};

export default Result;
