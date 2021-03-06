import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./details.css";
import { ArrowBackOutlined } from "@material-ui/icons";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

export default function Details() {
  const location = useLocation();
  const { movie } = location.state;
  const [mylist, setList] = useState("");
  const [add, checkAdd] = useState(false);
  const { user, dispatch } = useContext(AuthContext);



  if (movie.isSeries === true) {
    var filter = "serie";
  } else if (movie.isSeries === false) {
    var filter = "movie";
  }

  useEffect(() => {
    setList(movie._id);

    if (user.mylist.includes(movie._id) === true) {
      checkAdd(true);
    } else {
      checkAdd(false);
    }
  }, [mylist, add, user.mylist, movie._id]);

  const handleAdd = async (e) => {
    e.preventDefault();

    const updatedList = {
      mylist,
    };

    try {
      // setList({...mylist,[e.target.name]:movie._id}
      let res = await axios.put(
        "/users/updatelist/" + user._id,
        updatedList,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        
        }
      );

      res.data.accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      console.log(res.data.accessToken)
      dispatch({ type: "UPDATE_SUCCESS",   payload: res.data });
      window.scrollTo(0, 600);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    const updatedList = {
      mylist,
    };

    try {
      // setList({...mylist,[e.target.name]:movie._id}
      let res = await axios.put(
        "/users/removelist/" + user._id,
        updatedList,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      res.data.accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.scrollTo(0, 600);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
    }
  };

  return (
    <div className="details">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />{" "}
        </div>
      </Link>

      <div>
        <img className="detailsImg" src={movie.img} alt="" />
      </div>
      <div className="detailsInfo">
        <div className="detailsInfoTop">
          <div className="detailsTitle">
            <h1>{movie.title}</h1>
          </div>
          <div className="detailsYear">
            <span style={{ marginRight: "1rem" }}>
              <i className="fa-solid fa-star staricon"></i> {movie.rating}
            </span>
            <span> {movie.year}</span>
          </div>
        </div>
        <div className="detailsInfoBottom">
          <div className="detailsPlay">
            <button className="playButton button">
              <Link
                to="/watch"
                state={{ movie: movie }}
                className="watchButton linkButton"
              >
                <i className="fa-solid fa-play icon"></i>Watch Now
              </Link>
            </button>
          </div>
          <div className="detailsAddInfo">
            <span className="detailsGenre">{movie.genre}</span>
            <span className="detailsLimit">+{movie.limit}</span>
          </div>
          <div className="detailsDesc">
            <span>{movie.desc}</span>
          </div>
          <div className="detailsGoto">
            <div className="detailsGotoItem ">
              <Link
                to="/watchtrailer "
                state={{ movie: movie }}
                className="link"
              >
                <div className="detailsIcon ">
                  <i className="fa-brands fa-youtube iconDetails  "></i>
                </div>
              </Link>
              <div className="detailsIconSpan ">Trailer</div>
            </div>
            <div className="detailsGotoItem ">
              <div
                className="detailsIcon link"
                onClick={(e) => window.open(`${movie.imdb}`)}
              >
                <i className="fa-brands fa-imdb iconDetails "></i>
              </div>

              <div className="detailsIconSpan  ">IMDB</div>
            </div>

            {add ? (
              <div className="detailsGotoItem">
                <div className="detailsIcon">
                  <i
                    className="fa-solid fa-check iconDetails link"
                    onClick={handleRemove}
                  ></i>
                </div>
                <div className="detailsIconSpan">My List</div>
              </div>
            ) : (
              <div className="detailsGotoItem">
                <div className="detailsIcon">
                  <i
                    className="fa-solid fa-plus iconDetails link"
                    name="mylist"
                    onClick={handleAdd}
                  ></i>
                </div>
                <div className="detailsIconSpan">My List</div>
              </div>
            )}

            <div className="detailsGotoItem">
              <div className="detailsIcon">
                <Link to={`/blog/?${filter}=${movie.title}`} className="link">
                  <i className="fa-solid fa-blog iconDetails link"></i>
                </Link>
              </div>
              <div className="detailsIconSpan ">View Blog</div>
            </div>
            <div className="detailsGotoItem">
              <div className="detailsIcon">
                <Link to="/write" className="link">
                  <i className="fa-solid fa-feather-pointed iconDetails link"></i>
                </Link>
              </div>

              <div className="detailsIconSpan ">Share you Thoughts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
