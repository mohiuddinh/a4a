import React, { useState, useRef, useEffect } from "react";
import Header from "./Header.js";
import "../../css/Home.css";
import { post } from "../../utilities.js";
import M from "materialize-css";
import { Link, navigate } from "@reach/router";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import NoResults from './NoResults.js'; 
import SearchResults from './SearchResults.js'; 
import "../../css/Post.css";

function Home() {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [QuestionDetails, setQuestionDetails] = useState([]);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const fetchUsers = (query) => {
    setSearch(query);
    post("/api/search", { query: query }).then((res) => {
      console.log(res);
      if (res.length > 5) {
        setQuestionDetails(res.slice(0, 5));
      } else {
        setQuestionDetails(res);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = search.split(" ").join("+");
    console.log(newQuery);
    if (QuestionDetails.length > 0) {
      console.log(QuestionDetails);
      return navigate(`/questions/search/${newQuery}`);
    } else {
      return navigate(`/questions/noresults`);
    }
  };

  return (
    <div className="home" ref={searchModal}>
      <div className="home__search">
        <form onSubmit={handleSubmit}>
          <div className="home__searchContainer">
            <input type="submit" value="Submit" className="post__btnInput btn" required />
            <input
              type="text"
              placeholder="search..."
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <CloseIcon onClick={() => setSearch("")} className="home__icon icon-close" />
          </div>
        </form>
        <ul className="home__searchCollection">
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
                    <div className="home__searchItem">
                      <li>{item.subject}</li>
                    </div>
                  </Link>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default Home;
