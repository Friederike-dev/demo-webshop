// Function to toggle the visibility (expanded/collapsed) of a category
export const toggleCategory = (category, expandedCategories) => ({
  ...expandedCategories,
  [category]: !expandedCategories[category], // Toggle the expanded state of the category
});

// Function to toggle the checkbox state of a main category
export const toggleCategoryCheckbox = (
  category, // The main category being toggled
  selectedCategories, // Current state of selected main categories
  selectedSubCategoryStates // Current state of selected sub-categories
) => {
  const isCurrentlySelected = selectedCategories[category]; // Check if the category is currently selected

  // Explicitly set the main category to true or false
  const updatedCategories = {
    ...selectedCategories,
    [category]: !isCurrentlySelected, // Toggle the selected state
  };

  // Update all sub-categories of the main category accordingly
  const updatedSubCategories = {
    ...selectedSubCategoryStates,
    [category]: Object.keys(selectedSubCategoryStates[category]).reduce(
      (acc, subCategory) => {
        acc[subCategory] = !isCurrentlySelected; // Set all sub-categories to match the main category's state
        return acc;
      },
      {}
    ),
  };

  return { updatedCategories, updatedSubCategories }; // Return the updated states
};

// Function to toggle the checkbox state of a sub-category
export const toggleSubCategoryCheckbox = (
  subCategory, // The sub-category being toggled
  mainCategory, // The parent main category of the sub-category
  selectedSubCategoryStates, // Current state of selected sub-categories
  selectedCategories // Current state of selected main categories
) => {
  const isCurrentlySelected = selectedSubCategoryStates[mainCategory][subCategory]; // Check if the sub-category is currently selected

  // Explicitly set the sub-category to true or false
  const updatedSubCategories = {
    ...selectedSubCategoryStates,
    [mainCategory]: {
      ...selectedSubCategoryStates[mainCategory],
      [subCategory]: !isCurrentlySelected, // Toggle the selected state of the sub-category
    },
  };

  // Check if at least one sub-category in the main category is selected
  const isAnySubCategorySelected = Object.values(
    updatedSubCategories[mainCategory]
  ).some((isSelected) => isSelected);

  // Update the main category's state based on the sub-categories
  const updatedCategories = {
    ...selectedCategories,
    [mainCategory]: isAnySubCategorySelected, // Set the main category to true if any sub-category is selected
  };

  return { updatedCategories, updatedSubCategories }; // Return the updated states
};

// Function to synchronize the states of main categories and sub-categories
export const synchronizeStates = (selectedMainCategories, selectedSubCategoryStates) => {
  const synchronizedMainCategories = { ...selectedMainCategories }; // Copy the current state of main categories
  const synchronizedSubCategoryStates = { ...selectedSubCategoryStates }; // Copy the current state of sub-categories

  // Synchronize main categories based on the state of their sub-categories
  Object.keys(selectedSubCategoryStates).forEach((mainCategory) => {
    const subCategories = selectedSubCategoryStates[mainCategory];
    const isAnySubCategorySelected = Object.values(subCategories).some(
      (isSelected) => isSelected
    );

    synchronizedMainCategories[mainCategory] = isAnySubCategorySelected; // Set the main category to true if any sub-category is selected
  });

  return { synchronizedMainCategories, synchronizedSubCategoryStates }; // Return the synchronized states
};

// Function to initialize the states of main categories and sub-categories
export const initializeCategoryStates = (categories) => {
  const selectedCategories = {}; // Object to store the state of main categories
  const selectedSubCategoryStates = {}; // Object to store the state of sub-categories

  // Iterate over the list of categories to initialize their states
  categories.forEach((category) => {
    selectedCategories[category.name] = true; // Default: All main categories are selected
    selectedSubCategoryStates[category.name] = {}; // Initialize sub-categories for the main category

    // Iterate over the sub-categories of the current main category
    category.subCategories.forEach((subCategory) => {
      selectedSubCategoryStates[category.name][subCategory] = true; // Default: All sub-categories are selected
    });
  });

  return { selectedCategories, selectedSubCategoryStates }; // Return the initialized states
};