import "./header.css";
import SearchIcon from "../../assets/icons/Search.svg";
import ShoppingBag from "../../assets/icons/ShopingBag.svg";
import PersonIcon from "../../assets/icons/PersonIcon.svg";
import HeartIcon from "../../assets/icons/HeartIcon.svg";
import MenuIcon from "../../assets/icons/Menu.svg";
import { useState } from "react";

export const Header = () => {
  const [showInput, setShowInput] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <img
            onClick={handleToggleSidebar}
            className="icon menu-icon"
            src={MenuIcon}
            alt="Menu icon"
          />
          <div className="logo">Brand LOGO</div>

          {/* Desktop Search Bar */}
          <div className={`search-container ${showInput ? "active" : ""}`}>
            <input type="text" className="search-input" placeholder="Search" />
          </div>

          {/* Icons */}
          <div className="icons">
            <img
              onClick={handleToggleInput}
              className={`icon hide-icon ${showInput ? "active" : ""}`}
              src={SearchIcon}
              alt="Search icon"
            />
            <img className="icon-heart" src={HeartIcon} alt="Heart icon" />
            <img className="icon" src={PersonIcon} alt="Person icon" />
            <img className="icon" src={ShoppingBag} alt="Shopping bag icon" />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="line"></div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <a href="#">NEW ARRIVALS</a>
            </li>
            <li>
              <a href="#">RINGS</a>
            </li>
            <li>
              <a href="#">EARRINGS</a>
            </li>
            <li>
              <a href="#">NECKLACES</a>
            </li>
            <li>
              <a href="#">PERSONALIZED ITEMS</a>
            </li>
            <li>
              <a href="#">GIFT IDEAS</a>
            </li>
          </ul>
        </nav>

        {/* Dropdown Search Input */}
        {showInput && (
          <div className="search-dropdown">
            <input
              type="text"
              className="search-dropdown-input"
              placeholder="Search"
            />
          </div>
        )}

        {/* Sidebar Menu */}
        <aside className={`sidebar ${showSidebar ? "active" : ""}`}>
          <nav className="nav">
            <ul className="nav-list-aside">
              <li>
                <a href="#">NEW ARRIVALS</a>
              </li>
              <li>
                <a href="#">RINGS</a>
              </li>
              <li>
                <a href="#">EARRINGS</a>
              </li>
              <li>
                <a href="#">NECKLACES</a>
              </li>
              <li>
                <a href="#">PERSONALIZED ITEMS</a>
              </li>
              <li>
                <a href="#">GIFT IDEAS</a>
              </li>
            </ul>
          </nav>
        </aside>
      </header>
    </>
  );
};
