import API from "./api";

async function createCheckoutSession({ price, subscription_id }) {
  return API.post("charges/create_checkout_session", {
    price,
  });
}

async function deleteSubscription(subscriptionId) {
  return API.get("subscriptions/delete_subscription", {
    params: {
      subscription_id: subscriptionId,
    },
  });
}

async function getSubscriptionsForUser(userId) {
  return API.request("subscriptions/get_subscriptions_for_user", {
    params: {
      user_id: userId,
    },
  });
}

async function renewSubscription(subscriptionId) {
  return API.get("subscriptions/renew_subscription", {
    params: {
      subscription_id: subscriptionId,
    },
  });
}

async function updatePaymentInformation() {
  return API.post("charges/update_payment_info");
}
export {
  createCheckoutSession,
  deleteSubscription,
  getSubscriptionsForUser,
  renewSubscription,
  updatePaymentInformation,
};
