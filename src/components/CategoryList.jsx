import React, { useState } from "react";
import {
  toggleCategory, // Logic to toggle the expanded state of a category
  toggleCategoryCheckbox, // Logic to handle changes to the main category checkbox
  toggleSubCategoryCheckbox, // Logic to handle changes to the sub-category checkbox
} from "../logic/categoryLogic";

// The CategoryList component renders a list of categories and their sub-categories.
// It allows users to toggle categories (expand/collapse), select/deselect main categories, and select/deselect sub-categories.
function CategoryList({
  categories, // Array of category objects, each containing a name and an array of sub-categories
  selectedCategories, // Object representing the selected state of main categories
  selectedSubCategoryStates, // Object representing the selected state of sub-categories for each main category
  onCategoryChange, // Callback function to propagate changes to the parent component
}) {
  // State to manage which categories are expanded (open) or collapsed (closed)
  const [expandedCategories, setExpandedCategories] = useState({});

  // Toggles the expanded state of a category (open/close)
  const handleToggleCategory = (category) => {
    setExpandedCategories((prevState) =>
      toggleCategory(category, prevState) // Uses logic from categoryLogic.js
    );
  };

  // Handles changes to the main category checkbox
  const handleToggleCategoryCheckbox = (category) => {
    const { updatedCategories, updatedSubCategories } = toggleCategoryCheckbox(
      category, // The category being toggled
      selectedCategories, // Current state of selected main categories
      selectedSubCategoryStates // Current state of selected sub-categories
    );
    // Propagate the updated states to the parent component
    onCategoryChange(updatedCategories, updatedSubCategories);
  };

  // Handles changes to a sub-category checkbox
  const handleToggleSubCategoryCheckbox = (subCategory, mainCategory) => {
    const { updatedCategories, updatedSubCategories } =
      toggleSubCategoryCheckbox(
        subCategory, // The sub-category being toggled
        mainCategory, // The parent category of the sub-category
        selectedSubCategoryStates, // Current state of selected sub-categories
        selectedCategories // Current state of selected main categories
      );
    // Propagate the updated states to the parent component
    onCategoryChange(updatedCategories, updatedSubCategories);
  };

  return (
    <ul>
      {/* Iterate over the list of categories */}
      {categories.map((category) => (
        <li key={category.name}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Checkbox for the main category */}
            <div>
              <input
                type="checkbox"
                checked={selectedCategories[category.name] || false} // Check if the category is selected
                onChange={() => handleToggleCategoryCheckbox(category.name)} // Handle checkbox toggle
              />
            </div>

            {/* Arrow to expand/collapse the category */}
            <div
              onClick={() => handleToggleCategory(category.name)} // Toggle the expanded state
              style={{ cursor: "pointer", marginLeft: "8px" }}
            >
              {expandedCategories[category.name] ? "▼" : "▶"} {/* Display arrow based on expanded state */}
            </div>

            {/* Display the category name */}
            <div style={{ marginLeft: "8px" }}>{category.name}</div>
          </div>

          {/* Render sub-categories if the category is expanded */}
          {expandedCategories[category.name] && (
            <ul style={{ marginLeft: "20px", marginTop: "8px" }}>
              {category.subCategories.map((subCategory) => (
                <li key={subCategory} className="sub-category font-sm">
                  <label>
                    {/* Checkbox for the sub-category */}
                    <input
                      type="checkbox"
                      checked={
                        selectedSubCategoryStates[category.name]?.[subCategory] || false // Check if the sub-category is selected
                      }
                      onChange={() =>
                        handleToggleSubCategoryCheckbox(subCategory, category.name) // Handle checkbox toggle
                      }
                    />
                    {subCategory} {/* Display the sub-category name */}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;