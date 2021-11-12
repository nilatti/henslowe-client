import { useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud";

import AuthorsList from "./AuthorsList";
import AuthorWrapper from "./AuthorWrapper";
import NewAuthor from "./NewAuthor";
import ErrorMessages from "../ErrorMessages";

export default function Authors() {
  const history = useHistory();
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState([]);

  async function handleCreateFormSubmit(newAuthor) {
    const response = await createItem(newAuthor, "author");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching authors"]);
    } else {
      let newAuthors = (authors) => [...authors, newAuthor];
      setAuthors(newAuthors);
      history.push(`/authors/${response.data.id}`);
    }
  }

  async function handleDeleteClick(authorId) {
    const response = await deleteItem(authorId, "author");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching authors"]);
    } else {
      let newAuthors = authors.filter((author) => author.id != authorId);
      setAuthors(newAuthors);
      history.push("/authors");
      history.go();
    }
  }

  async function handleEditFormSubmit(newAuthor) {
    const response = await updateServerItem(newAuthor, "author");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error updating author"]);
    } else {
      let newAuthors = authors.map((author) => {
        if (author.id != newAuthor.id) {
          return author;
        } else {
          return response.data;
        }
      });
      setAuthors(newAuthors);
      history.push(`/authors/${response.data.id}`);
      history.go();
    }
  }

  return (
    <div id="authors">
      <h2>
        <Link to="/authors">Authors</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Switch>
        <Route
          path="/authors/new"
          render={(props) => (
            <NewAuthor {...props} onFormSubmit={handleCreateFormSubmit} />
          )}
        />
        <Route
          path={`/authors/:authorId`}
          render={(props) => (
            <AuthorWrapper
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/authors/"}
          render={(props) => <AuthorsList {...props} />}
        />
      </Switch>
    </div>
  );
}
