export default function SpaceProfileForVisitor({ space }) {
  return (
    <>
      <h2>{space.name}</h2>

      {space.mission_statement && (
        <p>
          <em>{space.mission_statement}</em>
        </p>
      )}
      {space.street_address && <p>{space.street_address}</p>}
      {space.city && (
        <p>
          {space.city}, {space.state} {space.zip}
        </p>
      )}
      {space.phone_number && <p>{space.phone_number}</p>}
      {space.website && (
        <a href={"http://" + space.website} target="_blank">
          {space.website}
        </a>
      )}
    </>
  );
}
