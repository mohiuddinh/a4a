import React, { Component } from "react";
import { Link } from "@reach/router";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faAtom,
  faMoneyBillAlt,
  faSquareRootAlt,
  faMagnet,
  faAlignJustify,
  faUser,
  faDiceThree,
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

  closeMenu() {
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
          style={this.state.showMenu ? { outline: "1px solid var(--border-accent)" } : null}
        >
          <button>Navigate</button>
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
                <span className="dt-all">View All</span>
                <FontAwesomeIcon icon={faAlignJustify} size="1x" className="fa fa-align-justify" />
              </div>
            </Link>
            <Link to="/questions/chemistry" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span className="dt-5">Course 5</span>
                <FontAwesomeIcon icon={faAtom} size="1x" className="fa fa-atom" />
              </div>
            </Link>
            <Link to="/questions/eecs" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span className="dt-6">Course 6</span>
                <FontAwesomeIcon icon={faBolt} size="1x" className="fa fa-bolt" />
              </div>
            </Link>
            <Link to="/questions/physics" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span className="dt-8">Course 8</span>
                <FontAwesomeIcon icon={faMagnet} size="1x" className="fa fa-magnet" />
              </div>
            </Link>
            <Link to="/questions/econ" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span className="dt-14">Course 14</span>
                <FontAwesomeIcon icon={faMoneyBillAlt} size="1x" className="fa fa-money-bill-alt" />
              </div>
            </Link>
            <Link to="/questions/math" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span className="dt-18">Course 18</span>
                <FontAwesomeIcon
                  icon={faSquareRootAlt}
                  size="1x"
                  className="fa fa-square-root-alt"
                />
              </div>
            </Link>
            <Link to="/questions/social" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span className="dt-social">Social</span>
                <FontAwesomeIcon icon={faUser} size="1x" className="fa fa-user" />
              </div>
            </Link>
            <Link to="/questions/clubs" style={link_style} onClick={this.closeMenu}>
              <div className="dropdown__items">
                <span className="dt-clubs">Clubs</span>
                <FontAwesomeIcon icon={faDiceThree} size="1x" className="fa fa-dice-three" />
              </div>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
