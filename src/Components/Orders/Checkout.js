import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Subscriptions from "./Subscriptions";

const promise = loadStripe(
  "pk_test_51JvpnlByfAWeC6KoHW3Ez3fbaNJxc6RzSjXPQ7O1WaHp6SFgesxN16ZzWjarQOu8J0wiS6eYY8pDVXnf3OFdwhL500pJFSPu8Y"
);
export default function Checkout({ orderId }) {
  //tktktk extract publishable key to env var
  const options = {
    // passing the client secret obtained from the server
    clientSecret: `${process.env.REACT_APP_STRIPE_CLIENT_SECRET}`,
  };
  if (!promise) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>Subscriptions</h1>
      <Elements stripe={promise}>
        <Subscriptions />
      </Elements>
    </div>
  );
}
