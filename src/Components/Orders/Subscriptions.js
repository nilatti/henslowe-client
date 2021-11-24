import { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { getItems } from "../../api/crud";
import LoadingModal from "../LoadingModal";
import SubscriptionCard from "./SubscriptionCard";

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
  const [loading, setLoading] = useState(false);
  const [individualSubscriptions, setIndividualSubscriptions] = useState([]);
  const [institutionalSubscriptions, setInstitutionalSubscriptions] = useState(
    []
  );
  useEffect(async () => {
    setLoading(true);
    let res = await getItems("subscription");
    if (res.status >= 400) {
      console.log("error getting subscriptions");
    } else {
      let tempSubscriptions = res.data;
      let sortedSubscriptions = _.sortBy(tempSubscriptions, "name");
      let tempIndividual = [];
      let tempInstitutional = [];
      sortedSubscriptions.map((subscription) => {
        if (subscription.name.toLowerCase().includes("institution")) {
          tempInstitutional.push(subscription);
        } else {
          tempIndividual.push(subscription);
        }
      });
      setIndividualSubscriptions(tempIndividual);
      setInstitutionalSubscriptions(tempInstitutional);
    }
    setLoading(false);
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
  let individualSubscriptionCards = individualSubscriptions.map(
    (subscription) => (
      <li>
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          type="individual"
        />
      </li>
    )
  );
  let institutionalSubscriptionCards = institutionalSubscriptions.map(
    (subscription) => (
      <li>
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          type="institutional"
        />
      </li>
    )
  );
  return (
    <SubscriptionsStyles>
      <h3>Subscriptions for Individuals</h3>
      <CardContainer>{individualSubscriptionCards}</CardContainer>
      <h3>Subscriptions for Institutions</h3>
      <CardContainer>{institutionalSubscriptionCards}</CardContainer>
    </SubscriptionsStyles>
  );
}
