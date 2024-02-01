import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create'
import BlogDetails from './BlogDetails';
import NotFound from "./NotFound";
import Login from "./Login";
import React from 'react';
import Register from "./Register";
import FrontPage from "./FrontPage";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";
import FilteredRecipe from "./FilteredRecipes";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <FrontPage />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/recipes">
              <Recipes />
            </Route>
            <Route path="/recipes/:id">
              <RecipeDetails />
            </Route>
            <Route path="/filtered/:label">
              <FilteredRecipe />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;