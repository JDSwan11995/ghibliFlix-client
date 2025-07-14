import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://ghibliheroku-f28bf5d9329a.herokuapp.com/movies")
      .then((response) => {
        console.log("Raw response from Server: ", response);
        if (!response.ok) {
          throw new Error("Network Response was not okay");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched movies data: ", data[0]);
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error catching movies: ", error.message);
      });
  }, []);

  console.log(
    "MainView - movies:",
    movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
  );

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
