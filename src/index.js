import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const root = document.getElementById("root");

if (root.hasChildNodes()) {
  hydrate(<App />, root);
} else {
  render(<App />, root);
}

reportWebVitals();
