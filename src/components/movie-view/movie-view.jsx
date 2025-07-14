export const MovieView = ({ movie, onBackClick }) => {
  const baseImageUrl = "https://your-host.com/images/";
  const defaultPoster = "https://placehold.com/300x450?text=Movie+Poster";

  const imageUrl = movie.ImagePath
    ? `${baseImageUrl}${movie.ImagePath}`
    : defaultPoster;

  return (
    <div>
      <div>
        <img src={imageUrl} alt={movie.Tile} />
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
      <button onClick={onBackClick}>Back Home</button>
    </div>
  );
};
