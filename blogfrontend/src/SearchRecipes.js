import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const styles = {
    recipesContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        margin: '20px',
    },
    recipe: {
        border: '1px solid #ccc',
        padding: '16px',
        textAlign: 'center',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
    },
    recipeName: {
        marginTop: '0.5em',
    },
    cookTime: {
        color: '#666',
        fontSize: '0.9em',
    },
};

const Recipe = ({ recipe }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/recipes/${recipe.recipeId}`);
    };

    return (
        <div style={styles.recipe} onClick={handleClick}>
            <img style={styles.image} src={`/${recipe.recipePic}`} alt={recipe.recipeName} />
            <h3 style={styles.recipeName}>{recipe.recipeName}</h3>
            <p style={styles.cookTime}>{recipe.cookTime}</p>
        </div>
    );
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchRecipes = () => {
    const query = useQuery();
    const searchQuery = query.get('query');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Adjust the fetch URL to your API endpoint that handles search queries
        fetch(`http://localhost:2887/api/recipe/search?query=${encodeURIComponent(searchQuery)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 0 && Array.isArray(data.data)) {
                    setRecipes(data.data);
                } else {
                    throw new Error(data.msg || 'Data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setError(error.toString());
            });
    }, [searchQuery]); // Dependency array now depends on searchQuery

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={styles.recipesContainer}>
            {recipes.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
            ))}
        </div>
    );
};

export default SearchRecipes;
