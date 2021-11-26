import _ from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubscriptionItem from "./SubscriptionItem";
import { Profile } from "../Styled";
import { useMeState } from "../../lib/meState";
import {
  getSubscriptionsForUser,
  updatePaymentInformation,
} from "../../api/stripe";
import LoadingModal from "../LoadingModal";
import { Button } from "../Button";
export default function IndividualAccount() {
  const { me } = useMeState();
  const [loading, setLoading] = useState(false);
  const [currentlyActiveSubscription, setCurrentlyActiveSubscription] =
    useState();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionItems, setSubscriptionItems] = useState([]);
  useEffect(async () => {
    setLoading(true);
    let res = await getSubscriptionsForUser(me.id);
    if (res.status >= 400) {
      console.log("error getting subscriptions");
    } else {
      let sortedSubscriptions = _.sortBy(res.data, "current_period_start");
      setSubscriptions(sortedSubscriptions);
      if (
        sortedSubscriptions[sortedSubscriptions.length - 1].status == "active"
      ) {
        setCurrentlyActiveSubscription(
          sortedSubscriptions[sortedSubscriptions.length - 1]
        );
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let subscriptionItems = subscriptions.map((subscription) => (
      <SubscriptionItem
        key={subscription.subscription_id}
        setLoading={setLoading}
        subscription={subscription}
        updateSubscription={updateSubscription}
      />
    ));
    setSubscriptionItems(subscriptionItems);
  }, [subscriptions]);

  async function updatePaymentInformationLocal() {
    let res = await updatePaymentInformation();
    window.location.href = res.data.stripeUrl;
  }

  function updateSubscription(updatedSubscription) {
    let updatedSubscriptions = subscriptions.map((subscription) =>
      subscription.id == updatedSubscription.id
        ? updatedSubscription
        : subscription
    );
    setSubscriptions(updatedSubscriptions);
  }
  if (loading) {
    return <LoadingModal />;
  }
  return (
    <Profile>
      <h2>{me.name}</h2>
      <div>
        <div>{me.email}</div>
        <Link to={`/users/${me.id}`}>
          View and edit your contact info, bio, and other details.
        </Link>
      </div>
      <div>
        <h3>Subscription info</h3>
        {subscriptionItems}
      </div>
      {currentlyActiveSubscription && (
        <div>
          <Button onClick={updatePaymentInformationLocal}>
            Update payment information
          </Button>
        </div>
      )}
    </Profile>
  );
}
