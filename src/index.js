import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { DataProvider } from "./Context/DataContext";
import { AuthContextProvider } from "./Context/AuthContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>,
  rootElement
);
