import { Link } from "react-router-dom";
import { InfoTabStyles } from "../Styled.js";

export default function SpaceInfoTab({ space }) {
  return (
    <InfoTabStyles>
      <h2>
        <Link to={`/spaces/${space.id}`}>{space.name}</Link>
      </h2>
      {!!space.mission_statement && (
        <div>
          <em>{space.mission_statement}</em>
        </div>
      )}
      {!!space.street_address && !!space.city && !!space.state && space.zip && (
        <div>
          {!!space.street_address && (
            <span>
              {space.street_address}
              <br />
            </span>
          )}
          {!!space.city && <span>{space.city}, </span>}
          {!!space.state && <span>{space.state} </span>}
          {!!space.zip && <span>{space.zip}</span>}
        </div>
      )}
      {!!space.phone_number && <div>{space.phone_number}</div>}
      {!!space.website && (
        <div>
          <a href={"http://" + space.website} target="_blank">
            {space.website}
          </a>
        </div>
      )}
    </InfoTabStyles>
  );
}
