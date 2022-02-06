import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud.js";

import AuthorsList from "./AuthorsList.js";
import AuthorWrapper from "./AuthorWrapper.js";
import NewAuthor from "./NewAuthor.js";
import ErrorMessages from "../ErrorMessages.js";

export default function Authors() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState([]);

  async function handleCreateFormSubmit(newAuthor) {
    const response = await createItem(newAuthor, "author");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching authors"]);
    } else {
      let newAuthors = (authors) => [...authors, newAuthor];
      setAuthors(newAuthors);
      navigate(`/authors/${response.data.id}`);
    }
  }

  async function handleDeleteClick(authorId) {
    const response = await deleteItem(authorId, "author");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching authors"]);
    } else {
      let newAuthors = authors.filter((author) => author.id != authorId);
      setAuthors(newAuthors);
      navigate("/authors");
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
      navigate(`/authors/${response.data.id}`);
    }
  }

  return (
    <div id="authors">
      <h2>
        <Link to="/authors">Authors</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Routes>
        <Route
          path="/new"
          element={<NewAuthor onFormSubmit={handleCreateFormSubmit} />}
        />
        <Route
          path={`/:authorId`}
          element={
            <AuthorWrapper
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          }
        />
        <Route path={"/"} element={<AuthorsList />} />
      </Routes>
    </div>
  );
}
