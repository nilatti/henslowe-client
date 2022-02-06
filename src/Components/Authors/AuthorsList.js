import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItems } from "../../api/crud.js";
// import "../ErrorApi";
import LoadingModal from "../LoadingModal.js";

export default function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [authorsLIs, setAuthorsLIs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authors.length) {
      let authorItems = authors.map((author) => (
        <li key={author.id}>
          {" "}
          <Link to={`/authors/${author.id}`}>
            {author.first_name} {author.last_name}
          </Link>
        </li>
      ));
      setAuthorsLIs(authorItems);
    }
  }, [JSON.stringify(authors)]);

  useEffect(async () => {
    setLoading(true);
    const response = await getItems("author");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching authors"]);
    } else {
      setAuthors(response.data);
    }
    setLoading(false);
  }, []);

  if (errors.length) {
    console.log("errors!");
    // return <ErrorApi errors={errors} />;
  }
  if (loading || !authors.length) {
    return <LoadingModal displayText="Loading authors" />;
  }
  return (
    <div>
      <ul>{authorsLIs}</ul>
      <Link to="/authors/new">Add New</Link>
    </div>
  );
}
