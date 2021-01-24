import SearchBar from './SearchBar'; 
import React, { Component } from 'react'; 

class Home extends Component{
  render() {
    return (
      <div>
        <SearchBar url="search" />
      </div>
    );
  }
}

export default Home; 