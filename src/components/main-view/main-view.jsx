import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "My Neighbor Totoro",
      image: "../images/totoro.jpg",
      director: "Hayao Miyazaki",
      description:
        "Young sisters, Satsuki and Mei, move to the countryside with their father to be near their ailing mother, they soon meet the friendly and curious spirits of the forest.",
      genre: "Fantasy",
      release: "April 16 1988",
      rating: "94%",
    },
    {
      id: 2,
      title: "Grave of the Fireflies",
      image: "../images/fireflies.jpg",
      director: "Isao Takahata",
      description:
        "A poignant animated film about two siblings struggling to survive in wartime Japan.",
      genre: "Period Drama",
      release: "April 16 1988",
      rating: "100%",
    },
    {
      id: 3,
      title: "The Red Turtle",
      image: "../images/turtle.jpg",
      director: "Michaël Dudok de Wit",
      description:
        "A wordless meditative tale about a man's life on a deserted island and the profound connection he forms with nature.",
      genre: "Drama",
      release: "May 18 2016",
      rating: "93%",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  console.log(
    "MainView - movies:",
    movies.map((m) => ({
      title: m.title,
      image: m.image,
    }))
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
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
