import React from "react";
import Card from "./Card";

function Main({ cards, filteredCardCount, onAddToCart }) {
  console.log("Rendered Cards after filtering:", cards);
  return (
    <main className="main-layout">
      {/* Display the amount of Cards */}
      <p className="cards-count">
        {filteredCardCount} results found
      </p>

      {/* Cards Layout */}
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            category={card.category}
            subCategory={card.subCategory}
            price={card.price}
            onAddToCart={() => onAddToCart(card)} // Pass the card to the handler
          />
        ))}
      </section>
    </main>
  );
}

export default Main;