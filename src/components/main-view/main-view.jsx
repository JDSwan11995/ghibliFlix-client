import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

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

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Container className="my-4">
        <Routes>
          {/* Signup */}
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Row className="justify-content-center">
                  <Col md={6}>
                    <SignupView />
                  </Col>
                </Row>
              )
            }
          />
          {/* Login */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Row className="justify-content-center">
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                </Row>
              )
            }
          />

          {/* Movie Details */}
          <Route
            path="/movies/:movieTitle"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <p> The list is empty!</p>
              ) : (
                <Row className="justify-content-center">
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                </Row>
              )
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView movies={movies} onLoggedOut={handleLogout} />
              )
            }
          />

          {/*Home / Movie Grid*/}
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <p>The list is empty!</p>
              ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {movies.map((movie) => (
                    <Col key={movie.id}>
                      <MovieCard movie={movie} user={user} />
                    </Col>
                  ))}
                </Row>
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
