import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMeState } from "../../lib/meState.js";
import { getSubscriptionsForUser } from "../../api/stripe.js";
export default function OrderSuccess() {
  const { me, updateMe } = useMeState();

  useEffect(async () => {
    let response = await getSubscriptionsForUser(me.id);
    if (response.status >= 400) {
      console.log("error fetching user subscriptions");
    } else {
      const active = (element) => element.status === "active";
      if (response.data.some(active)) {
        updateMe({ ...me, subscription_status: "active" });
      }
    }
  }, []);
  return (
    <div>
      Welcome to Henslowe's Cloud. Thank you for subscribing. Feel free to
      explore. Checkout out our{" "}
      <Link to="/getting-started">Getting Started</Link>page for some help
      finding your way around.
    </div>
  );
}
