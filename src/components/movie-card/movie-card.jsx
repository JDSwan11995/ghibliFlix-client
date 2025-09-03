import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, updateFavorites, onMovieClick }) => {
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();

    const movieID = movie._id;
    const method = isFavorite ? "DELETE" : "POST";

    fetch(
      `${process.env.REACT_APP_API_URL}/users/${user.Username}/movies/${movieID}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update favorite");
        return response.json();
      })
      .then((updatedUser) => {
        updateFavorites(updatedUser.FavoriteMovies);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={movie.ImageURL}
        alt={`${movie.Title} Poster`}
        onError={(e) =>
          (e.target.src = "https://via.placeholder.com/300x450?text=No+Image")
        }
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director?.Name}</Card.Text>
        <Button variant="primary" onClick={() => onMovieClick(movie)}>
          Open Details
        </Button>
        <Button
          variant={isFavorite ? "danger" : "success"}
          onClick={handleFavoriteToggle}
          className="ms-2"
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateFavorites: PropTypes.func.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
