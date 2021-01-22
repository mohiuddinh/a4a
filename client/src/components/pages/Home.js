import React, { useState, useRef, useEffect } from "react";
import Header from "./Header.js";
import "../../css/Home.css";
import { post } from "../../utilities.js";
import M from "materialize-css";
import { Link } from "@reach/router";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

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
      //console.log(res);
      setQuestionDetails(res);
    });
  };

  return (
    <div className="home" ref={searchModal}>
      <div className="home__search">
        <form>
          <div className="home__searchContainer">
            <SearchIcon className="home__icon" />
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
