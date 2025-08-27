import "./movie-view.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, ListGroup } from "react-bootstrap";
import { posters } from "../../images/posters";
import { useNavigate } from "react-router-dom";

export const MovieView = ({ movie, onFavoriteToggle, isFavorite }) => {
  const navigate = useNavigate();

  const baseName = movie.Title.toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
  const jpPoster = (posters[`${baseName}_jp`] || posters.default_jp)?.default;
  const enPoster = (posters[`${baseName}_en`] || posters.default_en)?.default;

  const [showEnglish, setShowEnglish] = useState(false);
  const posterToShow = showEnglish ? enPoster : jpPoster;

  console.log("jpPoster:", posters[`${baseName}_jp`]);
  console.log("enPoster:", posters[`${baseName}_en`]);

  return (
    <Card>
      <Card.Img
        className="w-100"
        src={posterToShow}
        alt={`${movie.Title} poster`}
        variant="top"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />

      <Card.Body className="text-center">
        <Button
          variant="secondary"
          onClick={() => setShowEnglish(!showEnglish)}
          className="mb-3"
        >
          {showEnglish ? "Show Japanese Poster" : "Show English Poster"}
        </Button>

        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Director:</strong> {movie.Director?.Name}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Genre:</strong> {movie.Genre?.Name}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Release Date:</strong> {movie.ReleaseDate}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Rotten Tomatoes Rating:</strong> {movie.RottenTomatoesRating}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Description:</strong> {movie.Description}
        </ListGroup.Item>
      </ListGroup>

      <Card.Body className="text-center">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back Home
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.object.isRequired,
};
