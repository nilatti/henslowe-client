import styled from "styled-components";
const PaypalContainer = styled.div`
  padding-left: 10px;
`;
export default function PaypalButton() {
  return (
    <PaypalContainer>
      <div>
        <em>
          <strong>This service will become unavailable on September 3.</strong>
          <br />
          It costs $100/month to operate.
          <br />
          If I get $100 in donations, I'll leave it up for another month.
          <br />
          <strong>
            Update: Four awesome people have donated a total of $50, which
            allowed us to extend our shut off date by two weeks!
          </strong>
          <br />
          Please help pay for server costs by hitting the donate button!
        </em>
      </div>

      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="business" value="SSWMQZABFJP92" />
        <input type="hidden" name="no_recurring" value="0" />
        <input
          type="hidden"
          name="item_name"
          value="Support keeping this free tool online!"
        />
        <input type="hidden" name="currency_code" value="USD" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </PaypalContainer>
  );
}
