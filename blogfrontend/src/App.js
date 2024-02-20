import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import NotFound from "./NotFound";
import Login from "./Login";
import React from 'react';
import Register from "./Register";
import FrontPage from "./FrontPage";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";
import FilteredRecipe from "./FilteredRecipes";
import FavoriteRecipe from "./FavoriteRecipes";
import RecipeUpload from "./RecipeUpload";
import SearchRecipes from "./SearchRecipes";

function App() {
  return (
      <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <FrontPage />
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
            <Route path="/favorite">
              <FavoriteRecipe />
            </Route>
            <Route path="/upload">
              <RecipeUpload />
            </Route>
            <Route path="/search">
              <SearchRecipes />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
      </AuthProvider>
  );
}

export default App;