import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function Card({
  image,
  title,
  description,
  category,
  subCategory,
  price,
  onAddToCart,
}) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="category-row">
        <span className="category">{category}</span>
        <span className="sub-category">{subCategory}</span>
      </p>
      <p className="price">${price}</p>
      <button className="add-to-cart" onClick={onAddToCart}>
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
}

export default Card;