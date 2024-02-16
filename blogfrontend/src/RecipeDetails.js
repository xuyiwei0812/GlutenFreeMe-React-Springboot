import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
    container: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'flex-start', // Align items to the start of the container
        justifyContent: 'space-between', // Space between the image and content
        whiteSpace: 'pre-line'
    },
    recipeImage: {
        width: '30%',
        borderRadius: '4px',
    },
    recipeTitle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: '24px',
        margin: '10px 0',
    },
    label: {
        display: 'inline-block',
        backgroundColor: '#80c565',
        color: 'white',
        padding: '3px 10px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    description: {
        fontSize: '16px',
        lineHeight: '1.6',
        margin: '10px 0',
        whiteSpace: 'pre-line',
    },
    meta: {
        fontSize: '14px',
        color: '#888',
        margin: '10px 0',
    },
    author: {
        fontWeight: 'bold',
    },
    recipeContentStyle: {
        marginLeft: '20px',
        flex: '1',
        whiteSpace: 'pre-line'
    },
};

const RecipeWithLabelsComponent = ({ recipe }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const userObject = JSON.parse(sessionStorage.getItem('user') || 'null');

    //console.log("user"+userObject.userId);
    //console.log("recipe"+recipe.recipeId);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (recipe.recipeId && userObject) {
                try {
                    const response = await fetch(`http://localhost:2887/api/recipe/getFavOrNot`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: userObject.userId, recipeId: recipe.recipeId })
                    });
                    const data = await response.json();
                    console.log("isFav:"+data.data);
                    if (data.code === 0 && data.data !== undefined) {
                        setIsFavorite(data.data);
                    } else {
                        console.log('Failed to fetch favorite status');
                    }
                } catch (error) {
                    console.error('Error checking favorite status:', error);
                }
            }
        };

        checkFavoriteStatus();
    }, [recipe.recipeId, userObject?.userId]);

    // Function to handle the favorite/unfavorite action
    const toggleFavorite = async () => {
        if (!userObject) {
            alert('Please log in to use the favorite function');
            return;
        }

        // Define the endpoint, depending on the current favorite state
        const endpoint = isFavorite ? '/unfavoriteRecipe' : '/favoriteRecipe';
        const favoriteData = { recipeId: recipe.recipeId, userId: userObject.userId };

        try {
            const response = await fetch(`http://localhost:2887/api/recipe${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(favoriteData)
            });
            const data = await response.json();
            if (data.code === 0) {
                setIsFavorite(!isFavorite); // Toggle the favorite state on successful response
            } else {
                throw new Error(data.msg || 'Failed to update favorite');
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            alert(error.toString());
        }
    };

    const formattedMethod = recipe.method.split(/[\r\n]+/).map((line, index) => (
        <div key={index}>
            {line}
        </div>
    ));

    return (
        <div style={styles.container}>
            <img style={styles.recipeImage} src={`/${recipe.recipePic}`} alt={recipe.recipeName} />
            <div style={styles.recipeContentStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={styles.recipeTitle}>{recipe.recipeName}</div>
                    <button onClick={toggleFavorite} style={{ fontSize: '24px', border: 'none', background: 'none' }}>
                        {userObject ? (isFavorite ? '💚' : '🤍') : '🖤'}{/* Heart icons to indicate favorite status, black heart if not logged in */}
                    </button>
                </div>
                {recipe.labels.map((label, index) => (
                    <span key={index} style={styles.label}>{label}</span>
                ))}
                <div style={styles.meta}>
                    <span>Serves: {recipe.serves}</span> | <span>Cook Time: {recipe.cookTime}</span>
                </div>
                <div style={styles.meta}>
                    Ingredients: {recipe.ingredients}
                </div>
                <div style={styles.meta}>
                    <span style={styles.author}>By {recipe.recipeAuthor}</span>
                </div>
                <div style={styles.description}>{formattedMethod}</div>
            </div>
        </div>
    );
};

const RecipeDetails = () => {
    const [recipeData, setRecipeData] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams(); // 使用 useParams 钩子来获取路由参数
    //console.log("id:"+id);

    useEffect(() => {

        if (id) {
            fetch(`http://localhost:2887/api/recipe/getOneRecipeWithLabels/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.code === 0) {
                        setRecipeData(data.data);
                        console.log("data.data"+data.data.recipeId);
                    } else {
                        throw new Error(data.msg || 'Error fetching recipe');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError(error.toString());
                });
        }
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recipeData) {
        return <div>Loading...</div>;
    }

    return <RecipeWithLabelsComponent recipe={recipeData} />;
};

export default RecipeDetails;
