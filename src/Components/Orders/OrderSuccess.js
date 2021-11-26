import { useEffect } from "react";
import { useMeState } from "../../lib/meState";
import { getSubscriptionsForUser } from "../../api/stripe";
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
  return <div>{me.subscription_status}</div>;
}
