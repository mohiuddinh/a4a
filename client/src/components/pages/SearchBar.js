import React, { useState, useRef, useEffect } from "react";
import Header from "./Header.js";
import { post } from "../../utilities.js";
import M from "materialize-css";
import { Link, navigate } from "@reach/router";
import SearchIcon from "@material-ui/icons/Search";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CloseIcon from "@material-ui/icons/Close";

import "../../css/Post.css";
import "../../css/Home.css";

//code citation: https://github.com/mukeshphulwani66/Instagram-clone-MERN-Stack/blob/master/client/src/components/Navbar.js

function SearchBar(props) {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [QuestionDetails, setQuestionDetails] = useState([]);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const fetchUsers = (query) => {
    setSearch(query);
    if (query.charAt(0) === "[" && query.charAt(query.length - 1) === "]") {
      //OUR idea + implementation with the tag search feature
      let res = query.slice(1, query.length - 1);
      let res2 = res.split(",");
      post("/api/searchtags", { query: res2 }).then((res) => {
        if (query === "") {
          setQuestionDetails([]);
        } else if (res.length > 5) {
          setQuestionDetails(res.slice(0, 5));
        } else {
          setQuestionDetails(res);
        }
      });
    } else {
      post("/api/search", { query: query }).then((res) => {
        if (query === "") {
          setQuestionDetails([]);
        } else if (res.length > 5) {
          setQuestionDetails(res.slice(0, 5));
        } else {
          setQuestionDetails(res);
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = search.split(" ").join("+"); //our idea + implementation
    if (QuestionDetails.length > 0) {
      return navigate(`/questions/${props.url}/${newQuery}`);
    } else {
      return navigate(`/questions/noresults`);
    }
  };
  //some of the code is from source, styling is ours
  return (
    <div className="home" ref={searchModal}>
      <div className="home__search">
        <form onSubmit={handleSubmit}>
          <div className="home__searchContainer">
            {/* <div className="home__searchIcon">
              <SearchIcon
                type="submit"
                value="Submit"
                className="home__icon"
                onClick={handleSubmit}
              />
            </div> */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />

            {/* <CloseIcon onClick={() => setSearch("")} className="home__icon icon-close" /> */}
            <div class="tooltip">
              <InfoOutlinedIcon className="icon-info" />
              <span class="tooltiptext">
                Search by either question title or associated tags. To search by tags, use the
                following notation: [tag1, tag2, tag3, etc]. i.e. [6.01, Social, 8]
              </span>
            </div>
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

export default SearchBar;
