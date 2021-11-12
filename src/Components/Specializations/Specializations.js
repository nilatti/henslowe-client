import { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { createItem, deleteItem, updateServerItem } from "../../api/crud";

import { getItems } from "../../api/crud";
import SpecializationsList from "./SpecializationsList";
import SpecializationWrapper from "./SpecializationWrapper";
import NewSpecialization from "./NewSpecialization";
import ErrorMessages from "../ErrorMessages";

export default function Specializations() {
  const history = useHistory();
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
      history.push(`/specializations/${response.data.id}`);
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
      history.push("/specializations");
      history.go();
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
      history.push(`/specializations/${response.data.id}`);
      history.go();
    }
  }

  return (
    <div id="specializations">
      <h2>
        <Link to="/specializations">Specializations</Link>
      </h2>
      <ErrorMessages errors={errors} />
      <hr />
      <Switch>
        <Route
          path="/specializations/new"
          render={(props) => (
            <NewSpecialization
              {...props}
              onFormSubmit={handleCreateFormSubmit}
            />
          )}
        />
        <Route
          path={`/specializations/:specializationId`}
          render={(props) => (
            <SpecializationWrapper
              {...props}
              onDeleteClick={handleDeleteClick}
              onFormSubmit={handleEditFormSubmit}
            />
          )}
        />
        <Route
          path={"/specializations/"}
          render={(props) => (
            <SpecializationsList {...props} specializations={specializations} />
          )}
        />
      </Switch>
    </div>
  );
}
