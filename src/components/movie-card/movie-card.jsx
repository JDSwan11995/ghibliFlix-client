import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, updateFavorites }) => {
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/movies/${encodeURIComponent(movie._id)}`);
  }

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    console.log("New favorite movie added!");

    const movieID = movie._id;
    const method = isFavorite ? "DELETE" : "POST";

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const username =
      user?.Username ||
      user?.username ||
      storedUser?.Username ||
      storedUser?.username;

    if (!username) {
      console.error("Username is missingfrom both props and localStorage.");
      return;
    }
    const requestUrl = `${process.env.REACT_APP_API_URL}/users/${username}/movies/${movieID}`;
    console.log("Sending request to: ", requestUrl);

    fetch(requestUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((updatedUser) => {
        updateFavorites(updatedUser.FavoriteMovies);
      })
      .catch((err) => {
        console.error("Failed to update favorite: ", err);
      });
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={movie.ImageURL}
        alt={`${movie.Title} Poster`}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="movie-director">{movie.Director?.Name}</Card.Text>
        <Button
          className="btn-open me-2"
          onClick={handleClick}
          variant="primary"
        >
          Open Details
        </Button>
        <Button
          className="btn-favorite"
          variant={isFavorite ? "secondary" : "outline-primary"}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
    RottenTomatoesRating: PropTypes.string,
    ReleaseDate: PropTypes.string,
  }).isRequired,
  updateFavorites: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    username: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default MovieCard;
