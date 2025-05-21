import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Cart from "./Cart";
import Navbar from "./Navbar";
import About from "./About";
import Checkout from "./Checkout";
import { initializeCategoryStates } from "../logic/categoryLogic";
import { filterCards, sortCards } from "../logic/filterSortLogic";

function App() {
  // **State-Management**
  const [cards, setCards] = useState([]); // State to store the list of cards
  const [cartItems, setCartItems] = useState([]); // State to store items in the cart
  const [showCart, setShowCart] = useState(false); // State to toggle the visibility of the cart
  // const [showNavbar, setShowNavbar] = useState(true); // State to toggle the visibility of the navbar
  const [sortOption, setSortOption] = useState(""); // State to store the selected sorting option
  const [showAbout, setShowAbout] = useState(false); // State to toggle the About page
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to store the window width
  const [showCheckout, setShowCheckout] = useState(false); // State to toggle the Checkout page

  // **Categories and Sub-Categories Initialization**
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

  // Initialize the states for selected main categories and sub-categories
  const {
    selectedCategories: initialMainCategories,
    selectedSubCategoryStates: initialSubCategoryStates,
  } = initializeCategoryStates(categories);

  const [selectedMainCategories, setSelectedMainCategories] = useState(
    initialMainCategories
  ); // State for main categories
  const [selectedSubCategoryStates, setSelectedSubCategoryStates] = useState(
    initialSubCategoryStates
  ); // State for sub-categories

  let idCounter = 0; // ID counter for cards

  // **Helper Function: Create a Card**
  function createCard(
    image,
    title,
    description,
    mainCategory,
    subCategoryName,
    price
  ) {
    const randomSubCategories = ["poetry", "prose", "travel-guide", "history"];
    const randomMainCategories = [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
    ];

    return {
      id: idCounter++, // Increment the ID counter for each card
      image: image || `https://picsum.photos/150/100?random=${Math.random()}`, // Generate a random image if none is provided
      title: title || `Title for Card-Id ${idCounter}`, // Generate a default title if none is provided
      description: description || `This is a random description.`, // Generate a default description if none is provided
      category:
        mainCategory ||
        randomMainCategories[
          Math.floor(Math.random() * randomMainCategories.length)
        ], // Assign a random main category if none is provided
      subCategory:
        subCategoryName ||
        randomSubCategories[
          Math.floor(Math.random() * randomSubCategories.length)
        ], // Assign a random sub-category if none is provided
      price: `${price || (Math.random() * 100).toFixed(2)} €`, // Generate a random price if none is provided
    };
  }

  // **Initialize Cards**
  useEffect(() => {
    const randomCards = Array.from({ length: 10 }, () => createCard()); // Generate 10 random cards
    const specificCards = [
      createCard(
        "https://picsum.photos/150/100?random=100",
        "Specific Title 1",
        "This is a specific description for card 1.",
        "Category 1",
        "poetry",
        "19.99"
      ),
      createCard(
        "https://picsum.photos/150/100?random=101",
        "Specific Title 2",
        "This is a specific description for card 2.",
        "Category 2",
        "prose",
        "29.99"
      ),
    ];

    const allCards = [...randomCards, ...specificCards]; // Combine random and specific cards
    setCards(allCards); // Set the cards in the state
  }, []);

  
  // **Apply Filtering and Sorting Logic**
  const filteredCards = filterCards(
    cards,
    selectedMainCategories, // Passed from Navbar
    selectedSubCategoryStates // Passed from Navbar
  );
  const finalCards = sortCards(filteredCards, sortOption); // Apply sorting to the filtered cards

  // Calculate the number of filtered cards
  const filteredCardCount = finalCards.length;

  // listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Event Listener hinzufügen
    return () => {
      window.removeEventListener("resize", handleResize); // Event Listener entfernen
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 940 && showCart) {
      setShowCart(false); // deactivate middle cart and show the 3 columns again
    }
  }, [windowWidth, showCart]);

  // Callback function to handle "About" clicks
  const handleAboutClick = () => {
    setShowAbout(true); // Show About
    setShowCart(false); // Hide Cart
  };

  // Callback function to handle "Home" clicks
  const handleHomeClick = () => {
    setShowAbout(false); // Hide About
    setShowCart(false); // Hide Cart
    setShowCheckout(false); // Hide Checkout
  };

  // Callback function to handle "Cart" clicks
  const handleCartClick = () => {
    setShowCart(true); // Show Cart
    setShowAbout(false); // Hide About
  };

  // Function to handle adding an item to the cart
  const handleAddToCart = (card) => {
    const newItem = {
      id: card.id,
      image: card.image, // Use the original image URL
      title: card.title,
      price: card.price,
    };
    setCartItems((prevItems) => [...prevItems, newItem]); // Add the new item to the cart
  };

  console.log("showCart:", showCart);
  console.log("cartItems:", cartItems);


  // Callback function to handle "Proceed to Checkout" clicks
  const handleProceedToCheckout = () => {
    console.log("Navigating to Checkout");
    setShowCheckout(true); // Show Checkout
    setShowCart(false); // Hide Cart
    setShowAbout(false); // Hide About
  };
  console.log("handleProceedToCheckout:", handleProceedToCheckout);


  // **Component Rendering**
  return (
    <div className="app">
      <Header
        selectedCategories={selectedMainCategories} // Pass main categories to Header
        selectedSubCategoryStates={selectedSubCategoryStates} // Pass sub-categories to Header
        onCategoryChange={(updatedMainCategories, updatedSubCategories) => {
          setSelectedMainCategories(updatedMainCategories); // Update main categories
          setSelectedSubCategoryStates(updatedSubCategories); // Update sub-categories
        }}
        onSortSelect={(option) => setSortOption(option)} // Update the sorting option
        onAboutClick={handleAboutClick} // Pass the About click handler to Header
        onHomeClick={handleHomeClick} // Pass the Home click handler to Header
        onCartClick={handleCartClick} // Toggle the cart visibility
        cartItemCount={cartItems.length}
      />
      <div className="content-wrapper">

        {showAbout ? (
          <div className="about-container">
            <About /> {/* Render the About component */}
          </div>


        ) : showCart ? (
          <div className="cart-container">
          <Cart items={cartItems} onProceedToCheckout={handleProceedToCheckout} />
          </div>

        ) : showCheckout ? (
          <div className="checkout-container">
            <Checkout />
          </div>


        ) : (
          <div className="layout">
            {/* Render Navbar only if screen width >= 940px */}
            {windowWidth >= 940 && (
              <Navbar
                onCategoryFilter={(
                  updatedMainCategories,
                  updatedSubCategories
                ) => {
                  setSelectedMainCategories(updatedMainCategories);
                  setSelectedSubCategoryStates(updatedSubCategories);
                }}
                onSortSelect={(option) => setSortOption(option)}
              />
            )}

            <Main
              cards={finalCards}
              filteredCardCount={filteredCardCount}
              onAddToCart={handleAddToCart} // Pass the add-to-cart handler to Main
            />

            {/* Render Cart only if screen width >= 940px */}
            {windowWidth >= 940 && !showCart && (
      <Cart items={cartItems} onProceedToCheckout={handleProceedToCheckout} />
    )}
          </div>
        )}
      </div>
      <Footer /> {/* Render the footer */}
    </div>
  );
}

export default App;
