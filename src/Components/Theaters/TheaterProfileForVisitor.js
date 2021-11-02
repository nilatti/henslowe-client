export default function TheaterProfileForVisitor({ theater }) {
  return (
    <div>
      <h2>{theater.name}</h2>
      {!!theater.mission_statement && <div>{theater.mission_statement}</div>}
      {!!theater.street_address && (
        <div>
          {theater.street_address}
          <br />
          {theater.city}, {theater.state} {theater.zip}
          <br />
        </div>
      )}
      {!!theater.phone_number && <div>{theater.phone_number}</div>}
      {!!theater.website && (
        <div>
          <a href={"http://" + theater.website} target="_blank">
            {theater.website}
          </a>
        </div>
      )}
    </div>
  );
}
