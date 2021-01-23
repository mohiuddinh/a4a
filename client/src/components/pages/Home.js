import React, { useState, useRef, useEffect } from "react";
import Header from './Header.js';
import "../../css/Home.css";
import { post } from '../../utilities.js'; 
import M from 'materialize-css'; 
import { Link, navigate } from '@reach/router';
import uuid from 'react-uuid'; 
import "../../css/Post.css";
import NoResults from './NoResults.js'; 
import SearchResults from './SearchResults.js'; 

function Home() {
  const searchModal = useRef(null); 
  const [search, setSearch] = useState(''); 
  const [QuestionDetails, setQuestionDetails] = useState([])

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const fetchUsers = (query) => {
    setSearch(query); 
    post('/api/search', { query: query }).then((res)=>{
      console.log(res); 
      if(res.length > 5){
        setQuestionDetails(res.slice(0, 5))
      } else {
      setQuestionDetails(res);
      } 
    }
    )}

    const handleSubmit = (e) => {
      e.preventDefault(); 
      const newQuery = search.split(" ").join("+");
      console.log(newQuery);  
      if (QuestionDetails.length > 0) {
        console.log(QuestionDetails)
        return (
          navigate(`/questions/search/${newQuery}`)
        )
    } else {
      return (
        navigate(`/questions/noresults`)
      )
    }
  }

    return (
      <div id="modal1" className="modal" ref={searchModal} style={{ color: "black" }}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search users"
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <input type="submit" value="Submit" className="post__btnInput btn" required />
          </form>
          <ul className="collection">
            {QuestionDetails
              ? QuestionDetails.map((item) => {
                  return (
                    <Link
                      to={`/questions/${item._id}`}
                      onClick={() => {
                        M.Modal.getInstance(searchModal.current).close();
                        setSearch("");
                      }}
                    >
                      <li className="collection-item">{item.subject}</li>
                    </Link>
                  );
                })
              : null}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
    );
  }


export default Home;
