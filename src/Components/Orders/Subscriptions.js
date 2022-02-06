import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import { getSubscriptionsForUser } from "../../api/stripe.js";
import { getItems } from "../../api/crud.js";
import LoadingModal from "../LoadingModal.js";
import SubscriptionCard from "./SubscriptionCard.js";
import { useMeState } from "../../lib/meState.js";

const CardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 40px 0;
`;

const SubscriptionsStyles = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  padding-top: 45px;
  h3 {
    text-align: center;
    background-color: var(--color-light);
    padding: 15px;
    width: 100%;
  }
`;
export default function Subscriptions() {
  const { me } = useMeState();
  const [loading, setLoading] = useState(false);
  const [individualSubscriptions, setIndividualSubscriptions] = useState([]);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(async () => {
    if (me?.email) {
      setLoading(true);
      let userSubscriptions = await getSubscriptionsForUser(me.id);
      if (userSubscriptions.status >= 400) {
        console.log("error getting subscriptions");
      } else {
        if (userSubscriptions.data.length) {
          setAlreadySubscribed(true);
        } else {
          let res = await getItems("subscription");
          if (res.status >= 400) {
            console.log("error getting subscriptions");
          } else {
            let tempSubscriptions = res.data;
            let sortedSubscriptions = _.sortBy(tempSubscriptions, "name");
            let tempIndividual = [];
            sortedSubscriptions.map((subscription) => {
              if (subscription.name.toLowerCase().includes("institution")) {
                // tempInstitutional.push(subscription);
              } else {
                tempIndividual.push(subscription);
              }
            });
            setIndividualSubscriptions(tempIndividual);
          }
        }
      }
      setLoading(false);
    }
  }, []);
  //test data
  //   useEffect(() => {
  //     let tempIndividualSubscriptions = [
  //       {
  //         amount: 1000,
  //         description: "Full access for one individual for one month",
  //         id: 1,
  //         name: "Individual monthly",
  //       },
  //       {
  //         amount: 10000,
  //         description: "Full access for one individual for one year",
  //         id: 2,
  //         name: "Individual annual",
  //       },
  //     ];

  //     setIndividualSubscriptions(tempIndividualSubscriptions);
  //     let tempInstitutionalSubscriptions = [
  //       {
  //         amount: 4500,
  //         description: "Up to 5 users (monthly)",
  //         id: 2,
  //         name: "Institution—5",
  //       },
  //       {
  //         amount: 15000,
  //         description: "Up to 20 Users (monthly)",
  //         id: 1,
  //         name: "Institution—20",
  //       },
  //     ];

  //     setInstitutionalSubscriptions(tempInstitutionalSubscriptions);
  //   }, []);
  if (loading) return <LoadingModal />;
  if (!me.email) {
    return (
      <div>
        Before you can sign up for a paid subscription, you need to set up your
        login. It's easy! Just click that Google button at the top.
      </div>
    );
  }
  let individualSubscriptionCards = individualSubscriptions.map(
    (subscription) => (
      <li key={subscription.id}>
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          type="individual"
        />
      </li>
    )
  );

  return (
    <SubscriptionsStyles>
      <h2>Subscriptions</h2>
      {alreadySubscribed ? (
        <div>
          You already are subscribed. See your{" "}
          <Link to="/account">account page</Link> for details.
        </div>
      ) : (
        <CardContainer>{individualSubscriptionCards}</CardContainer>
      )}
    </SubscriptionsStyles>
  );
}
