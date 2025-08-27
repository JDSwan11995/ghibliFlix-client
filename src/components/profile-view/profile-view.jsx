import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { MovieCard } from "../MovieCard/MovieCard";

export const ProfileView = ({ movies, onLoggedOut }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedProfilePic = localStorage.getItem("profilePic");

  const [user, setUser] = useState(storedUser);
  const [profilePic, setProfilePic] = useState(storedProfilePic || "");
  const [name, setName] = useState(user?.Name || "");
  const [username, setUsername] = useState(user?.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday || "");

  if (!user) {
    return (
      <Container className="text-center mt-5">
        <p>Please log in to view and edit your profile.</p>
      </Container>
    );
  }

  const favMovies = movies.filter((movie) =>
    user.FavoriteMovies?.includes(movie._id)
  );

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profilePic", reader.result);
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Name: name,
      Username: username,
      ...(password && { Password: password }),
      Email: email,
      Birthday: birthday,
    };

    fetch(`${process.env.REACT_APP_API_URL}/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedUser) => {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Profile updated successfully");
        });
      } else {
        alert("Profile update failed");
      }
    });
  };

  const handleDeregister = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This is irreversible."
      )
    )
      return;

    fetch(`${process.env.REACT_APP_API_URL}/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete account");
        alert("Account successfully deleted");
        onLoggedOut();
      })
      .catch((error) => {
        console.error(error);
        alert("Error deleting account");
      });
  };

  return (
    <Container className="my-5">
      {/* Profile Edit Card */}
      <Card className="mb-5 p-4">
        <Card.Body className="text-center">
          <h2 className="mb-4">Edit Profile</h2>
          <Image
            src={profilePic || "https://via.placeholder.com/150?text=Profile"}
            roundedCircle
            width="120"
            height="120"
            className="mb-3 border"
            alt="Profile"
          />
          <Form.Group controlId="formProfilePic" className="mb-4">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handlePicUpload}
            />
          </Form.Group>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={4}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep unchanged"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formBdate">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="outline-danger" onClick={handleDeregister}>
                Delete Account
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Favorite Movies Grid */}
      <Card className="p-4">
        <Card.Body>
          <h3 className="mb-4 text-center">Your Favorite Movies</h3>
          {favMovies.length > 0 ? (
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {favMovies.map((movie) => (
                <Col key={movie._id}>
                  <MovieCard
                    movie={movie}
                    user={user}
                    updateFavorites={(updatedFavorites) => {
                      const updatedUser = {
                        ...user,
                        FavoriteMovies: updatedFavorites,
                      };
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                    }}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">You have no favorite movies.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
