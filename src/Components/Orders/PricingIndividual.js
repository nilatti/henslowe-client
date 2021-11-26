import ComingSoon from "./ComingSoon";
import { Link } from "react-router-dom";
import ToolTip from "../ToolTip";
import { useMeState } from "../../lib/meState";
export default function PricingIndividual() {
  const { me } = useMeState();
  return (
    <div>
      <h2>Pricing for individuals</h2>
      <div>
        <h3>Do you need to pay at all?</h3>
        <div>
          <h4>Without an account, you can:</h4>
          <ul>
            <li>Try out cuts and doubling of plays*</li>
            <li>Download your cut play script*</li>
            <li>Calculate run times*</li>
            <li>Download part scripts*</li>
            <li>Make word clouds*</li>
          </ul>
          <h4>
            With a free account{" "}
            {!me.email && (
              <ToolTip>
                Just click the Google button at the top to register
              </ToolTip>
            )}
            , you can do all of the above, and:
          </h4>
          <ul>
            <li>Register for auditions</li>
            <li>Create and manage your profile and bio</li>
            <li>Update conflicts for your rehearsal team</li>
            <li>View rehearsal schedules</li>
            <li>Work many jobs at participating theaters</li>
          </ul>
        </div>
        <div>
          <h4>However, you cannot:</h4>
          <ul>
            <li>Save your script editing, doubling, or casting work</li>
            <li>Schedule rehearsals</li>
            <li>Create or manage theaters, productions, or spaces</li>
            <li>Build a creative team to share your work</li>
          </ul>
        </div>
      </div>
      <div>
        <h4>
          A <Link to="/checkout">paid subscription</Link> allows individuals**
          to:
        </h4>
        <ul>
          <li>Work over time on a script cut*</li>
          <li>Create casting, rehearsal schedules, and doubling</li>
          <li>Build a creative team</li>
          <li>Create rehearsal schedules</li>
          <li>Create and manage productions, theaters, and spaces</li>
        </ul>
      </div>
      <div>
        <div>
          <em>* Public domain plays only.</em>
        </div>
        <div>
          <em>
            ** Do you have more than five people on your team? Consider our{" "}
            <Link to="/pricing-institutional">institutional pricing</Link> to
            save some money!
          </em>
        </div>
      </div>
      <ComingSoon />
    </div>
  );
}
