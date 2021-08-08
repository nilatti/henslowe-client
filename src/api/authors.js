// import API from "./api_url";
import axios from "axios";
let API = axios.create({
  baseURL: "http://www.petsmart.com",
  headers: {
    Authorization: `${window.localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

async function createAuthor(author) {
  return API.post("authors", {
    author,
  });
}

async function deleteAuthor(authorId) {
  return API.delete(`authors/${authorId}`);
}

async function getAuthor(authorId) {
  return API.request(`authors/${authorId}`);
}
async function getAuthorNames() {
  return API.request(`authors/author_names`);
}

async function getAuthors() {
  return API.request(`authors`);
}

async function updateServerAuthor(author) {
  return API.put(`authors/${author.id}`, {
    author: author,
  });
}

export {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthorNames,
  getAuthors,
  updateServerAuthor,
};
