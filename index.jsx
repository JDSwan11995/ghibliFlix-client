import { createRoot } from "react-dom/client";
import { MainView } from "./src/components/main-view/main-view.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import Container from "react-bootstrap/Container";

const GhibliFlixApp = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<GhibliFlixApp />);
