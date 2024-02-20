import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const styles = {
    navbar: {
        backgroundColor: '#00bfa5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 100px',
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
        minWidth: '250px',
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
    dropdownColumn2: {
        float: 'left',
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
    },
    dropdownColumnHeader: {
        marginBottom: '10px',
        fontWeight: 'bold',
    },
};

const NavBar = () => {

    const { auth, logout } = useAuth();

    const [isRecipesDropdownVisible, setIsRecipesDropdownVisible] = useState(false);
    const [isRestaurantsDropdownVisible, setIsRestaurantsDropdownVisible] = useState(false);

    const [isSearchVisible, setIsSearchVisible] = useState(false); // Added state for search visibility
    const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

    const [searchQuery, setSearchQuery] = useState('');

    const showRecipesDropdown = () => setIsRecipesDropdownVisible(true);
    const hideRecipesDropdown = () => setIsRecipesDropdownVisible(false);

    const showRestaurantsDropdown = () => setIsRestaurantsDropdownVisible(true);
    const hideRestaurantsDropdown = () => setIsRestaurantsDropdownVisible(false);

    const history = useHistory();

    const handleLabelClick = (label) => {
        console.log(label);
        history.push(`/filtered/${label}`);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        sessionStorage.removeItem('user');
        history.push('/login');
    };

    // Function to handle the Enter key press inside the search input
    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            history.push(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to /search route with query
        }
    };

    // Function to update the search query state
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
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
                    <a href="/recipes" style={styles.link}>DISCOVER</a>
                    <div
                        style={{...styles.dropdown, display: isRecipesDropdownVisible ? 'block' : 'none'}}
                        onMouseEnter={showRecipesDropdown}
                    >
                        <div style={styles.dropdownColumn}>
                            <div style={styles.dropdownColumnHeader}>MEALS & COURSES</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('breakfast') }>Breakfast</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('dinner')}>Dinner</div>
                            <div style={styles.dropdownContent} onClick={() => handleLabelClick('dessert')}>Dessert</div>
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
                <a href="/myhome" style={{...styles.link, ...styles.restaurantsLink}}>MY HOME</a>
                <div
                    style={{...styles.dropdown2, display: isRestaurantsDropdownVisible ? 'block' : 'none'}}
                    onMouseEnter={showRestaurantsDropdown}
                >
                    <div style={styles.dropdownColumn2}>
                        <Link to="/favorite" style={styles.dropdownContent}>MY FAV RECIPES</Link>
                        <Link to="/upload" style={styles.dropdownContent}>UPLOAD A RECIPE</Link>
                    </div>
                </div>
                </div>
                {auth ? (
                    <React.Fragment>
                        <span style={styles.link}>{auth.username}</span> {/* Display the username */}
                        <a href="/login" onClick={handleLogout} style={styles.link}>LOG OUT</a>
                    </React.Fragment>
                ) : (
                    <a href="/login" style={styles.link}>LOG IN</a>
                )}
                <div style={styles.navbarEnd}>
                    {isSearchVisible && (
                        <input
                            type="text"
                            placeholder="Search for anything"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                            style={{
                                padding: '10px',
                                marginRight: '10px',
                                fontSize: '16px',
                            }}
                        />
                    )}
                    <button onClick={toggleSearch} style={styles.searchButton}>SEARCH</button>
            </div>
            </div>
        </nav>
    );
};

export default NavBar;
