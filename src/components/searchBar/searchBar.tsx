import React from "react";
import "./searchBar.css";
import { IoMdSearch } from "react-icons/io";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchItem: React.FC<SearchBarProps> = ({ onChange, value }) => {
  return (
    <div className="headerSearchItem">
      <div className="searchIconWrapper">
        <IoMdSearch className="searchIcon" />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="headerSearchInput"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchItem;
