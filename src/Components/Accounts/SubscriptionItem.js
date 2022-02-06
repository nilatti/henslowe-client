import { useEffect, useState } from "react";
import { deleteSubscription, renewSubscription } from "../../api/stripe.js";
import { Button } from "../Button.js";
import { useMeState } from "../../lib/meState.js";

import Modal from "../Modal.js";
import { DisplayDate } from "../../utils/dateTimeUtils.js";
export default function SubscriptionItem({
  setLoading,
  subscription,
  updateSubscription,
}) {
  const { me } = useMeState();
  const [cancellationSuccessful, setCancellationSuccessful] = useState(false);
  const [renewalSuccessful, setRenewalSuccessful] = useState(false);
  const [renewedEndDate, setRenewedEndDate] = useState(new Date());

  useEffect(() => {
    let tempDate = new Date(subscription.current_period_end * 1000);
    tempDate.setYear(tempDate.getYear() + 1);
    setRenewedEndDate(tempDate);
  }, []);
  async function cancelSubscription() {
    let response = await deleteSubscription(subscription.subscription_id);
    if (response.status >= 400) {
      console.log("error cancelling subscription");
    } else {
    }
  }

  async function cancelSubscription() {
    setLoading(true);
    let response = await deleteSubscription(subscription.subscription_id);
    if (response.status >= 400) {
      console.log("error renewing subscription");
    } else {
      if (response.data.cancel_at_period_end) {
        updateSubscription({
          ...subscription,
          cancel_at_period_end: true,
          current_period_end: response.data.current_period_end,
        });
        setCancellationSuccessful(true);
      }
    }
    setLoading(false);
  }

  async function processRenewSubscription() {
    setLoading(true);
    let response = await renewSubscription(subscription.subscription_id);
    if (response.status >= 400) {
      console.log("error renewing subscription");
    } else {
      if (!response.data.cancel_at_period_end) {
        updateSubscription({
          ...subscription,
          cancel_at_period_end: false,
          current_period_end: response.data.current_period_end,
        });
        setRenewalSuccessful(true);
      }
    }
    setLoading(false);
  }
  if (cancellationSuccessful) {
    return (
      <Modal>
        <div>
          Your cancellation was successful. Your subscription will end on:{" "}
          <DisplayDate
            date={new Date(subscription.current_period_end * 1000)}
            timezone={me.timezone}
          />
          <Button onClick={() => setCancellationSuccessful(false)}>Back</Button>
        </div>
      </Modal>
    );
  }
  if (renewalSuccessful) {
    return (
      <Modal>
        <div>
          Renewal successful! New end date is:{" "}
          <DisplayDate date={renewedEndDate} timezone={me.timezone} />
          <Button onClick={() => setRenewalSuccessful(false)}>Back</Button>
        </div>
      </Modal>
    );
  }
  return (
    <li>
      <div>
        <strong>{subscription.name}</strong>
      </div>
      <div>Status: {subscription.status}</div>
      <div>
        Started:{" "}
        <DisplayDate
          date={new Date(subscription.current_period_start * 1000)}
          timezone={me.timezone}
        />
      </div>
      <div>
        {subscription.cancel_at_period_end ? (
          <span>Cancels on:</span>
        ) : (
          <span>Renews on:</span>
        )}{" "}
        <DisplayDate
          date={new Date(subscription.current_period_end * 1000)}
          timezone={me.timezone}
        />
      </div>
      {!subscription.cancel_at_period_end ? (
        <Button onClick={cancelSubscription}>
          Cancel subscription at end of current period
        </Button>
      ) : (
        <Button onClick={processRenewSubscription}>Renew subscription</Button>
      )}
      <hr />
    </li>
  );
}
