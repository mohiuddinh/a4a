import React from "react";
import SearchBar from "./SearchBar.js";

import "../../css/NoResults.css";

function NoResults() {
  return (
    <div className="noResults">
      <SearchBar url="search" />
      <div className="noResults__container">
        <h5>No Results</h5>
      </div>
    </div>
  );
}

export default NoResults;
