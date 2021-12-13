import { Link } from "react-router-dom";
import styled from "styled-components";
import PaypalButton from "./PaypalButton";
const FooterStyle = styled.div`
  background-color: #ffcccb;
  padding: 25px;
  ul {
    list-style-type: circle;
  }
  li {
    list-style: circle;
  }
`;
export default function Footer() {
  return (
    <footer>
      <FooterStyle>
        <strong>Important note: This app is currently in beta mode.</strong>
        <br /> This means:
        <ul>
          <li>
            Some features may not work as expected (if you hit one of those,
            please <a href="mailto:henslowescloud@gmail.com">Email me</a>{" "}
            (henslowescloud@gmail.com))
          </li>
          <li>New features will appear frequently.</li>
          <li>
            <Link to="/subscriptions">Subscriptions are 33% off!</Link> Once the
            site is out of beta, the cost will increase from $8/month to
            $12/month and will include an annual option for savings. You will
            receive 30 days notice prior to this change and be able to opt out.
          </li>
          <li>
            Our payment processor (Stripe) has not yet recognized our business
            entity (a glitch on their end), so when you subscribe, you'll see my
            name (Aili Huber) rather than Henslowe's Cloud, as the pay-to
            entity.
          </li>
        </ul>
        <PaypalButton />
        <div>Created by Henslowe's Cloud Creative Consulting</div>
      </FooterStyle>
    </footer>
  );
}
