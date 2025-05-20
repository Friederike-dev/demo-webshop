import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaShoppingCart, FaFilter, FaSort } from "react-icons/fa";
import CategoryList from "./CategoryList";

// The Header component renders the top navigation bar of the application.
// It includes buttons for the menu, cart, category filters, and sorting options.
// Dropdown menus are displayed for each button when clicked.
function Header({
  onCartClick, // Callback function to handle cart button clicks
  selectedCategories, // Object representing the selected state of main categories
  selectedSubCategoryStates, // Object representing the selected state of sub-categories for each main category
  onCategoryChange, // Callback function to propagate category changes to the parent component
  onSortSelect, // Callback function to handle sorting option changes
  onAboutClick, // Callback function to handle "About" clicks
  onHomeClick, // Callback function to handle "Home" clicks
  cartItemCount,
}) {
  // State to manage the visibility of the main menu dropdown
  const [showMenuDropdown, setShowMenu] = useState(false);

  // State to manage the visibility of the categories dropdown
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  // State to manage the visibility of the sorting dropdown
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // References to the dropdown menus for detecting clicks outside
  const menuDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Effect to close dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("menuDropdownRef:", menuDropdownRef.current);
      console.log("categoriesDropdownRef:", categoriesDropdownRef.current);
      console.log("sortDropdownRef:", sortDropdownRef.current);

      // Check if the click occurred outside all dropdown menus
      if (
        (menuDropdownRef.current &&
          !menuDropdownRef.current.contains(event.target)) ||
        (categoriesDropdownRef.current &&
          !categoriesDropdownRef.current.contains(event.target)) ||
        (sortDropdownRef.current &&
          !sortDropdownRef.current.contains(event.target))
      ) {
        setShowMenu(false); // Close the main menu dropdown
        setShowCategoriesDropdown(false); // Close the categories dropdown
        setShowSortDropdown(false); // Close the sorting dropdown
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      {/* Application title */}
      <h1>Shoppyrama</h1>

      {/* Navigation links for wide screens */}
      <nav className="header-menu">
      <span onClick={onHomeClick} style={{ cursor: "pointer" }}>Home</span> {/* Call onHomeClick when "Home" is clicked */}
        <span onClick={onAboutClick} style={{ cursor: "pointer" }}>About</span> {/* Call onAboutClick when "About" is clicked */}
      </nav>

      {/* Buttons for menu, cart, filters, and sorting */}
      <div className="header-buttons">
        {/* Menu button */}
        <button
          onClick={() => setShowMenu(!showMenuDropdown)} // Toggle the main menu dropdown
          className="menu-button"
        >
          <FaBars />
        </button>

        {/* Cart button */}
        <button onClick={onCartClick} className="cart-button">
          <FaShoppingCart />
          {cartItemCount > 0 && ( // show cart item count if greater than 0
            <span className="cart-badge">{cartItemCount}</span> )}
        </button>

        {/* Filter button */}
        <button
          onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)} // Toggle the categories dropdown
          className="filter-button"
        >
          <FaFilter />
        </button>

        {/* Sorting button */}
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)} // Toggle the sorting dropdown
          className="sort-button"
        >
          <FaSort />
        </button>
      </div>

      {/* Main menu dropdown */}
      {showMenuDropdown && (
        <div className="dropdown-menu" ref={menuDropdownRef}>
          <span
            className="dropdown-item"
            onClick={() => {
              onHomeClick(); // Call onHomeClick when "Home" is clicked in the dropdown
              setShowMenu(false); // Close the dropdown
            }}
          >
            Home
          </span>
          <span
            className="dropdown-item"
            onClick={() => {
              onAboutClick(); // Call onAboutClick when "About" is clicked in the dropdown
              setShowMenu(false); // Close the dropdown
            }}
          >
            About
          </span>
        </div>
      )}

      {/* Categories dropdown */}
      {showCategoriesDropdown && (
        <div className="dropdown-menu" ref={categoriesDropdownRef}>
          <CategoryList
            categories={[
              {
                name: "Category 1",
                subCategories: ["poetry", "prose", "travel-guide", "history"],
              },
              {
                name: "Category 2",
                subCategories: ["poetry", "prose", "travel-guide", "history"],
              },
              {
                name: "Category 3",
                subCategories: ["poetry", "prose", "travel-guide", "history"],
              },
              {
                name: "Category 4",
                subCategories: ["poetry", "prose", "travel-guide", "history"],
              },
            ]} // List of categories and their sub-categories
            selectedCategories={selectedCategories} // Current state of selected main categories
            selectedSubCategoryStates={selectedSubCategoryStates} // Current state of selected sub-categories
            onCategoryChange={onCategoryChange} // Callback to propagate changes
          />
        </div>
      )}

      {/* Sorting dropdown */}
      {showSortDropdown && (
        <div className="dropdown-menu" ref={sortDropdownRef}>
          {/* Sorting options */}
          <span
            className="dropdown-item"
            onClick={() => {
              onSortSelect("price ascending"); // Select "price ascending" sorting option
              setShowSortDropdown(false); // Close the sorting dropdown
            }}
          >
            Price Ascending
          </span>
          <span
            className="dropdown-item"
            onClick={() => {
              onSortSelect("price descending"); // Select "price descending" sorting option
              setShowSortDropdown(false); // Close the sorting dropdown
            }}
          >
            Price Descending
          </span>
          <span
            className="dropdown-item"
            onClick={() => {
              onSortSelect("alphabetical"); // Select "alphabetical" sorting option
              setShowSortDropdown(false); // Close the sorting dropdown
            }}
          >
            Alphabetical
          </span>
        </div>
      )}
    </header>
  );
}

export default Header;
