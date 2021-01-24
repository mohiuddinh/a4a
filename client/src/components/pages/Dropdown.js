import React, { Component } from "react";
import { Link } from "@reach/router";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faAtom,
  faDollarSign,
  faSquareRootAlt,
  faMagnet,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

import "../../css/Dropdown.css";

const link_style = {
  textDecoration: "inherit",
  color: "inherit",
};

class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
  }

  render() {
    return (
      <div className="dropdown">
        <div
          className="dropdown__selection"
          onClick={this.showMenu}
          style={
            this.state.showMenu
              ? { outline: "1px solid var(--border-accent)" }
              : { outline: "transparent" }
          }
        >
          <button>Show menu</button>
          <ArrowDropDownIcon
            className="dropdown__icon"
            style={
              this.state.showMenu ? { transform: "rotate(0deg)" } : { transform: "rotate(90deg)" }
            }
          />
        </div>

        {this.state.showMenu ? (
          <div
            className="dropdown__menu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            <Link to="/questions" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>View All</span>
                <FontAwesomeIcon icon={faAlignJustify} size="1x" />
              </div>
            </Link>
            <Link to="/questions/eecs" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>Course 6: EECS</span>
                <FontAwesomeIcon icon={faBolt} size="1x" />
              </div>
            </Link>
            <Link to="/questions/physics" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>Course 8: Physics</span>
                <FontAwesomeIcon icon={faMagnet} size="1x" />
              </div>
            </Link>
            <Link to="/questions/math" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>Course 18: Mathematics</span>
                <FontAwesomeIcon icon={faSquareRootAlt} size="1x" />
              </div>
            </Link>
            <Link to="/questions/chemistry" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>Course 5: Chemistry</span>
                <FontAwesomeIcon icon={faAtom} size="1x" />
              </div>
            </Link>
            <Link to="/questions/econ" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>Course 14: Economics</span>
                <FontAwesomeIcon icon={faDollarSign} size="1x" />
              </div>
            </Link>
            <Link to="/questions/social" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>Social</span>
                <FontAwesomeIcon icon={faDollarSign} size="1x" />
              </div>
            </Link>
            <Link to="/questions/clubs" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span>Clubs</span>
                <FontAwesomeIcon icon={faDollarSign} size="1x" />
              </div>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
