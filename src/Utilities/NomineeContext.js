import React, { useState, createContext } from 'react';

export const NomineeContext = createContext()

export function NomineeProvier(props) {
  // Get Nominees
  let getNominees = JSON.parse(localStorage.getItem('nominations'));
  
  // Global State 
  const [nominees, setNominees] = useState(getNominees)
  
  // Add Nominees
  function addNominee(title) {
    console.log(`[React BOT]: ${title.imdbID} was added to Nominees.`);
    getNominees = { ...getNominees, [title.imdbID]: {...title, nominated: true} };
    localStorage.setItem('nominations', JSON.stringify(getNominees));
    setNominees(getNominees)
  }

  // Remove Nominees
  function removeNominee(titleID) {
    console.log(`[React BOT]: ${titleID} was removed from Nominees.`);
    delete getNominees[titleID];
    localStorage.setItem('nominations', JSON.stringify(getNominees));
    setNominees(getNominees)
  }

  return (
    <NomineeContext.Provider value={{nominees, removeNominee, addNominee}}>
      {props.children}
    </NomineeContext.Provider>
  )
}
