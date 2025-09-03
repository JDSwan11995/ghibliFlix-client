import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainView } from "./src/components/main-view/main-view.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import Container from "react-bootstrap/Container";

// Main component (will eventually use all the others)
const GhibliFlixApp = () => {
  return (
    <BrowserRouter>
      <Container>
        <MainView />
      </Container>
    </BrowserRouter>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<GhibliFlixApp />);
