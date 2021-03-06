import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import "./watch.scss";

const Watch = () => {
  const location = useLocation();
  const {movie} = location.state
 window.scroll(0,0)
  console.log(location)

  return (
    <div className="watch">
      <Link to={`/details/${movie.title}`} state={{movie:movie}}>
        <div className="back">
          <ArrowBackOutlined />
          
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie.video}
      />
    </div>
  );
};

export default Watch;
