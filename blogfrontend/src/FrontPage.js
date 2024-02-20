import React from 'react';
import Carousel from "./Carousel";
import RecipesPage from "./Recipes";

const FrontPage = () => {
return (
    <div>
<br/>
<br/>
        <Carousel />
        <br/>
        <h2 style={{marginLeft: '600px'}}>View Our Gluten Free Recipes</h2>
        <RecipesPage />
    </div>
);
};

export default FrontPage;