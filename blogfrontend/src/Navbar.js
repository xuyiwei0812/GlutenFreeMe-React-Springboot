import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const styles = {
    navbar: {
        backgroundColor: '#00bfa5',
        display: 'flex',
        justifyContent: 'space-between',//菜单项之间的空间均匀分布
        alignItems: 'center',//垂直居中对齐
        padding: '10px 100px',//垂直方向和水平方向的内边距
    },
    navbarBrand: {
        fontSize: '32px',
        color: 'white',
    },
    navbarMenu: {
        display: 'flex',
        marginLeft: 'auto',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        padding: '10px 15px',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
    },
    restaurantsLink: {
        // 假设 'RESTAURANTS' 与 'MY HOME' 之间需要更多空间
        marginRight: '270px',
    },
    navbarEnd: {
        display: 'flex',
        alignItems: 'center',
    },
    searchButton: {
        backgroundColor: '#004d40',
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
    },
    heart: {
        color: 'pink',
        marginRight: '10px',
    },
    dropdown: {
        display: 'none',
        position: 'absolute',
        backgroundColor: '#00bfa5',
        minWidth: '400px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: 1,
        top: '100%',
        borderRadius: '0 0 4px 4px',
    },
    dropdown2: {
        display: 'none',
        position: 'absolute',
        backgroundColor: '#00bfa5',
        minWidth: '400px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: 1,
        top: '100%',
        borderRadius: '0 0 4px 4px',
    },
    dropdownContent: {
        color: 'white',
        padding: '15px',
        textDecoration: 'none',
        display: 'block',
    },
    dropdownColumn: {
        float: 'left',
        width: '50%',
        padding: '10px',
        boxSizing: 'border-box',
    },
    dropdownColumnHeader: {
        marginBottom: '10px',
        fontWeight: 'bold',
    },
};

const NavBar = () => {
    const [isRecipesDropdownVisible, setIsRecipesDropdownVisible] = useState(false);
    const [isRestaurantsDropdownVisible, setIsRestaurantsDropdownVisible] = useState(false);

    const showRecipesDropdown = () => setIsRecipesDropdownVisible(true);
    const hideRecipesDropdown = () => setIsRecipesDropdownVisible(false);

    const showRestaurantsDropdown = () => setIsRestaurantsDropdownVisible(true);
    const hideRestaurantsDropdown = () => setIsRestaurantsDropdownVisible(false);

    const history = useHistory();

    const handleLabelClick = (label) => {
        console.log(label);
        history.push(`/filtered/${label}`);
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navbarBrand}>
                <span style={styles.heart}>♥</span>
                <span style={{color:'white'}}>GlutenFreeMe</span>
            </div>
            <div style={styles.navbarMenu}>
                <div
                    style={{ ...styles.link, position: 'relative' }}
                    onMouseEnter={showRecipesDropdown}
                    onMouseLeave={hideRecipesDropdown}
                >
                    <a href="/recipes" style={styles.link}>RECIPES</a>
                    <div
                        style={{...styles.dropdown, display: isRecipesDropdownVisible ? 'block' : 'none'}}
                        onMouseEnter={showRecipesDropdown}   // 鼠标在下拉菜单上保持下拉菜单显示
                    >
                        <div style={styles.dropdownColumn}>
                            <div style={styles.dropdownColumnHeader}>MEALS & COURSES</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('breakfast') }>Breakfast</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('dessert')}>Dessert</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('family meals')}>Family meals</div>
                        </div>
                        <div style={styles.dropdownColumn}>
                            <div style={styles.dropdownColumnHeader}>MAIN INGREDIENT</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('meat')}>Meat</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('vegetables')}>Vegetables</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('fish')}>Fish</div>
                        </div>
                    </div>
                </div>
                <div
                    style={{ ...styles.link, position: 'relative' }}
                    onMouseEnter={showRestaurantsDropdown}
                    onMouseLeave={hideRestaurantsDropdown}
                >
                <a href="/restaurants" style={{...styles.link, ...styles.restaurantsLink}}>RESTAURANTS</a>
                <div
                    style={{...styles.dropdown2, display: isRestaurantsDropdownVisible ? 'block' : 'none'}}
                    onMouseEnter={showRestaurantsDropdown}  // 鼠标在下拉菜单上保持下拉菜单显示
                >
                    <div style={styles.dropdownColumn}>
                        <div style={styles.dropdownColumnHeader}>STATE/TERRITORY</div>
                        <a href="/" style={styles.dropdownContent}>VIC</a>
                        <a href="/" style={styles.dropdownContent}>NSW</a>
                        <a href="/" style={styles.dropdownContent}>QLD</a>
                        <a href="/" style={styles.dropdownContent}>WA</a>
                        <a href="/" style={styles.dropdownContent}>ACT</a>
                        <a href="/" style={styles.dropdownContent}>SA</a>
                        <a href="/" style={styles.dropdownContent}>TAS</a>
                        <a href="/" style={styles.dropdownContent}>NT</a>
                    </div>
                    <div style={styles.dropdownColumn}>
                        <div style={styles.dropdownColumnHeader}>TYPE</div>
                        <a href="/meat" style={styles.dropdownContent}>Cafe</a>
                        <a href="/vegetables" style={styles.dropdownContent}>Fine Diner</a>
                        <a href="/eggs" style={styles.dropdownContent}>Bar</a>
                    </div>
                </div>
                </div>
                <a href="/my-home" style={styles.link}>MY HOME</a>
                <a href="/login" style={styles.link}>LOG IN</a>
                <button style={styles.searchButton}>SEARCH</button>
            </div>
        </nav>
    );
};

export default NavBar;
