import SearchBar from './SearchBar'; 
import React, { Component } from 'react'; 
import { get } from '../../utilities.js'; 

class Home extends Component{
  componentDidMount() {
    get('/api/grouped_question').then((res)=>{
      console.log(res); 
    })
  }

  render() {
    return (
      <div>
        <SearchBar url="search" />
      </div>
    );
  }
}

export default Home; 