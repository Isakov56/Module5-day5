import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductBackoffice from "./components/ProductBackoffice";
const { BrowserRouter, Route } = require("react-router-dom");

function App() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const updateSearchQuery = (query) => setSearchQuery(query);

  return (
    <BrowserRouter>
      <NavBar updateSearchQuery={updateSearchQuery} />
      <Route
        path="/"
        exact
        render={() => <ProductList searchQuery={searchQuery} />}
      />
      <Route path="/addproduct" exact render={() => <ProductBackoffice />} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
