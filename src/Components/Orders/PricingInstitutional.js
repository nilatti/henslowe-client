import ComingSoon from "./ComingSoon.js";
export default function PricingInstitutional() {
  return (
    <div>
      <h2>Pricing for institutions</h2>
      <div>
        <em>
          Institutions pay by the maximum number of users in a given month. A
          subscription allows an institution to have up to a certain number of
          users. You can always see which people are counted as paid in your
          Account Manager.
        </em>
        <div>
          <h4>Not all users at a theater require a subscription.</h4>
          Users who are not <em>creating and saving data</em> can register for a
          free account, and will not count against your institutional total.
          <br />
          Examples include:
          <ul>
            <li>Actors</li>
            <li>Board operators</li>
            <li>Ushers</li>
            <li>Deck crew</li>
            <li>Stitchers</li>
          </ul>
        </div>
        <div>
          <h4>
            People in leadership or design roles should have paid memberships
          </h4>
          Examples include:
          <ul>
            <li>Producer</li>
            <li>House manager</li>
            <li>Set designer</li>
            <li>Director</li>
          </ul>
          A paid subscription allows a user to:
          <ul>
            <li>Work over time on a script cut*</li>
            <li>Create casting, rehearsal schedules, and doubling</li>
            <li>Build a creative team</li>
            <li>Create rehearsal schedules</li>
            <li>Create and manage productions, theaters, and spaces</li>
          </ul>
        </div>
      </div>
      <div>
        <em>* Public domain plays only.</em>
      </div>
      <ComingSoon />
    </div>
  );
}
