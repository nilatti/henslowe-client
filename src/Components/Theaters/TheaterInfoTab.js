import { Link } from "react-router-dom";
import { InfoTabStyles } from "../Styled";

export default function TheaterInfoTab({ theater }) {
  return (
    <InfoTabStyles>
      <h2>
        <Link to={`/theaters/${theater.id}`}>{theater.name}</Link>
      </h2>
      {!!theater.mission_statement && (
        <div>
          <em>{theater.mission_statement}</em>
        </div>
      )}
      <div>
        {!!theater.street_address && (
          <span>
            {theater.street_address}
            <br />
          </span>
        )}
        {!!theater.city && <span>{theater.city}, </span>}
        {!!theater.state && <span>{theater.state} </span>}
        {!!theater.zip && <span>{theater.zip}</span>}
      </div>
      {!!theater.phone_number && <div>{theater.phone_number}</div>}
      {!!theater.website && (
        <div>
          <a href={"http://" + theater.website} target="_blank">
            {theater.website}
          </a>
        </div>
      )}
    </InfoTabStyles>
  );
}
