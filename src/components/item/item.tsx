import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./item.css";

interface SearchItemProps {
  item: {
    title: string;
    poster_path: string;
    name: string;
    id: number;
  };
}

const Item: React.FC<SearchItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (id) => {
    const segments = location.pathname.split("/");
    navigate(`/${segments[1]}/${id}`);
  };

  return (
    <div className="itemContainer">
      <div className="item">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt=""
          className={`${item.poster_path ? "itemImage" : "image"}`}
          onClick={() => handleButtonClick(`${item.id}`)}
        />
        <label
          className="itemTitle"
          onClick={() => handleButtonClick(`${item.id}`)}
        >
          {item.title || item.name}
        </label>
      </div>
    </div>
  );
};

export default Item;
