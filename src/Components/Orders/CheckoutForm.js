// tktktk
// refactor into just a CART that pulls PRODUCTS and PRICES from STRIPE API
// FIGURE OUT HOW TO CHECK SUBSCRIPTION STATUS FROM SERVER SIDE?
import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, createCheckoutSession } from "../../api/stripe";
export default function CheckoutForm() {
  // 1️⃣ Setup state to track client secret, errors and checkout status
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  // 2️⃣ Store reference to Stripe
  const stripe = useStripe();
  const elements = useElements();
  useEffect(async () => {
    let res = await createPaymentIntent({
      amount: 1000,
    });
    setClientSecret(res.data.clientSecret);
  }, []);
  const handleChange = async (event) => {
    // 4️⃣ Listen for changes in the CardElement and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    let res = await createCheckoutSession();
    window.location.href = res.data.stripeUrl;
  };
  // 6️⃣ Construct UI.
  if (!clientSecret) {
    return <div>Loading</div>;
  }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={{}} onChange={handleChange} />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {succeeded && <div>Payment success!</div>}
    </form>
  );
}
