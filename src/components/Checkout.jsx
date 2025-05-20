import React, { useState } from "react";

function Checkout() {
  // State to track the current step in the checkout process
  const [step, setStep] = useState(1);

  // State to track the selected payment method (e.g., credit card, PayPal, etc.)
  const [paymentMethod, setPaymentMethod] = useState("");

  // Function to move to the next step in the checkout process
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1); // Increment the step by 1
  };

  // Function to move to the previous step in the checkout process
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1); // Decrement the step by 1
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Step 1: Collect shipping information */}
      {step === 1 && (
        <div>
          <h3>Step 1: Shipping Information</h3>
          <form>
            {/* Input fields for user shipping details */}
            <label>
              Name:
              <input type="text" placeholder="Enter your name" />
            </label>
            <label>
              Address:
              <input type="text" placeholder="Enter your address" />
            </label>
            <label>
              City:
              <input type="text" placeholder="Enter your city" />
            </label>
            {/* Button to proceed to the next step */}
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Select payment method */}
      {step === 2 && (
        <div>
          <h3>Step 2: Payment Information</h3>
          <p>Please select a payment method:</p>
          <div className="payment-options">
            {/* Radio buttons for selecting a payment method */}
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method state
              />
              <span>Credit Card</span>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>PayPal</span>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="googlePay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Google Pay</span>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="applePay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Apple Pay</span>
            </label>
          </div>

          {/* Conditional rendering based on the selected payment method */}
          {paymentMethod === "creditCard" && (
            <div className="credit-card-form">
              <h4>Credit Card Details</h4>
              <form>
                {/* Disabled input fields to prevent real data entry */}
                <label>
                  Card Number:
                  <input
                    type="text"
                    placeholder="Enter your card number"
                    disabled
                  />
                </label>
                <label>
                  Expiration Date:
                  <input type="text" placeholder="MM/YY" disabled />
                </label>
                <label>
                  CVV:
                  <input type="text" placeholder="Enter CVV" disabled />
                </label>
              </form>
              <p style={{ color: "red", fontSize: "14px" }}>
                This is a demo shop. Credit card input is disabled.
              </p>
            </div>
          )}

          {paymentMethod === "googlePay" && (
            <div className="google-pay-info">
              <h4>Google Pay</h4>
              <p>
                {/* Placeholder for Google Pay logo */}
                <div
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "#4285F4",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                >
                  Google Pay
                </div>
              </p>
              <p>This is a demo shop. No real transactions are processed.</p>
            </div>
          )}

          {paymentMethod === "applePay" && (
            <div className="apple-pay-info">
              <h4>Apple Pay</h4>
              <p>
                {/* Placeholder for Apple Pay logo */}
                <div
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "black",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                >
                  Apple Pay
                </div>
              </p>
              <p>This is a demo shop. No real transactions are processed.</p>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="paypal-info">
              <h4>PayPal</h4>
              <p>
                {/* Placeholder for PayPal logo */}
                <div
                  style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "#003087",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                >
                  PayPal
                </div>
              </p>
              <p>This is a demo shop. No real transactions are processed.</p>
            </div>
          )}

          {/* Navigation buttons */}
          <button type="button" onClick={handlePreviousStep}>
            Back
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            disabled={!paymentMethod} // Disable Next button until a payment method is selected
          >
            Next
          </button>
        </div>
      )}

      {/* Step 3: Review and confirm the order */}
      {step === 3 && (
        <div>
          <h3>Step 3: Review and Confirm</h3>
          <p>Please review your order and confirm.</p>
          {/* Navigation buttons */}
          <button type="button" onClick={handlePreviousStep}>
            Back
          </button>
          <button type="button" onClick={handleNextStep}>
            Confirm Order
          </button>
        </div>
      )}

      {/* Step 4: Final message after confirmation */}
      {step === 4 && (
        <div>
          <h3>Order Not Processed</h3>
          <p>
            Thank you for visiting our demo webshop. Please note that this is a
            demonstration, and no orders are being processed.
          </p>
          <p>
            Feel free to explore the site further or contact us for more
            information.
          </p>
          {/* Button to restart the checkout process */}
          <button type="button" onClick={() => setStep(1)}>
            Back to Start
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;