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
        marginLeft: '20px', // Add some space between the image and the content
        flex: '1', // Take up the remaining space
        whiteSpace: 'pre-line'
    },
};

const RecipeWithLabelsComponent = ({ recipe }) => {
    console.log(recipe);
    const formattedMethod = recipe.method.split(/[\r\n]+/).map((line, index) => (
        // 用 'div' 替代 'span' 可以自然换行，不需要 <br />
        <div key={index}>
            {line}
        </div>
    ));

    return (
        <div style={styles.container}>
            <img style={styles.recipeImage} src={`/${recipe.recipePic}`} alt={recipe.recipeName} />
            <div style={styles.recipeContentStyle}>
                <div style={styles.recipeTitle}>{recipe.recipeName}</div>
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
                <p style={styles.description}>{formattedMethod}</p>
            </div>
        </div>
    );
};

const RecipeDetails = () => {
    const [recipeData, setRecipeData] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams(); // 使用 useParams 钩子来获取路由参数
    console.log("id:"+id);

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
