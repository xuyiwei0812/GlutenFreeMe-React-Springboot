import React, { useState, useEffect } from 'react';

function RecipeUpload() {
    const userObject = JSON.parse(sessionStorage.getItem('user') || 'null');

    const [formData, setFormData] = useState({
        recipeName: '',
        serves: '',
        cookTime: '',
        ingredients: '',
        method: '',
        recipeAuthor: '',
        mealType: '',
        mainIngredients: []
    });
    const [file, setFile] = useState(null);

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '95vw',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f1f7e4'
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    const textAreaStyle = {
        minHeight: '100px',
        marginBottom: '10px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical'
    };

    const fileInputStyle = {
        marginBottom: '10px',
    };

    const buttonStyle = {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#00bfa5',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer'
    };

    useEffect(() => {
        // Check if the user is not logged in when the component mounts
        if (!userObject) {
            alert("can't upload a recipe without login");
        }
    }, []); // Empty dependency array means this effect runs once on mount

    if (!userObject) {
        // Return null or a minimal component if the user is not logged in
        return null; // or return <div>You must be logged in to upload a recipe.</div>
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                // Add to array
                setFormData({ ...formData, mainIngredients: [...formData.mainIngredients, value] });
            } else {
                // Remove from array
                setFormData({ ...formData, mainIngredients: formData.mainIngredients.filter(i => i !== value) });
            }
        } else {
            // Handle other inputs
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('recipeName', formData.recipeName);
        data.append('serves', formData.serves);
        data.append('cookTime', formData.cookTime);
        data.append('ingredients', formData.ingredients);
        data.append('method', formData.method);
        data.append('recipeAuthor', formData.recipeAuthor);
        data.append('mealType', formData.mealType);
        data.append('mainIngredients', formData.mainIngredients);
        data.append('recipePic', file);

        console.log(data);

        try {
            const response = await fetch('http://localhost:2887/api/recipe/upload', {
                method: 'POST',
                body: data
            });

            const responseData = await response.json();
            console.log(responseData.data);
            if(responseData.code === 0) {
                alert("upload successful!");
            }

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);

        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input
                type="text"
                name="recipeName"
                value={formData.recipeName}
                onChange={handleInputChange}
                placeholder="Recipe Name"
                style={inputStyle}
            />
            <div>
                <p>Select the type of meal:</p>
                <label>
                    <input
                        type="radio"
                        name="mealType"
                        value="Breakfast"
                        checked={formData.mealType === 'Breakfast'}
                        onChange={handleInputChange}
                    />
                    Breakfast
                </label>
                <label>
                    <input
                        type="radio"
                        name="mealType"
                        value="Dinner"
                        checked={formData.mealType === 'Dinner'}
                        onChange={handleInputChange}
                    />
                    Dinner
                </label>
                <label>
                    <input
                        type="radio"
                        name="mealType"
                        value="Dessert"
                        checked={formData.mealType === 'Dessert'}
                        onChange={handleInputChange}
                    />
                    Dessert
                </label>
            </div>
            <div>
                <p>Select the main ingredient(s):</p>
                <label>
                    <input
                        type="checkbox"
                        name="mainIngredients"
                        value="Meat"
                        checked={formData.mainIngredients.includes('Meat')}
                        onChange={handleInputChange}
                    />
                    Meat
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="mainIngredients"
                        value="Vegetables"
                        checked={formData.mainIngredients.includes('Vegetables')}
                        onChange={handleInputChange}
                    />
                    Vegetables
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="mainIngredients"
                        value="Fish"
                        checked={formData.mainIngredients.includes('Fish')}
                        onChange={handleInputChange}
                    />
                    Fish
                </label>
                <br />
                <br />
            </div>
            <input
                type="text"
                name="serves"
                value={formData.serves}
                onChange={handleInputChange}
                placeholder="Serves"
                style={inputStyle}
            />
            <input
                type="text"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleInputChange}
                placeholder="Cook Time"
                style={inputStyle}
            />
            <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                placeholder="Ingredients"
                style={textAreaStyle}
            />
            <textarea
                name="method"
                value={formData.method}
                onChange={handleInputChange}
                placeholder="Method"
                style={textAreaStyle}
            />
            <input
                type="text"
                name="recipeAuthor"
                value={formData.recipeAuthor}
                onChange={handleInputChange}
                placeholder="Recipe Author"
                style={inputStyle}
            />
            <p>upload recipe picture (.jpg/.png, only one picture)</p>
            <input
                type="file"
                name="recipePic"
                onChange={handleFileChange}
                style={fileInputStyle}
            />
            <button type="submit" style={buttonStyle}>Upload Recipe</button>
        </form>
    );
}

export default RecipeUpload;



