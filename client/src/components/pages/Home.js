import React, { useState, useRef, useEffect } from "react";
import Header from './Header.js';
import "../../css/Home.css";
import { post } from '../../utilities.js'; 
import M from 'materialize-css'; 
import { Link } from '@reach/router';

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
      //console.log(res); 
      setQuestionDetails(res); 
    }
    )}

    return (
      <div id="modal1" class="modal" ref={searchModal} style={{ color: "black" }}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {QuestionDetails ? 
            QuestionDetails.map((item) => {
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
            }) : null }
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
