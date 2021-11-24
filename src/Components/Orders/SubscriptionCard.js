import { Link } from "react-router-dom";
import styled from "styled-components";
import { createCheckoutSession } from "../../api/stripe";
const CardStyle = styled.div`
  align-items: center;
  background: var(--color-dark);
  border-radius: 5px;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-flow: column nowrap;
  height: 250px;
  justify-content: space-between;
  margin: 30px;
  width: 250px;
`;
const CardContent = styled.div`
  padding: 20px;
  text-align: center;
  h2 {
    font-size: 1.8rem;
    color: #fff;
    z-index: 1;
    transition: 0.5s;
    margin-bottom: 15px;
  }
  p {
    font-size: 1.3rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.9);
    z-index: 1;
    transition: 0.5s;
  }
  a {
    position: relative;
    display: inline-block;
    padding: 8px 20px;
    background: black;
    border-radius: 5px;
    text-decoration: none;
    color: white;
    margin-top: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
      background: #fff;
      color: #000;
    }
  }
`;
const InfoButton = styled.div`
  background-color: var(--color-very-dark);
  color: var(--color-light);
  display: flex;
  flex: 1;
  font-weight: 600;
  justify-content: center;
  padding: 5px 10px;
  &:hover {
    background-color: var(--color-light);
    color: var(--color-very-dark);
  }
`;
const InfoButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  width: 100%;
`;
export default function SubscriptionCard({ subscription, type }) {
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    let res = await createCheckoutSession({ price: subscription.price });
    window.location.href = res.data.stripeUrl;
  };
  return (
    <CardStyle>
      <CardContent>
        <h2>{subscription.description}</h2>
        <p>${subscription.amount / 100}</p>
      </CardContent>
      <InfoButtonContainer>
        <InfoButton>
          <Link to={`/pricing_${type}`}>Learn More</Link>
        </InfoButton>

        <InfoButton>
          <a onClick={handleSubmit}>Subscribe</a>
        </InfoButton>
      </InfoButtonContainer>
    </CardStyle>
  );
}
