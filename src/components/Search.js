import React, { Component } from 'react';

const Search = ({ onInput, search }) => {
    return ( 
        <section className="searchbox-wrap">
            <input 
                type="text" 
                placeholder="Search for a movie..." 
                className="searchbox" 
                onChange={onInput}
                onKeyPress={search}
            />
        </section>
     );
}
 
export default Search;