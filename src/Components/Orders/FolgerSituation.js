import { Link } from "react-router-dom";
export default function FolgerSituation() {
  return (
    <div>
      <div>
        Currently, our Shakespeare texts are based on the{" "}
        <a href="https://shakespeare.folger.edu/">Folger Shakespeare</a>. Their
        licensing agreement allows only <em>non-commercial use</em>.
      </div>
      <div>
        For the time being, we are fulfilling this requirement by allowing full
        access to everything that uses the Folger texts to all free accounts. No
        paid-only features rely on these texts.
      </div>
      <div>
        However, it is possible that this will become financially unsustainable.
        If we need to change this arrangement, you will receive ample notice via
        email and also a site notification upon login. If you would like to help
        keep this freely available, please consider donating what you can, or{" "}
        <Link to="/subscriptions">sign up for a membership</Link> (only
        <strike>$12/month</strike> $8/month while the site is in beta).
      </div>
    </div>
  );
}
