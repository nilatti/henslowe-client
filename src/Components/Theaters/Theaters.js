import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud.js";
import { getTheaterNames } from "../../api/theaters.js";
import TheatersList from "./TheatersList.js";
import TheaterWrapper from "./TheaterWrapper.js";
import NewTheater from "./NewTheater.js";
import ErrorMessages from "../ErrorMessages.js";

export default function Theaters() {
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(async () => {
    const response = await getTheaterNames();
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching theaters"]);
    } else {
      setTheaters(response.data);
    }
  }, []);

  async function handleCreateFormSubmit(newTheater) {
    const response = await createItem(newTheater, "theater");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching theaters"]);
    } else {
      let newTheaters = (theaters) => [...theaters, newTheater];
      setTheaters(newTheaters);
      navigate(`/theaters/${response.data.id}`);
    }
  }

  async function handleDeleteClick(theaterId) {
    const response = await deleteItem(theaterId, "theater");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching theaters"]);
    } else {
      let newTheaters = theaters.filter((theater) => theater.id != theaterId);
      setTheaters(newTheaters);
      navigate("/theaters");
    }
  }

  async function handleEditFormSubmit(newTheater) {
    const response = await updateServerItem(newTheater, "theater");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error updating theater"]);
    } else {
      let newTheaters = theaters.map((theater) => {
        if (theater.id != newTheater.id) {
          return theater;
        } else {
          return response.data;
        }
      });
      setTheaters(newTheaters);
      navigate(`/theaters/${response.data.id}`);
    }
  }

  return (
    <div id="theaters">
      <h2>
        <Link to="/theaters">Theaters</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Routes>
        <Route
          path="/new"
          element={<NewTheater onFormSubmit={handleCreateFormSubmit} />}
        />
        <Route
          path={`/:theaterId`}
          element={
            <TheaterWrapper
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          }
        />
        <Route path={"/"} element={<TheatersList theaters={theaters} />} />
      </Routes>
    </div>
  );
}
