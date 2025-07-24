import PropTypes, { string } from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.ImagePath} alt={movie.Title} />
      <h3>{movie.Title}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    RottenTomatoesRating: PropTypes.string,
    ReleaseDate: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
