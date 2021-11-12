export default function AuthorProfileForVisitor({ author, dates }) {
  return (
    <div>
      <h3>
        {author.first_name} {author.middle_name} {author.last_name}
      </h3>
      <div>{dates}</div>
      <div>{author.gender}</div>
      <div>{author.nationality}</div>
    </div>
  );
}
