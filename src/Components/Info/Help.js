import { Link } from "react-router-dom";
export default function Help() {
  return (
    <div>
      Help & info here
      <ul>
        <li>
          <Link to="getting-started">Getting Started</Link>
        </li>
        <li>
          <Link to="faq">Frequently Asked Questions</Link>
        </li>
      </ul>
    </div>
  );
}
