import React from 'react'; 
import SearchBar from './SearchBar.js'; 

function NoResults() {
  return (
    <div>
      <SearchBar url='search' />
      No Results
    </div>
  )
}

export default NoResults;