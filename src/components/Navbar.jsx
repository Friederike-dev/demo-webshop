import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import { initializeCategoryStates, synchronizeStates } from "../logic/categoryLogic";

// The Navbar component renders the sidebar of the application.
// It includes a list of categories and sub-categories, as well as sorting options.
// Users can filter cards by selecting categories or sub-categories and sort them using the provided options.
function Navbar({ onCategoryFilter, onSortSelect }) {
  // Categories and sub-categories data
  const categories = [
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
  ];

  // Sorting options available for the user
  const sortOptions = [
    "poetry",
    "prose",
    "travel-guide",
    "history",
    "price ascending",
    "price descending",
    "alphabetical",
  ];

  // Initialize the states for selected categories and sub-categories
  const { selectedCategories: initialSelectedCategories, selectedSubCategoryStates: initialSelectedSubCategoryStates } =
    initializeCategoryStates(categories);

  // State to manage the selected main categories
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);

  // State to manage the selected sub-categories for each main category
  const [selectedSubCategoryStates, setSelectedSubCategoryStates] = useState(initialSelectedSubCategoryStates);

  // Function to handle changes in category selection
  const handleCategoryChange = (updatedCategories, updatedSubCategories) => {
    setSelectedCategories(updatedCategories); // Update the state for main categories
    setSelectedSubCategoryStates(updatedSubCategories); // Update the state for sub-categories
  };

  // Synchronize the states of main categories and sub-categories whenever they change
  useEffect(() => {
    const { synchronizedMainCategories, synchronizedSubCategoryStates } =
      synchronizeStates(selectedCategories, selectedSubCategoryStates);

    // Propagate the synchronized states to the parent component
    onCategoryFilter(synchronizedMainCategories, synchronizedSubCategoryStates);
  }, [selectedCategories, selectedSubCategoryStates]);

  return (
    <aside className="navbar">
      {/* Section for categories */}
      <h2>Categories</h2>
      <CategoryList
        categories={categories} // List of categories and their sub-categories
        selectedCategories={selectedCategories} // Current state of selected main categories
        selectedSubCategoryStates={selectedSubCategoryStates} // Current state of selected sub-categories
        onCategoryChange={handleCategoryChange} // Callback to propagate changes
      />

      {/* Section for sorting options */}
      <h2>Filter/Sorting</h2>
      <ul className="font-sm">
        {sortOptions.map((option) => (
          <li key={option}>
            <label>
              {/* Radio button for each sorting option */}
              <input
                type="radio"
                name="sort"
                value={option}
                onChange={() => onSortSelect(option)} // Propagate the selected sorting option to the parent component
              />
              {option} {/* Display the sorting option */}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Navbar;