import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./movie.css";
import axios from "axios";
import ReactPlayer from "react-player";

interface MovieData {
  title: string;
  overview: string;
  name: string;
  poster_path: string;
}

const Movie: React.FC = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState<MovieData | null>(null);
  const [videoTrailer, setVideoTrailer] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/");
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWY3MTIyZDczNmY4NDc4MzVjN2RkMWFhZmY2ZGQwOSIsInN1YiI6IjY2M2ZjMzA0Njg3NjZiNGY0YTU5MjI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0LIfpDZSnG1xPvY9xCQ5D9jJwmXYDdhD9IySKJCRD98";

  const handleButtonClick = () => {
    navigate(`/${segments[1]}/top-rated`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${segments[1]}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );
        setItemData(response.data);

        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/${segments[1]}/${id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );
        const trailerItem = videoResponse.data.results.find(
          (item) => item.type === "Trailer"
        );
        if (trailerItem) {
          const videoKey = trailerItem.key;
          setVideoTrailer(`https://www.youtube.com/watch?v=${videoKey}`);
        } else {
          setImage(
            `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
          );
        }
      } catch (error) {
        console.error("Error fetching item data: ", error);
      }
    };
    fetchData();
  }, [id, segments, token, setItemData, setVideoTrailer, setImage]);

  return (
    <div>
      <div className="buttonContainer">
        <div className="buttonBack">
          <button className="backBtn" onClick={handleButtonClick}>
            Back
          </button>
        </div>
      </div>
      <div
        style={{
          maxWidth: "1280px",
          objectFit: "fill",
          margin: "0 auto",
          marginTop: "50px",
        }}
      >
        {videoTrailer && (
          <ReactPlayer
            url={videoTrailer}
            controls
            width="100%"
            height="500px"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                },
              },
            }}
          />
        )}
      </div>
      <div className="movieContainer">
        {itemData && (
          <div>
            {image && (
              <img src={image} className="videoContainer" alt="Movie poster" />
            )}
            <h2>{itemData.title || itemData.name}</h2>
            <p>{itemData.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
