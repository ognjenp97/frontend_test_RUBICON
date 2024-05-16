import React, { FC, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Header from "../header/header.tsx";
import SearchBar from "../searchBar/searchBar.tsx";
import Item from "../item/item.tsx";
import { useLocation } from "react-router-dom";
import "./listItem.css";
import { setData, setSearchTerm } from "../redux/actions.tsx";
import axios from "axios";
import { AppState } from "../redux/state.tsx";
import { FaSpinner } from "react-icons/fa";

interface Props {
  data: any[];
  searchTerm: string;
  setData: (data: any[]) => void;
  setSearchTerm: (term: string) => void;
}

const ListItem: FC<Props> = ({ data, setData, searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWY3MTIyZDczNmY4NDc4MzVjN2RkMWFhZmY2ZGQwOSIsInN1YiI6IjY2M2ZjMzA0Njg3NjZiNGY0YTU5MjI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0LIfpDZSnG1xPvY9xCQ5D9jJwmXYDdhD9IySKJCRD98";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        let item;
        setLoading(true);
        if (searchTerm.length > 2) {
          response = await axios.get(
            `https://api.themoviedb.org/3/search/${
              location.pathname.split("/")[1]
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
              },
              params: {
                query: searchTerm,
                include_adult: false,
                language: "en-US",
              },
            }
          );
          item = response.data.results;
          if (item.length === 0) {
            setData([]);
          } else {
            setData(item);
          }
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/${
              location.pathname.split("/")[1]
            }/top_rated`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
              },
            }
          );
          item = response.data.results.slice(0, 10);
          setData(item);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (searchTerm.length > 2) {
      setLoading(true);
      timerRef.current = setTimeout(() => {
        setLoading(false);
        fetchData();
      }, 1000);
    } else {
      fetchData();
    }
  }, [searchTerm, location, setData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="listContainer">
      <div className="listHeader">
        <Header />
        <SearchBar onChange={handleSearchChange} value={searchTerm} />
      </div>
      <div className="list">
        {loading ? (
          <p style={{ fontWeight: "bold", fontSize: "28px" }}>
            <FaSpinner /> Loading...
          </p>
        ) : data.length === 0 ? (
          <p
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              color: "rgb(224,115,115)",
            }}
          >
            No results found
          </p>
        ) : (
          data.map((item, index) => <Item key={index} item={item} />)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  data: state.data,
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = {
  setData,
  setSearchTerm,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
