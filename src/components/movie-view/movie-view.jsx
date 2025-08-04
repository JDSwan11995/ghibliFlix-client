import "./movie-view.scss";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director?.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre?.Name}</span>
      </div>
      <div>
        <span>Release Date: </span>
        <span>{movie.ReleaseDate}</span>
      </div>
      <div>
        <span>Rotten Tomatoes Rating: </span>
        <span>{movie.RottenTomatoesRating}</span>
      </div>
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back Home
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birthday: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ReleaseDate: PropTypes.string,
    RottenTomatoesRating: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
