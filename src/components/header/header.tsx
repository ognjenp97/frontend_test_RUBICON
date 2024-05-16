import React, { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/");
  const [activeButton, setActiveButton] = useState<string>(
    `${segments[1]}/${segments[2]}`
  );

  const handleButtonClick = (button: string) => {
    navigate(`/${button.toLowerCase()}`);
    setActiveButton(button);
  };

  return (
    <div className="header-container">
      <button
        className={`movieBtn ${
          activeButton === "movie/top-rated" ? "active" : ""
        }`}
        onClick={() => handleButtonClick("movie/top-rated")}
      >
        Movies
      </button>
      <button
        className={`tvShowsBtn ${
          activeButton === "tv/top-rated" ? "active" : ""
        }`}
        onClick={() => handleButtonClick("tv/top-rated")}
      >
        TV Shows
      </button>
    </div>
  );
};

export default Header;
