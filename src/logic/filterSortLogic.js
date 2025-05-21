// Filter cards based on selected categories and subcategories
export function filterCards(cards, selectedMainCategories, selectedSubCategoryStates) {
    const hasActiveMainCategory = Object.values(selectedMainCategories).some(
      (isActive) => isActive
    );
  
    if (!hasActiveMainCategory) {
      return [];
    }
  
    return cards.filter((card) => {
      const isMainCategorySelected = selectedMainCategories[card.category];
      const isSubCategorySelected =
        selectedSubCategoryStates[card.category]?.[card.subCategory];
  
      return isMainCategorySelected && isSubCategorySelected;
    });
  }
  
  // Sort cards based on the selected sort option
  export function sortCards(cards, sortOption) {
    switch (sortOption) {
      case "poetry":
        return cards.filter((card) => card.subCategory === "poetry");
      case "prose":
        return cards.filter((card) => card.subCategory === "prose");
      case "travel-guide":
        return cards.filter((card) => card.subCategory === "travel-guide");
      case "history":
        return cards.filter((card) => card.subCategory === "history");
      case "price ascending":
        return [...cards].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "price descending":
        return [...cards].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      case "alphabetical":
        return [...cards].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return cards;
    }
  }
