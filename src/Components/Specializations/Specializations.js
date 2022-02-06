import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  createItem,
  deleteItem,
  getItems,
  updateServerItem,
} from "../../api/crud.js";
import SpecializationsList from "./SpecializationsList.js";
import SpecializationWrapper from "./SpecializationWrapper.js";
import NewSpecialization from "./NewSpecialization.js";
import ErrorMessages from "../ErrorMessages.js";

export default function Specializations() {
  const navigate = useNavigate();
  const [specializations, setSpecializations] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(async () => {
    const response = await getItems("specialization");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching specializations"]);
    } else {
      setSpecializations(response.data);
    }
  }, []);

  async function handleCreateFormSubmit(newSpecialization) {
    const response = await createItem(newSpecialization, "specialization");
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error fetching specializations"]);
    } else {
      let newSpecializations = (specializations) => [
        ...specializations,
        response.data,
      ];
      setSpecializations(newSpecializations);
      navigate(`/specializations/${response.data.id}`);
    }
  }

  async function handleDeleteClick(specializationId) {
    const response = await deleteItem(specializationId, "specialization");
    if (response.status >= 404) {
      setErrors((errors) => [...errors, "Error fetching specializations"]);
    } else {
      let newSpecializations = specializations.filter(
        (specialization) => specialization.id != specializationId
      );
      setSpecializations(newSpecializations);
      navigate("/specializations");
    }
  }

  async function handleEditFormSubmit(newSpecialization) {
    const response = await updateServerItem(
      newSpecialization,
      "specialization"
    );
    if (response.status >= 400) {
      setErrors((errors) => [...errors, "Error updating specialization"]);
    } else {
      let newSpecializations = specializations.map((specialization) => {
        if (specialization.id != newSpecialization.id) {
          return specialization;
        } else {
          return response.data;
        }
      });
      setSpecializations(newSpecializations);
      navigate(`/specializations/${response.data.id}`);
    }
  }

  return (
    <div id="specializations">
      <h2>
        <Link to="/specializations">Specializations</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Routes>
        <Route
          path="/specializations/new"
          children={(props) => (
            <NewSpecialization
              {...props}
              onFormSubmit={handleCreateFormSubmit}
            />
          )}
        />
        <Route
          path={`/specializations/:specializationId`}
          children={(props) => (
            <SpecializationWrapper
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/specializations/"}
          children={(props) => (
            <SpecializationsList {...props} specializations={specializations} />
          )}
        />
      </Routes>
    </div>
  );
}
