function Cart({ items, onProceedToCheckout }) {
  // Calculate the total price of all items in the cart
  // `.reduce` iterates over the items array and sums up the prices
  // `.parseFloat` ensures the price is treated as a number
  const totalPrice = items
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2); // Format the total price to 2 decimal places

  // Debugging logs to check the cart items and the checkout handler
  console.log("Cart items:", items);
  console.log("onProceedToCheckout:", onProceedToCheckout);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {/* If the cart is empty, display a message */}
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {/* Map over the items array to render each cart item */}
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              {/* Display the item's image */}
              <img
                src={item.image} // Image URL of the item
                alt={item.title} // Alt text for the image
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span className="cart-item-title">{item.title}</span>
                <span className="cart-item-id">ID: {item.id}</span>
                <span className="cart-item-price">{item.price}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        {/* Display the total price of the cart */}
        <p>
          Total: <span style={{ float: "right" }}>{totalPrice} €</span>
        </p>
        {/* Button to proceed to the checkout process */}
        <button
          className="checkout-button"
          onClick={() => {
            console.log("Proceed to Checkout clicked"); // Debugging log for button click
            onProceedToCheckout(); // Call the provided handler to proceed to checkout
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;