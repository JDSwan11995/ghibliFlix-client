import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const updateFavorites = (newFavorites) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        FavoriteMovies: newFavorites,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  useEffect(() => {
    if (!token) return;
    fetch("https://ghibliheroku-f28bf5d9329a.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => setMovies(movies))
      .catch((err) => console.error(err));
  }, [token]);

  //If not logged in, show login/signup forms
  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div className="text-center my-2">or</div>
          <SignupView />
        </Col>
      </Row>
    );
  }

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">GhibliFlix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                setSelectedMovie(null);
                setShowProfile(false);
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setSelectedMovie(null);
                setShowProfile(true);
              }}
            >
              Profile
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container>
        {showProfile ? (
          <ProfileView movies={movies} onLoggedOut={handleLogout} />
        ) : movies.length === 0 ? (
          <div>The List is Empty</div>
        ) : selectedMovie ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                user={user}
                isFavorite={user.FavoriteMovies?.includes(selectedMovie._id)}
                updateFavorite={updateFavorites}
              />
              <div className="d-flex justify-content-center my-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedMovie(null);
                    setShowProfile(false);
                  }}
                >
                  Back to List
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="justify-contentmd-center">
            {movies.map((movie) => (
              <Col className="mb-5" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  user={user}
                  updateFavorites={updateFavorites}
                  onMovieClick={() => setSelectedMovie(movie)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};
//accidentally merged things incorrectly
