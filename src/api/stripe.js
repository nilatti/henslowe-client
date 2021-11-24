import API from "./api";

async function createPaymentIntent({ amount }) {
  return API.post(`charges/create_payment_intent`, {
    amount,
  });
}

async function createCheckoutSession({ price }) {
  return API.post("/charges/create_checkout_session", {
    price,
  });
}

export { createCheckoutSession, createPaymentIntent };
