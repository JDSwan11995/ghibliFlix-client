import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) return;
    fetch("https://ghibliheroku-f28bf5d9329a.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  if (!user) {
    return (
      <Col md={5}>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </Col>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button onClick={handleLogout}>Logout</button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <>
      <div style={{ textAlign: "right", margin: "1rem" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Row className="justify-content-md-center">
        {selectedMovie ? (
          <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
