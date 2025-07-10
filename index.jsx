import { createRoot } from "react-dom/client";

import { MainView } from "./src/components/main-view/main-view";

import "./index.scss";

// Main component (will eventually use all the others)
const GhibliFlixApp = () => {
  return <MainView />;
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<GhibliFlixApp />);
