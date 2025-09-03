import PropTypes from "prop-types";
import { Button, Card, ListGroup } from "react-bootstrap";
import { posters } from "../../images/posters";

export const MovieView = ({
  movie,
  isFavorite,
  user,
  updateFavorites,
  onBackClick,
}) => {
  // Use the movie's ImageURL or fallback to a default poster
  const poster =
    posters[movie.Title.toLowerCase().replace(/\s+/g, "_")] ||
    movie.ImageURL ||
    posters.default;

  const handleFavoriteToggle = () => {
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
        className="w-100"
        src={poster}
        alt={`${movie.Title} poster`}
        variant="top"
        style={{ maxHeight: "400px", objectFit: "cover" }}
        onError={(e) =>
          (e.target.src = "https://via.placeholder.com/300x450?text=No+Image")
        }
      />

      <Card.Body className="text-center">
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>

      <ListGroup variant="flush">
        <ListGroup.Item>
          {" "}
          <strong>Director:</strong> {movie.Director?.Name}{" "}
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <strong>Genre:</strong> {movie.Genre?.Name}{" "}
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <strong>Release Date:</strong> {movie.ReleaseDate}{" "}
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <strong>Rotten Tomatoes Rating:</strong> {movie.RottenTomatoesRating}{" "}
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <strong>Description:</strong> {movie.Description}{" "}
        </ListGroup.Item>
      </ListGroup>

      <Card.Body className="text-center">
        <Button
          variant={isFavorite ? "danger" : "success"}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  updateFavorites: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
