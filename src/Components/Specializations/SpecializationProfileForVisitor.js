export default function SpecializationProfileForVisitor({ specialization }) {
  return (
    <div>
      <h2>{specialization.title}</h2>
      <div>
        <em>{specialization.description}</em>
      </div>
    </div>
  );
}
